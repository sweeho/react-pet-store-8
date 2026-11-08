## 1. Approval rules

- [ ] 1.1 Implement per-locale automatic approval limits and decide the boundary inclusivity
- [ ] 1.2 Leave orders of other locales pending for manual decision

## 2. Approval document

- [ ] 2.1 Define the OrderApproval document with order id and status entries
- [ ] 2.2 Reject non-conforming or wrongly rooted documents

## 3. Admin workflow

- [ ] 3.1 List orders by status with total count
- [ ] 3.2 Mark orders Approved or Denied and apply on commit
- [ ] 3.3 Confirm refresh with uncommitted changes
- [ ] 3.4 Colour status and restrict editing to status
- [ ] 3.5 Show fatal error dialog and disable actions during calls
- [ ] 3.6 Implement the admin service request types and unknown-type error
- [ ] 3.7 Implement revenue and order aggregation

## 4. Admin entry and views

- [ ] 4.1 Build the admin start page and client launch
- [ ] 4.2 Provide the read-only order status view

## 5. Notifications and batch

- [ ] 5.1 Render status emails in the order locale
- [ ] 5.2 Define the outgoing mail document
- [ ] 5.3 Fail batch SQL steps on ERROR output
