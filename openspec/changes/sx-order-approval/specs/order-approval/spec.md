## ADDED Requirements

### Requirement: Automatic approval of small orders (opc)

Recovered from: ORDAPP-RULE-0001

The system SHALL automatically approve a newly received purchase order when its locale is US and its total price is below 500, or its locale is Japan and its total price is below 50000.

#### Scenario: Primary case

- **GIVEN** a US-locale order with total 499
- **WHEN** it is received
- **THEN** it is approved without administrator action

#### Scenario: Alternate case

- **GIVEN** a Japan-locale order with total 50000
- **WHEN** it is received
- **THEN** it is not auto-approved and stays pending

### Requirement: Automatic approval thresholds (opc, second pass)

Recovered from: ORDAPP-BR-0001

The system SHALL auto-approve a received purchase order whose total is under the per-locale limit (US 500, Japan 50000).

#### Scenario: Primary case

- **GIVEN** a Japan-locale order with total 49999
- **WHEN** it is received
- **THEN** it is approved automatically

#### Scenario: Alternate case

- **GIVEN** a US-locale order with total 500
- **WHEN** it is received
- **THEN** it is left pending

### Requirement: Per-locale approval limit in configuration

Recovered from: APPR-REQ-0001

The system SHALL automatically approve an order whose total is within the per-locale limit, 500 for en_US and 50000 for ja_JP.

#### Scenario: Primary case

- **GIVEN** an en_US order with total 500
- **WHEN** it is received
- **THEN** the limit rule is applied for en_US

#### Scenario: Alternate case

- **GIVEN** a ja_JP order above 50000
- **WHEN** it is received
- **THEN** it requires manual approval

### Requirement: Auto-approval limit inclusive wording

Recovered from: ORDA-BR-0001

The system SHALL auto-approve an order without manual review when its total does not exceed 500 for en_US orders or 50000 for ja_JP orders.

#### Scenario: Primary case

- **GIVEN** an en_US order with total exactly 500
- **WHEN** it is received
- **THEN** the inclusive-or-exclusive boundary is decided by the reviewer (legacy sources disagree)

#### Scenario: Alternate case

- **GIVEN** a ja_JP order with total 60000
- **WHEN** it is received
- **THEN** it is not auto-approved

### Requirement: Other locales stay pending (opc)

Recovered from: ORDAPP-RULE-0002

GIVEN an order whose locale is neither US nor Japan (including Chinese locale), WHEN the order is received, THEN the system SHALL leave it pending for manual approval or denial by an administrator regardless of total.

#### Scenario: Primary case

- **GIVEN** a Chinese-locale order with a total of 10
- **WHEN** it is received
- **THEN** it remains pending for an administrator

#### Scenario: Alternate case

- **GIVEN** a Chinese-locale order with a total of 1000000
- **WHEN** it is received
- **THEN** it remains pending for an administrator

### Requirement: Non-US/Japan orders are never auto-approved

Recovered from: ORDAPP-BR-0002

GIVEN a purchase order whose locale is neither US nor Japan, WHEN it is received, THEN the system SHALL NOT auto-approve it and SHALL leave it PENDING for manual approval in the admin client.

#### Scenario: Primary case

- **GIVEN** an order of a third locale
- **WHEN** it is received
- **THEN** its status is PENDING

#### Scenario: Alternate case

- **GIVEN** the order is later opened in the admin client
- **WHEN** pending orders are listed
- **THEN** it appears among the pending orders

### Requirement: Reject invalid approval documents

Recovered from: ORDAPP-RULE-0002

GIVEN an incoming order approval document, WHEN it does not validate against its schema or its root is not OrderApproval, THEN the system SHALL reject it with a document error rather than process it.

#### Scenario: Primary case

- **GIVEN** an approval document with a root element other than OrderApproval
- **WHEN** it is read
- **THEN** a document error is raised

#### Scenario: Alternate case

- **GIVEN** an approval document violating the schema
- **WHEN** it is read with validation enabled
- **THEN** a document error is raised and nothing is processed

### Requirement: Approval documents validated by default

Recovered from: ORDP-INT-0002

The system SHALL validate incoming OrderApproval documents against the Order Approval 1.0 DTD by default and SHALL fail with an error when the root element is not OrderApproval.

#### Scenario: Primary case

- **GIVEN** an approval document read through the default entry point
- **WHEN** it is parsed
- **THEN** it is validated against the Order Approval 1.0 DTD

#### Scenario: Alternate case

- **GIVEN** a document whose root is not OrderApproval
- **WHEN** it is parsed
- **THEN** an error is raised

### Requirement: Approval document structure enforced

Recovered from: ORDAPP-BUSINESS-RULE-0002

GIVEN an incoming OrderApproval document WHEN it is read with validation enabled THEN the system SHALL reject it unless it conforms to the OrderApproval structure and has an OrderApproval root element.

#### Scenario: Primary case

- **GIVEN** a conforming OrderApproval document
- **WHEN** it is read with validation enabled
- **THEN** it is accepted

#### Scenario: Alternate case

- **GIVEN** a non-conforming document
- **WHEN** it is read with validation enabled
- **THEN** it is rejected

### Requirement: Approval result document shape

Recovered from: ORDAPP-REQ-0001

The system SHALL exchange order approval results as a document containing one or more orders, each carrying exactly an order id followed by an order status.

#### Scenario: Primary case

- **GIVEN** an approval result for two orders
- **WHEN** the document is produced
- **THEN** it contains two order entries each with an order id followed by a status

#### Scenario: Alternate case

- **GIVEN** a document with an order lacking a status
- **WHEN** it is validated
- **THEN** it is rejected

### Requirement: Approval results exchanged as OrderApproval document

Recovered from: ORDAPP-WORKFLOW-0001

The system SHALL exchange order-approval results as an OrderApproval document containing one or more Order entries, each carrying an OrderId and an OrderStatus.

#### Scenario: Primary case

- **GIVEN** approval decisions for orders 1001 and 1002
- **WHEN** they are sent between systems
- **THEN** one OrderApproval document carries both entries with id and status

#### Scenario: Alternate case

- **GIVEN** a document with no Order entry
- **WHEN** it is validated
- **THEN** it is rejected

### Requirement: Administrator lists orders by status

Recovered from: ORDAPP-REQ-0001

The system SHALL let an administrator list orders by status, showing order id, user id, order date (month/day/year), value and status.

#### Scenario: Primary case

- **GIVEN** orders in several statuses
- **WHEN** the administrator requests status PENDING
- **THEN** only pending orders are listed with id, user id, month/day/year date, value and status

#### Scenario: Alternate case

- **GIVEN** no orders in the requested status
- **WHEN** the list is requested
- **THEN** an empty list is returned

### Requirement: Order listing for approval and viewing

Recovered from: ORDAPP-REQ-0002

The system SHALL list orders for a requested status (pending orders for approval; approved, completed and denied orders for viewing), showing order id, user id, date, amount and status.

#### Scenario: Primary case

- **GIVEN** orders in each status
- **WHEN** the administrator selects Approved
- **THEN** approved orders are listed for viewing only

#### Scenario: Alternate case

- **GIVEN** orders are pending
- **WHEN** the administrator selects Pending
- **THEN** they are listed for approval

### Requirement: Order listing with total count

Recovered from: ORDA-REQ-0001

The system SHALL list orders filtered by a requested status (PENDING, APPROVED or DENIED) and return, for each order, its id, user id, date, amount and status, together with a total count.

#### Scenario: Primary case

- **GIVEN** 3 denied orders
- **WHEN** DENIED is requested
- **THEN** 3 rows and a total count of 3 are returned

#### Scenario: Alternate case

- **GIVEN** no matching orders
- **WHEN** a status is requested
- **THEN** zero rows and a count of 0

### Requirement: Order listing and revenue aggregation

Recovered from: ORDAPP-REQ-0003

The system SHALL let the admin client list orders by status and SHALL aggregate order line items over a date range into per-category revenue or quantity, or per-item when a category is given.

#### Scenario: Primary case

- **GIVEN** orders within a date range
- **WHEN** revenue by category is requested
- **THEN** per-category revenue or quantity is returned

#### Scenario: Alternate case

- **GIVEN** a category is given
- **WHEN** the aggregate is requested
- **THEN** per-item figures within that category are returned

### Requirement: Approve or deny pending orders with commit

Recovered from: ORDAPP-WF-0001

The system SHALL let an administrator mark selected pending orders as Approved or Denied in the client and apply the changes only when Commit is pressed; Commit SHALL send approved and denied orders as status updates and then reload order data.

#### Scenario: Primary case

- **GIVEN** two orders marked Approved and Denied
- **WHEN** the administrator has not pressed Commit
- **THEN** no status update is sent

#### Scenario: Alternate case

- **GIVEN** the choices are pending
- **WHEN** Commit is pressed
- **THEN** approved and denied orders are sent as status updates and the order data is reloaded

### Requirement: Bulk status change committed explicitly

Recovered from: ORDA-REQ-0002

The system SHALL let an administrator set the status of selected pending orders to APPROVED or DENIED, individually or in bulk, and SHALL apply the changes only when the administrator commits them.

#### Scenario: Primary case

- **GIVEN** several pending orders selected
- **WHEN** the administrator marks them APPROVED in bulk
- **THEN** the marking is held locally until commit

#### Scenario: Alternate case

- **GIVEN** a marked order
- **WHEN** commit is performed
- **THEN** its status becomes APPROVED

### Requirement: Confirm refresh with uncommitted changes

Recovered from: ORDAPP-REQ-0004

GIVEN the administrator has unsaved Approve/Deny choices WHEN they press Refresh THEN the system SHALL ask for confirmation ("Data is not committed. Are you sure you want to refresh?") and reload only if confirmed.

#### Scenario: Primary case

- **GIVEN** unsaved Approve/Deny choices
- **WHEN** Refresh is pressed and the user declines
- **THEN** the data is not reloaded

#### Scenario: Alternate case

- **GIVEN** unsaved choices
- **WHEN** Refresh is pressed and the user confirms
- **THEN** the data is reloaded

### Requirement: Status colouring and editable column

Recovered from: ORDAPP-REQ-0005

The system SHALL show order status in colour in the approve table (Approved green, Denied red, Pending yellow) and allow only the status column to be edited, choosing among Pending, Approved and Denied.

#### Scenario: Primary case

- **GIVEN** an approve table with orders of each status
- **WHEN** it is displayed
- **THEN** Approved is green, Denied red and Pending yellow

#### Scenario: Alternate case

- **GIVEN** the table is displayed
- **WHEN** the administrator edits a cell other than status
- **THEN** the edit is not allowed

### Requirement: Fatal error dialog on server failure

Recovered from: ORDAPP-REQ-0006

GIVEN a server error while loading or updating orders WHEN the client receives it THEN the system SHALL show a "Fatal Error!" dialog with the message and disable order actions during server calls.

#### Scenario: Primary case

- **GIVEN** the server returns an error while loading orders
- **WHEN** the client receives it
- **THEN** a "Fatal Error!" dialog shows the message

#### Scenario: Alternate case

- **GIVEN** a server call is in progress
- **WHEN** the call is running
- **THEN** order actions are disabled

### Requirement: Admin client XML-over-HTTP service

Recovered from: ORDAPP-INT-0001

The system SHALL expose an XML-over-HTTP service for the admin client supporting request types GETORDERS, UPDATESTATUS, REVENUE and ORDERS, and SHALL answer any other type with an "Unknown request type" error.

#### Scenario: Primary case

- **GIVEN** a request of type GETORDERS
- **WHEN** it is received
- **THEN** the matching orders are returned

#### Scenario: Alternate case

- **GIVEN** a request of type FOO
- **WHEN** it is received
- **THEN** an "Unknown request type" error is returned

### Requirement: Unknown rich-client request refused

Recovered from: ORDA-REQ-0004

GIVEN a rich-client request of unrecognised type WHEN it is processed THEN the system SHALL return an error naming the unknown type.

#### Scenario: Primary case

- **GIVEN** a request of unrecognised type
- **WHEN** it is processed
- **THEN** an error naming that type is returned

#### Scenario: Alternate case

- **GIVEN** a recognised type
- **WHEN** it is processed
- **THEN** no unknown-type error is returned

### Requirement: Launch file for manage-orders action

Recovered from: ORDAPP-REQ-0001

The system SHALL, on the "manageorders" action, return a Java Web Start launch file that starts the admin client against the current host, port and the user's session id.

#### Scenario: Primary case

- **GIVEN** a signed-in administrator
- **WHEN** the manageorders action is invoked
- **THEN** a launch file carrying host, port and session id is returned

#### Scenario: Alternate case

- **GIVEN** a different session
- **WHEN** the action is invoked
- **THEN** the session id in the file is that session's

### Requirement: Launch rich admin client

Recovered from: ORDA-WF-0001

The system SHALL let an administrator launch the rich admin client from the admin page by issuing a launch descriptor carrying the server host, port and current session id to the client.

#### Scenario: Primary case

- **GIVEN** an administrator on the admin page
- **WHEN** the launch is requested
- **THEN** a descriptor with host, port and session id is issued

#### Scenario: Alternate case

- **GIVEN** the client starts
- **WHEN** it connects
- **THEN** it acts as the signed-in administrator

### Requirement: Admin start page

Recovered from: ORDAPP-SCR-0001

The admin start page SHALL offer two actions: launch the rich admin client and log out.

#### Scenario: Primary case

- **GIVEN** an administrator on the admin start page
- **WHEN** the page is displayed
- **THEN** a launch-admin-client action and a log-out action are offered

#### Scenario: Alternate case

- **GIVEN** the log-out action is chosen
- **WHEN** it is activated
- **THEN** the administrator is logged out

### Requirement: Order status view

Recovered from: APPROVAL-ENT-0001

The system SHALL expose a read-only order status view with one row per order that has a process-manager state, showing order id, user, date, value and status.

#### Scenario: Primary case

- **GIVEN** orders with and without process-manager state
- **WHEN** the view is queried
- **THEN** one row per order with a state is returned with id, user, date, value and status

#### Scenario: Alternate case

- **GIVEN** an order with no process-manager state
- **WHEN** the view is queried
- **THEN** it has no row

### Requirement: Email locale follows the order

Recovered from: LOCAL-BR-0001

The system SHALL render order-status and completed-order emails in the locale stored on the order (English, Japanese, Chinese), where a stored locale of "default" means the server default locale and a locale string without an underscore yields no locale.

#### Scenario: Primary case

- **GIVEN** an order stored with a Japanese locale
- **WHEN** its status email is rendered
- **THEN** the Japanese stylesheet is used

#### Scenario: Alternate case

- **GIVEN** a stored locale of "default"
- **WHEN** the email is rendered
- **THEN** the server default locale is used

### Requirement: Notification email parts

Recovered from: CUSTNOT-REQ-0001

The system SHALL represent an outgoing mail as an address, a subject and content.

#### Scenario: Primary case

- **GIVEN** a notification email
- **WHEN** it is built
- **THEN** it has a recipient, a subject and a body

#### Scenario: Alternate case

- **GIVEN** an email lacking a subject
- **WHEN** it is built
- **THEN** the missing part is detectable

### Requirement: Outgoing mail document

Recovered from: CUSN-INT-0001

The system SHALL represent an outgoing mail message as a document with an address, a subject and content.

#### Scenario: Primary case

- **GIVEN** an outgoing mail message
- **WHEN** it is serialised
- **THEN** the document has address, subject and content

#### Scenario: Alternate case

- **GIVEN** a document missing content
- **WHEN** it is validated
- **THEN** it is rejected

### Requirement: Batch SQL step fails on ERROR

Recovered from: BATC-REQ-0002

The system SHALL fail a batch SQL step when the database tool reports any line beginning with ERROR.

#### Scenario: Primary case

- **GIVEN** a SQL step whose output has a line starting with ERROR
- **WHEN** the step finishes
- **THEN** the step is marked failed

#### Scenario: Alternate case

- **GIVEN** output with no such line
- **WHEN** the step finishes
- **THEN** the step succeeds
