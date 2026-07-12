# @castaminofen/search

## Purpose
Search indexing and query abstractions.

## Responsibilities
- document indexing interfaces
- query building and ranking support
- adapter layer for search backends

## Dependencies
- packages/types
- packages/config
- packages/events

## Public API
- SearchClient
- SearchIndexService
- SearchQuery
- SearchResult

## Private API
- mapping internals
- analyzer configuration
- ranking heuristics helpers
