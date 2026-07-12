# @castaminofen/media

## Purpose
Media ingestion, transformation, and asset management utilities.

## Responsibilities
- upload handling and media metadata
- transcoding and packaging orchestration primitives
- storage integration abstractions

## Dependencies
- packages/types
- packages/config
- packages/logger
- packages/events

## Public API
- MediaService
- UploadClient
- MediaMetadataMapper
- AssetReference

## Private API
- transcoding job helpers
- storage provider internals
- temporary upload lifecycle helpers
