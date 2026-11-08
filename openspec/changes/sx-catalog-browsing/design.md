## Legacy implementation notes

- Reads go through `GenericCatalogDAO` (paging with `absolute(start+1)`, reading until the count is exhausted; empty page when start is negative or past the end), exposed by `CatalogEJB` (stateless, transaction Required) and `CatalogHelper`; the web tier may bypass the EJB and call the DAO.
- SQL statements live in `CatalogDAOSQL.xml` (petstore docroot); the dialect and DAO class are selected at deployment. The deployed database setting is redacted, so the exact dialect is not visible.
- Search splits the query on whitespace into a de-duplicated keyword set and matches substrings on product name, category id and item description; an empty keyword set returns an empty page without a query.
- Schema: `category`, `product`, `item` plus `*_details` tables keyed by (id, locale); foreign keys up the hierarchy and indexes `ix_product_catid`, `ix_item_productid` (Oracle and Cloudscape scripts agree; char vs varchar2 differ).
- No DB constraint ensures list price >= unit cost.

## Extraction notes

- Several records share a key across pass files with different content (`CAT-ENT-0001`, `CATALOG-BROWSING-REQ-0001`); each is written as its own requirement and cites the shared key. Many requirements overlap between passes (paging, search, lookup); an SME should merge them on review.
- `CAT-ENT-0001` in the DDL pass files also appears under `localization`; only the catalog-browsing records are written here.

## User interface

No screen records were extracted for this capability; its user interface is unspecified. Screen requirements written: 0 of 0.
