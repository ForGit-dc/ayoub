-- Enable required extensions for scheduling HTTP calls (idempotent)
create extension if not exists pg_net;
create extension if not exists pg_cron;

-- TEMPLATE NOTE (fixed 2026-07): this migration originally re-scheduled the
-- 'daily-rollup-hourly' pg_cron job. The daily-rollup edge function is not part
-- of this repo, so the scheduling was removed; the extension enables are kept.
