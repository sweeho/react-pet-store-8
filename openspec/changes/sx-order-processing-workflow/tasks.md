## 1. Data model

- [ ] 1.1 Implement and verify CTR-ENT-0001: Keep named integer counters, one per unique name, each
- [ ] 1.2 Implement and verify OPW-ENT-0001: Keep one process-manager record per order, identified by the
- [ ] 1.3 Implement and verify ORDER-PROCESSING-WORKFLOW-ENT-0001: Keep exactly one mandatory status value of up to
- [ ] 1.4 Implement and verify ORDER-PROCESSING-WORKFLOW-ENTITY-0001: Keep exactly one workflow-tracking record per order, identified by
- [ ] 1.5 Implement and verify PROCESS-ENT-0001: Track each order's processing state in an order manager
- [ ] 1.6 Implement and verify PROCESS-ENT-0002: Generate order and purchase-order identifiers from named counters, one
- [ ] 1.7 Implement and verify WORKFLOW-ENT-0001: Keep named integer counters, one row per name, used

## 2. Identifier generation

- [ ] 2.1 Implement and verify ORDP-BR-0001: Create a counter for that prefix starting at 0
- [ ] 2.2 Implement and verify ORDP-REQ-0001: Return, for a given identifier prefix, a unique identifier
- [ ] 2.3 Implement and verify ORDP-REQ-0002: Issue each identifier within a transaction so the counter
- [ ] 2.4 Implement and verify ORDPW-BR-0002: Create a counter for that prefix starting at 0
- [ ] 2.5 Implement and verify ORDPW-BR-0004: Perform each identifier request within a transaction (create-if-missing and
- [ ] 2.6 Implement and verify ORDPW-BR-0006: Permit any caller to invoke identifier generation without a
- [ ] 2.7 Implement and verify ORDPW-REQ-0001: Return, for a given identifier prefix, a unique identifier
- [ ] 2.8 Implement and verify ORDPW-REQ-0003: Persist each counter keyed by its unique name, so
- [ ] 2.9 Implement and verify ORDPW-REQ-0005: Issue order identifiers through this generator when an order

## 3. Order status and process manager

- [ ] 3.1 Implement and verify BATCH-REQ-0007: List as MISMATCH every order for which the supplier
- [ ] 3.2 Implement and verify OPW-BR-0004: GIVEN a lookup fails for any reason (name not
- [ ] 3.3 Implement and verify OPW-BR-0005: Recognise the order statuses PENDING, APPROVED, DENIED, SHIPPED_PART and
- [ ] 3.4 Implement and verify OPW-REQ-0001: Resolve named platform resources (local and remote component homes
- [ ] 3.5 Implement and verify OPW-REQ-0002: Be a single shared instance and SHALL cache every
- [ ] 3.6 Implement and verify OPW-REQ-0003: Cache results and SHALL perform a fresh naming lookup
- [ ] 3.7 Implement and verify OPW-REQ-0004: Return, on request by the admin client, all orders
- [ ] 3.8 Implement and verify OPW-REQ-0006: Execute a workflow transition by instantiating a transition delegate
- [ ] 3.9 Implement and verify OPW-RULE-0001: Apply an approval or denial status change to an
- [ ] 3.10 Implement and verify OPW-WORKFLOW-0001: SHALL, on receiving a purchase order message, persist the
- [ ] 3.11 Implement and verify OPW-WORKFLOW-0003: SHALL, on receiving a supplier invoice, mark the order
- [ ] 3.12 Implement and verify ORDA-REQ-0003: Publish an order-approval message containing each changed order id
- [ ] 3.13 Implement and verify ORDAPP-REQ-0003: SHALL, on an UPDATESTATUS request, convert each order with
- [ ] 3.14 Implement and verify ORDER-PROCESSING-WORKFLOW-BR-0001: Recognise the order statuses PENDING, APPROVED, DENIED, SHIPPED_PART and
- [ ] 3.15 Implement and verify ORDER-PROCESSING-WORKFLOW-BR-0002: Expose the web-tier lookup facility as a single shared
- [ ] 3.16 Implement and verify ORDER-PROCESSING-WORKFLOW-BR-0003: Raise a lookup failure that wraps the underlying cause
- [ ] 3.17 Implement and verify ORDER-PROCESSING-WORKFLOW-BUSINESS-RULE-0001: Expose order status as the join of purchase orders
- [ ] 3.18 Implement and verify ORDER-PROCESSING-WORKFLOW-REQ-0001: Create a tracking record with a given order id
- [ ] 3.19 Implement and verify ORDER-PROCESSING-WORKFLOW-REQ-0002: Allow the status of an existing order to be
- [ ] 3.20 Implement and verify ORDER-PROCESSING-WORKFLOW-REQ-0003: Return the current status for a given order id
- [ ] 3.21 Implement and verify ORDER-PROCESSING-WORKFLOW-REQ-0004: List all orders whose status exactly equals a given
- [ ] 3.22 Implement and verify ORDER-PROCESSING-WORKFLOW-WF-0001: Run each workflow transition through a pluggable handler, named
- [ ] 3.23 Implement and verify ORDP-RULE-0001: Expose order status by joining each purchase order to
- [ ] 3.24 Implement and verify ORDWF-BR-0003: Ignore that order: no status update, no supplier purchase
- [ ] 3.25 Implement and verify ORDWF-WF-0001: SHALL, on receiving a purchase order message, persist the
- [ ] 3.26 Implement and verify ORDWF-WF-0002: Pass an auto-approval of a new order to the
- [ ] 3.27 Implement and verify ORDWF-WF-0004: SHALL, for each PENDING order in an approval message
- [ ] 3.28 Implement and verify PROCESS-REQ-0001: Provide an operations view listing, per order, its id
- [ ] 3.29 Implement and verify WORKFLOW-RULE-0001: Keep for each order a process-manager state of exactly

## 4. Messaging and documents

- [ ] 4.1 Implement and verify CHK-INT-0003: Serialise each placed purchase order to XML and hand
- [ ] 4.2 Implement and verify ORDP-INT-0001: Exchange order status changes as an OrderApproval document containing
- [ ] 4.3 Implement and verify ORDPROC-BR-0001: Raise a failure to the caller and SHALL close
- [ ] 4.4 Implement and verify ORDPROC-BR-0002: Send each message within the caller's transaction when one
- [ ] 4.5 Implement and verify ORDPROC-INT-0001: Accept a text message from a calling module and
- [ ] 4.6 Implement and verify ORDPROC-RULE-0002: Report failure to the caller by raising an error
- [ ] 4.7 Implement and verify ORDPROC-RULE-0003: Perform the send within the caller's transaction (or start
- [ ] 4.8 Implement and verify SHOP-INT-0001: Exchange a line item with other modules as an
- [ ] 4.9 Implement and verify SHOP-INT-0002: Reject it with an error stating that a LineItem
- [ ] 4.10 Implement and verify SHOP-REQ-0003: Exchange a line item as a document containing category
- [ ] 4.11 Implement and verify SUPF-INTG-0006: Publish each generated invoice as a text message to
- [ ] 4.12 Implement and verify WKFL-INT-0001: Hand off orders between modules over named JMS destinations
- [ ] 4.13 Implement and verify WKFL-REQ-0001: Validate purchase order, invoice and order-approval XML documents against

## 5. Web request pipeline

- [ ] 5.1 Implement and verify ORD-REQ-0001: Route web requests ending in .do to the main
- [ ] 5.2 Implement and verify ORD-REQ-0002: Forward to the error screen mapped to that exception
- [ ] 5.3 Implement and verify ORD-WF-0008: Route every browser request ending in ".do" through a
- [ ] 5.4 Implement and verify ORD-WF-0009: Hand an event raised by a web action to
- [ ] 5.5 Implement and verify ORD-WF-0011: SHALL, when an unhandled exception occurs while processing a
- [ ] 5.6 Implement and verify ORDPROC-REQ-0001: Allow purchase orders to be found by order date
- [ ] 5.7 Implement and verify ORDPROC-REQ-0002: Serialise business-tier event handling per user session so that
- [ ] 5.8 Implement and verify ORDPROC-REQ-0003: Let a page transition be decided at run time
- [ ] 5.9 Implement and verify ORDPROC-WKF-0001: Process each user-initiated request as: map the request URL
