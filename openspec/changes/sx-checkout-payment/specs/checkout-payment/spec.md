## ADDED Requirements

### Requirement: Credit card attributes

Recovered from: CHK-ENT-0001

A stored credit card SHALL consist of exactly a card number, a card type and an expiry date, all text.

#### Scenario: Credit card attributes

- **GIVEN** a stored credit card
- **WHEN** its attributes are read
- **THEN** only card number, card type and expiry date exist

### Requirement: Credit card mandatory fields

Recovered from: CARD-ENT-0001

Every stored credit card SHALL have a card number, card type and expiry date, with expiry held as text of at most 10 characters.

#### Scenario: Credit card mandatory fields

- **GIVEN** a card without an expiry date
- **WHEN** it is stored
- **THEN** the store is refused

### Requirement: Payment card storage

Recovered from: CHECKOUT-ENT-0001

The system SHALL store a payment card with card number, card type and expiry date all mandatory, expiry held as text such as 04/04, and the card number unencrypted.

#### Scenario: Payment card storage

- **GIVEN** a payment card with all three fields
- **WHEN** it is stored
- **THEN** it is accepted with the number held as plain text

### Requirement: No card validation

Recovered from: CHK-RULE-0001

The system SHALL accept and store card number, card type and expiry date without checking format, length, checksum, card-type consistency or expiry in the future.

#### Scenario: No card validation

- **GIVEN** a card number of 'abc' and an expiry in the past
- **WHEN** the card is stored
- **THEN** it is accepted without error

### Requirement: Expiry month/year form

Recovered from: CHK-RULE-0002

The system SHALL hold card expiry as one text value in month/year form and MUST derive the month as the text before the first slash and the year as the text after it.

#### Scenario: Expiry month/year form

- **GIVEN** an expiry of '04/2009'
- **WHEN** month and year are requested
- **THEN** month is '04' and year is '2009'

### Requirement: Expiry split on slash

Recovered from: CHK-BR-0001

Given a stored expiry containing a '/', the system SHALL return the text before it as month and after it as year.

#### Scenario: Expiry split on slash

- **GIVEN** an expiry of '12/2012'
- **WHEN** the month and year are requested
- **THEN** '12' and '2012' are returned

### Requirement: Expiry default values

Recovered from: CHK-BR-0002

Given an absent expiry or one without '/', the system SHALL return month '01' and year '2010'.

#### Scenario: Expiry default values

- **GIVEN** a card with expiry '1204'
- **WHEN** month and year are requested
- **THEN** '01' and '2010' are returned

### Requirement: Expiry fallback values

Recovered from: CHK-RULE-0003

Given a missing or slashless expiry, the system SHALL return month '01' and year '2010' respectively.

#### Scenario: Expiry fallback values

- **GIVEN** a card with no expiry
- **WHEN** month is requested
- **THEN** '01' is returned and year yields '2010'

### Requirement: Credit card XML exchange

Recovered from: CHK-INT-0001

The system SHALL exchange credit card data as an XML document with root CreditCard and children CardNumber, CardType, ExpiryDate in that order, and MUST reject an incoming document whose root is not CreditCard.

#### Scenario: Credit card XML exchange

- **GIVEN** an incoming XML document with root Order
- **WHEN** it is parsed as a credit card
- **THEN** it is rejected

### Requirement: Card operations transactional and unrestricted

Recovered from: CHK-REQ-0001

The system SHALL store and read a card inside a transaction and SHALL allow any caller to use card operations without a role check.

#### Scenario: Card operations transactional and unrestricted

- **GIVEN** an unauthenticated caller
- **WHEN** it reads a card
- **THEN** the read is permitted

### Requirement: Order record

Recovered from: CHECKOUT-ENT-0002

The system SHALL record each order with order id, user id, e-mail, date (epoch milliseconds), locale, total value, a contact and a payment card, all mandatory.

#### Scenario: Order record

- **GIVEN** an order missing its contact
- **WHEN** it is stored
- **THEN** the store is refused

### Requirement: Purchase order record with references

Recovered from: CHECKOUT-PAYMENT-ENTITY-0001

The system SHALL record each purchase order with a unique order id and mandatory user id, email, date, locale, total value, contact reference and credit card reference, and the contact and card references MUST exist.

#### Scenario: Purchase order record with references

- **GIVEN** an order referencing a nonexistent card
- **WHEN** it is stored
- **THEN** the store is refused

### Requirement: Purchase order referential integrity

Recovered from: CHKO-ENT-0001

The system SHALL record each purchase order with a unique id and SHALL require it to reference an existing contact record and an existing credit card record.

#### Scenario: Purchase order referential integrity

- **GIVEN** two orders with the same id
- **WHEN** the second is stored
- **THEN** it is refused

### Requirement: Positive line quantity

Recovered from: CHECKOUT-RULE-0001

The system SHALL reject an order line whose quantity is not greater than zero.

#### Scenario: Positive line quantity

- **GIVEN** an order line with quantity 0
- **WHEN** it is stored
- **THEN** it is rejected

### Requirement: Required contact fields

Recovered from: CHECKOUT-PAYMENT-REQ-0001

The system SHALL reject order submission when last name, first name, street address, city, state or province, postal code or telephone number is blank after trimming, reporting the missing fields; address line 2 and e-mail are optional.

#### Scenario: Required contact fields

- **GIVEN** an order form with a blank city and a whitespace-only telephone
- **WHEN** the order is submitted
- **THEN** it is rejected and the missing fields city and telephone are reported

### Requirement: Incomplete contact block

Recovered from: CHK-REQ-0004

When any required contact field is blank after trimming, the system SHALL treat the contact block as incomplete and record the missing fields; a blank second address line MUST be stored as absent and e-mail is optional.

#### Scenario: Incomplete contact block

- **GIVEN** an order form with blank second address line and no e-mail
- **WHEN** it is processed
- **THEN** the second line is stored as absent and no error is raised for e-mail

### Requirement: Fixed card on every order

Recovered from: CHECKOUT-PAYMENT-REQ-0002

The system SHALL attach a fixed credit card (number '1234-2334', type 'Duke Express', expiry '10/2001') to every submitted order regardless of any card data on the customer account.

#### Scenario: Fixed card on every order

- **GIVEN** a customer account holding a different card
- **WHEN** an order is submitted
- **THEN** the order carries the fixed card

### Requirement: Fixed card replaces customer-entered details

Recovered from: CHK-REQ-0005

The system SHALL submit every order with the fixed card (number '1234-2334', type 'Duke Express', expiry '10/2001') rather than customer-entered card details.

#### Scenario: Fixed card replaces customer-entered details

- **GIVEN** a customer who entered card details
- **WHEN** the order is submitted
- **THEN** the fixed card is used

### Requirement: Order submission processing

Recovered from: CHECKOUT-PAYMENT-REQ-0003

On order submission the system SHALL assign a unique order id, stamp the current date, signed-on user id, billing e-mail and session locale, include billing and shipping contact and card, create one line item per cart entry numbered from 0, set total price to the sum of unit cost times quantity, send the order as an XML message to the asynchronous order channel, empty the cart and return the order id and billing e-mail.

#### Scenario: Order submission processing

- **GIVEN** a cart with 2 items (2 x 10.00 and 1 x 5.00)
- **WHEN** the order is submitted
- **THEN** an order with 2 lines numbered 0 and 1 and total 25.00 is sent, the cart is emptied and the order id and e-mail are returned

### Requirement: Purchase order built from cart

Recovered from: CHK-REQ-0002

The system SHALL build a purchase order from the cart with a new unique order id, signed-on user id, bill-to e-mail, order date, shipping and billing contact, credit card, session locale, one line item per cart entry (numbered from 0 with category, product, item, quantity and unit cost) and total price equal to the sum of unit cost times quantity.

#### Scenario: Purchase order built from cart

- **GIVEN** a cart with one line of quantity 3 at 4.00
- **WHEN** the order is built
- **THEN** one line numbered 0 and total price 12.00 result

### Requirement: Empty cart refused

Recovered from: CHECKOUT-PAYMENT-REQ-0004

Given an empty cart, the system SHALL refuse the order, send nothing and show the empty-cart order error screen.

#### Scenario: Empty cart refused

- **GIVEN** an empty cart
- **WHEN** an order is submitted
- **THEN** no message is sent and the empty-cart error is shown

### Requirement: Purchase order document

Recovered from: CHKP-INT-0001

The system SHALL represent a submitted purchase order as a document with order id, user id, email, order date, ship-to and bill-to addresses (first name, last name, street, city, state, country, zip), total price, credit card (number, expiry date, type) and at least one line item, with locale defaulting to en_US.

#### Scenario: Purchase order document

- **GIVEN** a purchase order document without locale
- **WHEN** it is read
- **THEN** the locale is en_US

### Requirement: Purchase order document (second reading)

Recovered from: CHKPAY-REQ-0001

The system SHALL represent a submitted purchase order as a document with order id, user id, email, order date, ship and bill addresses, total price, credit card, locale defaulting to en_US, and line items.

#### Scenario: Purchase order document (second reading)

- **GIVEN** a purchase order document without locale
- **WHEN** it is read
- **THEN** the locale is en_US

### Requirement: Supported locales

Recovered from: LOC-REQ-0014

The system SHALL serve screens in en_US, ja_JP and zh_CN, defaulting to en_US, and MUST read request text as UTF-8.

#### Scenario: Supported locales

- **GIVEN** a request with no locale
- **WHEN** a screen is served
- **THEN** en_US is used

### Requirement: Order status view

Recovered from: ORDER-PROCESSING-WORKFLOW-BUSINESS-RULE-0001

The system SHALL expose order status as the join of purchase orders with order manager records on order id, returning order id, user id, date, value and status only for orders that have an order manager record.

#### Scenario: Order status view

- **GIVEN** an order without an order manager record
- **WHEN** order status is listed
- **THEN** the order does not appear

### Requirement: Order status excludes unmanaged orders

Recovered from: ORDP-RULE-0001

The system SHALL expose order status by joining each purchase order to its status record on order id so that orders lacking a status record do not appear.

#### Scenario: Order status excludes unmanaged orders

- **GIVEN** an order lacking a status record
- **WHEN** order status is listed
- **THEN** it is omitted

### Requirement: Identifier counters

Recovered from: WORKFLOW-ENT-0001

The system SHALL keep named integer counters, one row per name, used to generate order and purchase order identifiers.

#### Scenario: Identifier counters

- **GIVEN** a counter named for orders
- **WHEN** a new order id is needed
- **THEN** the counter value is used and advanced

### Requirement: Named counters

Recovered from: CTR-ENT-0001

The system SHALL keep named integer counters, one per unique name, each with a mandatory value.

#### Scenario: Named counters

- **GIVEN** two counters with the same name
- **WHEN** the second is stored
- **THEN** it is refused

### Requirement: Order indexes

Recovered from: BATCH-REQ-0001

The system SHALL index purchase orders by user and by date and order managers by status to support batch jobs and lookups.

#### Scenario: Order indexes

- **GIVEN** orders of one user
- **WHEN** they are looked up by user
- **THEN** an index on user id exists

### Requirement: Populate endpoint

Recovered from: BATCH-OPERATIONS-REQ-0001

The system SHALL provide a Populate endpoint that loads the schema and the catalog and customer data from XML files (PopulateSQL.xml, Populate-UTF8.xml) for a configured database, cloudscape by default.

#### Scenario: Populate endpoint

- **GIVEN** no database configured
- **WHEN** Populate is invoked
- **THEN** data is loaded into cloudscape
