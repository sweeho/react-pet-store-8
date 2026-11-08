## 1. Scheduling and orchestration

- [ ] 1.1 Implement the job chain with the nightly order and the Sunday-only purge
- [ ] 1.2 Implement extract-OK and backup-OK gating between jobs
- [ ] 1.3 Implement exit codes 0, 4 and 8 and the per-job rerun counts
- [ ] 1.4 Implement failure notification mail with the configured addresses and urgency
- [ ] 1.5 Fail a SQL step when the database tool output contains an ERROR line

## 2. Backup and purge

- [ ] 2.1 Implement the daily online backup into a dated folder
- [ ] 2.2 Implement deletion of backup folders older than 7 days
- [ ] 2.3 Implement the order purge selection with the 180-day cutoff
- [ ] 2.4 Implement the dependent-record cascade in a single transaction

## 3. Finance extract

- [ ] 3.1 Implement the previous-day order selection window
- [ ] 3.2 Implement the CSV format, file naming and TRAILER line
- [ ] 3.3 Implement the Finance failure notice and single rerun

## 4. Reports

- [ ] 4.1 Implement the stuck-order report with status counts
- [ ] 4.2 Implement the MISMATCH detection and warning exit
- [ ] 4.3 Implement the low-stock inventory report with totals
- [ ] 4.4 Implement the sales revenue and quantity reports with date validation

## 5. Catalog checks and health

- [ ] 5.1 Implement catalog checks C1 to C5 and warning exit
- [ ] 5.2 Implement populate-if-empty before the catalog check
- [ ] 5.3 Implement the Populate endpoint
- [ ] 5.4 Implement the 10-minute module health check with 20 second timeout

## 6. Configuration

- [ ] 6.1 Externalise retention, stuck-hours and low-stock thresholds
- [ ] 6.2 Select catalog data access and SQL dialect from configuration
