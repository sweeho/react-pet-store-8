# Design notes: legacy implementation of order-processing-workflow

## User interface

No screen records were extracted for this capability; its user interface is unspecified. The .do/.screen request routing recorded here is controller plumbing, not a screen.

## How the legacy application implements it

- Web tier: a single front controller maps each .do request to an action, raises an event to a session-scoped EJB controller (serialised per session, run in a transaction), then forwards to the next screen; .screen requests go to a template. Unhandled exceptions forward to an error screen mapped by exception class or superclass.
- Order intake: the order action takes an id from the unique-id generator (prefix "1001" plus a per-prefix counter, e.g. 10011), serialises the purchase order to XML and sends it through the asynchronous sender (a JMS queue sender, joins the caller transaction, no role check).
- Order processing: a message-driven bean persists the purchase order, registers it with the process manager as PENDING and, if auto-approvable, posts to the order-approval queue. Approval messages are applied only to PENDING orders; others are silently skipped. Supplier invoices set COMPLETED (all line items invoiced) or SHIPPED_PART.
- Process manager: one row per order id holding a status string; lookup by status; transitions run through a handler class named at runtime.
- Lookup service: a shared caching instance in the web tier, an uncached per-caller instance in the EJB tier; all failures wrap into one lookup error.
- XML: OrderApproval (Order entries of OrderId then OrderStatus) and LineItem documents are validated by code, not by XSD.
- Database: counter table (name, integer value); order-manager table with a status CHECK; an operations view joining purchase orders to order-manager rows.

## Findings for review

- F1: the schema CHECK allows PENDING, APPROVED, DENIED, COMPLETED only, but code uses SHIPPED_PART. Code and schema disagree; unresolved.
- F2: the transition-handler workflow (ORDER-PROCESSING-WORKFLOW-WF-0001) has unresolved reachability.
- F3: records from passes A and B overlap heavily (identifier generation, lookup service, status sets, async sender); they are kept as separate requirements.
- F4: scenarios in spec.md are mechanically derived from each requirement sentence and need SME refinement.
