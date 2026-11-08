## 1. Data model

- [ ] 1.1 Define supplier purchase order, line item and purchase order entities
- [ ] 1.2 Define inventory record per item with non-negative stock
- [ ] 1.3 Define order-line shipped quantity and shipped <= ordered constraint
- [ ] 1.4 Define named identifier counters
- [ ] 1.5 Add indexes for order lookups by user, date and status

## 2. Fulfilment

- [ ] 2.1 Implement supplier order intake and persistence
- [ ] 2.2 Implement full-quantity-only line shipment against inventory
- [ ] 2.3 Treat missing inventory record as unavailable
- [ ] 2.4 Mark order COMPLETED only when all lines available
- [ ] 2.5 Implement pending-order reprocessing that skips failures
- [ ] 2.6 Implement invoice generation for shipped lines with fixed greeting

## 3. Order processing integration

- [ ] 3.1 Send supplier purchase order on approval
- [ ] 3.2 Send approval/denial list to customer mail queue
- [ ] 3.3 Handle invoice receipt and update shipped quantities
- [ ] 3.4 Set COMPLETED or SHIPPED_PART and notify on completion

## 4. Inventory administration

- [ ] 4.1 Build inventory display and update screen with empty state
- [ ] 4.2 Apply stock updates for ticked, non-empty, non-negative values
- [ ] 4.3 Reprocess pending orders and send invoices in one transaction

## 5. Documents

- [ ] 5.1 Build and parse supplier order XML with DTD validation and date fallback
- [ ] 5.2 Build and parse invoice XML
- [ ] 5.3 Build and parse purchase order XML with locale default
- [ ] 5.4 Enforce line item field constraints and unique item ids
- [ ] 5.5 Refuse null values in document builders
- [ ] 5.6 Define outgoing mail document shape

## 6. Lookups and access

- [ ] 6.1 Implement purchase order and supplier order finders
- [ ] 6.2 Create and cascade-delete related purchase order records
- [ ] 6.3 Resolve status set and transitions
- [ ] 6.4 Document unrestricted caller access and transactions
- [ ] 6.5 Add catalog check for items without inventory row
