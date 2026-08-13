import { createClient } from "@/lib/supabase/server";
import { getUserSites } from "@/lib/admin-db";
import OriginsAdminShell from "@/app/admin/components/OriginsAdminShell";

export default async function AdminPanelLayout({ children }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const sites = await getUserSites();

  if (!sites.length) {
    return (
      <div className="admin-card admin-no-access">
        <h1>No site access</h1>
        <p>Your account is not assigned to the Origins Cocoa site. Ask an admin to run:</p>
        <pre>{`insert into public.user_site_roles (user_id, site_id, role)
select 'YOUR_AUTH_USER_UUID', s.id, 'admin'
from public.sites s where s.slug = 'origins-cocoa';`}</pre>
        <form action="/admin/logout" method="post">
          <button type="submit" className="admin-btn admin-btn-secondary">
            Sign out
          </button>
        </form>
      </div>
    );
  }

  return (
    <OriginsAdminShell userEmail={user?.email}>{children}</OriginsAdminShell>
  );
}
