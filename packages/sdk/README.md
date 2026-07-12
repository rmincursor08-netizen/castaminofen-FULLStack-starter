# @castaminofen/sdk

## Purpose
Client-facing integration surface for external and internal consumers.

## Responsibilities
- expose stable public client APIs
- wrap lower-level packages in a consumer-friendly interface
- provide typed integration entry points for apps and services

## Dependencies
- packages/auth
- packages/types
- packages/config
- packages/events

## Public API
- ContentClient
- AuthClient
- SearchClient
- AnalyticsClient

## Private API
- internal transport adapters
- internal request normalization helpers
- internal auth refresh plumbing
