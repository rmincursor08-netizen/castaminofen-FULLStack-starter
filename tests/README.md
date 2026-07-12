# Testing Architecture

This directory contains the testing strategy for the monorepo.

## Goals
- ensure correctness at the unit, integration, component, API, and end-to-end levels
- keep tests maintainable and deterministic
- support performance, load, and stress validation
- provide shared fixtures, factories, and utilities

## Structure
- unit/
- integration/
- component/
- e2e/
- api/
- contract/
- performance/
- fixtures/
- factories/
- mocks/
- utils/

## Recommended Tooling
- Vitest or Jest for unit and component tests
- Testing Library for UI assertions
- Supertest for API tests
- Playwright for browser-based e2e tests
- k6 or Artillery for performance, load, and stress coverage

## Principles
- test behavior over implementation details
- keep tests deterministic and fast
- use shared fixtures and factories for consistency
- separate infrastructure concerns from domain-level tests
