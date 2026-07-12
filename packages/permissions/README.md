# @castaminofen/permissions

## Purpose
Authorization rules, policies, and permission evaluation.

## Responsibilities
- role and capability evaluation
- policy and guard abstractions
- support for resource-level authorization

## Dependencies
- packages/types
- packages/config
- packages/logger

## Public API
- PermissionChecker
- PolicyEngine
- AccessDecision
- PermissionGrant

## Private API
- rule evaluation internals
- policy registry helpers
- audit logging helpers
