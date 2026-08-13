"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_NAV_ICONS } from "@/app/admin/components/AdminIcons";

const NAV_ITEMS = [
  { href: "/admin/products", label: "Cacao Lots", iconKey: "products" },
  { href: "/admin/categories", label: "Categories", iconKey: "categories" },
  { href: "/admin/about", label: "Our Craft", iconKey: "about" },
];

export default function OriginsAdminShell({ userEmail, children }) {
  const pathname = usePathname();
  const ExternalIcon = ADMIN_NAV_ICONS.external;

  return (
    <div className="admin-app">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <h2>Origins Cocoa Admin</h2>
          <p>Manage Origins Cocoa</p>
        </div>

        <nav className="admin-sidebar-nav" aria-label="Admin navigation">
          {NAV_ITEMS.map((item) => {
            const Icon = ADMIN_NAV_ICONS[item.iconKey];
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-nav-link${pathname.startsWith(item.href) ? " is-active" : ""}`}
              >
                <span className="admin-nav-icon">
                  <Icon />
                </span>
                {item.label}
              </Link>
            );
          })}
          <a href="/" className="admin-nav-link" target="_blank" rel="noopener noreferrer">
            <span className="admin-nav-icon">
              <ExternalIcon />
            </span>
            View storefront
          </a>
        </nav>

        <div className="admin-sidebar-footer">
          <p className="admin-user-email">
            Logged in as
            <strong>{userEmail ?? "Admin"}</strong>
          </p>
          <form action="/admin/logout" method="post">
            <button type="submit" className="admin-logout-btn">
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <main className="admin-main">{children}</main>
    </div>
  );
}
