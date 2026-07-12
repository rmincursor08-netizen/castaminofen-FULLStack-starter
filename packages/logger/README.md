# @castaminofen/logger

## Purpose
Structured logging and diagnostics utilities.

## Responsibilities
- standardized log creation
- correlation and context enrichment
- transport adapters for console, file, and observability backends

## Dependencies
- packages/config
- packages/types

## Public API
- Logger
- createLogger
- logError
- logEvent

## Private API
- transport registration internals
- formatter helpers
- context enrichment logic
