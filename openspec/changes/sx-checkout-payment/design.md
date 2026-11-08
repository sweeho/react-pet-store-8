## Context

Legacy implementation notes for checkout-payment (legacy-source/).

## User interface

No screen records were extracted for this capability; its user interface is unspecified. The order form is only known through its validation (OrderHTMLAction) and the empty-cart error mapping (mappings.xml).

## Legacy implementation notes

- Order submission: OrderHTMLAction validates contact fields and hard-codes the card; OrderEJBAction builds the purchase order, sends the XML to the asynchronous order channel and empties the cart.
- Credit card: CreditCardEJB (container-managed entity, three fields, transactional, no role check); expiry month/year parsed by splitting on "/", defaulting to 01 / 2010.
- XML documents: CreditCard.dtd and PurchaseOrder.dtd under components/xmldocuments and creditcard.
- Schema: petstore_oracle.sql / petstore_cloudscape.sql define credit_card, purchase_order, counter and the order-status view (join with order manager).
- Noted conflicts: the hard-coded card (REQ-0002/CHK-REQ-0005) contradicts the customer-account card model; card number is stored unencrypted (regulated data). Both go to the Business Owner.
- Several records (CHK-REQ-0004 vs CHECKOUT-PAYMENT-REQ-0001, CHKPAY-REQ-0001 vs CHKP-INT-0001, etc.) restate each other across passes. CHKPAY-REQ-0001 carries an open dispute.
