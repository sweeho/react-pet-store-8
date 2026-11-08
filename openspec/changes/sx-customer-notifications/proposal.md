# Customer notifications

## Why

Recovered from the legacy Java Pet Store application: order-status, shipment/invoice and completed-order emails, and the mailer component that turns queued mail documents into outgoing HTML email. The rebuild needs these behaviours stated and verifiable.

## What changes

- Specifies the mail document, the queue-driven mailer, its failure semantics, the order email triggers, subjects and locale, and the per-email configuration switches.
- All requirements are draft, awaiting SME review. No screen records exist for this capability.

## Impact

Affects order processing (approval, shipment/invoice, completion) and the mail delivery integration.
