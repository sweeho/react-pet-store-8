## 1. Credit card model

- [ ] 1.1 Define the credit card entity (number, type, expiry text up to 10 chars, all mandatory)
- [ ] 1.2 Implement expiry month/year derivation with 01/2010 defaults
- [ ] 1.3 Implement credit card XML exchange and root-element rejection

## 2. Order submission

- [ ] 2.1 Implement required contact field validation with missing-field reporting
- [ ] 2.2 Attach the fixed card to every submitted order (pending SME decision)
- [ ] 2.3 Build the purchase order from the cart with line numbering and total
- [ ] 2.4 Send the order message, empty the cart and return order id and e-mail
- [ ] 2.5 Refuse an empty cart with the error outcome

## 3. Order data

- [ ] 3.1 Define the purchase order record with contact and card references
- [ ] 3.2 Enforce positive line quantity
- [ ] 3.3 Define named counters for identifier generation
- [ ] 3.4 Define the order status view and indexes
- [ ] 3.5 Define the purchase order XML document with en_US default locale

## 4. Platform

- [ ] 4.1 Support en_US, ja_JP, zh_CN locales and UTF-8 input
- [ ] 4.2 Provide a populate operation for schema and sample data
