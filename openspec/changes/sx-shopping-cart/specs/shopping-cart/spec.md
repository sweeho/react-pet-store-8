## ADDED Requirements

### Requirement: Previous screen navigation

Recovered from: ORD-REQ-0013
The system SHALL support returning to the previously displayed screen via the PREVIOUS screen name, restoring that screen's request parameters and attributes only when the corresponding caching switches are enabled.

#### Scenario: Previous screen navigation

- **GIVEN** a user has viewed a screen and both caching switches are disabled
- **WHEN** PREVIOUS is requested
- **THEN** the last viewed screen is shown without restored parameters or attributes

### Requirement: Order line item fields

Recovered from: SHOP-ENT-0001
The system SHALL represent each order line item with category id, product id, item id, line number, quantity, unit price and quantity shipped.

#### Scenario: Order line item fields

- **GIVEN** an order line
- **WHEN** it is stored
- **THEN** all seven fields are recorded

### Requirement: Line item creation from explicit values

Recovered from: SHOP-REQ-0001
The system SHALL create a line item from explicit category, product, item, line number, quantity, unit price and quantity shipped, storing them as given without validation.

#### Scenario: Line item creation from explicit values

- **GIVEN** a line item created with quantity -1
- **WHEN** it is stored
- **THEN** the value is accepted unchanged

### Requirement: Line item creation from existing line

Recovered from: SHOP-REQ-0002
The system SHALL create a line item by copying category, product, item, line number, quantity and unit price from an existing line item and taking quantity shipped from a separately supplied number.

#### Scenario: Line item creation from existing line

- **GIVEN** an existing line item and a supplied shipped number of 0
- **WHEN** a new line item is created from it
- **THEN** its quantity shipped is 0 regardless of the source's shipped value

### Requirement: Line item data snapshot

Recovered from: SHOP-REQ-0004
The system SHALL provide a snapshot of a line item containing category, product, item, line number, quantity and unit price.

#### Scenario: Line item data snapshot

- **GIVEN** a line item with quantity shipped 3
- **WHEN** its snapshot is requested
- **THEN** the snapshot omits quantity shipped

### Requirement: Line item creation variants

Recovered from: SHOP-BR-0002
The system SHALL allow a line item to be created from explicit values or from an existing line item's data, always taking quantity shipped as a separate supplied value, with no check on quantity or price.

#### Scenario: Line item creation variants

- **GIVEN** either creation form
- **WHEN** a line item is created
- **THEN** quantity shipped comes from the supplied argument

### Requirement: Line item price precision

Recovered from: SHOP-BR-0004
The system SHOULD be confirmed to store line item unit prices as single-precision floating-point values, as the legacy system does.

#### Scenario: Line item price precision

- **GIVEN** a unit price that is not exactly representable as a single-precision float
- **WHEN** it is stored
- **THEN** the stored value may differ slightly from the entered price

### Requirement: Line item access

Recovered from: SHOP-REQ-0005
The system SHALL allow any caller to read and change line item data without role restriction, each accessor running within a transaction.

#### Scenario: Line item access

- **GIVEN** a caller with no role
- **WHEN** it reads a line item
- **THEN** access is permitted

### Requirement: Per-session cart state

Recovered from: SHOP-REQ-0001
The system SHALL hold each shopper's cart as a per-session mapping of item identifier to quantity, starting empty, with one entry per distinct item.

#### Scenario: Per-session cart state

- **GIVEN** a new session
- **WHEN** the cart is first read
- **THEN** it is empty

### Requirement: Add item to cart

Recovered from: SHOP-REQ-0002
The system SHALL, when an item is added, set its quantity to 1 if none is given or to the given quantity otherwise, replacing any quantity already in the cart rather than adding to it.

#### Scenario: Add item to cart

- **GIVEN** a cart holding item X with quantity 2
- **WHEN** X is added again with quantity 5
- **THEN** X has quantity 5

### Requirement: Remove item and empty cart

Recovered from: SHOP-REQ-0003
The system SHALL allow an item to be removed from the cart and the entire cart to be emptied.

#### Scenario: Remove item and empty cart

- **GIVEN** a cart with two items
- **WHEN** one is removed and then the cart is emptied
- **THEN** the cart is empty after the second step

### Requirement: Update item quantity

Recovered from: SHOP-REQ-0004
The system SHALL, when an item's quantity is updated, remove the item if the new quantity is zero or less and otherwise set the quantity to the new value.

#### Scenario: Update item quantity

- **GIVEN** item X in the cart with quantity 3
- **WHEN** its quantity is updated to 0
- **THEN** X is removed from the cart

### Requirement: Cart item count

Recovered from: SHOP-REQ-0005
The system SHALL report the cart's item count as the number of distinct items, not the sum of quantities.

#### Scenario: Cart item count

- **GIVEN** a cart with item X quantity 4 and item Y quantity 2
- **WHEN** the count is requested
- **THEN** the count is 2

### Requirement: Cart line presentation

Recovered from: SHOP-REQ-0006
The system SHALL present each cart line with item id, product id, category, product name, attribute, quantity and unit cost, taking descriptive data and the list cost from the catalog in the shopper's locale at viewing time; locale defaults to US English.

#### Scenario: Cart line presentation

- **GIVEN** an item whose catalog price changed after it was added
- **WHEN** the cart is viewed
- **THEN** the current catalog list price is shown

### Requirement: Cart totals

Recovered from: SHOP-REQ-0007
The system SHALL compute each line total as quantity times unit cost and the cart subtotal as the sum of line totals, with no tax, shipping, discount or rounding.

#### Scenario: Cart totals

- **GIVEN** lines of 2 at 10.00 and 1 at 5.50
- **WHEN** the subtotal is computed
- **THEN** it is 25.50

### Requirement: Cart line record

Recovered from: SHOP-ENT-0008
The system SHALL represent a cart line with item id, product id, category, name, attribute, quantity and unit cost.

#### Scenario: Cart line record

- **GIVEN** a cart line
- **WHEN** it is built
- **THEN** it carries those seven values

### Requirement: Cart omits unresolvable items

Recovered from: CART-BR-0010
The system SHALL omit a cart item whose catalog lookup fails from the cart listing and from the subtotal, and continue with the remaining items.

#### Scenario: Cart omits unresolvable items

- **GIVEN** a cart item no longer found in the catalog
- **WHEN** the cart is listed or totalled
- **THEN** that item is omitted and the others are processed

### Requirement: Cart access without role

Recovered from: CART-REQ-0011
The system SHALL make cart operations available without role restriction.

#### Scenario: Cart access without role

- **GIVEN** an anonymous visitor
- **WHEN** the visitor uses the cart
- **THEN** no login role is required

### Requirement: Cart web actions

Recovered from: CART-REQ-0006
The system SHALL support adding an item (action purchase), removing an item (action remove) and updating quantities (action update) for every parameter named itemQuantity\_<itemId>, in a single submission, and show the cart with per-line unit cost and a total.

#### Scenario: Cart web actions

- **GIVEN** a submission with action update and itemQuantity_A=3
- **WHEN** it is processed
- **THEN** item A quantity is updated to 3

### Requirement: Cart per session with locale

Recovered from: CART-REQ-0007
The system SHALL give each customer session one cart, created when the session is created or on first use, and SHALL set the cart's locale whenever the session locale changes or the customer signs on.

#### Scenario: Cart per session with locale

- **GIVEN** a customer who changes language
- **WHEN** the locale changes
- **THEN** the cart uses the new locale

### Requirement: Non-numeric quantity

Recovered from: SHOPPING-CART-REQ-0002
The system SHALL treat a quantity that is not a whole number as 0.

#### Scenario: Non-numeric quantity

- **GIVEN** an update submission with quantity abc for item A
- **WHEN** it is processed
- **THEN** the quantity for A is treated as 0

### Requirement: Empty cart display

Recovered from: SHOPPING-CART-REQ-0003
The cart screen SHALL display Your Shopping Cart is Empty. and no checkout link when the cart has no items, and otherwise SHALL show a Check Out link to the order information screen.

#### Scenario: Empty cart display

- **GIVEN** an empty cart
- **WHEN** the cart screen is shown
- **THEN** the empty message appears and no Check Out link is offered
