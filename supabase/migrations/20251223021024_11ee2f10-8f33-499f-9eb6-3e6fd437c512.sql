-- Enable pg_cron and pg_net extensions for scheduled HTTP calls
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Grant usage to postgres role
GRANT USAGE ON SCHEMA cron TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA cron TO postgres;

-- Schedule the keep-alive function to run daily at midnight UTC
SELECT cron.schedule(
  'daily-keep-alive',
  '0 0 * * *',
  $$
  SELECT
    net.http_post(
      url := 'https://jhejjpqngvlttrdpgofr.supabase.co/functions/v1/keep-alive',
      headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpoZWpqcHFuZ3ZsdHRyZHBnb2ZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwODYxNDEsImV4cCI6MjA3MDY2MjE0MX0.G0lr22FeyMB2e2nYbLCYxluBzDbdW19sthdzjXw0ZoI"}'::jsonb,
      body := '{"ping": true}'::jsonb
    ) AS request_id;
  $$
);