## 1. Cart state

- [ ] 1.1 Implement a per-session cart mapping item id to quantity, created with the session and starting empty
- [ ] 1.2 Implement add with default quantity 1 that replaces an existing quantity
- [ ] 1.3 Implement remove-item and empty-cart
- [ ] 1.4 Implement quantity update (zero or less removes; positive replaces)
- [ ] 1.5 Implement item count as distinct items
- [ ] 1.6 Propagate locale changes and sign-on to the cart

## 2. Presentation and totals

- [ ] 2.1 Build cart lines from current catalog data in the shopper locale
- [ ] 2.2 Omit lines whose catalog lookup fails from list and totals
- [ ] 2.3 Compute line totals and subtotal with no tax, shipping, discount or rounding
- [ ] 2.4 Show empty-cart message or Check Out link

## 3. Web actions

- [ ] 3.1 Handle purchase, remove and update submissions with itemQuantity\_<itemId> parameters
- [ ] 3.2 Treat non-numeric quantities as 0

## 4. Order line item

- [ ] 4.1 Define the line item record with its seven fields
- [ ] 4.2 Support creation from explicit values and from an existing line item
- [ ] 4.3 Provide the six-field line item snapshot
- [ ] 4.4 Decide unit price precision and access control with the Business Owner

## 5. Open questions

- [ ] 5.1 Resolve with an SME whether previous-screen navigation belongs to this capability
- [ ] 5.2 Resolve duplicated record keys at ingest
