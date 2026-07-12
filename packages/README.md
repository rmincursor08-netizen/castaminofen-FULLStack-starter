# Packages

This folder contains reusable platform and domain capabilities shared across the monorepo.

## Purpose
- centralizes shared UI, infrastructure, auth, media, search, analytics, and platform logic
- prevents code duplication across applications
- provides stable building blocks for a consistent architecture

## Package catalog
- ui: shared UI primitives
- database: persistence and repository abstraction
- auth: authentication and permissions primitives
- media: asset ingestion, transformation, and storage utilities
- player: media playback primitives
- types: shared domain and API contracts
- config: shared environment and runtime configuration
- logger: structured logging utilities
- events: event contracts and transport abstractions
- search: indexing and query abstractions
- analytics: product and telemetry instrumentation
- permissions: authorization rules and policy contracts
- design-system: tokens, themes, and visual patterns
- utils: common helper functions and small abstractions
- testing: test utilities and fixtures
- sdk: client-facing integration surface

## Dependency principles
- app code depends on packages
- packages depend on other packages through explicit interfaces, not by reaching into concrete implementations
- lower-level packages should not depend on higher-level application modules

## Public API rule
Each package should expose a small, stable surface for consumers.

## Private API rule
Implementation details should remain internal unless they are part of a deliberate internal contract.
