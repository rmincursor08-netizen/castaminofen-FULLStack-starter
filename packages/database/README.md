# @castaminofen/database

## Purpose
Persistence, repository abstraction, and data access contracts.

## Responsibilities
- database client and schema access
- repository interfaces and adapters
- migration and persistence lifecycle support

## Dependencies
- packages/types
- packages/config
- packages/logger

## Public API
- DatabaseClient
- RepositoryFactory
- TransactionManager
- QueryBuilder

## Private API
- provider registration internals
- connection pool adapters
- migration runner helpers
