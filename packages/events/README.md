# @castaminofen/events

## Purpose
Event contracts and event transport abstractions.

## Responsibilities
- domain event definitions
- publish/subscribe abstractions
- event bus and message envelope helpers

## Dependencies
- packages/types
- packages/config
- packages/logger

## Public API
- EventBus
- EventEnvelope
- DomainEvent
- publishEvent

## Private API
- transport adapters
- retry and dead-letter helpers
- serialization internals
