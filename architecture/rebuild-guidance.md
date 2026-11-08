# Rebuild guidance: Java Pet Store 1.3.2

This is prose for the rebuild. The ground truth for behaviour is each capability's delta spec under `openspec/changes/sx-<capability>/specs/`. `api/openapi.yaml`, `architecture/erd.mermaid` and `architecture/schema.sql` describe the legacy system and are evidence only; where they disagree with a delta spec, the delta spec wins. `build/manifest.yaml` is the release order.

## Build order

Follow `order` in `build/manifest.yaml`: localization, sign-on-security, catalog-browsing, customer-accounts, shopping-cart, checkout-payment, order-processing-workflow, order-approval, supplier-fulfilment, customer-notifications, batch-operations. Each capability depends only on earlier ones.

## What the legacy system is

Four modules: a storefront (session timeout 15 min), an admin module (FORM login, role administrator, XML-over-HTTP service used by a desktop client), a supplier module (stock update screens) and an order processing center reached over JMS. Orders flow storefront, order processing center (state PENDING, APPROVED, DENIED, COMPLETED), supplier purchase order, invoice back to the order processing center, mail.

## Do not carry over

- Plain-text passwords (SIGNON_USER.PASSWORD) and clear-text card numbers (CREDIT_CARD.CARD_NUMBER). Specs record them as legacy facts; the SME decides the replacement.
- Platform specifics: entity-bean tables, JMS plumbing, JSP templating, Java Web Start launch. Rebuild the behaviour, not the mechanism.
- Demo defaults such as the pre-filled admin credentials.

## Open decisions for an SME

- Records marked disputed or low confidence in the delta specs: conflicting session timeouts (15 vs 54 min), twin readings of the same behaviour (several keys were reused by different passes for different content, for example SHOP-REQ-0001 and ORDAPP-SCR-0001), thresholds that are bare literals, and code with unresolved reachability.
- ORDAPP-SCR-0001 was extracted twice with different content (admin start page in the admin module, order listing in the order processing center). The manifest uses the delta spec's reading, the admin start page; the order listing is an operation, not a screen.
- Control-M schedule, batch thresholds and notification addresses come from configuration and need confirmation.
- The schema has no CHECK on price versus cost: the shipped sample data has an item priced below cost (EST-26, ja_JP), flagged by the catalog check batch job.

## Data

Legacy keys are varchar identifiers; PODATE is epoch milliseconds; EXPIRYDATE is text like 04/04. Catalog text, price and image are per locale (composite key with LOCALE). Business checks in schema.sql (positive line quantity, shipped not above ordered, status enums, non-negative inventory) are stated invariants.

## Review state

No capability has an approving reviewer yet; `reviewedBy` and `reviewedAt` are null in the manifest.
