# Legacy implementation notes: localization

- Default locale (en_US) is seeded by the front controller from a servlet init parameter in web.xml; change-locale is a mapped action with an HTML and an EJB variant and a client-state variant.
- Screen definitions are loaded per locale by the template servlet; the deployed configuration loads only en_US, so fallback is always exercised. A third "\_variant" segment of a locale string is never applied.
- The locale-change demo page lists German, though no German definitions are deployed.
- Request encoding is set by a servlet filter configured in web.xml, ordered before the sign-on filter. With no init parameter the filter passes null, overwriting its ASCII default.
- Catalog text and price are stored per (id, locale) in category, product and item detail tables; unique and NOT NULL constraints are in the Oracle DDL. The catalog check script flags items missing a description for a configured locale.
- Order emails choose a stylesheet from the locale stored on the order.
- Several requirement records share keys across pass files (LOC-REQ-0001 etc. appear in waf and encodingfilter passes); mapping is by pass file path under legacy-analysis/ir/\_passes. Records WORKFLOW-ENT-0001, ORD-REQ-0002 and CATBRW-REQ-0001 carry this capability_key but may belong to workflow, error handling and browsing.
