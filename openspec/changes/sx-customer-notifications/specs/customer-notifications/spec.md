## ADDED Requirements

### Requirement: Mailer consumes mail queue

Recovered from: CUSTNOTIF-INT-0001
The system SHALL send an email for each mail message received on the mail queue, taking recipient address, subject and content from the message's Address, Subject and Content elements.

#### Scenario: Mailer consumes mail queue

- **GIVEN** a mail message with Address, Subject and Content on the mail queue
- **WHEN** it is received
- **THEN** one email is sent with that recipient, subject and content

### Requirement: Mailer queue message format

Recovered from: CN-WF-0001
The system SHALL consume each mailer queue message as a text message holding a mail document and send one email per message.

#### Scenario: Mailer queue message format

- **GIVEN** two text messages each holding a mail document
- **WHEN** both are consumed
- **THEN** two emails are sent, one per message

### Requirement: Email format and headers

Recovered from: CUSTNOTIF-REQ-0002
The system SHALL send each notification as an HTML email from the mail session's default sender, with recipients parsed leniently, the given subject, an X-Mailer header of "JavaMailer" and the current date as sent date.

#### Scenario: Email format and headers

- **GIVEN** a mail request with address "a@x.com, b@x.com"
- **WHEN** the email is sent
- **THEN** it is HTML, addressed to both recipients, carries X-Mailer JavaMailer and the current sent date

### Requirement: Email composition

Recovered from: CN-REQ-0003
The system SHALL send each email as HTML with the default sender, the supplied addresses as TO recipients, the supplied subject, the current date and an X-Mailer header of "JavaMailer".

#### Scenario: Email composition

- **GIVEN** a mail request with a comma-separated address list
- **WHEN** it is sent
- **THEN** each listed address is a TO recipient

### Requirement: Send failure is discarded

Recovered from: CUSTNOTIF-RULE-0003
The system SHALL discard a send failure (mail session missing, bad address or transport failure) without error, consume the message and not redeliver it.

#### Scenario: Send failure is discarded

- **GIVEN** no mail server is configured
- **WHEN** a queue message is processed
- **THEN** no email is sent, no error is raised and the message is not redelivered

### Requirement: Failed send not retried

Recovered from: CN-BR-0004
The system SHALL discard a request that cannot be sent without retry and without raising an error to the queue.

#### Scenario: Failed send not retried

- **GIVEN** mail cannot be sent
- **WHEN** the request is processed
- **THEN** the request is discarded and the queue transaction commits

### Requirement: Invalid mail message raises system error

Recovered from: CUSTNOTIF-RULE-0004
The system SHALL raise a system error for a queue message that is not a valid mail document or cannot be read as text, rather than ignoring it.

#### Scenario: Invalid mail message raises system error

- **GIVEN** a queue message that is not a valid mail document
- **WHEN** it is processed
- **THEN** a system error is raised for the message

### Requirement: Unreadable message not treated as handled

Recovered from: CN-BR-0005
The system SHALL raise a system error when a queue message is not a text message or its XML is invalid or unreadable, so the message is not treated as handled.

#### Scenario: Unreadable message not treated as handled

- **GIVEN** a queue message with invalid XML
- **WHEN** it is processed
- **THEN** a system error is raised and the message is not handled

### Requirement: Mail document validity

Recovered from: CN-REQ-0002
The system SHALL treat a mail request as invalid unless it is a well-formed mail document with Address, Subject and Content elements in that order.

#### Scenario: Mail document validity

- **GIVEN** a mail document with Subject before Address
- **WHEN** it is parsed
- **THEN** it is rejected as invalid

### Requirement: Mail document structure (integration)

Recovered from: CUSN-INT-0001
The system SHALL represent an outgoing mail message as a document with an address, a subject and content.

#### Scenario: Mail document structure (integration)

- **GIVEN** an order process producing a mail
- **WHEN** the mail is produced
- **THEN** it consists of an address, a subject and content

### Requirement: Mail representation (xmldocuments)

Recovered from: CUSTNOT-REQ-0001
The system SHALL represent an outgoing mail as an address, a subject and content.

#### Scenario: Mail representation (xmldocuments)

- **GIVEN** a mail to be sent
- **WHEN** it is represented
- **THEN** it has an address, subject and content

### Requirement: Per-email switches

Recovered from: NOTIF-RULE-0001
The system SHALL send each of the three order emails (shipment/invoice, approval status, completed order) only when its own configuration switch is on; when off, the message SHALL be consumed and discarded.

#### Scenario: Per-email switches

- **GIVEN** the completed-order switch is off and the others are on
- **WHEN** an order completes
- **THEN** no completed-order email is sent and the message is consumed, while approval and invoice emails are still sent

### Requirement: Order email addressing and subject

Recovered from: NOTIF-REQ-0001
The system SHALL address each order email to the email address on the purchase order, with subject "Java Pet Store Order Status: <orderId>" for approval or denial, "Java Pet Store Order Shipped: <orderId>" for shipment and "Java Pet Store Order COMPLETED: <orderId>" for completion, and render the body in the purchase order's locale.

#### Scenario: Order email addressing and subject

- **GIVEN** a shipped purchase order with a French locale
- **WHEN** the shipment email is built
- **THEN** it is sent to the order's email address with subject "Java Pet Store Order Shipped: <orderId>" and a French body

### Requirement: Notify customers of processed approvals

Recovered from: CUSTNOT-REQ-0001
The system SHALL send the list of processed approvals and denials, only for orders that were PENDING, to customer relations so each affected customer is notified of the new status.

#### Scenario: Notify customers of processed approvals

- **GIVEN** three orders of which two were PENDING
- **WHEN** approvals are processed
- **THEN** only the two PENDING orders are forwarded for notification

### Requirement: Order status email

Recovered from: CUSTNOT-BR-0002
The system SHALL send an order-status email with subject "Java Pet Store Order Status: <order id>", body in the order's locale, to the order's email address for each approval or denial, only when the approval-mail setting is enabled.

#### Scenario: Order status email

- **GIVEN** the approval-mail setting is disabled
- **WHEN** an order is approved
- **THEN** no mail is produced

### Requirement: Completed order email

Recovered from: CUSTNOT-BR-0003
The system SHALL send a completed-order email with subject "Java Pet Store Order COMPLETED: <order id>" in the order's locale when an order completes, only when the completed-order-mail setting is enabled.

#### Scenario: Completed order email

- **GIVEN** the completed-order setting is enabled
- **WHEN** an order completes
- **THEN** an email with that subject is sent to the order's address

### Requirement: Configured deployment sends no order mail

Recovered from: NOTI-REQ-0001
The system SHALL, in the configured deployment, send no confirmation, approval or completed-order mail.

#### Scenario: Configured deployment sends no order mail

- **GIVEN** the configured deployment properties
- **WHEN** an order is approved or completed
- **THEN** no mail is sent

### Requirement: Default configuration sends no mail

Recovered from: CUSN-REQ-0001
The system SHALL NOT send confirmation, approval or completed-order mail under the default configuration.

#### Scenario: Default configuration sends no mail

- **GIVEN** the default configuration with all mail flags false
- **WHEN** orders are processed
- **THEN** no order mail is sent even though a mail queue is configured

### Requirement: Environment entries lookup

Recovered from: CNT-REQ-0001
The system SHALL be able to read deployment-configured environment entries by name as URL, boolean or string values, including the flag that controls sending confirmation mail.

#### Scenario: Environment entries lookup

- **GIVEN** an environment entry for the confirmation-mail flag set to true
- **WHEN** the flag is read as boolean
- **THEN** true is returned

### Requirement: Boolean switches from environment entries

Recovered from: OPW-BR-0005
The system SHALL read boolean configuration switches, such as whether to send a confirmation mail, from named environment entries through the lookup service.

#### Scenario: Boolean switches from environment entries

- **GIVEN** a named boolean environment entry
- **WHEN** the switch is evaluated
- **THEN** its configured value is used
