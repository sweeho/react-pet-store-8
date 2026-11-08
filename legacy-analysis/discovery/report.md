# Discovery report SX-0001

Legacy tree: Java Pet Store 1.3.2 (572 files) under `legacy-source/`. Stack: J2EE (EJB 2.x CMP/session/MDB, JMS, JSP with a custom WAF MVC framework), Cloudscape/Oracle DDL, shell batch jobs, Control-M schedule.

## Modules (risk-ranked; see risk-scores.csv)

- **apps/petstore** (18.5k LOC, 67 JSPs incl. zh/ja copies): storefront, the highest-volume rule surface (validation, cart, checkout, locale).
- **apps/opc** (5.3k): order processing centre; MDBs and transition delegates; auto-approve limits (README and conf say US 500, JP 50000, needs confirmation in code/ejb-jar).
- **apps/supplier** (4.2k), **components/supplierpo**: inventory check, shipping, invoice.
- **components/purchaseorder, signon, catalog, customer, cart, creditcard**: core entities and rules.
- **db/schema**: only declared constraints; CMP tables are added relational forms (README), so code and DDL may disagree.
- **batch, db/batch, conf, scheduler**: added operational jobs with bare-literal thresholds (24h aging, stock below 500, 7-day backup retention, purge window). Check the purge SQL first.
- **apps/admin**: Swing client for manual approval.
- **waf**: framework plumbing; low business value, medium LOC.

## Exclusions

- Third-party/library: `app/src/lib/**` (JSTL TLDs, base64).
- Build and packaging: `build.xml/.sh/.bat`, `setup.*`, `application.xml`, `sun-j2ee-ri.xml`, manifests.
- Legal and HTML copyright pages, README.
- Duplicated localized JSPs `docroot/zh`, `docroot/ja` (treat as one screen set; extract localization differences only).
- Sample data: `populate/*.xml`, DTDs (read only for catalog rules).
- Not present in the tree: `docs/`, `data/`, `vortex/expected-extraction.md` referenced by README.

## Risks and flags

- Possible dead code: `opc/docroot/EntityCatalog.jsp`, `waf/docroot/*_test.jsp`, `clientstatetag_test.jsp`, util/tracer. Flag unresolved-reachability if used.
- Thresholds as literals/env-entries in ejb-jar.xml and web.xml; conf/petstore.properties duplicates them and may disagree.
- Two DDL variants (Cloudscape, Oracle) may differ.
- conf contains a redacted credential; ignore.

## Capabilities

11 closed-list capabilities in capabilities.csv.
