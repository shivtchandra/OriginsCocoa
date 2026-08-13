import { createClient } from "@supabase/supabase-js";

/**
 * Server-only admin client — bypasses RLS. Use in API routes / server actions
 * for admin writes, never import from client components.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
