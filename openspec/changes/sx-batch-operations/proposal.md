# Proposal: batch operations

## Why

The legacy Pet Store runs a nightly and weekly batch suite (backup, Finance order extract, aging and inventory reports, purge, catalog integrity check, health check) scheduled by Control-M and signalled by exit codes. Operations and Finance depend on its outputs. The rebuild must reproduce these behaviours.

## What changes

- Specify the nightly job chain, its schedule and dependencies.
- Specify each job's selection rules, thresholds and output files.
- Specify failure signalling (exit codes, notification mail, rerun counts).
- Specify the admin sales reports and the catalog populate endpoint filed under this capability.

## Impact

Capability `batch-operations`. No screen records were extracted. Thresholds and addresses come from legacy configuration and are to be confirmed by an SME.
