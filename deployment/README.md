# Deployment

This folder contains deployment-specific assets and release orchestration material.

## Purpose
- keeps deployment pipelines and release process assets together
- supports environment promotion and rollout strategy
- separates deployment concerns from application source code

## What belongs here
- deployment manifests and release notes
- rollout and rollback instructions
- environment promotion artifacts

## Design rule
Deployment should be repeatable, observable, and safe to automate.
