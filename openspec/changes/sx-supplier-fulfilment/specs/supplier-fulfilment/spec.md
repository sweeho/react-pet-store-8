## ADDED Requirements

### Requirement: Supplier purchase order dispatch on approval

Recovered from: SUPFUL-INT-0001

The system SHALL, for each order approved, build a supplier purchase order document (order id, order date, shipping name, address, email, telephone and every line item with category, product, item, line number, quantity and unit price) and send it to the supplier purchase order queue.

#### Scenario: Supplier purchase order dispatch on approval

- **GIVEN** an order that has just been approved
- **WHEN** the approval is processed
- **THEN** a supplier purchase order carrying the order id, date, shipping contact and all line items is sent to the supplier purchase order queue

### Requirement: Approval batch customer mail

Recovered from: OPW-WORKFLOW-0002

The system SHALL, after sending supplier purchase orders for approved orders, send the list of processed approvals and denials to the customer-mail queue.

#### Scenario: Approval batch customer mail

- **GIVEN** a batch of approved and denied orders
- **WHEN** the batch is processed
- **THEN** supplier orders are sent for approved orders and the list of approvals and denials is sent to the customer-mail queue

### Requirement: Invoice receipt updates order status

Recovered from: SUPFUL-WF-0002

The system SHALL, on receiving a supplier invoice, mark the invoiced line items on the purchase order; if the order is then fully shipped it SHALL set the order COMPLETED and trigger the completed-order notification, otherwise it SHALL set the order to SHIPPED_PART with no notification.

#### Scenario: Invoice receipt updates order status

- **GIVEN** an order with two lines and an invoice covering only one
- **WHEN** the invoice is received
- **THEN** the order becomes SHIPPED_PART and no notification is sent

### Requirement: Supplier order intake and fulfilment attempt

Recovered from: SUPF-WF-0001

The system SHALL accept each supplier purchase order as an XML text message on a queue, persist it, attempt to fulfil each of its line items against inventory, and hand any resulting invoice to the order-processing transition; when no invoice results it SHALL take no further action until inventory is replenished.

#### Scenario: Supplier order intake and fulfilment attempt

- **GIVEN** a supplier purchase order message on the queue
- **WHEN** it is received and no line can be shipped
- **THEN** the order is stored, no invoice is produced and nothing further happens until stock is updated

### Requirement: Full-quantity line shipment

Recovered from: SUPF-RULE-0001

The system SHALL, for each line item not already fully shipped, ship the full ordered quantity only if on-hand inventory for the item is at least the ordered quantity, then reduce inventory by that quantity and mark the line shipped in full; partial shipment SHALL NOT occur.

#### Scenario: Full-quantity line shipment

- **GIVEN** a line ordering 5 of an item with 3 on hand
- **WHEN** fulfilment is attempted
- **THEN** the line stays unshipped and stock remains 3

### Requirement: Missing inventory record means unavailable

Recovered from: SUPF-RULE-0002

The system SHALL treat a line whose item has no inventory record as unavailable and leave it unshipped.

#### Scenario: Missing inventory record means unavailable

- **GIVEN** a line whose item has no inventory record
- **WHEN** fulfilment is attempted
- **THEN** the line is unavailable and unshipped

### Requirement: Order completion requires all lines available

Recovered from: SUPF-RULE-0003

The system SHALL mark a supplier order COMPLETED only when every line item was available in the processing pass, and SHALL otherwise leave it in its prior PENDING status to be retried later.

#### Scenario: Order completion requires all lines available

- **GIVEN** an order with one available and one unavailable line
- **WHEN** fulfilment is attempted
- **THEN** the available line ships and the order remains PENDING

### Requirement: Invoice produced only when something shipped

Recovered from: SUPF-REQ-0001

The system SHALL produce an invoice document only when at least one line was shipped in the pass, listing only the lines shipped in that pass.

#### Scenario: Invoice produced only when something shipped

- **GIVEN** a pass in which no line shipped
- **WHEN** fulfilment completes
- **THEN** no invoice is produced

### Requirement: Invoice header content

Recovered from: SUPF-RULE-0005

The system SHALL set the invoice order id and order date from the purchase order, the shipping date to the time of generation, and the customer label to the fixed text "Dear PetStore Customer".

#### Scenario: Invoice header content

- **GIVEN** a pass that shipped at least one line
- **WHEN** the invoice is generated
- **THEN** it carries the order id, order date, the generation time as shipping date and the fixed greeting

### Requirement: Stock update triggers reprocessing

Recovered from: SUPF-WF-0002

The system SHALL, when an administrator submits updated stock quantities, apply them, reprocess every pending supplier order and send each resulting invoice, all in one transaction.

#### Scenario: Stock update triggers reprocessing

- **GIVEN** pending orders waiting on stock
- **WHEN** the administrator submits increased stock
- **THEN** stock is replaced, pending orders are reprocessed and invoices are sent atomically

### Requirement: Only ticked items with a quantity are updated

Recovered from: SUPF-WKFL-0007

The system SHALL replace the stock quantity only of items whose update box is ticked and whose new quantity is non-empty and zero or greater.

#### Scenario: Only ticked items with a quantity are updated

- **GIVEN** an item ticked with quantity 7 and one unticked
- **WHEN** the update is submitted
- **THEN** only the ticked item is changed to 7

### Requirement: Stock value validation and replacement

Recovered from: SUPF-RULE-0004

The system SHALL set an item's stock to the entered value only when it is zero or greater, SHALL ignore blank entries, and SHALL replace rather than add to the stored quantity.

#### Scenario: Stock value validation and replacement

- **GIVEN** an item with stock 10 and an entered value of 4
- **WHEN** the update is applied
- **THEN** stock becomes 4

### Requirement: Pending order reprocessing run

Recovered from: SUPF-RULE-0008

The system SHALL, on each reprocessing run, select all PENDING purchase orders and attempt fulfilment on each, returning only invoices actually produced; an order whose invoice cannot be built SHALL be skipped without failing the run.

#### Scenario: Pending order reprocessing run

- **GIVEN** three PENDING orders of which one fails to produce an invoice
- **WHEN** reprocessing runs
- **THEN** invoices for the others are returned and the run does not fail

### Requirement: Inventory display and update screen

Recovered from: SUPF-SCRN-0010

The inventory screen SHALL present all inventory items with item id and existing quantity, plus a new-quantity input and an update tick box per item, and SHALL display "There are no items in inventory at all" when no inventory collection is returned.

#### Scenario: Inventory display and update screen

- **GIVEN** inventory containing items
- **WHEN** the inventory screen is displayed
- **THEN** each row shows item id, existing quantity, a new-quantity input and an update tick box

### Requirement: Inventory record per item, listable

Recovered from: SUPF-ENT-0001

The system SHALL keep one inventory record per item holding the item id and on-hand quantity, and SHALL allow listing all inventory items.

#### Scenario: Inventory record per item, listable

- **GIVEN** inventory records exist
- **WHEN** all items are listed
- **THEN** every record is returned

### Requirement: Inventory record creation

Recovered from: SUPF-ENTY-0011

The system SHALL create an inventory record per item id with an initial quantity at population time.

#### Scenario: Inventory record creation

- **GIVEN** a new item id with initial quantity 100
- **WHEN** the record is created
- **THEN** one inventory record exists with quantity 100

### Requirement: Line item immutability except shipped quantity

Recovered from: SHOP-REQ-0003

The system SHALL allow the quantity shipped of a line item to be updated after creation, and SHALL NOT allow category, product, item, line number, quantity or unit price to be changed through its public interface.

#### Scenario: Line item immutability except shipped quantity

- **GIVEN** an existing line item
- **WHEN** a caller changes its shipped quantity
- **THEN** the change is accepted, and no operation exists to alter the other fields

### Requirement: Line item and purchase order persistence

Recovered from: SUPPLIER-ENTITY-0001

The system SHALL persist each order line item with category id, product id, item id, line number, quantity, unit price and quantity shipped, and SHALL persist a purchase order keyed by order id with user id, email id, order date, locale, total value, one contact info, one credit card and one or more line items.

#### Scenario: Line item and purchase order persistence

- **GIVEN** a purchase order with two lines
- **WHEN** it is stored
- **THEN** the order and both lines are retrievable with all listed fields

### Requirement: Purchase order creation builds related records

Recovered from: SUPPLIER-REQ-0001

The system SHALL, when a purchase order is created, also create a copy of its shipping contact info, its credit card and one line item per order line with shipped quantity 0, and SHALL fail the creation if a required lookup fails.

#### Scenario: Purchase order creation builds related records

- **GIVEN** an order with three lines
- **WHEN** the purchase order is created
- **THEN** three lines with shipped quantity 0, a contact and a card are attached

### Requirement: Line copy semantics

Recovered from: SUPPLIER-RULE-0001

The system SHALL, when a line item is created by copying another with an integer argument, set its quantity shipped to that argument and its quantity ordered to the source line's quantity; line values SHALL NOT be validated on creation.

#### Scenario: Line copy semantics

- **GIVEN** a source line ordering 8 and the integer 3
- **WHEN** the copy is created
- **THEN** ordered is 8 and shipped is 3

### Requirement: Line item shipped quantity update

Recovered from: SUPPLIER-REQ-0002

The system SHALL allow the shipped quantity of a line item to be updated after creation and SHALL expose the other fields read-only.

#### Scenario: Line item shipped quantity update

- **GIVEN** an existing line item
- **WHEN** shipped quantity is updated
- **THEN** it changes and other fields stay read-only

### Requirement: Line item data snapshot

Recovered from: SUPPLIER-REQ-0003

The system SHALL return a line item snapshot containing category, product, item, line number, quantity and unit price.

#### Scenario: Line item data snapshot

- **GIVEN** an existing line item
- **WHEN** a snapshot is requested
- **THEN** the six fields are returned

### Requirement: Line item access and transactions

Recovered from: SUPPLIER-REQ-0004

The system SHALL run all line item create, read and shipped-quantity update operations inside a transaction, and SHALL allow any caller to invoke them without a role check.

#### Scenario: Line item access and transactions

- **GIVEN** an unauthenticated-role caller
- **WHEN** it reads a line item
- **THEN** the operation succeeds within a transaction

### Requirement: Invoice accumulates shipped quantity

Recovered from: SUPPLIER-BR-0001

The system SHALL, on receiving a supplier invoice, add the shipped quantity for each invoiced item to that item's shipped quantity, and SHALL report the order as completely fulfilled only when every line's ordered quantity equals its shipped quantity.

#### Scenario: Invoice accumulates shipped quantity

- **GIVEN** a line ordering 4 with 1 shipped and an invoice for 3
- **WHEN** the invoice is processed
- **THEN** shipped becomes 4 and, if all lines match, the order is reported fully fulfilled

### Requirement: Purchase order cascade delete

Recovered from: SUPPLIER-REQ-0002

The system SHALL delete a purchase order's contact info, address, credit card and line items when the order is deleted.

#### Scenario: Purchase order cascade delete

- **GIVEN** a purchase order with dependents
- **WHEN** it is deleted
- **THEN** the dependents are deleted too

### Requirement: Purchase order document shape

Recovered from: SUPPLIER-REQ-0003

The system SHALL exchange purchase orders as XML documents with order id, user id, email, date, shipping info, billing info, total price, credit card and at least one line item, with locale defaulting to en_US.

#### Scenario: Purchase order document shape

- **GIVEN** a document lacking a locale
- **WHEN** it is read
- **THEN** the locale is en_US

### Requirement: Stored order returns contact as billing and shipping

Recovered from: SUPPLIER-BR-0002

The system SHALL return the stored contact info as both billing and shipping info when a stored purchase order is read back.

#### Scenario: Stored order returns contact as billing and shipping

- **GIVEN** a stored purchase order
- **WHEN** it is read back
- **THEN** billing and shipping info are the same stored contact

### Requirement: Purchase order access and transactions

Recovered from: SUPPLIER-REQ-0004

The system SHALL allow all callers to invoke purchase order, contact info, address, credit card and line item operations without role restriction, and SHALL run every method in a transaction.

#### Scenario: Purchase order access and transactions

- **GIVEN** any caller
- **WHEN** it invokes a purchase order operation
- **THEN** the operation runs in a transaction without a role check

### Requirement: Supplier purchase order record

Recovered from: SUPPLIER-FULFILMENT-ENTITY-0001

The system SHALL keep a supplier purchase order record with an id (primary key), date, status, a one-to-one shipping contact and a collection of line items.

#### Scenario: Supplier purchase order record

- **GIVEN** a supplier purchase order
- **WHEN** it is stored
- **THEN** id, date, status, contact and lines are retained

### Requirement: Purchase order creation atomicity

Recovered from: SUPPLIER-FULFILMENT-BUSINESS-RULE-0002

The system SHALL create the contact, credit card and one line item per order line (shipped quantity 0) within the creation of the order, and SHALL fail creation if a collaborating service lookup fails.

#### Scenario: Purchase order creation atomicity

- **GIVEN** a collaborating lookup that fails
- **WHEN** the order is created
- **THEN** creation fails

### Requirement: Invoice shipped quantity by item id

Recovered from: SUPPLIER-FULFILMENT-BUSINESS-RULE-0003

The system SHALL add the shipped quantity reported for each item id to that line's shipped quantity and report complete fulfilment only if every line's ordered quantity equals shipped.

#### Scenario: Invoice shipped quantity by item id

- **GIVEN** an invoice for an item id on the order
- **WHEN** it is processed
- **THEN** that line's shipped quantity increases

### Requirement: Purchase order lookup

Recovered from: SUPPLIER-FULFILMENT-REQUIREMENT-0004

The system SHALL allow purchase orders to be found by order id and by an inclusive order-date range given as epoch milliseconds.

#### Scenario: Purchase order lookup

- **GIVEN** orders dated within and outside a range
- **WHEN** a range search runs
- **THEN** orders on both bounds are included

### Requirement: Purchase order XML validation

Recovered from: SUPPLIER-FULFILMENT-REQUIREMENT-0005

The system SHALL exchange a purchase order as an XML document validated against the PurchaseOrder 1.1 DTD, with order date formatted yyyy-MM-dd.

#### Scenario: Purchase order XML validation

- **GIVEN** a document violating the DTD
- **WHEN** it is read
- **THEN** it is rejected

### Requirement: Purchase order date fallback

Recovered from: SUPPLIER-FULFILMENT-BUSINESS-RULE-0006

The system SHALL use the current date as the order date when an incoming purchase order document's date is missing or unparseable, and continue.

#### Scenario: Purchase order date fallback

- **GIVEN** a document with a bad date
- **WHEN** it is read
- **THEN** today's date is used

### Requirement: Stored contact presented as both infos

Recovered from: SUPPLIER-FULFILMENT-BUSINESS-RULE-0007

The system SHALL present the stored contact record as both billing and shipping info when a stored purchase order is read back.

#### Scenario: Stored contact presented as both infos

- **GIVEN** a stored order
- **WHEN** it is read
- **THEN** both infos equal the stored contact

### Requirement: Supplier order starts PENDING

Recovered from: SUPPLIER-FULFILMENT-BR-0001

The system SHALL copy the order id and order date from the supplied order and set the status to PENDING when a supplier purchase order is created.

#### Scenario: Supplier order starts PENDING

- **GIVEN** a supplied order
- **WHEN** a supplier order is created
- **THEN** status is PENDING

### Requirement: Supplier order creation builds contact and lines

Recovered from: SUPPLIER-FULFILMENT-BR-0002

The system SHALL create a shipping contact and one stored line per order line, each with quantity shipped 0, and SHALL fail creation if a required lookup fails.

#### Scenario: Supplier order creation builds contact and lines

- **GIVEN** an order with two lines
- **WHEN** a supplier order is created
- **THEN** a contact and two lines with shipped 0 exist

### Requirement: Supplier order statuses

Recovered from: SUPPLIER-FULFILMENT-WF-0001

The system SHALL recognise the statuses PENDING, APPROVED, DENIED and COMPLETED, with lifecycle PENDING to APPROVED to COMPLETED, or PENDING to DENIED.

#### Scenario: Supplier order statuses

- **GIVEN** a PENDING order
- **WHEN** it is approved then completed
- **THEN** the statuses follow the lifecycle

### Requirement: Supplier order lookup

Recovered from: SUPPLIER-FULFILMENT-REQ-0001

The system SHALL allow finding a supplier purchase order by id and all orders having a given status, with distinct results.

#### Scenario: Supplier order lookup

- **GIVEN** several orders with one status
- **WHEN** they are searched by status
- **THEN** each appears once

### Requirement: Supplier order XML document

Recovered from: SUPPLIER-FULFILMENT-INT-0001

The system SHALL exchange a supplier purchase order as XML containing order id, order date (yyyy-MM-dd), shipping contact and one or more line items, validated against the SupplierOrder DTD on read.

#### Scenario: Supplier order XML document

- **GIVEN** a document with no line item
- **WHEN** it is read
- **THEN** it is rejected

### Requirement: Supplier order date fallback

Recovered from: SUPPLIER-FULFILMENT-BR-0003

The system SHALL use the current date as order date when an incoming supplier order document's date cannot be read.

#### Scenario: Supplier order date fallback

- **GIVEN** a document with an unreadable date
- **WHEN** it is parsed
- **THEN** today's date is used

### Requirement: Supplier order document build

Recovered from: SUPPLY-INTEGRATION-0001

The system SHALL build a supplier purchase-order document containing, in order, order id, order date (yyyy-MM-dd), shipping address (first name, last name, street, city, state, country, zip code, email, phone) and line items.

#### Scenario: Supplier order document build

- **GIVEN** an approved order
- **WHEN** the document is built
- **THEN** elements appear in that order

### Requirement: Invoice document build

Recovered from: SUPPLY-INTEGRATION-0002

The system SHALL build an invoice document containing, in order, order id, user id, order date, shipping date (yyyy-MM-dd) and line items.

#### Scenario: Invoice document build

- **GIVEN** a shipment
- **WHEN** the invoice is built
- **THEN** elements appear in that order

### Requirement: Document line item fields

Recovered from: SUPPLY-ENTITY-0003

The system SHALL represent each supplier-order and invoice line item with category id, product id, item id, line number, quantity and unit price, all mandatory.

#### Scenario: Document line item fields

- **GIVEN** a line missing its unit price
- **WHEN** the document is validated
- **THEN** it is rejected

### Requirement: Line item value ranges

Recovered from: SUPPLY-BUSINESS-RULE-0004

The system SHALL require line quantity to be a positive integer, line number a non-negative integer and unit price a decimal of at least 0 when the XSD form of a line item is validated.

#### Scenario: Line item value ranges

- **GIVEN** a line with quantity 0
- **WHEN** XSD validation runs
- **THEN** it is rejected

### Requirement: Null field refusal in builders

Recovered from: SUPPLY-BUSINESS-RULE-0005

The system SHALL refuse with an error stating the value cannot be null when a document builder is asked to set a field to null.

#### Scenario: Null field refusal in builders

- **GIVEN** a null value
- **WHEN** the element is created
- **THEN** an error is raised

### Requirement: Supplier order at least one line

Recovered from: SUPFUL-REQ-0001

The system SHALL send a supplier a purchase order document containing at least one line item along with order id, date and shipping address.

#### Scenario: Supplier order at least one line

- **GIVEN** an order with no lines
- **WHEN** the document is built
- **THEN** it does not conform

### Requirement: Unique item ids per supplier order

Recovered from: SUPFUL-RULE-0002

The system SHALL require item ids to be unique across the line items of one supplier order.

#### Scenario: Unique item ids per supplier order

- **GIVEN** two lines with the same item id
- **WHEN** the order is validated against its XSD
- **THEN** it is rejected

### Requirement: Order line unit price

Recovered from: SUPFUL-REQ-0003

The system SHALL describe each order line with category, product, item, line number, quantity and a non-negative decimal unit price.

#### Scenario: Order line unit price

- **GIVEN** a negative unit price
- **WHEN** the line is validated
- **THEN** it is rejected

### Requirement: Shipment reported as invoice

Recovered from: SUPFUL-REQ-0004

The system SHALL report shipment to the originating system as an invoice with order id, user id, order date, shipping date (yyyy-MM-dd) and at least one line item.

#### Scenario: Shipment reported as invoice

- **GIVEN** a shipment
- **WHEN** it is reported
- **THEN** an invoice with at least one line is sent

### Requirement: Outgoing mail document shape

Recovered from: CUSTNOT-REQ-0001

The system SHALL represent an outgoing mail as an address, a subject and content.

#### Scenario: Outgoing mail document shape

- **GIVEN** a mail
- **WHEN** it is built
- **THEN** it has address, subject and content

### Requirement: Supplier order document order

Recovered from: SUPF-INT-0001

The system SHALL send a supplier order document with order id, date, shipping address and one or more line items, in that order.

#### Scenario: Supplier order document order

- **GIVEN** a supplier order
- **WHEN** it is sent
- **THEN** elements are in that order

### Requirement: Supplier invoice document

Recovered from: SUPF-INT-0002

The system SHALL send a supplier invoice containing order id, user id, order date and shipping date (yyyy-MM-dd) and one or more line items.

#### Scenario: Supplier invoice document

- **GIVEN** a shipment
- **WHEN** it is invoiced
- **THEN** the invoice has those elements

### Requirement: Line item mandatory fields in documents

Recovered from: SUPF-RULE-0001

The system SHALL require each line in supplier orders and invoices to carry category id, product id, item id, line number (non-negative integer), quantity (positive integer) and unit price (decimal not below zero).

#### Scenario: Line item mandatory fields in documents

- **GIVEN** a line with negative line number
- **WHEN** it is validated
- **THEN** it is rejected

### Requirement: Mail message document

Recovered from: CUSN-INT-0001

The system SHALL represent an outgoing mail message as a document with an address, subject and content.

#### Scenario: Mail message document

- **GIVEN** a mail message
- **WHEN** it is serialised
- **THEN** it has the three parts

### Requirement: XML validation configuration

Recovered from: SUPP-REQ-0001

The system SHALL validate incoming supplier order XML for well-formedness and SHALL NOT validate supplier order or invoice XML against XSD schemas.

#### Scenario: XML validation configuration

- **GIVEN** a well-formed order violating the XSD
- **WHEN** it is received
- **THEN** it is accepted

### Requirement: Catalog check reports items without supplier inventory

Recovered from: BATCH-REQ-0004

The system SHALL report, in the catalog integrity check, every item that has no supplier inventory row.

#### Scenario: Catalog check reports items without supplier inventory

- **GIVEN** an item without an inventory row
- **WHEN** the check runs
- **THEN** the item is reported

### Requirement: Supplier order storage constraints

Recovered from: SUPPLIER-ENT-0001

The system SHALL store each supplier order with date, status restricted to PENDING or COMPLETED and contact information, and lines keyed by order and line number with a quantity shipped.

#### Scenario: Supplier order storage constraints

- **GIVEN** a supplier order with status APPROVED
- **WHEN** it is stored
- **THEN** the database rejects it

### Requirement: Inventory quantity non-negative

Recovered from: SUPPLIER-RULE-0002

The system SHALL keep one inventory quantity per item and SHALL NOT allow it to be negative.

#### Scenario: Inventory quantity non-negative

- **GIVEN** a quantity of -1
- **WHEN** it is stored
- **THEN** it is rejected

### Requirement: Named identifier counters

Recovered from: WORKFLOW-ENT-0001

The system SHALL keep named integer counters, one row per name, used to generate order and purchase order identifiers.

#### Scenario: Named identifier counters

- **GIVEN** a counter named for orders
- **WHEN** an identifier is generated
- **THEN** the counter row is used

### Requirement: Shipped not above ordered

Recovered from: SUPPLIER-RULE-0001

The system SHALL NOT allow the quantity shipped on a purchase order line to exceed the quantity ordered.

#### Scenario: Shipped not above ordered

- **GIVEN** a line ordering 2
- **WHEN** shipped is set to 3
- **THEN** it is rejected

### Requirement: Order lookup indexes

Recovered from: BATCH-REQ-0001

The system SHALL index purchase orders by user and by date and order managers by status to support batch jobs and lookups.

#### Scenario: Order lookup indexes

- **GIVEN** orders by user
- **WHEN** they are searched
- **THEN** an indexed lookup is used

### Requirement: Mandatory stock quantity

Recovered from: INV-ENT-0001

The system SHALL record a mandatory integer stock quantity per item id, one row per item.

#### Scenario: Mandatory stock quantity

- **GIVEN** an item
- **WHEN** a row without quantity is inserted
- **THEN** it is rejected

### Requirement: Purchase order line table

Recovered from: SUPPLIER-FULFILMENT-ENT-0001

The system SHALL store each purchase order line by purchase order id and line number with mandatory category, product, item, ordered quantity, unit price and quantity shipped, and SHALL reject a line whose purchase order does not exist.

#### Scenario: Purchase order line table

- **GIVEN** a line for a missing order
- **WHEN** it is stored
- **THEN** it is rejected

### Requirement: Order retrieval by user and date

Recovered from: SUPPLIER-FULFILMENT-REQ-0001

The system SHALL support retrieval of supplier purchase orders by ordering user and by order date through indexed lookups.

#### Scenario: Order retrieval by user and date

- **GIVEN** orders
- **WHEN** retrieved by user or date
- **THEN** indexed lookups are used

### Requirement: Order retrieval by status

Recovered from: ORDER-PROCESSING-WORKFLOW-REQ-0001

The system SHALL support retrieval of orders by status through an indexed lookup on the process manager's order status.

#### Scenario: Order retrieval by status

- **GIVEN** orders with various statuses
- **WHEN** retrieved by status
- **THEN** an indexed lookup is used

### Requirement: Supplier order references contact

Recovered from: SUPL-ENT-0001

The system SHALL record each supplier order with a unique id, date and status, and SHALL require it to reference an existing contact record.

#### Scenario: Supplier order references contact

- **GIVEN** an order with unknown contact
- **WHEN** it is stored
- **THEN** it is rejected

### Requirement: Supplier order lines require parent

Recovered from: SUPL-ENT-0002

The system SHALL record supplier order lines keyed by order id and line number and SHALL require the parent supplier order to exist.

#### Scenario: Supplier order lines require parent

- **GIVEN** a line with no parent order
- **WHEN** it is stored
- **THEN** it is rejected

### Requirement: Order manager status index

Recovered from: OPW-REQ-0001

The system SHALL support lookup of order manager records by status via an index.

#### Scenario: Order manager status index

- **GIVEN** order manager records
- **WHEN** looked up by status
- **THEN** an index is used
