import Link from "next/link";
import { ADMIN_NAV_ICONS } from "@/app/admin/components/AdminIcons";

export default function AdminDashboard({ siteName, stats, links }) {
  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Overview of {siteName} — jump into any section below</p>
        </div>
      </div>

      <div className="admin-stat-grid">
        {stats.map((s) => (
          <Link key={s.key} href={s.href} className={`admin-stat-card tone-${s.tone}`}>
            <span className="admin-stat-value">{s.value}</span>
            <span className="admin-stat-label">{s.label}</span>
          </Link>
        ))}
      </div>

      <div className="admin-quicklink-grid">
        {links.map((l) => {
          const Icon = ADMIN_NAV_ICONS[l.iconKey];
          return (
            <Link key={l.href} href={l.href} className="admin-quicklink admin-card">
              <span className="admin-quicklink-icon">{Icon ? <Icon /> : null}</span>
              <span className="admin-quicklink-body">
                <span className="admin-quicklink-title">{l.label}</span>
                <span className="admin-quicklink-desc">{l.desc}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
