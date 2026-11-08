## Legacy implementation notes

- Cart: `ShoppingCartLocalEJB`, a stateful session bean holding a HashMap (itemId -> Integer). `ShoppingCartModel` is the web-tier wrapper; its `getSize`/`getTotalCost` duplicate the bean's `getCount`/`getSubTotal`.
- Quantity handling: `addItem` uses `put` (replaces, no accumulation, no validation). `updateItemQuantity` removes the key then re-puts only when > 0, so an update for an absent item adds it.
- Display: `getItems` resolves each key through `CatalogHelper` in the cart's locale (default `Locale.US`); a `CatalogException` is printed with `System.out.println` and the line is skipped while remaining in the map. Prices are never stored in the cart.
- Totals use unrounded `double` arithmetic.
- Web tier: `CartHTMLAction` maps `purchase`/`remove`/`update` to `CartEvent`; `CartEJBAction` applies it. Quantity parameters are named `itemQuantity_<itemId>`; `NumberFormatException` yields 0. `cart.jsp` branches on `cart.count == 0`.
- Session: `PetstoreComponentManager.sessionCreated` stores the cart from `ShoppingClientFacade`; `ChangeLocaleEJBAction` and `SignOnEJBAction` call `cart.setLocale`.
- Line item: `LineItemEJB`, CMP 2.x entity, seven cmp-fields; `unitPrice` is `float`; local interface only; `ejb-jar.xml` method-permission unchecked, transaction Required. No cart-specific logic lives there; its fit with this capability is the closest, not certain. `LineItem.fromDOM` (SHOP-INT-0002) was filed under order-processing-workflow and is not included.
- `TemplateServlet` PREVIOUS handling (ORD-REQ-0013) was filed here only as the closest capability; caching switches are false in `web.xml`, and PREVIOUS before any screen throws NPE. It likely belongs to no business capability.
- Key collisions: SHOP-REQ-0001/0002/0004/0005 and SHOP-ENT-0001 appear in both the lineitem and cart passes with different content; CART-REQ-0006 appears in both cart (item count) and petstore (web actions). Each is written as a separate requirement citing the same key; ingest must disambiguate.

## User interface

No screen records were extracted for this capability; its user interface is unspecified. The only display rule found (empty-cart message and Check Out link) is stated as an ordinary requirement.
