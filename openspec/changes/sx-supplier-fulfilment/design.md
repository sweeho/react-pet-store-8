## Legacy implementation notes

- Approval MDB (`apps/opc` OrderApprovalMDB) builds the supplier purchase order XML and sends it to a JMS queue; InvoiceMDB receives invoices and updates order status (COMPLETED or SHIPPED_PART).
- `apps/supplier`: SupplierOrderMDB persists the order via the order-fulfilment facade EJB, which ships full line quantities against inventory, marks COMPLETED only when all lines were available, and builds an invoice (fixed greeting "Dear PetStore Customer") for lines shipped in the pass.
- Stock updates arrive through the inventory web request processor (`displayinventory.jsp`), which applies quantities, reprocesses PENDING orders and sends invoices in one transaction.
- Components `purchaseorder`, `supplierpo`, `lineitem` are CMP entity beans; `xmldocuments` holds the XML document builders (TPA\*XDE) and DTD/XSD schemas.
- Database constraints (`db/schema/petstore_oracle.sql`): stock >= 0, shipped <= ordered, supplier order status CHECK.

## Source conflicts and caveats

- Status set: Java defines PENDING, APPROVED, DENIED, COMPLETED; DDL restricts supplier order status to PENDING or COMPLETED. Unresolved.
- Configuration says XSD validation is off while DTD validation applies on read; passes disagree on confidence.
- Several extraction passes reuse the same record key for different behaviours (for example SUPF-RULE-0001, SUPPLIER-ENTITY-0001, SUPPLIER-FULFILMENT-ENTITY-0001). Where behaviours differed they are written as separate requirements; those sharing a key carry the same `Recovered from:` value.
- Some records tagged with this capability belong by subject to other capabilities (mail document shape, order-manager status index); they are kept here as extracted.
- Access control: line item and purchase order operations have no role restriction in the descriptors.

## User interface

One screen record was extracted: the supplier inventory display and update screen (SUPF-SCRN-0010), written as a requirement. No other screen records were extracted for this capability; the rest of its user interface is unspecified.
