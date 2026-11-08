## Why

The legacy storefront holds a per-session shopping cart (item id to quantity), resolves lines against the catalog for display, and keeps order line items as persisted records. This change records that behaviour as reviewable requirements so the rebuild can match it.

## What Changes

- Adds the `shopping-cart` capability: cart state, add/remove/update rules, item count, line presentation, totals, web actions, session lifecycle, and the order line item record.
- Extraction produced no `kind: screen` records; the only display rule found is the empty-cart message and Check Out link, written as a requirement.

## Impact

- Source: `legacy-source/app/src/components/cart`, `components/lineitem`, `apps/petstore`, `waf`.
- Several record keys are reused by different passes for different content (SHOP-REQ-0001/0002/0004/0005, CART-REQ-0006); see design.md.
