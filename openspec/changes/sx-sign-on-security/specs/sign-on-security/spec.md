## ADDED Requirements

### Requirement: Credential authentication

Recovered from: SIGN-RULE-0003

The system SHALL treat a user as authenticated only when a user with the supplied name exists and the supplied password is exactly equal to the stored password; an unknown user MUST fail authentication.

#### Scenario: Matching credentials

- **GIVEN** a registered user "alice" with password "secret"
- **WHEN** "alice" and "secret" are submitted
- **THEN** authentication succeeds

#### Scenario: Wrong password or unknown user

- **GIVEN** a registered user "alice" and no user "bob"
- **WHEN** "alice" with a different password, or "bob" with any password, is submitted
- **THEN** authentication fails

### Requirement: Protected screens require sign-on

Recovered from: SIGN-ON-SECURITY-REQ-0001

The system SHALL require sign-on before a user can reach the customer account screen and action, the enter-order-information screen and the sign-on welcome screen, and SHALL present the sign-on form to unauthenticated users; all other storefront screens MAY be used anonymously. The requested resource MUST be remembered so the user is returned to it after sign-on.

#### Scenario: Anonymous user requests a protected screen

- **GIVEN** a session that is not signed on
- **WHEN** the customer account screen is requested
- **THEN** the sign-on form is shown and the requested screen is remembered

#### Scenario: Anonymous user requests an unprotected screen

- **GIVEN** a session that is not signed on
- **WHEN** the catalog screen is requested
- **THEN** the screen is shown unchanged

### Requirement: Sign-on submission outcome

Recovered from: SIGN-RULE-0002

When a sign-on is submitted with matching credentials the system SHALL mark the session as signed on, record the user name in the session and redirect to the originally requested resource; otherwise it SHALL redirect to the sign-on error page. The system SHOULD define behaviour when no originally requested resource exists, because the legacy flow leaves it unhandled.

#### Scenario: Successful sign-on

- **GIVEN** a user who was sent to sign-on from the customer account screen
- **WHEN** valid credentials are submitted
- **THEN** the session is signed on and the customer account screen is shown

#### Scenario: Failed sign-on

- **GIVEN** the sign-on form
- **WHEN** invalid credentials are submitted
- **THEN** the sign-on error page is shown and the session is not signed on

### Requirement: Remember user name

Recovered from: SIGN-RULE-0004

When a sign-on is submitted with the remember-user-name option the system SHALL store the user name in a cookie named bp_signon valid for 31 days (2678400 seconds); when the option is absent the system SHALL expire any existing bp_signon cookie. The cookie MUST hold the user name only.

#### Scenario: Option selected

- **GIVEN** the sign-on form
- **WHEN** it is submitted with remember-user-name selected
- **THEN** a bp_signon cookie with the user name and a 31-day lifetime is set

#### Scenario: Option not selected

- **GIVEN** an existing bp_signon cookie
- **WHEN** a sign-on is submitted without the option
- **THEN** the cookie is expired

### Requirement: Credential creation limits

Recovered from: SIGN-RULE-0005

The system SHALL reject creation of a user whose user name exceeds 25 characters, whose password exceeds the maximum password length, or whose user name contains '%' or '\*'.

#### Scenario: Wildcard in user name

- **GIVEN** a user creation request
- **WHEN** the user name is "ab\*c"
- **THEN** creation is rejected and the user creation error page is shown

#### Scenario: Over-long user name

- **GIVEN** a user creation request
- **WHEN** the user name has 26 characters
- **THEN** creation is rejected

### Requirement: Credential record

Recovered from: SIGN-ENT-0007

The system SHALL keep a user credential record with a unique user name as identifier and a password.

#### Scenario: Duplicate user name

- **GIVEN** an existing credential for "alice"
- **WHEN** another credential for "alice" is created
- **THEN** the creation is rejected

### Requirement: Credential storage constraints

Recovered from: SIGNON-ENT-0001

The system SHALL store sign-on credentials as one row per user name with the user name unique and the password required; the legacy system holds the password as plain text.

#### Scenario: Credential stored

- **GIVEN** a new user "alice"
- **WHEN** the credential is saved
- **THEN** exactly one credential row exists for "alice" with a password

### Requirement: Credential field sizes

Recovered from: SIGN-ON-SECURITY-ENTITY-0001

The system SHALL store one sign-on credential per username, where username (max 50 chars) is unique and both username and password (max 50 chars) are mandatory.

#### Scenario: Missing password

- **GIVEN** a credential with a user name
- **WHEN** it is saved without a password
- **THEN** the save is rejected

### Requirement: Customer linked to sign-on user

Recovered from: CUST-ENT-0001

The system SHALL link each customer, identified by the sign-on user name, to exactly one existing sign-on user, one account and one profile.

#### Scenario: Customer for unknown user

- **GIVEN** no sign-on user "carol"
- **WHEN** a customer for "carol" is created
- **THEN** the creation is rejected

### Requirement: Storefront session timeout

Recovered from: SEC-REQ-0012

The system SHALL expire an idle storefront web session after 15 minutes.

#### Scenario: Idle storefront session

- **GIVEN** a storefront session idle for 15 minutes
- **WHEN** the next request arrives
- **THEN** the session is expired

### Requirement: Framework session timeout

Recovered from: SGN-REQ-0002

The system SHALL expire an inactive web session of the shared web framework after 30 minutes; this conflicts with the 15 and 54 minute values of the applications and is pending a decision.

#### Scenario: Idle framework session

- **GIVEN** a session governed by the framework default idle for 30 minutes
- **WHEN** the next request arrives
- **THEN** the session is expired

### Requirement: Administrator-only supplier inventory

Recovered from: SUPF-RULE-0009

The system SHALL restrict the supplier inventory update handler to authenticated users in the administrator role using form-based login, and SHALL show a "not authorised" message on the inventory screen to a user not in that role. The session timeout MUST be 54 minutes.

#### Scenario: Non-administrator views inventory

- **GIVEN** a signed-in user without the administrator role
- **WHEN** the inventory screen is displayed
- **THEN** a "not authorised" message is shown

#### Scenario: Unauthenticated update request

- **GIVEN** no signed-in user
- **WHEN** the inventory update handler is requested
- **THEN** the form-based login is presented

### Requirement: Session identity on sign-on

Recovered from: SIGN-ON-SECURITY-REQ-0003

When a session becomes signed on, the system SHALL tell the back end the user's identity, load the customer record and set the session language to the customer's preferred language.

#### Scenario: Customer signs on

- **GIVEN** a customer whose preferred language is Japanese
- **WHEN** the session becomes signed on
- **THEN** the session and cart language are Japanese

### Requirement: Sign-off

Recovered from: SIGN-ON-SECURITY-REQ-0004

When a user signs off the system SHALL discard the whole session including cart and customer, and start a fresh session that keeps only the current locale.

#### Scenario: Sign-off with items in cart

- **GIVEN** a signed-on user with items in the cart
- **WHEN** the user signs off
- **THEN** the cart and customer are gone and the locale is retained

### Requirement: First-time sign-on and account creation

Recovered from: SEC-REQ-0013

When a customer signs on with no customer record yet, the system SHALL leave the locale to be set during account creation; when account creation finishes it SHALL mark the session as signed on and return to the originally requested page, or the main screen if that was the customer page.

#### Scenario: Account created after sign-on

- **GIVEN** a new user signed on with no customer record who was sent from the customer page
- **WHEN** account creation finishes
- **THEN** the session is signed on and the main screen is shown

### Requirement: Declared sign-in-required mappings

Recovered from: SGN-REQ-0001

The system SHALL mark edit account, sign in, place order, and shipping and billing validation screens as requiring sign-in; reachability in the legacy framework is unresolved.

#### Scenario: Screen flagged as requiring sign-in

- **GIVEN** the place-order screen is flagged as requiring sign-in
- **WHEN** an anonymous user requests it
- **THEN** the sign-in screen is shown

### Requirement: Purchase order operations without role restriction

Recovered from: SUPPLIER-REQ-0004

The system SHALL allow all callers to invoke purchase order, contact info, address, credit card and line item operations without role restriction, and SHALL run every method in a transaction.

#### Scenario: Caller without role

- **GIVEN** a caller with no role
- **WHEN** a purchase order operation is invoked
- **THEN** it is permitted and runs in a transaction

### Requirement: Customer operations without role restriction

Recovered from: CUSTACC-BR-0005

The system SHALL NOT restrict access by role to the customer, profile, contact info, address and credit card operations at the component level.

#### Scenario: Caller without role

- **GIVEN** a caller with no role
- **WHEN** a customer operation is invoked
- **THEN** it is not refused for lack of a role

### Requirement: Admin sign-in form

Recovered from: SIGN-SCR-0001

The admin sign-in screen SHALL present a form with User ID and Password fields, pre-filled with the demo credentials jps_admin / admin, and submitting it MUST authenticate through the container's form login.

#### Scenario: Admin sign-in displayed

- **GIVEN** an unauthenticated visitor requests the admin entry point
- **WHEN** the sign-in screen is displayed
- **THEN** it shows User ID and Password fields pre-filled with jps_admin and admin and a submit control

#### Scenario: Invalid credentials submitted

- **GIVEN** the admin sign-in form
- **WHEN** invalid credentials are submitted
- **THEN** a "Login Error" page is shown with a link back to sign-in
