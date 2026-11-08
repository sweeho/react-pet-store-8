# Discovery SX-0002

Java Pet Store 1.3.2 (J2EE: EJB 2.x, JMS MDBs, JSP/custom WAF controller) plus ops layer: shell batch (`batch/`), SQL (`db/batch`), Control-M export (`scheduler/`), env config (`conf/`). 572 files, ~100k lines in total.

## Modules, by risk

- **opc** (Order Processing Center): MDB chain, transition delegates, auto-approve limits in `conf/petstore.properties` (en_US 500, ja_JP 50000). Highest risk: workflow state machine and bare thresholds.
- **purchaseorder / processmanager / supplierpo**: order state (`order_manager.status`: PENDING, APPROVED, COMPLETED, DENIED) and supplier order.
- **batch + db/batch + scheduler**: 180-day purge (COMPLETED/DENIED), 24h aging report, extract, catalog check, backup retained 7 days, health check every 10 minutes. Undocumented rules in shell and SQL.
- **petstore**: storefront, 25 English screens (zh/ja copies are localised duplicates, not counted), web.xml, mappings.xml, form validation in the web controller actions.
- **creditcard, signon**: card validation, sign-on, 15 minute session timeout.
- Mid and low: cart, catalog (per-locale DAO SQL), customer, admin client, supplier web, support libraries (waf, xmldocuments, servicelocator, etc.).

## Exclusions

- `app/src/lib/jstl`, `app/src/lib/base64`: third-party libraries.
- Build scripts (`build.xml`, `build.*`, `setup.*`), `COPYRIGHT/LICENSE/IMAGE_COPYRIGHT.html`, images, `docroot/populate` sample data and DTDs, tools/populate Java (data loading only).
- `docroot/ja`, `docroot/zh`: localised copies of English JSPs; extract only locale-specific differences (capability `localization`).
- Credentials in `conf/petstore.properties` are redacted; not a requirement.

## Caveats

- LOC is a line count of source/config files per module; `screens` counts English JSPs. `batch+db/batch+scheduler` is one row (one extraction unit).
- Dependency graph is inferred, not from a full import analysis.
- Possible dead code: the `supplier` and `admin` apps and EJB home/remote duplicates; reachability to be checked per module.
- Two Cloudscape/Oracle DDL variants exist (`db/schema`); dispute candidates if constraints differ.
