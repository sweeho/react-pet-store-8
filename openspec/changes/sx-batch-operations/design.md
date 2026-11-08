# Design notes: legacy implementation of batch operations

## User interface

No screen records were extracted for this capability; its user interface is unspecified. The admin sales report requirements describe behaviour recorded as ordinary requirements, not screens.

## How the legacy system implements it

- Jobs are shell wrappers in `legacy-source/batch/ps_*.sh` that run SQL scripts in `legacy-source/db/batch/*.sql` through the database command-line tool. Settings (retention 7 and 180 days, stuck-order hours 24, low-stock 500, backup directory) live in `legacy-source/conf/env.sh` and `conf/petstore.properties`.
- A SQL step fails when the tool prints a line starting with `ERROR` (`conf/env.sh`).
- Exit codes: 0 success, 4 warning or data finding, 8 failure.
- Scheduling and dependencies are defined in `legacy-source/scheduler/control-m/PS_PETSTORE.xml` using in/out conditions: extract waits on backup OK; aging report, inventory report and Sunday purge wait on extract OK. Mail addresses and urgency codes are in that file.
- Run order: backup 01:00, extract 01:30, aging 01:45, inventory 01:50, purge Sunday 02:00, catalog check 06:00, health check every 10 minutes.
- Purge deletes in dependency order in one transaction with autocommit off.
- Catalog check C1-C5 are SQL queries in `db/batch/catalog_check.sql`; when catalog tables are missing the wrapper requests a populate.
- Admin sales reports are served by `ApplRequestProcessor` in the admin app; the client validates dates.
- Catalog DAO and SQL dialect are selected from JNDI env-entries and an external SQL XML file.

## Gaps and conflicts

- Record keys repeat across pass files (for example `BATCH-REQ-0001` appears in 10 files); the server merged them into 22 keys. Where one key covers several unrelated sources, the requirements here carry the same `Recovered from:` key. Sources not fully covered: diagnostic tracer helper (`util/tracer/Debug.java`) and order/user/status indexes in the Oracle schema (`db/schema/petstore_oracle.sql`). Both are implementation details; an SME should confirm they need no requirement.
- Purge-after-extract ordering is enforced only by the scheduler; the SQL has no check (reachability unresolved).
- The two passes differ on the extract: shell pass adds a TRAILER line and no header; the SQL pass specifies quoting and UTF-8.
