# @castaminofen/search

This package provides reusable functionality for the monorepo and should remain focused on a single responsibility.

## Purpose
Search indexing and query helpers.

## Usage guidance
- Keep the public API small and well documented.
- Prefer shared abstractions over app-specific logic.
- Add tests for behavior changes and keep dependencies intentional.

## Relationship to the repo
- Apps consume this package when they need shared capabilities.
- Other packages can depend on it when the concern is cross-cutting.
