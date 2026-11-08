## 1. Data model

- [ ] 1.1 Define category, product and item with single keys and ownership by exactly one parent
- [ ] 1.2 Define per-locale details records keyed by (id, locale) with required name
- [ ] 1.3 Add lookup indexes on product category id and item product id
- [ ] 1.4 Leave list price versus unit cost unconstrained

## 2. Browsing queries

- [ ] 2.1 Implement list categories, products by category and items by product, localised and ordered by name
- [ ] 2.2 Implement single category, product and item lookup returning nothing when absent
- [ ] 2.3 Expose the item fields (ids, name, image, description, five attributes, list price, unit cost)

## 3. Paging

- [ ] 3.1 Implement zero-based start and size paging with next flag
- [ ] 3.2 Implement previous-page start arithmetic
- [ ] 3.3 Return an empty page for negative or out-of-range start

## 4. Search

- [ ] 4.1 Implement distinct-keyword substring search on product name, category id and item description
- [ ] 4.2 Return an empty page for an empty query without querying

## 5. Data access

- [ ] 5.1 Keep catalog access read-only with externally configured SQL and dialect
- [ ] 5.2 Surface data access failures as a system error
