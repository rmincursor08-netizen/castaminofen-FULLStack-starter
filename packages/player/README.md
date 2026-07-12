# @castaminofen/player

## Purpose
Reusable audio and video playback primitives.

## Responsibilities
- playback state management
- stream source handling
- player UI shell and event hooks

## Dependencies
- packages/types
- packages/media
- packages/utils
- packages/logger

## Public API
- PlayerComponent
- PlaybackController
- PlaybackState
- PlayerEventBus

## Private API
- internal media source adapters
- buffering and event normalization helpers
- playback state reducers
