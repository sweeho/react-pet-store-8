# Legacy implementation notes: customer notifications

## User interface

No screen records were extracted for this capability; its user interface is unspecified.

## How the legacy application implements it

- Order processing posts XML to per-email queues. `MailOrderApprovalMDB`, `MailInvoiceMDB` and `MailCompletedOrderMDB` (apps/opc customerrelations) check an env-entry flag (`SendApprovalMail`, `SendCompletedOrderMail`, ...) from `ejb-jar.xml`, render the body with per-locale XSL (`OrderApproval*.xsl`, `CompletedOrder*.xsl`) and hand a Mail XML document to the mail sender queue. `OrderApprovalTD.sendMail` feeds the approval queue.
- `components/mailer`: `MailerMDB.onMessage` (container transaction Required) parses a TextMessage with `Mail.fromXML` (validating against `Mail.dtd`: Address, Subject, Content) and calls `MailHelper.createAndSendMail`, which looks up the JNDI mail session, sends text/html, `setFrom()` default, `InternetAddress.parse(addr,false)`, header X-Mailer "JavaMailer", current sent date. The Locale argument is unused.
- Send failures are wrapped in `MailerAppException` and deliberately swallowed by the MDB (comment: user probably did not configure a mail server). XML or JMS read errors are rethrown as `EJBException`, rolling back. A non-TextMessage would raise an uncaught ClassCastException.
- `ServiceLocator.getBoolean/getString/getUrl` read env entries uncached.
- `conf/petstore.properties` lines 36-38 set all three mail flags to false; a mail queue (`jms/opc/MailQueue`) is still configured. Mail queue name in the mailer is deployment-bound.
- Mail.dtd is duplicated in `xmldocuments` and `mailer`; consumers in `OrderApproval.java` and `TPALineItemUtils.java`.

## Open points

- Configuration says no mail is sent by default (low confidence, single source), while code supports sending; production setting unknown.
- Whether a failed send should be silent is a legacy choice recorded as-is.
