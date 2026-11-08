## ADDED Requirements

### Requirement: List as MISMATCH every order for which the supplier

Recovered from: BATCH-REQ-0007

The system SHALL list as MISMATCH every order for which the supplier order status is COMPLETED but the order manager status is not COMPLETED, and SHALL also report the count of orders per workflow status.

#### Scenario: BATCH-REQ-0007 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL list as MISMATCH every order for which the supplier order status is COMPLETED but the order manager status is not COMPLETED, and SHALL also report the count of orders per workflow status

### Requirement: Serialise each placed purchase order to XML and hand

Recovered from: CHK-INT-0003

The system SHALL serialise each placed purchase order to XML and hand it to the asynchronous sender for delivery to the order-processing module, and SHALL then empty the shopping cart and return the order id and bill-to e-mail to the customer.

#### Scenario: CHK-INT-0003 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL serialise each placed purchase order to XML and hand it to the asynchronous sender for delivery to the order-processing module, and SHALL then empty the shopping cart and return the order id and bill-to e-mail to the customer

### Requirement: Keep named integer counters, one per unique name, each

Recovered from: CTR-ENT-0001

The system SHALL keep named integer counters, one per unique name, each with a mandatory value.

#### Scenario: CTR-ENT-0001 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL keep named integer counters, one per unique name, each with a mandatory value

### Requirement: GIVEN a lookup fails for any reason (name not

Recovered from: OPW-BR-0004

GIVEN a lookup fails for any reason (name not found, wrong type, or any other error), WHEN the caller requests the resource, THEN the lookup service SHALL raise a single lookup-failure error wrapping the original cause.

#### Scenario: OPW-BR-0004 behaviour

- **GIVEN** a lookup fails for any reason (name not found, wrong type, or any other error)
- **WHEN** the caller requests the resource
- **THEN** the lookup service SHALL raise a single lookup-failure error wrapping the original cause.

### Requirement: Recognise the order statuses PENDING, APPROVED, DENIED, SHIPPED_PART and

Recovered from: OPW-BR-0005

The system SHALL recognise the order statuses PENDING, APPROVED, DENIED, SHIPPED_PART and COMPLETED, where an order moves from PENDING to APPROVED then SHIPPED_PART then COMPLETED, or from PENDING to DENIED.

#### Scenario: OPW-BR-0005 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL recognise the order statuses PENDING, APPROVED, DENIED, SHIPPED_PART and COMPLETED, where an order moves from PENDING to APPROVED then SHIPPED_PART then COMPLETED, or from PENDING to DENIED

### Requirement: Keep one process-manager record per order, identified by the

Recovered from: OPW-ENT-0001

The system SHALL keep one process-manager record per order, identified by the order id, holding the order's current workflow status as a string.

#### Scenario: OPW-ENT-0001 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL keep one process-manager record per order, identified by the order id, holding the order's current workflow status as a string

### Requirement: Resolve named platform resources (local and remote component homes

Recovered from: OPW-REQ-0001

The system SHALL resolve named platform resources (local and remote component homes, message queues and topics with their connection factories, data sources, and URL, boolean and string configuration entries) through a single lookup service instead of each caller performing its own naming lookup.

#### Scenario: OPW-REQ-0001 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL resolve named platform resources (local and remote component homes, message queues and topics with their connection factories, data sources, and URL, boolean and string configuration entries) through a single lookup service instead of each caller performing its own naming lookup

### Requirement: Be a single shared instance and SHALL cache every

Recovered from: OPW-REQ-0002

The web-tier lookup service SHALL be a single shared instance and SHALL cache every component home, connection factory, queue, topic and data source after its first successful lookup, returning the cached object on later requests for the same name.

#### Scenario: OPW-REQ-0002 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the web-tier lookup service SHALL be a single shared instance and SHALL cache every component home, connection factory, queue, topic and data source after its first successful lookup, returning the cached object on later requests for the same name

### Requirement: Cache results and SHALL perform a fresh naming lookup

Recovered from: OPW-REQ-0003

The EJB-tier lookup service SHALL NOT cache results and SHALL perform a fresh naming lookup on every request; it is instantiated per caller rather than shared.

#### Scenario: OPW-REQ-0003 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the EJB-tier lookup service SHALL NOT cache results and SHALL perform a fresh naming lookup on every request; it is instantiated per caller rather than shared

### Requirement: Return, on request by the admin client, all orders

Recovered from: OPW-REQ-0004

The system SHALL return, on request by the admin client, all orders whose status equals a given status, without duplicates.

#### Scenario: OPW-REQ-0004 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL return, on request by the admin client, all orders whose status equals a given status, without duplicates

### Requirement: Execute a workflow transition by instantiating a transition delegate

Recovered from: OPW-REQ-0006

The system SHALL execute a workflow transition by instantiating a transition delegate by configured class name, passing it a single XML message and/or a batch of XML messages, and SHALL wrap any instantiation failure in a transition error.

#### Scenario: OPW-REQ-0006 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL execute a workflow transition by instantiating a transition delegate by configured class name, passing it a single XML message and/or a batch of XML messages, and SHALL wrap any instantiation failure in a transition error

### Requirement: Apply an approval or denial status change to an

Recovered from: OPW-RULE-0001

The system SHALL apply an approval or denial status change to an order only when the order's current status is PENDING; changes for orders in any other status SHALL be silently skipped and excluded from notifications.

#### Scenario: OPW-RULE-0001 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL apply an approval or denial status change to an order only when the order's current status is PENDING; changes for orders in any other status SHALL be silently skipped and excluded from notifications

### Requirement: SHALL, on receiving a purchase order message, persist the

Recovered from: OPW-WORKFLOW-0001

The system SHALL, on receiving a purchase order message, persist the purchase order, register the order with the process manager in PENDING status, and, only if auto-approvable, send an approval message to the order-approval queue.

#### Scenario: OPW-WORKFLOW-0001 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** on receiving a purchase order message
- **THEN** the system persist the purchase order, register the order with the process manager in PENDING status, and, only if auto-approvable, send an approval message to the order-approval queue

### Requirement: SHALL, on receiving a supplier invoice, mark the order

Recovered from: OPW-WORKFLOW-0003

The system SHALL, on receiving a supplier invoice, mark the order COMPLETED when all its line items are invoiced and send the order id to the completed-order mail queue; otherwise it SHALL mark the order SHIPPED_PART and send nothing further.

#### Scenario: OPW-WORKFLOW-0003 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** on receiving a supplier invoice
- **THEN** the system mark the order COMPLETED when all its line items are invoiced and send the order id to the completed-order mail queue; otherwise it SHALL mark the order SHIPPED_PART and send nothing further

### Requirement: Route web requests ending in .do to the main

Recovered from: ORD-REQ-0001

The system SHALL route web requests ending in .do to the main controller, which maps the request name to an action, raises an event for the business tier through the web controller, then forwards to the next screen; and SHALL route .screen requests to the template servlet for rendering.

#### Scenario: ORD-REQ-0001 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL route web requests ending in .do to the main controller, which maps the request name to an action, raises an event for the business tier through the web controller, then forwards to the next screen; and SHALL route .screen requests to the template servlet for rendering

### Requirement: Forward to the error screen mapped to that exception

Recovered from: ORD-REQ-0002

GIVEN a request raises an unhandled exception WHEN the main controller catches it THEN the system SHALL forward to the error screen mapped to that exception type, and SHALL fail with a general servlet error if none is mapped.

#### Scenario: ORD-REQ-0002 behaviour

- **GIVEN** a request raises an unhandled exception
- **WHEN** the main controller catches it
- **THEN** the system SHALL forward to the error screen mapped to that exception type, and SHALL fail with a general servlet error if none is mapped.

### Requirement: Route every browser request ending in ".do" through a

Recovered from: ORD-WF-0008

The system SHALL route every browser request ending in ".do" through a single front controller that resolves the last path segment to a configured URL mapping, runs the mapped action if any, forwards any resulting event to the session's EJB controller, and then forwards the browser to the mapped screen.

#### Scenario: ORD-WF-0008 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL route every browser request ending in ".do" through a single front controller that resolves the last path segment to a configured URL mapping, runs the mapped action if any, forwards any resulting event to the session's EJB controller, and then forwards the browser to the mapped screen

### Requirement: Hand an event raised by a web action to

Recovered from: ORD-WF-0009

The system SHALL hand an event raised by a web action to the session's controller component, which SHALL look up the handler class named in the event, create it once per controller instance and run its start, perform and end steps; an event with no handler class SHALL produce no response.

#### Scenario: ORD-WF-0009 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL hand an event raised by a web action to the session's controller component, which SHALL look up the handler class named in the event, create it once per controller instance and run its start, perform and end steps; an event with no handler class SHALL produce no response

### Requirement: SHALL, when an unhandled exception occurs while processing a

Recovered from: ORD-WF-0011

The system SHALL, when an unhandled exception occurs while processing a request, forward to the error screen mapped for the exception's class or a superclass, and SHALL otherwise fail the request with a general server error.

#### Scenario: ORD-WF-0011 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** when an unhandled exception occurs while processing a request
- **THEN** the system forward to the error screen mapped for the exception's class or a superclass, and SHALL otherwise fail the request with a general server error

### Requirement: Publish an order-approval message containing each changed order id

Recovered from: ORDA-REQ-0003

The system SHALL publish an order-approval message containing each changed order id and its new status to the asynchronous messaging channel, so that the order processing module applies the decision, and SHALL report SUCCESS to the client once the message is handed off.

#### Scenario: ORDA-REQ-0003 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL publish an order-approval message containing each changed order id and its new status to the asynchronous messaging channel, so that the order processing module applies the decision, and SHALL report SUCCESS to the client once the message is handed off

### Requirement: SHALL, on an UPDATESTATUS request, convert each order with

Recovered from: ORDAPP-REQ-0003

The system SHALL, on an UPDATESTATUS request, convert each order with an id and status into an order-approval XML document and send it asynchronously as a message; it SHALL reply SUCCESS once the message is handed off.

#### Scenario: ORDAPP-REQ-0003 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** on an UPDATESTATUS request
- **THEN** the system convert each order with an id and status into an order-approval XML document and send it asynchronously as a message; it SHALL reply SUCCESS once the message is handed off

### Requirement: Recognise the order statuses PENDING, APPROVED, DENIED, SHIPPED_PART and (ORDER-PROCESSING-WORKFLOW-BR-0001)

Recovered from: ORDER-PROCESSING-WORKFLOW-BR-0001

The system SHALL recognise the order statuses PENDING, APPROVED, DENIED, SHIPPED_PART and COMPLETED as the named workflow states of an order.

#### Scenario: ORDER-PROCESSING-WORKFLOW-BR-0001 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL recognise the order statuses PENDING, APPROVED, DENIED, SHIPPED_PART and COMPLETED as the named workflow states of an order

### Requirement: Expose the web-tier lookup facility as a single shared

Recovered from: ORDER-PROCESSING-WORKFLOW-BR-0002

The system SHALL expose the web-tier lookup facility as a single shared instance, created once when first loaded.

#### Scenario: ORDER-PROCESSING-WORKFLOW-BR-0002 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL expose the web-tier lookup facility as a single shared instance, created once when first loaded

### Requirement: Raise a lookup failure that wraps the underlying cause

Recovered from: ORDER-PROCESSING-WORKFLOW-BR-0003

GIVEN any lookup WHEN the name cannot be resolved or the resolved object is of the wrong type THEN the system SHALL raise a lookup failure that wraps the underlying cause.

#### Scenario: ORDER-PROCESSING-WORKFLOW-BR-0003 behaviour

- **GIVEN** any lookup
- **WHEN** the name cannot be resolved or the resolved object is of the wrong type
- **THEN** the system SHALL raise a lookup failure that wraps the underlying cause.

### Requirement: Expose order status as the join of purchase orders

Recovered from: ORDER-PROCESSING-WORKFLOW-BUSINESS-RULE-0001

The system SHALL expose order status as the join of purchase orders with order manager records on order id, returning order id, user id, date, value and status only for orders that have an order manager record.

#### Scenario: ORDER-PROCESSING-WORKFLOW-BUSINESS-RULE-0001 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL expose order status as the join of purchase orders with order manager records on order id, returning order id, user id, date, value and status only for orders that have an order manager record

### Requirement: Keep exactly one mandatory status value of up to

Recovered from: ORDER-PROCESSING-WORKFLOW-ENT-0001

The system SHALL keep exactly one mandatory status value of up to 20 characters per order id in the process manager's order table.

#### Scenario: ORDER-PROCESSING-WORKFLOW-ENT-0001 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL keep exactly one mandatory status value of up to 20 characters per order id in the process manager's order table

### Requirement: Keep exactly one workflow-tracking record per order, identified by

Recovered from: ORDER-PROCESSING-WORKFLOW-ENTITY-0001

The system SHALL keep exactly one workflow-tracking record per order, identified by the order id, holding the order's current workflow status as a free-form string.

#### Scenario: ORDER-PROCESSING-WORKFLOW-ENTITY-0001 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL keep exactly one workflow-tracking record per order, identified by the order id, holding the order's current workflow status as a free-form string

### Requirement: Create a tracking record with a given order id

Recovered from: ORDER-PROCESSING-WORKFLOW-REQ-0001

The system SHALL create a tracking record with a given order id and initial status when a new order is received, so that the fulfilment workflow can begin.

#### Scenario: ORDER-PROCESSING-WORKFLOW-REQ-0001 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL create a tracking record with a given order id and initial status when a new order is received, so that the fulfilment workflow can begin

### Requirement: Allow the status of an existing order to be

Recovered from: ORDER-PROCESSING-WORKFLOW-REQ-0002

The system SHALL allow the status of an existing order to be overwritten with a new status, and SHALL report a not-found error when no tracking record exists for the order id.

#### Scenario: ORDER-PROCESSING-WORKFLOW-REQ-0002 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL allow the status of an existing order to be overwritten with a new status, and SHALL report a not-found error when no tracking record exists for the order id

### Requirement: Return the current status for a given order id

Recovered from: ORDER-PROCESSING-WORKFLOW-REQ-0003

The system SHALL return the current status for a given order id, and SHALL report a not-found error when the order is not tracked.

#### Scenario: ORDER-PROCESSING-WORKFLOW-REQ-0003 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL return the current status for a given order id, and SHALL report a not-found error when the order is not tracked

### Requirement: List all orders whose status exactly equals a given

Recovered from: ORDER-PROCESSING-WORKFLOW-REQ-0004

The system SHALL list all orders whose status exactly equals a given status string, with each order appearing once.

#### Scenario: ORDER-PROCESSING-WORKFLOW-REQ-0004 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL list all orders whose status exactly equals a given status string, with each order appearing once

### Requirement: Run each workflow transition through a pluggable handler, named

Recovered from: ORDER-PROCESSING-WORKFLOW-WF-0001

The system SHALL run each workflow transition through a pluggable handler, named by class name at runtime, that is set up and then given the transition information, and SHALL raise a transition error when the handler cannot be instantiated.

#### Scenario: ORDER-PROCESSING-WORKFLOW-WF-0001 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL run each workflow transition through a pluggable handler, named by class name at runtime, that is set up and then given the transition information, and SHALL raise a transition error when the handler cannot be instantiated

### Requirement: Create a counter for that prefix starting at 0

Recovered from: ORDP-BR-0001

GIVEN no counter exists for a prefix WHEN an identifier is requested THEN the system SHALL create a counter for that prefix starting at 0, so the first identifier issued ends in 1.

#### Scenario: ORDP-BR-0001 behaviour

- **GIVEN** no counter exists for a prefix
- **WHEN** an identifier is requested
- **THEN** the system SHALL create a counter for that prefix starting at 0, so the first identifier issued ends in 1.

### Requirement: Exchange order status changes as an OrderApproval document containing

Recovered from: ORDP-INT-0001

The system SHALL exchange order status changes as an OrderApproval document containing one or more Order entries, each with an OrderId followed by an OrderStatus, and SHALL reject a document that does not have that structure.

#### Scenario: ORDP-INT-0001 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL exchange order status changes as an OrderApproval document containing one or more Order entries, each with an OrderId followed by an OrderStatus, and SHALL reject a document that does not have that structure

### Requirement: Return, for a given identifier prefix, a unique identifier

Recovered from: ORDP-REQ-0001

The system SHALL return, for a given identifier prefix, a unique identifier formed by concatenating the prefix with the next value of a per-prefix counter incremented by one.

#### Scenario: ORDP-REQ-0001 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL return, for a given identifier prefix, a unique identifier formed by concatenating the prefix with the next value of a per-prefix counter incremented by one

### Requirement: Issue each identifier within a transaction so the counter

Recovered from: ORDP-REQ-0002

The system SHALL issue each identifier within a transaction so the counter increment is committed atomically with the issuing request.

#### Scenario: ORDP-REQ-0002 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL issue each identifier within a transaction so the counter increment is committed atomically with the issuing request

### Requirement: Expose order status by joining each purchase order to

Recovered from: ORDP-RULE-0001

The system SHALL expose order status by joining each purchase order to its process-manager status record on order id, so that orders lacking a status record do not appear.

#### Scenario: ORDP-RULE-0001 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL expose order status by joining each purchase order to its process-manager status record on order id, so that orders lacking a status record do not appear

### Requirement: Raise a failure to the caller and SHALL close

Recovered from: ORDPROC-BR-0001

GIVEN the queue connection or send fails, WHEN a message is submitted, THEN the system SHALL raise a failure to the caller and SHALL close the queue connection regardless of outcome.

#### Scenario: ORDPROC-BR-0001 behaviour

- **GIVEN** the queue connection or send fails
- **WHEN** a message is submitted
- **THEN** the system SHALL raise a failure to the caller and SHALL close the queue connection regardless of outcome.

### Requirement: Send each message within the caller's transaction when one

Recovered from: ORDPROC-BR-0002

The system SHALL send each message within the caller's transaction when one exists, or within a new transaction otherwise, and SHALL permit any caller to invoke it without role restriction.

#### Scenario: ORDPROC-BR-0002 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL send each message within the caller's transaction when one exists, or within a new transaction otherwise, and SHALL permit any caller to invoke it without role restriction

### Requirement: Accept a text message from a calling module and

Recovered from: ORDPROC-INT-0001

The system SHALL accept a text message from a calling module and publish it, unchanged, as a single text message on the asynchronous-sender queue.

#### Scenario: ORDPROC-INT-0001 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL accept a text message from a calling module and publish it, unchanged, as a single text message on the asynchronous-sender queue

### Requirement: Allow purchase orders to be found by order date

Recovered from: ORDPROC-REQ-0001

The system SHALL allow purchase orders to be found by order date within an inclusive range.

#### Scenario: ORDPROC-REQ-0001 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL allow purchase orders to be found by order date within an inclusive range

### Requirement: Serialise business-tier event handling per user session so that

Recovered from: ORDPROC-REQ-0002

The system SHALL serialise business-tier event handling per user session so that concurrent requests from one session do not reach the stateful controller at the same time, and SHALL run each event inside a transaction.

#### Scenario: ORDPROC-REQ-0002 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL serialise business-tier event handling per user session so that concurrent requests from one session do not reach the stateful controller at the same time, and SHALL run each event inside a transaction

### Requirement: Let a page transition be decided at run time

Recovered from: ORDPROC-REQ-0003

The system SHALL let a page transition be decided at run time by a flow handler whose returned result maps to a screen, and SHALL treat the result itself as the screen name when no result mapping exists.

#### Scenario: ORDPROC-REQ-0003 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL let a page transition be decided at run time by a flow handler whose returned result maps to a screen, and SHALL treat the result itself as the screen name when no result mapping exists

### Requirement: Report failure to the caller by raising an error

Recovered from: ORDPROC-RULE-0002

GIVEN a message send fails for any reason WHEN the sender is invoked THEN the system SHALL report failure to the caller by raising an error rather than silently continuing, and SHALL release the queue connection.

#### Scenario: ORDPROC-RULE-0002 behaviour

- **GIVEN** a message send fails for any reason
- **WHEN** the sender is invoked
- **THEN** the system SHALL report failure to the caller by raising an error rather than silently continuing, and SHALL release the queue connection.

### Requirement: Perform the send within the caller's transaction (or start

Recovered from: ORDPROC-RULE-0003

The system SHALL perform the send within the caller's transaction (or start one), and SHALL allow any caller to invoke the send without role restrictions.

#### Scenario: ORDPROC-RULE-0003 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL perform the send within the caller's transaction (or start one), and SHALL allow any caller to invoke the send without role restrictions

### Requirement: Process each user-initiated request as: map the request URL

Recovered from: ORDPROC-WKF-0001

The system SHALL process each user-initiated request as: map the request URL to a configured entry, run the configured web action (which may produce an event), hand the event to the business tier through a session-scoped controller, then forward to the resulting screen.

#### Scenario: ORDPROC-WKF-0001 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL process each user-initiated request as: map the request URL to a configured entry, run the configured web action (which may produce an event), hand the event to the business tier through a session-scoped controller, then forward to the resulting screen

### Requirement: Create a counter for that prefix starting at 0 (ORDPW-BR-0002)

Recovered from: ORDPW-BR-0002

GIVEN an identifier prefix that has no counter yet, WHEN an identifier is requested, THEN the system SHALL create a counter for that prefix starting at 0, so the first identifier issued ends in 1.

#### Scenario: ORDPW-BR-0002 behaviour

- **GIVEN** an identifier prefix that has no counter yet
- **WHEN** an identifier is requested
- **THEN** the system SHALL create a counter for that prefix starting at 0, so the first identifier issued ends in 1.

### Requirement: Perform each identifier request within a transaction (create-if-missing and

Recovered from: ORDPW-BR-0004

The system SHALL perform each identifier request within a transaction (create-if-missing and increment together), and SHALL NOT allow the counter bean to be re-entered concurrently.

#### Scenario: ORDPW-BR-0004 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL perform each identifier request within a transaction (create-if-missing and increment together), and SHALL NOT allow the counter bean to be re-entered concurrently

### Requirement: Permit any caller to invoke identifier generation without a

Recovered from: ORDPW-BR-0006

The system SHALL permit any caller to invoke identifier generation without a role check.

#### Scenario: ORDPW-BR-0006 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL permit any caller to invoke identifier generation without a role check

### Requirement: Return, for a given identifier prefix, a unique identifier (ORDPW-REQ-0001)

Recovered from: ORDPW-REQ-0001

The system SHALL return, for a given identifier prefix, a unique identifier formed by concatenating the prefix with the next value of a per-prefix counter.

#### Scenario: ORDPW-REQ-0001 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL return, for a given identifier prefix, a unique identifier formed by concatenating the prefix with the next value of a per-prefix counter

### Requirement: Persist each counter keyed by its unique name, so

Recovered from: ORDPW-REQ-0003

The system SHALL persist each counter keyed by its unique name, so that issued numbers continue from the last value across requests.

#### Scenario: ORDPW-REQ-0003 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL persist each counter keyed by its unique name, so that issued numbers continue from the last value across requests

### Requirement: Issue order identifiers through this generator when an order

Recovered from: ORDPW-REQ-0005

The system SHALL issue order identifiers through this generator when an order is placed.

#### Scenario: ORDPW-REQ-0005 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL issue order identifiers through this generator when an order is placed

### Requirement: Ignore that order: no status update, no supplier purchase

Recovered from: ORDWF-BR-0003

GIVEN an order approval or denial for an order that is not in status PENDING, WHEN the approval is processed, THEN the system SHALL ignore that order: no status update, no supplier purchase order and no customer notification.

#### Scenario: ORDWF-BR-0003 behaviour

- **GIVEN** an order approval or denial for an order that is not in status PENDING
- **WHEN** the approval is processed
- **THEN** the system SHALL ignore that order: no status update, no supplier purchase order and no customer notification.

### Requirement: SHALL, on receiving a purchase order message, persist the (ORDWF-WF-0001)

Recovered from: ORDWF-WF-0001

The system SHALL, on receiving a purchase order message, persist the purchase order and register it with the process manager in status PENDING.

#### Scenario: ORDWF-WF-0001 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** on receiving a purchase order message
- **THEN** the system persist the purchase order and register it with the process manager in status PENDING

### Requirement: Pass an auto-approval of a new order to the

Recovered from: ORDWF-WF-0002

The system SHALL pass an auto-approval of a new order to the order approval queue so that approval is processed by the same path as a manual approval.

#### Scenario: ORDWF-WF-0002 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL pass an auto-approval of a new order to the order approval queue so that approval is processed by the same path as a manual approval

### Requirement: SHALL, for each PENDING order in an approval message

Recovered from: ORDWF-WF-0004

The system SHALL, for each PENDING order in an approval message, set the order's status to the approved or denied status given in the message.

#### Scenario: ORDWF-WF-0004 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** for each PENDING order in an approval message
- **THEN** the system set the order's status to the approved or denied status given in the message

### Requirement: Track each order's processing state in an order manager

Recovered from: PROCESS-ENT-0001

The system SHALL track each order's processing state in an order manager record with status restricted to PENDING, APPROVED, DENIED or COMPLETED.

#### Scenario: PROCESS-ENT-0001 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL track each order's processing state in an order manager record with status restricted to PENDING, APPROVED, DENIED or COMPLETED

### Requirement: Generate order and purchase-order identifiers from named counters, one

Recovered from: PROCESS-ENT-0002

The system SHALL generate order and purchase-order identifiers from named counters, one row per counter name holding an integer value.

#### Scenario: PROCESS-ENT-0002 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL generate order and purchase-order identifiers from named counters, one row per counter name holding an integer value

### Requirement: Provide an operations view listing, per order, its id

Recovered from: PROCESS-REQ-0001

The system SHALL provide an operations view listing, per order, its id, user, date, value and processing status.

#### Scenario: PROCESS-REQ-0001 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL provide an operations view listing, per order, its id, user, date, value and processing status

### Requirement: Exchange a line item with other modules as an

Recovered from: SHOP-INT-0001

The system SHALL exchange a line item with other modules as an XML element named LineItem containing, in this order, CategoryId, ProductId, ItemId, LineNum, Quantity and UnitPrice.

#### Scenario: SHOP-INT-0001 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL exchange a line item with other modules as an XML element named LineItem containing, in this order, CategoryId, ProductId, ItemId, LineNum, Quantity and UnitPrice

### Requirement: Reject it with an error stating that a LineItem

Recovered from: SHOP-INT-0002

GIVEN an XML node that is not an element named LineItem, WHEN a line item is read from it, THEN the system SHALL reject it with an error stating that a LineItem element was expected.

#### Scenario: SHOP-INT-0002 behaviour

- **GIVEN** an XML node that is not an element named LineItem
- **WHEN** a line item is read from it
- **THEN** the system SHALL reject it with an error stating that a LineItem element was expected.

### Requirement: Exchange a line item as a document containing category

Recovered from: SHOP-REQ-0003

The system SHALL exchange a line item as a document containing category id, product id, item id, line number, quantity and unit price, in that order, with no shipped quantity.

#### Scenario: SHOP-REQ-0003 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL exchange a line item as a document containing category id, product id, item id, line number, quantity and unit price, in that order, with no shipped quantity

### Requirement: Publish each generated invoice as a text message to

Recovered from: SUPF-INTG-0006

The system SHALL publish each generated invoice as a text message to the invoice topic so the order processing application receives it; when no invoice was produced no message SHALL be sent.

#### Scenario: SUPF-INTG-0006 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL publish each generated invoice as a text message to the invoice topic so the order processing application receives it; when no invoice was produced no message SHALL be sent

### Requirement: Hand off orders between modules over named JMS destinations

Recovered from: WKFL-INT-0001

The system SHALL hand off orders between modules over named JMS destinations -- an order queue, an order-approval queue and an invoice topic.

#### Scenario: WKFL-INT-0001 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL hand off orders between modules over named JMS destinations -- an order queue, an order-approval queue and an invoice topic

### Requirement: Validate purchase order, invoice and order-approval XML documents against

Recovered from: WKFL-REQ-0001

The system SHALL validate purchase order, invoice and order-approval XML documents against the application's rules and SHALL NOT validate them against XSD schemas.

#### Scenario: WKFL-REQ-0001 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL validate purchase order, invoice and order-approval XML documents against the application's rules and SHALL NOT validate them against XSD schemas

### Requirement: Keep named integer counters, one row per name, used

Recovered from: WORKFLOW-ENT-0001

The system SHALL keep named integer counters, one row per name, used to generate order and purchase order identifiers.

#### Scenario: WORKFLOW-ENT-0001 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL keep named integer counters, one row per name, used to generate order and purchase order identifiers

### Requirement: Keep for each order a process-manager state of exactly

Recovered from: WORKFLOW-RULE-0001

The system SHALL keep for each order a process-manager state of exactly PENDING, APPROVED, DENIED or COMPLETED, one row per order.

#### Scenario: WORKFLOW-RULE-0001 behaviour

- **GIVEN** the legacy preconditions for this behaviour hold
- **WHEN** the behaviour is exercised
- **THEN** the system SHALL keep for each order a process-manager state of exactly PENDING, APPROVED, DENIED or COMPLETED, one row per order
