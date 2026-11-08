## ADDED Requirements

### Requirement: Duplicate account rejection

Recovered from: ACC-REQ-0008

The system SHALL raise a duplicate-account error and show the duplicate-account screen when a new user name and password cannot be created as a user (including a user name already in use or an unreachable sign-on component), and SHALL remember the user id for the session on success.

#### Scenario: Duplicate account rejection

- **GIVEN** a user name that already exists
- **WHEN** a new account is submitted with that user name and a password
- **THEN** the duplicate-account screen is shown and no user id is remembered

### Requirement: Customer record creation and update copy

Recovered from: ACC-REQ-0009

The system SHALL create a customer record for the just-created user id and copy the submitted contact info, address, credit card and profile onto it, SHALL overwrite the same fields on update, and SHALL set the session locale to the profile's preferred language.

#### Scenario: Customer record creation and update copy

- **GIVEN** a newly created user id and a submitted customer form with preferred language ja_JP
- **WHEN** the customer is created
- **THEN** contact info, address, credit card and profile are stored and the session locale is Japanese

### Requirement: Customer form required profile fields

Recovered from: ACC-REQ-0010

The system SHALL require language and favorite category on the customer form, and my-list and banner preferences SHALL be on only when their checkbox is submitted.

#### Scenario: Customer form required profile fields

- **GIVEN** a customer form submitted without the my-list checkbox
- **WHEN** the form is processed
- **THEN** the my-list preference is stored as off

### Requirement: Supported locales and encoding

Recovered from: LOC-REQ-0014

The system SHALL serve screens in English (en_US), Japanese (ja_JP) and Chinese (zh_CN), SHALL default to en_US, and SHALL read request text as UTF-8.

#### Scenario: Supported locales and encoding

- **GIVEN** a request with no locale selected
- **WHEN** a screen is served
- **THEN** it is served in en_US

### Requirement: Customer creation from form

Recovered from: CUSTOMER-ACCOUNTS-REQ-0001

The system SHALL create a customer from a submitted form holding contact info (last name, first name, street address, city, state or province, postal code, country, telephone, optional email and address line 2), a credit card (number, type, expiry month and year) and profile preferences (language, favorite category, my-list, banners), and SHALL store them on the customer's account, address, card and profile.

#### Scenario: Customer creation from form

- **GIVEN** a complete customer form
- **WHEN** it is submitted for a newly created user id
- **THEN** the account, address, credit card and profile hold the submitted values

### Requirement: Customer update and locale switch

Recovered from: CUSTOMER-ACCOUNTS-REQ-0002

The system SHALL let a signed-on customer update contact info, credit card and profile preferences, and SHALL switch the session locale to the chosen preferred language after an update.

#### Scenario: Customer update and locale switch

- **GIVEN** a signed-on customer
- **WHEN** they update the preferred language to zh_CN
- **THEN** the values are saved and the session locale becomes zh_CN

### Requirement: Required contact fields

Recovered from: CUSTOMER-ACCOUNTS-REQ-0003

The system SHALL require last name, first name, street address, city, state or province, postal code and telephone number on the customer contact form and SHALL report the missing fields.

#### Scenario: Required contact fields

- **GIVEN** a contact form with the city left blank
- **WHEN** it is submitted
- **THEN** the missing city is reported

### Requirement: No customer on failed user creation

Recovered from: CUSTOMER-ACCOUNTS-REQ-0004

The system SHALL show the duplicate account screen and SHALL NOT create a customer when the sign-on component cannot create the user.

#### Scenario: No customer on failed user creation

- **GIVEN** a user name already in use
- **WHEN** a new account is submitted
- **THEN** the duplicate account screen is shown and no customer is created

### Requirement: Post-creation sign-on and return

Recovered from: CUSTOMER-ACCOUNTS-REQ-0005

The system SHALL mark the session as signed on when customer creation completes and SHALL return the user to the screen they were on before sign-up, or to the main screen if that was the customer account page.

#### Scenario: Post-creation sign-on and return

- **GIVEN** a customer created from the customer account page
- **WHEN** creation completes
- **THEN** the session is signed on and the main screen is shown

### Requirement: My list preference panel

Recovered from: CUSTOMER-ACCOUNTS-REQ-0006

The system SHALL offer the profile preference my-list and, when on, SHALL show the first 10 products of the customer's favorite category (English locale) on pages that include the my-list panel.

#### Scenario: My list preference panel

- **GIVEN** a customer with my-list on and a favorite category of 25 products
- **WHEN** a page with the panel is displayed
- **THEN** 10 products from that category are listed

### Requirement: Contact information content

Recovered from: CUST-ENT-0001

The system SHALL hold contact information as a given name, family name, telephone, e-mail address and exactly one associated postal address.

#### Scenario: Contact information content

- **GIVEN** a contact record
- **WHEN** it is read
- **THEN** it carries all four fields and exactly one address

### Requirement: Contact deletion removes address

Recovered from: CUST-RULE-0002

The system SHALL remove a contact's address together with the contact when the contact is deleted.

#### Scenario: Contact deletion removes address

- **GIVEN** a contact with an address
- **WHEN** the contact is deleted
- **THEN** the address is deleted too

### Requirement: Address creation for a contact

Recovered from: CUST-RULE-0003

The system SHALL create a new empty address for a contact created without address data, SHALL create the address from supplied data when created from a contact data object, and SHALL link a supplied existing address instead of creating one.

#### Scenario: Address creation for a contact

- **GIVEN** a contact created without address data
- **WHEN** creation completes
- **THEN** an empty address is attached

### Requirement: Contact data not validated

Recovered from: CUST-REQ-0004

The system SHALL accept contact data without field validation and SHALL fail contact creation with an error when the address service cannot be located.

#### Scenario: Contact data not validated

- **GIVEN** contact data with an empty telephone
- **WHEN** the contact is created
- **THEN** it is accepted without error

### Requirement: Contact data object

Recovered from: CUST-REQ-0005

The system SHALL return the full contact information, including the nested address, as a single data object on request.

#### Scenario: Contact data object

- **GIVEN** a stored contact with an address
- **WHEN** it is requested
- **THEN** one object with name, phone, email and address is returned

### Requirement: No contact checks in component

Recovered from: CUST-RULE-0006

The system SHALL NOT impose format, length or required-value checks on contact name, telephone or e-mail within the contact component.

#### Scenario: No contact checks in component

- **GIVEN** a contact with a malformed e-mail
- **WHEN** it is stored
- **THEN** no component-level error is raised

### Requirement: Contact XML representation

Recovered from: CUST-REQ-0007

The system MAY represent a contact as an XML document with elements FamilyName, GivenName, Address, Email and Phone in that order.

#### Scenario: Contact XML representation

- **GIVEN** a contact
- **WHEN** it is exported as XML
- **THEN** elements appear in that order

### Requirement: Address stored as supplied

Recovered from: CUST-RULE-0001

The system SHALL store address fields exactly as supplied with no validation, normalisation or required-field check at the address component level.

#### Scenario: Address stored as supplied

- **GIVEN** an address with an empty city
- **WHEN** it is created
- **THEN** it is stored unchanged

### Requirement: Address creation forms

Recovered from: CUST-REQ-0001

The system SHALL allow an address to be created from individual fields, by copying another address, or empty, and SHALL return its contents as a plain address data object.

#### Scenario: Address creation forms

- **GIVEN** an existing address
- **WHEN** a copy is created
- **THEN** the copy has the same six values

### Requirement: Profile entity constraints

Recovered from: CUSTOMER-ACCOUNTS-ENTITY-0001

The system SHALL store one profile per profile id with a mandatory preferred language (at most 10 characters), mandatory my-list and banner flags, and an optional favorite category.

#### Scenario: Profile entity constraints

- **GIVEN** a profile without favorite category
- **WHEN** it is stored
- **THEN** it is accepted

### Requirement: Active account on customer creation

Recovered from: CUSTACC-BR-0001

The system SHALL, when a customer is created, automatically create an account with status "active" and attach it to the customer.

#### Scenario: Active account on customer creation

- **GIVEN** a new customer
- **WHEN** creation completes
- **THEN** the customer has an account with status active

### Requirement: Profile defaults

Recovered from: CUSTACC-BR-0002

The system SHALL, when a customer is created, create a profile with preferred language en_US, no favourite category, and the my-list and banner preferences enabled.

#### Scenario: Profile defaults

- **GIVEN** a new customer
- **WHEN** creation completes
- **THEN** the profile has those defaults

### Requirement: Empty contact and card for new account

Recovered from: CUSTACC-BR-0003

The system SHALL, when an account is created without contact and card details, create an empty contact record and an empty credit card record and attach both; supplied details SHALL be attached instead.

#### Scenario: Empty contact and card for new account

- **GIVEN** an account created without details
- **WHEN** creation completes
- **THEN** empty contact and credit card records are attached

### Requirement: Cascade delete of customer data

Recovered from: CUSTACC-BR-0004

The system SHALL delete a customer's account, profile, contact details, address and credit card record when the owning record is deleted.

#### Scenario: Cascade delete of customer data

- **GIVEN** a customer with all dependent records
- **WHEN** the customer is deleted
- **THEN** all dependent records are deleted

### Requirement: Customer identity

Recovered from: CUSTACC-ENT-0001

The system SHALL hold each customer as one record identified by a unique user id, linked one-to-one to an account and a profile.

#### Scenario: Customer identity

- **GIVEN** a customer user id
- **WHEN** it is created twice
- **THEN** the second attempt is rejected

### Requirement: Account status values

Recovered from: CUSTACC-REQ-0001

The system SHALL allow an account status of "active" or "disabled".

#### Scenario: Account status values

- **GIVEN** an account
- **WHEN** its status is set to disabled
- **THEN** the status is stored as disabled

### Requirement: Customer lookup and listing

Recovered from: CUSTACC-REQ-0002

The system SHALL provide a way to list all customers and to look one up by user id.

#### Scenario: Customer lookup and listing

- **GIVEN** three customers
- **WHEN** all are listed
- **THEN** three customers are returned

### Requirement: No role restriction at component level

Recovered from: CUSTACC-BR-0005

The system SHALL NOT restrict access by role to the customer, profile, contact info, address and credit card operations at the component level.

#### Scenario: No role restriction at component level

- **GIVEN** any caller in the container
- **WHEN** it invokes these operations
- **THEN** no role check is applied

### Requirement: Profile fields

Recovered from: CUSTACC-ENT-0004

The system SHALL keep for each profile a preferred language, a favourite category, a my-list preference and a banner preference.

#### Scenario: Profile fields

- **GIVEN** a profile
- **WHEN** it is read
- **THEN** the four values are available

### Requirement: Account creation via sign-on form

Recovered from: SIGN-REQ-0006

The system SHALL, when a user-creation form is posted with a user name and password, create a sign-on account and redirect to the target page, or to the user creation error page if creation fails.

#### Scenario: Account creation via sign-on form

- **GIVEN** a posted user name and password
- **WHEN** creation succeeds
- **THEN** the user is redirected to the target page

### Requirement: Account creation failure redirect

Recovered from: SIGN-WF-0006

The system SHALL redirect to the user creation error page when the sign-on service fails to create a user posted via the new-user form.

#### Scenario: Account creation failure redirect

- **GIVEN** a duplicate user name
- **WHEN** the form is posted
- **THEN** the user creation error page is shown

### Requirement: Customer row and sign-on link

Recovered from: ACCOUNTS-ENT-0001

The system SHALL represent a customer as one row keyed by user identifier that equals an existing sign-on user name, linked to exactly one account and one profile.

#### Scenario: Customer row and sign-on link

- **GIVEN** a customer user id with no sign-on user
- **WHEN** the customer is stored
- **THEN** it is rejected

### Requirement: Account required parts

Recovered from: ACCOUNTS-ENT-0002

The system SHALL require every account to have a status, one contact-information record and one payment card; contact information SHALL require family name, given name, telephone, e-mail and address; an address SHALL require street 1, city, state, zip and country, street 2 optional.

#### Scenario: Account required parts

- **GIVEN** an address without zip code
- **WHEN** it is stored
- **THEN** it is rejected

### Requirement: Customer composition

Recovered from: CUSTACCT-ENT-0001

The system SHALL model a customer as exactly one sign-on user, one account and one profile.

#### Scenario: Customer composition

- **GIVEN** a customer
- **WHEN** it is read
- **THEN** it links one user, one account and one profile

### Requirement: Contact and address mandatory columns

Recovered from: CUSTACCT-RULE-0001

The system SHALL require family name, given name, telephone, e-mail and an address for every contact record, and street, city, state, zip code and country for every address; street line 2 is optional.

#### Scenario: Contact and address mandatory columns

- **GIVEN** a contact without e-mail
- **WHEN** it is stored
- **THEN** it is rejected

### Requirement: Address identity and requireds

Recovered from: ADDR-ENT-0001

The system SHALL require street line 1, city, state, zip code and country for every address, with street line 2 optional, each address identified by a unique id.

#### Scenario: Address identity and requireds

- **GIVEN** an address without street line 2
- **WHEN** it is stored
- **THEN** it is accepted

### Requirement: Contact requireds

Recovered from: CONTACT-ENT-0001

The system SHALL require family name, given name, telephone, email and an existing address for every contact record.

#### Scenario: Contact requireds

- **GIVEN** a contact referencing a missing address
- **WHEN** it is stored
- **THEN** it is rejected

### Requirement: Account requireds

Recovered from: ACCT-ENT-0001

The system SHALL require every account to have a status, an existing contact record and an existing credit card.

#### Scenario: Account requireds

- **GIVEN** an account referencing a missing credit card
- **WHEN** it is stored
- **THEN** it is rejected
