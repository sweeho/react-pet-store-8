# Proposal: order-processing-workflow

## Why

Recover the behaviour of the legacy order-processing workflow (order intake, approval state machine, identifier generation, asynchronous hand-off, and the web request pipeline that drives it) so it can be rebuilt and verified.

## What changes

- Adds 67 requirements, each recovered from one extraction record, in specs/order-processing-workflow/spec.md.
- Passes A and B described many behaviours twice under different keys; every key is kept so the SME can merge them.

## Impact

New capability; no existing spec is modified. No screen records exist.
