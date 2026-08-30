# Code Review: [PR Title or Scope]

**Reviewer:** [Name]
**Date:** [YYYY-MM-DD]
**PR or commit:** [Link or hash]
**Author:** [Name]
**Scope:** [Files reviewed, lines changed]

---

## Summary

[2 to 3 sentences. Overall assessment. Recommend merge, request changes, or block.]

**Recommendation:** [Approve / Approve with comments / Request changes / Block]

**Critical issues:** [N]
**Important issues:** [N]
**Minor issues:** [N]
**Suggestions:** [N]

---

## Critical issues (blockers)

[Issues that must be fixed before merge.]

### 1. [Issue title]
- **File:** [path/to/file.ext]
- **Line:** [Line number or range]
- **Issue:** [What's wrong]
- **Why critical:** [Impact if shipped]
- **Suggested fix:** [Specific recommendation]

### 2. [Issue title]
[Same structure]

---

## Important issues

[Issues that should be addressed but might not block merge.]

### 1. [Issue title]
- **File:**
- **Line:**
- **Issue:**
- **Suggested fix:**

---

## Minor issues

[Polish items, style consistency, naming.]

- **[file:line]** [Description and suggestion]
- **[file:line]** [Description and suggestion]
- **[file:line]** [Description and suggestion]

---

## Suggestions for follow-up

[Things worth doing in a follow-up PR, not in this one.]

- [Suggestion]
- [Suggestion]

---

## Dimension scorecard

| Dimension | Pass | Issues |
|---|---|---|
| Correctness | ☐ | [Notes] |
| Security | ☐ | [Notes] |
| Performance | ☐ | [Notes] |
| Reliability | ☐ | [Notes] |
| Maintainability | ☐ | [Notes] |

---

## Specific checks

### Correctness
- [ ] Logic matches PR description
- [ ] Edge cases handled (empty, null, error)
- [ ] No off-by-one or async race conditions
- [ ] Tests exist or are not needed (with reason)
- [ ] No regressions in existing functionality

### Security
- [ ] No secrets in client-side code
- [ ] Auth checks on mutations
- [ ] Input validated before use
- [ ] No new SSRF surface
- [ ] Cookies have appropriate attributes
- [ ] Server-only env vars not exposed to client

### Performance
- [ ] No N+1 queries
- [ ] Pagination on large result sets
- [ ] Cache strategy appropriate
- [ ] Bundle size impact reasonable
- [ ] Images handled correctly

### Reliability
- [ ] Errors caught and handled
- [ ] Network calls have timeouts
- [ ] Graceful degradation for non-critical paths
- [ ] Mutations idempotent if retried
- [ ] Sufficient logging for diagnosis

### Maintainability
- [ ] Naming clear
- [ ] Functions focused (one thing well)
- [ ] No unjustified duplication
- [ ] No magic values (use constants)
- [ ] Comments explain why, not what

---

## Stack-specific checks (if applicable)

[Reference the stack-specific guide for the project. Note any stack-specific patterns or anti-patterns worth flagging.]

---

## Notes for the author

[Encouraging or contextual notes. What was done well. What's a learning opportunity.]

---

## Sign-off

**Approval status:** [Approved / Approved with comments / Changes requested / Blocked]
**Date:** [YYYY-MM-DD]

If changes were requested, link to the follow-up PR or commit when resolved:
- [Link or hash]
