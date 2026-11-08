# Legacy implementation notes: sign-on-security

- Storefront sign-on is a custom servlet filter (`SignOnFilter`, mapped to `/*`) reading `WEB-INF/signon-config.xml`; protected patterns are matched by exact string equality, with no wildcards and with roles parsed but never checked. Session attributes `j_signon`, `j_signon_username`, `j_signon_original_url`.
- Authentication: `SignOnEJB.authenticate` finds `UserEJB` (CMP) by user name and `matchPassword` uses `String.equals`. Passwords are plain text in `signon_user` (varchar 50). No lockout or retry limit.
- The `bp_signon` cookie is set before authentication is checked, so it is set even on failure. 31 days is a bare literal.
- `SignOnNotifier` (session attribute listener) sets identity and locale; `SignOffHTMLAction` invalidates and recreates the session.
- Admin and supplier apps use container FORM login (`j_security_check`), role `administrator`; only `/AdminRequestProcessor` is constrained, the rich-client servlet only checks that a session exists (suspected defect). Session timeouts: storefront 15, admin and supplier 54, web framework 30 minutes; `conf/petstore.properties` value is documentation only.
- Purchase order and customer EJBs use unchecked method-permission with caller identity.
- Records with duplicated keys across passes (SIGN-REQ-0001 to 0005 in the signon, admin, waf and conf passes) were consolidated; the admin entry-point restriction, admin logout and rich-client session-timeout records (admin SIGN-REQ-0001, 0004, 0005, 0003) are not written as separate requirements because their keys collide with other records; an SME should disambiguate.
- The admin sign-in screen is a JSP posting to `j_security_check` with hard-coded demo defaults.
