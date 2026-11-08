## ADDED Requirements

### Requirement: List categories

Recovered from: CATALOG-BROWSING-REQ-0001

The system SHALL list all categories for the requested locale ordered by category name, each with its identifier, name and description.

#### Scenario: List categories case 1

- **GIVEN** categories with details in locales en_US and ja_JP
- **WHEN** categories are listed for en_US
- **THEN** every en_US category is returned ordered by name with id, name and description

### Requirement: List and look up products

Recovered from: CATALOG-BROWSING-REQ-0002

The system SHALL return the products of a category for the requested locale ordered by product name, and SHALL return a single product's name and description by identifier, or nothing when the product does not exist.

#### Scenario: List and look up products case 1

- **GIVEN** a category with several products
- **WHEN** its products are requested
- **THEN** they are returned ordered by name

#### Scenario: List and look up products case 2

- **GIVEN** no product with id X
- **WHEN** product X is requested
- **THEN** nothing is returned and no error is raised

### Requirement: List and look up items

Recovered from: CATALOG-BROWSING-REQ-0003

The system SHALL return the items of a product for the requested locale, and SHALL return a single item's details (category, product, name, image, description, five attributes, list price, unit cost) by identifier, or nothing when the item does not exist.

#### Scenario: List and look up items case 1

- **GIVEN** a product with items
- **WHEN** its items are requested
- **THEN** the items of that product in that locale are returned

#### Scenario: List and look up items case 2

- **GIVEN** no item with id X
- **WHEN** item X is requested
- **THEN** nothing is returned

### Requirement: Paged list results

Recovered from: CATALOG-BROWSING-REQ-0004

The system SHALL return list results (categories, products, items, search hits) one page at a time from a requested zero-based start position and page size, and SHALL report whether a further page exists.

#### Scenario: Paged list results case 1

- **GIVEN** a list of 60 rows
- **WHEN** start 0 and size 25 are requested
- **THEN** 25 rows are returned and a further page is reported

#### Scenario: Paged list results case 2

- **GIVEN** a list of 60 rows
- **WHEN** start 50 and size 25 are requested
- **THEN** 10 rows are returned and no further page is reported

### Requirement: Out-of-range start returns empty page

Recovered from: CATALOG-BROWSING-RULE-0005

When the requested start position is negative or beyond the last row, the system SHALL return an empty page.

#### Scenario: Out-of-range start returns empty page case 1

- **GIVEN** a list of 60 rows
- **WHEN** start 99 is requested
- **THEN** an empty page is returned

### Requirement: Keyword item search

Recovered from: CATALOG-BROWSING-REQ-0006

The system SHALL search items by splitting the query on whitespace into distinct keywords and returning items in the requested locale where ANY keyword is contained in the product name, the category identifier or the item description.

#### Scenario: Keyword item search case 1

- **GIVEN** items whose product names contain "fish" or "dog"
- **WHEN** the query "fish dog" is searched
- **THEN** items matching either keyword are returned

### Requirement: Empty search query

Recovered from: CATALOG-BROWSING-RULE-0007

When a search query is empty or only whitespace, the system SHALL return an empty page without querying the database.

#### Scenario: Empty search query case 1

- **GIVEN** a query of only spaces
- **WHEN** a search is requested
- **THEN** an empty page is returned and no database query is made

### Requirement: Read-only, configurable data access

Recovered from: CATALOG-BROWSING-REQ-0009

The system SHALL read the catalog read-only through a data-access implementation and database dialect chosen at deployment, using SQL statements held in an external configuration file.

#### Scenario: Read-only, configurable data access case 1

- **GIVEN** a deployment selecting a database dialect
- **WHEN** the catalog is read
- **THEN** the statements for that dialect are used and no catalog data is modified

### Requirement: Categories, products and items as pages

Recovered from: CATA-REQ-0001

The system SHALL return categories, products within a category and items within a product as pages, each starting at a caller-supplied zero-based offset and holding at most the requested count, in the requested locale.

#### Scenario: Categories, products and items as pages case 1

- **GIVEN** a category with 30 products
- **WHEN** start 0 and count 10 are requested
- **THEN** at most 10 products are returned

### Requirement: Out-of-range page is empty with no neighbours

Recovered from: CATA-BR-0002

When the start offset is negative or beyond the last row, the system SHALL return an empty page with no next and no previous page.

#### Scenario: Out-of-range page is empty with no neighbours case 1

- **GIVEN** a list of 10 rows
- **WHEN** start 20 is requested
- **THEN** an empty page is returned with no next and no previous page

### Requirement: Next and previous page availability

Recovered from: CATA-BR-0003

The system SHALL report a next page only when at least one further row exists after the returned page, and a previous page when the start offset is greater than zero; the previous page start SHALL be the current start minus the current page size, not below zero.

#### Scenario: Next and previous page availability case 1

- **GIVEN** a list of 60 rows
- **WHEN** start 10 and size 25 are requested
- **THEN** a previous page starting at 0 and a next page are reported

#### Scenario: Next and previous page availability case 2

- **GIVEN** a list of 25 rows
- **WHEN** start 0 and size 25 are requested
- **THEN** no next page and no previous page are reported

### Requirement: Keyword search matching

Recovered from: CATA-REQ-0004

The system SHALL search items by whitespace-separated keywords, de-duplicated, matching each keyword as a substring against three item/product text fields in the requested locale, and return a page of matches.

#### Scenario: Keyword search matching case 1

- **GIVEN** the query "cat cat"
- **WHEN** it is searched
- **THEN** the keyword cat is applied once

### Requirement: Search without keywords

Recovered from: CATA-BR-0005

When a search query contains no keywords, the system SHALL return an empty page.

#### Scenario: Search without keywords case 1

- **GIVEN** an empty query
- **WHEN** a search is requested
- **THEN** an empty page is returned

### Requirement: Single lookup by identifier

Recovered from: CATA-REQ-0006

The system SHALL return a single category, product or item by identifier in the requested locale, and SHALL return nothing when no row exists.

#### Scenario: Single lookup by identifier case 1

- **GIVEN** an existing category id with no details in the requested locale
- **WHEN** it is requested in that locale
- **THEN** nothing is returned

### Requirement: Catalog read access path

Recovered from: CATA-REQ-0008

The system SHALL expose catalog reads through a container-managed stateless component and SHALL let the web tier optionally bypass it and query the database directly.

#### Scenario: Catalog read access path case 1

- **GIVEN** the web tier configured to bypass the component
- **WHEN** a catalog read is made
- **THEN** the database is queried directly with the same results

### Requirement: Catalog hierarchy

Recovered from: CATALOG-ENT-0001

The system SHALL hold the catalog as a hierarchy category, product, item, where each product belongs to exactly one category, each item to exactly one product, and localised text is held in separate details records keyed by (key, locale).

#### Scenario: Catalog hierarchy case 1

- **GIVEN** a product referencing a missing category
- **WHEN** it is stored
- **THEN** the store rejects it

#### Scenario: Catalog hierarchy case 2

- **GIVEN** an item with details already present for a locale
- **WHEN** a second details row for that locale is added
- **THEN** the store rejects it

### Requirement: No price/cost constraint

Recovered from: CATALOG-RULE-0002

The system SHALL NOT enforce at the database level that an item's list price is at least its unit cost.

#### Scenario: No price/cost constraint case 1

- **GIVEN** an item with list price below unit cost
- **WHEN** it is stored
- **THEN** the database accepts it

### Requirement: Category identifier

Recovered from: CAT-ENT-0001

The system SHALL identify each product category by a unique category id of at most 10 characters.

#### Scenario: Category identifier case 1

- **GIVEN** an existing category id
- **WHEN** a category with the same id is added
- **THEN** the store rejects it

### Requirement: Product identifier and owner

Recovered from: CAT-ENT-0001

Each product SHALL have a unique 10-character product id and SHALL belong to exactly one existing category.

#### Scenario: Product identifier and owner case 1

- **GIVEN** a product id already in use
- **WHEN** another product with it is added
- **THEN** the store rejects it

### Requirement: Product lookup by category index

Recovered from: CAT-REQ-0001

The system SHALL support lookup of products by category via an index on product category id.

#### Scenario: Product lookup by category index case 1

- **GIVEN** a category with products
- **WHEN** products are requested by category
- **THEN** they are retrieved through the category index

### Requirement: Item lookup by product index

Recovered from: CAT-REQ-0002

The system SHALL support lookup of items by product via an index on item product id.

#### Scenario: Item lookup by product index case 1

- **GIVEN** a product with items
- **WHEN** items are requested by product
- **THEN** they are retrieved through the product index

### Requirement: Product storage constraints

Recovered from: CATALOG-BROWSING-ENT-0001

The system SHALL store each product with a unique 10-character product id and exactly one owning category, rejecting a product whose category does not exist.

#### Scenario: Product storage constraints case 1

- **GIVEN** no category X
- **WHEN** a product in category X is stored
- **THEN** it is rejected

### Requirement: Indexed retrieval

Recovered from: CATALOG-BROWSING-REQ-0001

The system SHALL support retrieval of products by category and items by product through indexed lookups.

#### Scenario: Indexed retrieval case 1

- **GIVEN** a product with items
- **WHEN** its items are retrieved
- **THEN** an index on item product id is used

### Requirement: Lookup by identifier (null when absent)

Recovered from: CATB-REQ-0001

The system SHALL return a single category, product or item by identifier in the requested locale, and SHALL return nothing (null) when no row exists for that identifier and locale.

#### Scenario: Lookup by identifier (null when absent) case 1

- **GIVEN** an unknown identifier
- **WHEN** it is looked up
- **THEN** nothing is returned

### Requirement: Ordered paged lists

Recovered from: CATB-REQ-0002

The system SHALL list categories and products for a locale ordered by name, and items of a product for a locale, returned in pages.

#### Scenario: Ordered paged lists case 1

- **GIVEN** several categories
- **WHEN** they are listed
- **THEN** they appear ordered by name, one page at a time

### Requirement: Page offset, size and next flag

Recovered from: CATB-REQ-0003

The system SHALL return list results as a page starting at a zero-based offset holding at most the requested count, with a flag indicating whether a further page exists.

#### Scenario: Page offset, size and next flag case 1

- **GIVEN** a list longer than the page size
- **WHEN** the first page is requested
- **THEN** the flag says a further page exists

### Requirement: Empty page out of range

Recovered from: CATB-REQ-0004

When a page request's start offset is negative or beyond the last row, the system SHALL return an empty page with no next page.

#### Scenario: Empty page out of range case 1

- **GIVEN** a start beyond the last row
- **WHEN** a list is requested
- **THEN** an empty page with no next page is returned

### Requirement: Keyword search (substring, any keyword)

Recovered from: CATB-REQ-0005

The system SHALL search items by splitting the query into whitespace-separated keywords (duplicates removed) and returning items in the requested locale whose product name, category id or item description contains any one keyword.

#### Scenario: Keyword search (substring, any keyword) case 1

- **GIVEN** the query "bird"
- **WHEN** it is searched
- **THEN** items whose product name, category id or description contains bird are returned

### Requirement: No-keyword search short-circuit

Recovered from: CATB-REQ-0006

When a search query has no keywords, the system SHALL return an empty page without querying the database.

#### Scenario: No-keyword search short-circuit case 1

- **GIVEN** a whitespace-only query
- **WHEN** items are searched
- **THEN** an empty page is returned without a database query

### Requirement: Item fields exposed

Recovered from: CATB-REQ-0008

The system SHALL expose each catalog item with its category id, product id, product name, item id, image, description, five attributes, list price and unit cost.

#### Scenario: Item fields exposed case 1

- **GIVEN** an existing item
- **WHEN** it is returned
- **THEN** all listed fields are present

### Requirement: Data access failure

Recovered from: CATB-REQ-0009

The system SHALL raise a system error to the caller when catalog data access fails (data source lookup, SQL error or configuration load failure).

#### Scenario: Data access failure case 1

- **GIVEN** an unavailable data source
- **WHEN** a catalog read is requested
- **THEN** a system error is raised to the caller

### Requirement: Item identifier and owner

Recovered from: ITEM-ENT-0001

The system SHALL identify each item by a unique item id and require every item to belong to an existing product.

#### Scenario: Item identifier and owner case 1

- **GIVEN** an item referencing a missing product
- **WHEN** it is stored
- **THEN** the store rejects it
