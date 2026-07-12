# @castaminofen/auth

## Purpose
Authentication, identity, session, and permission primitives.

## Responsibilities
- sign-in, sign-out, token handling, and session lifecycle
- role and permission evaluation interfaces
- auth adapters for providers and local strategies

## Dependencies
- packages/types
- packages/config
- packages/logger

## Public API
- AuthService
- SessionManager
- PermissionChecker
- AuthProviderAdapter

## Private API
- token refresh internals
- provider-specific adapters
- session storage helpers
