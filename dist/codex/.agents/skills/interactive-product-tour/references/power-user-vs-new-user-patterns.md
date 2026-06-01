# Power-user vs new-user patterns

Differentiation signals and patterns. The over-helping and under-helping traps.

Different users need different help. The discipline is to know which user is which and tailor the help system to their state.

---

## The state-respect principle

Power users do not want tours on features they already use. New users need tours on features they are encountering for the first time. The help system should know the difference and respect both.

**The win.** A power user encounters a newly-shipped feature; sees a brief tour. A new user encounters a feature for the first time; sees the same tour. A power user encounters a feature they have used 50 times; sees nothing.

**The fail.** Both users see the same tour every time. Power users disable tours; new users miss critical help when they need it most.

The discipline. Tour visibility should depend on user state, not user category alone.

---

## Differentiation signals

What lets the system know which user is which.

**Feature usage history.** Has the user used this feature before?

- Most reliable signal.
- Tracks per-feature, per-user state.
- Updates in real time as the user uses the feature.

**Tenure on the product.** How long has the user been a customer?

- Approximate signal; new accounts vs old accounts.
- Useful when feature usage data is missing.

**Engagement frequency.** Daily active vs returning monthly.

- Active users tend to know the product better.
- Returning users may need re-orientation.

**Plan or role.** Free vs paid; admin vs end-user; user vs viewer.

- Different roles use different feature sets.
- Plan changes can unlock new features.

**Self-reported skill level.** Rare; usually inferred.

- Some products ask during signup.
- Useful but unreliable; people self-assess inaccurately.

The discipline. Combine signals. Single signals are noisy.

---

## Differentiation patterns

How to surface different help.

**Pattern A: Feature-usage gating.**

How it works. Each tour has a "show only if user has not used this feature" condition. Power users with usage history skip; new users see.

When to use. Default for feature-specific tours. Most reliable.

**Pattern B: Tenure-based filtering.**

How it works. New users (under 7 days) see all relevant tours. Established users (over 30 days) see tours only for newly-shipped features.

When to use. When feature usage data is incomplete or unavailable.

**Pattern C: Engagement-based modulation.**

How it works. Daily active users see fewer tours; returning monthly users may see re-orientation help.

When to use. When engagement frequency predicts product knowledge.

**Pattern D: Role-based differentiation.**

How it works. Admins see admin-specific tours; end-users see end-user tours.

When to use. When the product has materially different surfaces for different roles.

**Pattern E: Newly-shipped feature highlighting.**

How it works. New feature ships; tour fires for ALL users (power users and new users) because everyone is new to this feature.

When to use. Feature launches. Power users benefit from the tour just as much as new users for this case.

---

## The over-helping trap

Helping power users with features they have mastered.

**The pattern.** Tours fire regardless of user state; power users see tours they do not need.

**The signal.** Power user complaints; tour disable rate climbs; trust degrades.

**The cost.** Power users disable tours globally; the system loses access to them for genuinely new features.

**The cure.** Add feature-usage gating. Respect tenure and engagement signals.

---

## The under-helping trap

Treating all users as power users.

**The pattern.** Tours fire only on first-login or never. New users miss help when they need it.

**The signal.** Feature adoption stays low among new users; support tickets persist for tour-covered features.

**The cost.** New users churn or stay underactivated.

**The cure.** Tours fire when users encounter features for the first time, regardless of how long they have been on the product.

---

## Returning-user re-orientation

Long-absent users may need re-orientation.

**The pattern.** User has not logged in for 60+ days. On return, abbreviated re-orientation help surfaces.

**Design.**

- Brief (2-3 steps max).
- Highlights what changed in the user's absence.
- Easy to dismiss for users who do not need it.

**The over-helping risk.** Users returning from a 1-week absence do not need re-orientation. Set the absence threshold appropriately.

---

## Newly-shipped feature handling

When a feature ships, the help system has new content.

**The pattern.** A new tour ships with the feature. Trigger fires for all users (power and new alike) because everyone encounters this feature for the first time.

**Discipline.**

- Tag the tour as "new feature."
- Fire on first encounter regardless of user tenure.
- After most users have seen it (e.g., 80 percent of monthly active users), the tour can transition to standard new-user-only logic.

**Power-user respect.** Even new feature tours should be brief. Power users will read what they need; do not slow them with five-step explanations.

---

## Plan or role change handling

User state can change.

**Plan upgrade.** User moves from free to paid; new features become available; relevant tours become applicable.

**Role change.** User promoted to admin; admin tours become applicable.

**The discipline.** Re-evaluate tour eligibility on state change. Plan upgrade triggers a "you have new features available" re-orientation.

---

## Inferred vs asked differentiation

When to ask the user vs when to infer.

**Ask sparingly.** Asking adds friction; users tire of being categorized.

**Infer when possible.** Behavioral signals usually outperform self-report.

**When to ask.**

- Onboarding (use case, role).
- Major plan changes that affect tour eligibility.

**When not to ask.**

- After onboarding; let behavior speak.

---

## Common power-user vs new-user failures

**No differentiation.** All users see all tours; over-helping power users.

**Differentiation only by tenure.** New accounts vs old; misses that some new accounts have power users (came from competitor) and some old accounts have casual users.

**No re-orientation for returning users.** Users who left 90 days ago re-encounter as if first-time; they remember enough to skip re-orientation; but the help fails when they hit a changed feature.

**Newly-shipped features not flagged.** Tour does not surface for power users who have used adjacent features; they miss the new capability.

**Plan upgrade not triggering re-evaluation.** User upgrades; new features available; tours for those features do not surface.

**Inferring poorly.** Inference logic mistakes user state; help is wrong for the user.

---

## Methodology-level choices that stay in the public skill

The state-respect principle. Differentiation signals (5 signals). Patterns A through E. The over-helping and under-helping traps. Returning-user re-orientation. Newly-shipped feature handling. Plan or role change handling. Inferred vs asked differentiation. Common failures.

## Implementation choices that stay internal

Specific differentiation rules for specific products. Specific signals weighted by team. The team's plan and role mapping. These vary by team and product.
