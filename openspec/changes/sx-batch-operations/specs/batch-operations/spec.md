## ADDED Requirements

### Requirement: Nightly database backup

Recovered from: BATCH-REQ-0001

The system SHALL take an online backup of the store database every day at 01:00 into a folder named with the run date (YYYYMMDD) and SHALL delete dated backup folders older than the backup retention period (7 days).

#### Scenario: A nightly backup runs

- **GIVEN** the scheduled time 01:00
- **WHEN** the backup job runs
- **THEN** a backup folder named with the run date exists and dated folders older than 7 days are removed

### Requirement: Daily Finance order extract

Recovered from: BATCH-REQ-0002

The system SHALL export the previous day's purchase orders daily at 01:30 to orders_YYYYMMDD.csv with no header, ordered by order id, and SHALL append a final line TRAILER,YYYYMMDD,row-count.

#### Scenario: Extract file produced

- **GIVEN** 3 orders dated yesterday
- **WHEN** the extract runs
- **THEN** the file contains 3 rows ordered by order id followed by TRAILER,YYYYMMDD,3

### Requirement: Weekly order purge schedule

Recovered from: BATCH-REQ-0003

The system SHALL run the order purge weekly on Sunday at or after 02:00, only after the order extract is OK.

#### Scenario: Purge on Sunday

- **GIVEN** it is Sunday and the extract is OK
- **WHEN** 02:00 is reached
- **THEN** the purge runs

#### Scenario: No purge on other days

- **GIVEN** it is Wednesday
- **WHEN** 02:00 is reached
- **THEN** the purge does not run

### Requirement: Extract failure handling

Recovered from: BATCH-REQ-0004

The system SHALL rerun a failed order extract at most once and SHALL email ps-finance@example.invalid with urgency R stating that the Finance extract was not produced when it ends not-OK.

#### Scenario: Extract fails twice

- **GIVEN** the extract fails
- **WHEN** the single rerun also fails
- **THEN** an urgent-R email is sent to the Finance address

### Requirement: Low-stock inventory report

Recovered from: BATCH-REQ-0005

The system SHALL list daily at 01:50 supplier items with stock quantity below the low-stock threshold (500), with English description, ordered by lowest quantity then item id, into inventory_YYYYMMDD.txt, followed by the count of tracked items and total units in stock.

#### Scenario: Items below threshold

- **GIVEN** items with quantities 10, 499 and 500
- **WHEN** the report runs
- **THEN** items with 10 and 499 are listed in that order and 500 is excluded, followed by the item count and unit total

### Requirement: Stuck order report

Recovered from: BATCH-REQ-0006

The system SHALL list every order whose status is PENDING or APPROVED and whose order date is older than now minus the stuck-order hours (24), oldest first, with order id, user, locale, value and status, into order_aging_YYYYMMDD.txt.

#### Scenario: Old pending order

- **GIVEN** a PENDING order placed 30 hours ago
- **WHEN** the aging report runs
- **THEN** the order is listed as STUCK

#### Scenario: Recent pending order

- **GIVEN** a PENDING order placed 2 hours ago
- **WHEN** the aging report runs
- **THEN** the order is not listed

### Requirement: Purge in a single transaction

Recovered from: BATCH-REQ-0007

The system SHALL apply the order purge in one transaction and SHALL commit only after all deletes complete.

#### Scenario: Delete fails midway

- **GIVEN** a purge in progress
- **WHEN** one delete statement fails
- **THEN** no deletions are committed

### Requirement: Extract file format and window

Recovered from: BATCH-REQ-0008

The system SHALL select orders dated from yesterday 00:00 inclusive to today 00:00 exclusive and write them comma-delimited, double-quote-qualified, UTF-8, with order id, user id, date, locale, value, line-item count and status.

#### Scenario: Boundary orders

- **GIVEN** an order at today 00:00 and one at yesterday 00:00
- **WHEN** the extract runs
- **THEN** only the yesterday 00:00 order is exported

### Requirement: Purge selection and cascade

Recovered from: BATCH-REQ-0009

The system SHALL delete every order whose status is COMPLETED or DENIED and whose date is before the retention cutoff (180 days before local midnight), together with its supplier lines, supplier order, order lines, order-manager row, contact information, address and credit card.

#### Scenario: Old completed order

- **GIVEN** a COMPLETED order 200 days old
- **WHEN** the purge runs
- **THEN** the order and all its dependent records are deleted

#### Scenario: Old pending order

- **GIVEN** a PENDING order 200 days old
- **WHEN** the purge runs
- **THEN** the order is kept

### Requirement: Catalog integrity check failure

Recovered from: BATCH-REQ-0010

The system SHALL fail the catalog check when any of C1 (category without product), C2 (product without item), C3 (item list price below unit cost), C4 (item missing a description for a locale of its category) or C5 (item without supplier inventory row) returns a row.

#### Scenario: Category without product

- **GIVEN** a category with no product
- **WHEN** the catalog check runs
- **THEN** the category is reported under C1 and the job ends with warning code 4

### Requirement: Web module health check

Recovered from: BATCH-REQ-0011

The system SHALL request the entry page of the storefront, order processing, supplier and admin web modules every 10 minutes with a 20 second timeout, log each module not answering HTTP 200, end with code 8 if any failed, and email ps-ops@example.invalid with urgency R when the job ends not-OK.

#### Scenario: Module down

- **GIVEN** the supplier module returns HTTP 503
- **WHEN** the health check runs
- **THEN** the module is logged, the job ends with code 8 and an urgent-R email is sent

### Requirement: Job dependency gating

Recovered from: BATCH-REQ-0012

The system SHALL start the order extract only after the backup is OK for the same business date, consuming that condition, and SHALL start the aging report, inventory report and Sunday purge only after the extract is OK; when the backup ends not-OK it SHALL email ps-ops@example.invalid with urgency U stating the extract is held.

#### Scenario: Backup fails

- **GIVEN** the backup ended not-OK
- **WHEN** the extract would start
- **THEN** the extract is held and the operations email is sent

### Requirement: Aging status counts

Recovered from: BATCH-RULE-0004

The system SHALL include in the aging report a count of orders per status.

#### Scenario: Counts included

- **GIVEN** orders in several statuses
- **WHEN** the aging report runs
- **THEN** the report ends with a count per status

### Requirement: Order status mismatch

Recovered from: BATCH-RULE-0005

The system SHALL list as MISMATCH every order whose supplier order is COMPLETED but whose order-manager status is not COMPLETED, and the aging job SHALL end with warning code 4 whenever any STUCK or MISMATCH row exists.

#### Scenario: Mismatch found

- **GIVEN** a COMPLETED supplier order with an APPROVED order manager
- **WHEN** the aging report runs
- **THEN** a MISMATCH row is listed and the job ends with code 4

#### Scenario: Clean data

- **GIVEN** no stuck or mismatched orders
- **WHEN** the aging report runs
- **THEN** the job ends with code 0

### Requirement: Daily catalog check schedule

Recovered from: BATCH-RULE-0007

The system SHALL run the five catalog integrity checks daily at or after 06:00 as a critical job, ending with code 4 and emailing ps-catalog@example.invalid with urgency U when any check returns a row.

#### Scenario: Finding at 06:00

- **GIVEN** a check returns a row
- **WHEN** the daily catalog check completes
- **THEN** code 4 is returned and the catalog email points to catalog_check.log

### Requirement: Batch exit codes and run order

Recovered from: BATCH-RULE-0010

The system SHALL run the jobs in the order backup, extract, aging report, inventory report, purge and SHALL signal outcome by exit code: 0 success, 4 warning or data finding, 8 failure.

#### Scenario: Failure code

- **GIVEN** a job fails
- **WHEN** it ends
- **THEN** its exit code is 8

### Requirement: Populate catalog when empty

Recovered from: BATCH-WF-0008

The system SHALL, when the catalog tables do not exist at catalog check time, request a non-forced first population of the catalog and re-run the checks, and SHALL end with code 8 if the population fails.

#### Scenario: Empty catalog

- **GIVEN** the catalog tables are absent
- **WHEN** the catalog check runs
- **THEN** the catalog is populated and the checks re-run

#### Scenario: Population fails

- **GIVEN** the catalog tables are absent and population fails
- **WHEN** the catalog check runs
- **THEN** the job ends with code 8

### Requirement: Batch thresholds

Recovered from: BATC-BR-0001

The system SHALL keep database backups for 7 days, retain orders for 180 days, flag orders stuck after 24 hours and report supplier stock below 500 units, as configured values.

#### Scenario: Defaults

- **GIVEN** no override configured
- **WHEN** a job reads its setting
- **THEN** the values 7, 180, 24 and 500 are used

### Requirement: Configurable low-stock level

Recovered from: BATC-REQ-0001

The system SHALL take the nightly backup retention, order retention, stuck-order hours and low-stock level from configuration rather than from the job logic.

#### Scenario: Threshold overridden

- **GIVEN** the low-stock level is configured as 100
- **WHEN** the inventory report runs
- **THEN** only items below 100 are listed

### Requirement: SQL step failure detection

Recovered from: BATC-REQ-0002

The system SHALL fail a batch SQL step when the database tool reports any line beginning with ERROR.

#### Scenario: Error line

- **GIVEN** a SQL script whose output contains a line beginning with ERROR
- **WHEN** the step finishes
- **THEN** the step is failed

### Requirement: Catalog populate endpoint

Recovered from: BATCH-OPERATIONS-REQ-0001

The system SHALL provide a Populate endpoint that loads the database schema and the catalog and customer data from XML files for a configured database (cloudscape by default).

#### Scenario: Default populate

- **GIVEN** no database configured
- **WHEN** the endpoint is called
- **THEN** the cloudscape schema and data are loaded

### Requirement: Catalog data access selection

Recovered from: CATB-REQ-0010

The system SHALL select the catalog data-access implementation and database dialect from deployment configuration, loading SQL statements from an external XML file.

#### Scenario: Dialect configured

- **GIVEN** the oracle dialect is configured
- **WHEN** the catalog is queried
- **THEN** the oracle SQL set is used

### Requirement: Sales reports

Recovered from: BATCH-REQ-0001

The system SHALL provide revenue and order-quantity reports for a date range grouped by category or, when a category is given, by item in that category, and SHALL return the grand total.

#### Scenario: Category grouping

- **GIVEN** orders in two categories within the range
- **WHEN** a revenue report is requested without a category
- **THEN** one row per category and the grand total are returned

#### Scenario: Item grouping

- **GIVEN** a category is given
- **WHEN** the report is requested
- **THEN** one row per item in that category is returned

### Requirement: Sales report date format

Recovered from: BATCH-REQ-0001

The system SHALL accept report dates in MM/dd/yyyy form, default the range to 1/1/2001 through 12/31/2002, and reject other formats with the message "Dates must be in the format of MM/dd/yyyy".

#### Scenario: Bad date

- **GIVEN** a date entered as 2002-01-31
- **WHEN** the report is requested
- **THEN** the message "Dates must be in the format of MM/dd/yyyy" is shown
