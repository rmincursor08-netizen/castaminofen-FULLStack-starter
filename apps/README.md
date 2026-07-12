# Apps

This folder contains all runtime applications for the monorepo.

## Purpose
- hosts the user-facing web experience
- hosts the admin experience
- hosts the API, worker, media, and realtime services
- keeps runtime entry points separate from reusable platform packages

## What belongs here
- app-specific source code
- app-level configuration
- app-specific documentation and startup instructions

## Design rule
Apps should depend on shared packages, not on each other directly.
