## 1. Mail document

- [ ] 1.1 Define the mail document with address, subject and content in that order
- [ ] 1.2 Validate incoming mail documents and reject malformed ones

## 2. Mailer

- [ ] 2.1 Consume mail requests from the mail queue, one email per message
- [ ] 2.2 Send HTML email with default sender, lenient multi-recipient parsing, X-Mailer header and sent date
- [ ] 2.3 Discard send failures without redelivery
- [ ] 2.4 Raise a system error for unreadable or invalid mail messages

## 3. Order emails

- [ ] 3.1 Send approval/denial notification for PENDING orders only
- [ ] 3.2 Send shipment/invoice email
- [ ] 3.3 Send completed-order email
- [ ] 3.4 Build subjects and render bodies in the purchase order locale
- [ ] 3.5 Address emails to the purchase order email address

## 4. Configuration

- [ ] 4.1 Provide per-email boolean switches read from deployment configuration
- [ ] 4.2 Default all three switches to off
- [ ] 4.3 Confirm production switch values with the Business Owner
