# @castaminofen/config

## Purpose
Shared environment and runtime configuration.

## Responsibilities
- config loading and validation
- environment-aware defaults
- feature flag and runtime settings primitives

## Dependencies
- packages/types
- packages/logger

## Public API
- loadConfig
- getConfigValue
- ConfigProvider

## Private API
- provider registration helpers
- env normalization utilities
- config schema internals
