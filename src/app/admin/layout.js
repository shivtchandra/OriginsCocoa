import "./admin.css";
import AdminProviders from "./components/AdminProviders";

export const metadata = {
  title: "Origins Cocoa Admin",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }) {
  return (
    <AdminProviders>
      <div className="admin-root">{children}</div>
    </AdminProviders>
  );
}
