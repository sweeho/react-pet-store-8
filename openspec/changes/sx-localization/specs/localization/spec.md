## ADDED Requirements

### Requirement: Default session locale

Recovered from: LOC-REQ-0001

The system SHALL assign the default locale en_US to a session on its first request when the session holds no locale.

#### Scenario: Default session locale

- **GIVEN** a session with no locale
- **WHEN** any request arrives
- **THEN** the session locale is en_US

### Requirement: Change session locale

Recovered from: LOC-REQ-0002

The system SHALL change the session locale to the value of the locale request parameter when it parses to a locale, and MUST otherwise fail the request with an "Unable to change language" error.

#### Scenario: Change session locale

- **GIVEN** a session in en_US
- **WHEN** a change request carries locale ja_JP
- **THEN** the session locale becomes ja_JP; a value such as xx is refused with the error

### Requirement: Locale string interpretation

Recovered from: LOC-BR-0003

The system SHALL interpret "default" as the platform default locale and language_country as that language and country, and MUST return no locale for a null string or one without an underscore; a third variant segment SHALL NOT be applied.

#### Scenario: Locale string interpretation

- **GIVEN** the string zh_CN
- **WHEN** it is interpreted
- **THEN** a Chinese (China) locale results, while "zh" and null yield no locale

### Requirement: Screen definition selection by locale

Recovered from: LOC-BR-0004

The system SHALL select screen definitions for the locale in the locale request parameter, else the session locale, and SHALL fall back to the default locale's definitions when that locale has none or lacks the screen, printing a definition-not-found message when none exists.

#### Scenario: Screen definition selection by locale

- **GIVEN** a request for a screen absent from the ja_JP definitions
- **WHEN** the screen is rendered
- **THEN** the en_US definition of that screen is used

### Requirement: Locale-aware number and currency formatting

Recovered from: LOC-REQ-0005

The system SHALL format currency and numbers according to a given locale and a given number of fraction digits.

#### Scenario: Locale-aware number and currency formatting

- **GIVEN** the amount 1234.5 and locale en_US with 2 fraction digits
- **WHEN** it is formatted as currency
- **THEN** the US-style string with two decimals is produced

### Requirement: Change-locale recorded in controller state

Recovered from: LOC-WF-0010

The system SHALL record the chosen locale in the session controller state when a change-locale event is processed.

#### Scenario: Change-locale recorded in controller state

- **GIVEN** a change-locale event for ja_JP
- **WHEN** the event is processed
- **THEN** the controller state holds ja_JP

### Requirement: Common page layout

Recovered from: CAT-SCR-0012

The page layout SHALL display every screen assembled from a common template with named parts (title, banner, body, footer) defined per screen and locale, and the system SHALL show the parts defined for the selected locale.

#### Scenario: Common page layout

- **GIVEN** a screen defined for en_US with title, banner, body and footer parts
- **WHEN** the screen is displayed
- **THEN** the page shows the shared layout with those parts filled in from that screen's definition

### Requirement: Client-state change-locale restore

Recovered from: LOC-REQ-0014

The system SHALL, for the client-state variant of change-locale, restore request attributes carried as encoded form fields prefixed with the cache id and then show the screen named by referring_screen.

#### Scenario: Client-state change-locale restore

- **GIVEN** a page that keeps its state in encoded form fields and a referring_screen value
- **WHEN** the user changes language
- **THEN** the attributes are restored and the referring screen is shown

### Requirement: Locale chooser options

Recovered from: LOC-REQ-0015

The locale-change page SHALL offer US English, German, Japanese and Simplified Chinese as choices.

#### Scenario: Locale chooser options

- **GIVEN** the locale-change page
- **WHEN** it is displayed
- **THEN** four language choices are listed (German is offered here although no German definitions are deployed)

### Requirement: Supported storefront locales

Recovered from: LOCALIZATION-REQ-0001

The system SHALL support en_US (default), ja_JP and zh_CN, each with its own screen definitions and page copies, and SHALL let a user change locale.

#### Scenario: Supported storefront locales

- **GIVEN** a visitor on the storefront
- **WHEN** they choose Japanese
- **THEN** pages are served in ja_JP

### Requirement: Request text read as UTF-8

Recovered from: LOCALIZATION-REQ-0002

The system SHALL read all request text as UTF-8.

#### Scenario: Request text read as UTF-8

- **GIVEN** a form submission containing Japanese characters
- **WHEN** it is processed
- **THEN** the characters are stored without corruption

### Requirement: Request encoding applied first

Recovered from: LOC-REQ-0001

The system SHALL set the character encoding of every incoming request to the configured encoding (UTF-8) before later processing reads request parameters.

#### Scenario: Request encoding applied first

- **GIVEN** a request with Chinese text in a field
- **WHEN** the parameter is read
- **THEN** the text is decoded as UTF-8

### Requirement: Encoding applied to all URLs before sign-on

Recovered from: LOC-REQ-0002

The system SHALL apply the encoding step to all storefront request URLs ahead of the sign-on check.

#### Scenario: Encoding applied to all URLs before sign-on

- **GIVEN** any storefront URL
- **WHEN** a request arrives
- **THEN** encoding is set before the sign-on check runs

### Requirement: Storefront uses UTF-8

Recovered from: LOC-BR-0001

The system SHALL use UTF-8 as the request character encoding for the storefront.

#### Scenario: Storefront uses UTF-8

- **GIVEN** the storefront configuration
- **WHEN** the application starts
- **THEN** the configured encoding is UTF-8

### Requirement: Unconfigured encoding falls through as null

Recovered from: LOC-BR-0002

The system SHALL pass a null encoding to the request when no encoding is configured, so that the declared ASCII default does not apply.

#### Scenario: Unconfigured encoding falls through as null

- **GIVEN** no encoding configured
- **WHEN** the filter initialises
- **THEN** the encoding is null and not ASCII

### Requirement: Cart locale

Recovered from: CART-REQ-0008

The system SHALL default a cart's locale to US English and SHALL allow it to be set per cart so that catalog text and prices are fetched in that locale.

#### Scenario: Cart locale

- **GIVEN** a new cart
- **WHEN** it is created
- **THEN** its locale is en_US until set otherwise

### Requirement: Catalog text by locale

Recovered from: CATB-REQ-0007

The system SHALL select all catalog names, descriptions and item details by the caller's locale string.

#### Scenario: Catalog text by locale

- **GIVEN** a caller using ja_JP
- **WHEN** a category is requested
- **THEN** the Japanese name and description are returned

### Requirement: Order email locale

Recovered from: LOCAL-BR-0001

The system SHALL render order-status and completed-order emails in the locale stored on the order (English, Japanese or Chinese), treating "default" as the server default and a locale string without an underscore as no locale.

#### Scenario: Order email locale

- **GIVEN** an order with stored locale ja_JP
- **WHEN** a status email is produced
- **THEN** the Japanese template is used

### Requirement: Catalog integrity check of item descriptions

Recovered from: BATCH-REQ-0003

The catalog integrity check SHALL report every item lacking an item description for any locale configured on the item's category.

#### Scenario: Catalog integrity check of item descriptions

- **GIVEN** a category configured for en_US and ja_JP and an item with only en_US text
- **WHEN** the check runs
- **THEN** the item is reported

### Requirement: Category detail per locale

Recovered from: CAT-ENT-0001

The system SHALL store a category's name, image and description per locale, require name and locale, allow one detail row per category and locale, and reference an existing category.

#### Scenario: Category detail per locale

- **GIVEN** a category with an en_US detail row
- **WHEN** a second en_US row is added
- **THEN** it is rejected

### Requirement: Product detail per locale

Recovered from: LOCALIZATION-ENT-0001

The system SHALL hold product details per product id and locale with a mandatory name up to 80 characters and optional image and description up to 255 characters, and SHALL reject details for a nonexistent product.

#### Scenario: Product detail per locale

- **GIVEN** details for an unknown product id
- **WHEN** they are stored
- **THEN** the store is refused

### Requirement: Item detail per locale

Recovered from: LOCALIZATION-ENT-0002

The system SHALL hold item details per item id and locale with mandatory list price, unit cost (decimal 10,2), image and description, up to five optional 80-character attributes, and SHALL reject details for a nonexistent item.

#### Scenario: Item detail per locale

- **GIVEN** item details lacking a unit cost
- **WHEN** they are stored
- **THEN** the store is refused

### Requirement: Customer profile language

Recovered from: LOCALIZATION-ENT-0003

The system SHALL store for each customer profile a required preferred language, an optional favorite category and required my-list and banner flags.

#### Scenario: Customer profile language

- **GIVEN** a profile without a preferred language
- **WHEN** it is stored
- **THEN** it is rejected

### Requirement: Catalog detail required fields

Recovered from: CATALOG-RULE-0001

The system SHALL require a name for every category and product detail row, and list price, unit cost, image and description for every item detail row, with at most one row per item and locale.

#### Scenario: Catalog detail required fields

- **GIVEN** an item detail row without an image
- **WHEN** it is stored
- **THEN** it is rejected

### Requirement: Profile preference fields required

Recovered from: CUSTACCT-RULE-0002

The system SHALL require a preferred language and list and banner flags on every profile, and a favourite category MAY be left unset.

#### Scenario: Profile preference fields required

- **GIVEN** a profile with no favourite category
- **WHEN** it is stored
- **THEN** it is accepted

### Requirement: Product detail uniqueness per locale

Recovered from: CAT-ENT-0002

Each product SHALL have at most one set of details per locale, each requiring a name of at most 80 characters, and details SHALL reference an existing product.

#### Scenario: Product detail uniqueness per locale

- **GIVEN** a product with an ja_JP detail row
- **WHEN** another ja_JP row is added
- **THEN** it is rejected

### Requirement: Item detail uniqueness per locale

Recovered from: CAT-ENT-0003

Each item SHALL have at most one set of details per locale, with mandatory list price, unit cost, image and description, and details SHALL reference an existing item.

#### Scenario: Item detail uniqueness per locale

- **GIVEN** an item with a zh_CN detail row
- **WHEN** another zh_CN row is added
- **THEN** it is rejected

### Requirement: Order and purchase order counters

Recovered from: WORKFLOW-ENT-0001

The system SHALL keep named integer counters, one row per name, used to generate order and purchase order identifiers.

#### Scenario: Order and purchase order counters

- **GIVEN** a counter named for orders
- **WHEN** a new order is placed
- **THEN** the next value is drawn from that counter

### Requirement: Unhandled exception routing

Recovered from: ORD-REQ-0002

The system SHALL forward an unhandled exception to the error screen mapped to its type, and MUST fail with a general servlet error if none is mapped.

#### Scenario: Unhandled exception routing

- **GIVEN** an exception type with a mapped error screen
- **WHEN** it is raised during a request
- **THEN** that error screen is shown

### Requirement: Previous-screen navigation

Recovered from: CATBRW-REQ-0001

The system SHALL render every page from a template with named parts (title, banner, sidebar, body, footer) and SHALL support a previous-screen request that re-displays the last screen shown in the session.

#### Scenario: Previous-screen navigation

- **GIVEN** a session that last showed screen X
- **WHEN** a previous-screen request is made
- **THEN** screen X is displayed again

### Requirement: Locale list in deployment configuration

Recovered from: LOCA-REQ-0001

The system SHALL support the locales en_US, ja_JP and zh_CN with en_US as the default.

#### Scenario: Locale list in deployment configuration

- **GIVEN** the deployment configuration
- **WHEN** the locale list is read
- **THEN** three locales are available with en_US default

### Requirement: Format and word-break per locale

Recovered from: LOC-REQ-0004

The system SHALL format currency and numbers per locale with a caller-specified number of fraction digits, and SHALL split search keywords into words using locale-specific word-break rules.

#### Scenario: Format and word-break per locale

- **GIVEN** a Japanese search phrase
- **WHEN** it is split into keywords
- **THEN** locale word-break rules are used

### Requirement: Change-locale notifies business tier

Recovered from: LOC-REQ-0003

The system SHALL, on a change-locale request with a language_COUNTRY locale parameter, store it on the session and notify the business tier, and MUST fail with "Unable to change language" when the parameter is missing or lacks an underscore.

#### Scenario: Change-locale notifies business tier

- **GIVEN** a change request with locale "ja"
- **WHEN** it is processed
- **THEN** the request fails with the error

### Requirement: Language switch by value

Recovered from: LOCAL-REQ-0001

The system SHALL let a user change the session language by submitting a locale value and SHALL reject the request when it cannot be resolved to a locale.

#### Scenario: Language switch by value

- **GIVEN** an unresolvable locale value
- **WHEN** it is submitted
- **THEN** an error is returned and the language is unchanged

### Requirement: Default language for new sessions

Recovered from: LOCAL-REQ-0002

The system SHALL set the session language to en_US for any controller request arriving on a session with no language.

#### Scenario: Default language for new sessions

- **GIVEN** a session with no language
- **WHEN** any request arrives
- **THEN** the language is en_US

### Requirement: Page language selection with fallback

Recovered from: LOCAL-REQ-0003

The system SHALL choose screen definitions using the request locale parameter, else the session locale, and SHALL fall back to the default locale when none exist for the locale or the screen.

#### Scenario: Page language selection with fallback

- **GIVEN** a locale with no definition for the requested page
- **WHEN** the page is requested
- **THEN** the default-locale page is shown

### Requirement: Language chooser entries

Recovered from: LOCAL-REQ-0004

The language chooser SHALL list US English (en_US), German (de_DE), Japanese (ja_JP) and Simplified Chinese (zh_CN).

#### Scenario: Language chooser entries

- **GIVEN** the chooser
- **WHEN** it is displayed
- **THEN** four entries are listed

### Requirement: Catalog locale selection by code

Recovered from: LOCALIZATION-REQ-0008

The system SHALL return catalog names, descriptions and item details in the requested locale by selecting locale-specific rows by locale code.

#### Scenario: Catalog locale selection by code

- **GIVEN** a request for zh_CN
- **WHEN** an item is fetched
- **THEN** the zh_CN row is returned

### Requirement: Catalog queries resolved against a locale

Recovered from: CATA-REQ-0007

The system SHALL resolve every catalog query against a locale and select localized names and descriptions by that locale's string form.

#### Scenario: Catalog queries resolved against a locale

- **GIVEN** a catalog query
- **WHEN** it executes
- **THEN** it is bound to a locale string

### Requirement: Encoding filter requirement (pass c)

Recovered from: LOCALIZATION-BR-0002

The system SHALL leave the request encoding unset to ASCII when no encoding setting is supplied to the filter, the configured encoding being null.

#### Scenario: Encoding filter requirement (pass c)

- **GIVEN** no encoding setting
- **WHEN** the filter initialises
- **THEN** the encoding is null
