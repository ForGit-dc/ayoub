-- Enable required extensions for scheduling HTTP calls
create extension if not exists pg_net with schema extensions;
create extension if not exists pg_cron;

-- TEMPLATE NOTE (fixed 2026-07): this migration originally scheduled a pg_cron
-- job 'daily-rollup-hourly' posting hourly to a daily-rollup edge function that
-- does not exist in this repo (it 404'd every hour and needed a per-client
-- PLACEHOLDER_PROJECT_ID substitution). Only the extension enables are kept.
-- To use daily rollups, add the edge function AND a new migration that schedules it.
