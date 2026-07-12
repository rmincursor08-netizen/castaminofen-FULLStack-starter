# Packages

This folder contains reusable platform and domain capabilities shared across the monorepo.

## Purpose
- centralizes shared UI, infrastructure, auth, eventing, storage, and platform logic
- prevents code duplication across applications
- provides stable building blocks for a consistent architecture

## What belongs here
- shared libraries and SDKs
- cross-cutting platform services
- reusable abstractions and contracts

## Design rule
Packages should be dependency-safe, versioned clearly, and reusable by multiple apps.
