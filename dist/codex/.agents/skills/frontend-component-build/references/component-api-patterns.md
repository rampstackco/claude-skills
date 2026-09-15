# Component API Patterns

Common patterns for building flexible, predictable component APIs. Examples assume React idioms but the patterns translate to Vue, Svelte, and Web Components.

---

## Pattern 1: Compound components

Multi-part components where each part is a separate sub-component sharing state via context.

**Use when:**
- The component has distinct, repeating sub-parts (header, body, footer)
- Consumers need flexibility in arrangement and content
- Internal state needs to coordinate across parts

```jsx
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>
    <Text>Content</Text>
  </Card.Body>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>
```

**Pros:**
- Highly composable
- Consumers control arrangement
- Internal state stays encapsulated

**Cons:**
- More API surface to maintain
- Less guidance for the consumer (any arrangement is "valid")

---

## Pattern 2: Slots / render children

A single component that accepts content through specific slots.

**Use when:**
- The component has one or two specific insertion points
- Compound components feel like overkill

```jsx
<Modal
  title="Confirm action"
  footer={<Button>Confirm</Button>}
>
  <p>Are you sure?</p>
</Modal>
```

In Web Components: `<slot name="title">`. In Vue: named slots. In React: prop-as-element.

**Pros:**
- Smaller API surface than compound components
- Clear insertion points

**Cons:**
- Less flexible if the consumer wants to vary arrangement

---

## Pattern 3: Render props / function as children

The component provides state, the consumer provides UI.

**Use when:**
- The component has reusable behavior (e.g., dropdown logic)
- Multiple visual variations should share the behavior
- Headless component libraries (Radix, Headless UI) use this heavily

```jsx
<Dropdown>
  {({ isOpen, toggle, items }) => (
    <>
      <button onClick={toggle}>Menu</button>
      {isOpen && <ul>{items.map(item => <li>{item}</li>)}</ul>}
    </>
  )}
</Dropdown>
```

**Pros:**
- Maximum flexibility
- Behavior and presentation cleanly separated

**Cons:**
- Steeper learning curve
- More boilerplate at the call site

---

## Pattern 4: Headless components

Components that ship behavior and accessibility without prescribing visual style.

**Use when:**
- Multiple consumers want different looks
- Accessibility is hard and worth centralizing
- Building a primitive layer

```jsx
// Headless: behavior + accessibility, no visual style
<Listbox value={selected} onChange={setSelected}>
  <Listbox.Button>{selected}</Listbox.Button>
  <Listbox.Options>
    {options.map(option => (
      <Listbox.Option key={option} value={option}>{option}</Listbox.Option>
    ))}
  </Listbox.Options>
</Listbox>
```

The consumer styles each part however they want.

**Pros:**
- Reusable across visual styles
- Accessibility hard work centralized

**Cons:**
- Consumers must style every part
- Less batteries-included

---

## Pattern 5: Controlled vs uncontrolled

Two modes:

**Uncontrolled** (component owns its state):
```jsx
<Input defaultValue="initial" onChange={handleChange} />
```

**Controlled** (consumer owns the state):
```jsx
<Input value={value} onChange={setValue} />
```

**Pattern:** Support both. Uncontrolled is convenient for simple cases. Controlled is required when state needs to live in the parent.

```jsx
function Input({ value, defaultValue, onChange, ...props }) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = isControlled ? value : internalValue;
  
  const handleChange = (e) => {
    if (!isControlled) setInternalValue(e.target.value);
    onChange?.(e);
  };
  
  return <input value={currentValue} onChange={handleChange} {...props} />;
}
```

**Convention:** `value` for controlled, `defaultValue` for uncontrolled. Documented behavior when both are provided (typically: warn, treat as controlled).

---

## Pattern 6: Polymorphic components (the `as` prop)

A component that can render as different HTML elements while preserving its API.

**Use when:**
- Visual style should apply to multiple HTML elements (e.g., a Heading that could be h1, h2, etc.)
- Consumers occasionally need to override the rendered element

```jsx
<Text as="h1">Page title</Text>
<Text as="span">Inline text</Text>
<Text as="a" href="/path">Link</Text>
```

**Pros:**
- Style and semantics decoupled when needed

**Cons:**
- Type complexity (TypeScript polymorphic types are non-trivial)
- Easy to misuse (rendering an h1 styled as a span breaks structure)

Use sparingly. The default rendered element should fit most cases.

---

## Pattern 7: Context for cross-component state

When sub-components in a tree need shared state, use context. Don't drill props.

```jsx
const TabContext = createContext();

function Tabs({ children, defaultIndex = 0 }) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  return (
    <TabContext.Provider value={{ activeIndex, setActiveIndex }}>
      {children}
    </TabContext.Provider>
  );
}

function Tab({ index, children }) {
  const { activeIndex, setActiveIndex } = useContext(TabContext);
  return (
    <button
      role="tab"
      aria-selected={activeIndex === index}
      onClick={() => setActiveIndex(index)}
    >
      {children}
    </button>
  );
}
```

**Convention:** Context tied to a specific component family. Don't overload one context across unrelated components.

---

## Pattern 8: forwardRef and ref forwarding

Components should pass refs through to their underlying DOM element when reasonable.

```jsx
const Button = forwardRef(function Button({ children, ...props }, ref) {
  return <button ref={ref} {...props}>{children}</button>;
});
```

**Why:**
- Consumers need DOM access (focus, measure, scroll)
- Form libraries need refs to inputs
- Animation libraries need refs to elements

**Convention:** Forward refs on any component that wraps a single primary DOM element. Document where the ref attaches.

---

## Pattern 9: Variant / size enums via discriminated unions

Use string enums for variant and size props.

```typescript
type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  // ...
};
```

**Why:**
- Self-documenting
- Type-safe
- Consumers see options via autocomplete

**Anti-pattern:** Boolean variant props.

```typescript
// Bad
type ButtonProps = {
  primary?: boolean;
  secondary?: boolean;
  danger?: boolean;
};
```

Boolean variants permit invalid combinations (`primary={true} danger={true}`).

---

## Pattern 10: Event handler conventions

| Convention | Example |
|---|---|
| `onX` for events | `onClick`, `onChange`, `onClose` |
| `onXChange` for state changes | `onValueChange`, `onOpenChange` |
| Pass event object as first arg | `onClick(event)` |
| For state changes, pass new state as first arg | `onOpenChange(isOpen)` |

**Anti-patterns:**
- `handleClick` as a prop name (consumer confusion - this is the implementation, not the API)
- `change` instead of `onChange`
- Passing transformed event without the original

---

## API audit checklist

Before shipping a component:

- [ ] Default behavior is reasonable with zero props
- [ ] Variant prop uses string enum, not booleans
- [ ] Size prop uses string enum, not numbers (when sizes are constrained)
- [ ] Event handlers use `onX` convention
- [ ] Required props are minimal (ideally zero, often one)
- [ ] Optional props document defaults
- [ ] Component is forwardable (refs work)
- [ ] Polymorphic only where genuinely useful
- [ ] No boolean explosion (more than 5 booleans is a smell)
- [ ] State is controllable when it makes sense (controlled/uncontrolled support)
- [ ] Accessibility props are first-class (`aria-label`, `aria-describedby`, etc.)
- [ ] className/style override pattern documented
- [ ] All variants have visual examples in docs
- [ ] All states have visual examples in docs
- [ ] Keyboard interactions documented

If any item fails, the API needs another pass before ship.
