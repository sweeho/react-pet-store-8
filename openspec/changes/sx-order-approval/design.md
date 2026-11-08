## Legacy implementation notes

- Auto-approval is decided in `canIApprove` in the order processing component (opc); thresholds 500 (US) and 50000 (Japan) are bare literals, repeated in `conf/petstore.properties`. Sources differ on "below" versus "does not exceed" at the boundary; no currency is stated.
- Locales other than US and Japan fall through to PENDING.
- The admin start page links to a `manageorders` servlet action that returns a Java Web Start descriptor; the Swing client talks to an XML-over-HTTP servlet (GETORDERS, UPDATESTATUS, REVENUE, ORDERS).
- `OrderApproval.java` and `OrderApproval.dtd` (xmldocuments) define the approval document; `VALIDATING=true` is used by the short `fromXML` overloads.
- The order status view is defined in `db/schema/petstore_oracle.sql`.
- Record-key collisions: `ORDAPP-REQ-0001` and `ORDAPP-RULE-0002` are each used by different passes for different content; spec.md writes one requirement per distinct content under the same key.
- Mail document (CUSN/CUSTNOT), email locale (LOCAL-BR-0001) and batch SQL error (BATC-REQ-0002) records were placed here by the server; their fit is inferred from names.
