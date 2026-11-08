# Legacy implementation notes: customer accounts

## User interface

No screen records were extracted for this capability; its user interface is unspecified. Legacy screens (customer form, duplicate-account screen, my-list panel) are only visible through behaviour records.

## How the legacy application implements it

- Customer, Account, Profile, ContactInfo, Address and CreditCard are EJB 2.x CMP entity beans; creation hooks (ejbPostCreate) create dependent beans through JNDI, and ejb-jar.xml declares cascade-delete and an EJB-QL findAllCustomers.
- The web tier (CustomerHTMLAction, CreateUserHTMLAction, CreateUserEJBAction) creates the sign-on user first, then the customer. Lookup failures are also reported as duplicate-account.
- The second password field is read but never compared. Credit card and profile required-field checks build a list that is never raised (suspected defect, see ACC-REQ-0010 dispute).
- CreateUserFlowHandler dereferences the saved original URL without a null check.
- mylist.jsp forces en_US and a count of 10.
- Address XML exchange (DTD Address 1.1: one or two StreetName elements, city, state, zip, country; wrong root raises an XML document error) is recorded in the passes but not written as requirements: its record keys CUSTOMER-ACCOUNTS-REQ-0004 and -0005 collide with the petstore records of the same key.
- Record keys collide across passes (CUST-ENT-0001, CUSTACC-ENT-0001, CUSTACC-REQ-0002, CUSTACC-BR-0003, CUSTOMER-ACCOUNTS-ENTITY-0001). The requirement for each uses one of the colliding records.
- Records BATCH-OPERATIONS-REQ-0001 (Populate endpoint) belongs to another capability and is excluded.
- Account status is not validated against active/disabled in code, and the DDL has no CHECK.
