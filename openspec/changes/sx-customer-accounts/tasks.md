## 1. Data model

- [ ] 1.1 Define Customer keyed by unique user id, linked one-to-one to Account and Profile
- [ ] 1.2 Define Account with status (active, disabled), contact info and credit card
- [ ] 1.3 Define Profile with preferred language, favorite category, my-list and banner flags
- [ ] 1.4 Define ContactInfo and Address with the mandatory and optional fields
- [ ] 1.5 Enforce foreign keys and NOT NULL constraints from the legacy schema
- [ ] 1.6 Implement cascade delete of dependent records

## 2. Creation and defaults

- [ ] 2.1 Create customer with default active account and default profile
- [ ] 2.2 Create empty contact and credit card when none supplied
- [ ] 2.3 Create or link the address for a contact
- [ ] 2.4 Handle duplicate user name by showing the duplicate-account outcome without creating a customer
- [ ] 2.5 Mark session signed on after creation and return to the originating page

## 3. Update and profile

- [ ] 3.1 Update contact, card and profile and switch session locale
- [ ] 3.2 Validate required contact fields and report the missing ones
- [ ] 3.3 Support en_US, ja_JP and zh_CN with UTF-8 input
- [ ] 3.4 Show the my-list panel with the first 10 items of the favorite category

## 4. Queries

- [ ] 4.1 List all customers and look up by user id
- [ ] 4.2 Return contact information with nested address as one object
- [ ] 4.3 Settle disputed items: required language and category, contact XML, user creation failure path
