# @castaminofen/analytics

## Purpose
Product analytics and telemetry instrumentation.

## Responsibilities
- event tracking and measurement primitives
- user behavior and funnel instrumentation
- analytics provider adapters

## Dependencies
- packages/types
- packages/config
- packages/logger

## Public API
- AnalyticsTracker
- trackEvent
- AnalyticsContext

## Private API
- provider adapters
- batching and transport helpers
- event normalization internals
