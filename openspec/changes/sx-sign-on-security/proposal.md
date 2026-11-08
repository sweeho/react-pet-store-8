## Why

Recover the sign-on and access-control behaviour of the legacy Pet Store storefront and its admin and supplier applications, so the rebuild can match it.

## What Changes

- Credential authentication, protected-screen interception, remember-user-name cookie, sign-off, session timeouts.
- Credential storage and customer link constraints.
- Role restriction on the supplier inventory handler; admin sign-in screen.
- Components with deliberately no role restriction (purchase order, customer).

## Impact

Affected capability: sign-on-security. Several records are low confidence or disputed (plain-text passwords, conflicting timeouts, unresolved reachability) and need SME decision.
