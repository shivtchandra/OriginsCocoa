import Link from "next/link";

const footerLinks = {
  explore: [
    { label: "Our Craft", href: "/our-craft" },
    { label: "Community", href: "/community" },
    { label: "Products", href: "/products" },
    { label: "Traceability", href: "/our-craft#traceability" },
  ],
  connect: [
    { label: "Contact", href: "/connect" },
    { label: "Wholesale", href: "/connect" },
    { label: "Instagram", href: "https://instagram.com" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-chocolate/10 bg-cream">
      <div className="section-padding !py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <p className="body-text text-2xl text-chocolate mb-4">
                Origins Cocoa
              </p>
              <p className="body-text text-sm text-chocolate/60 max-w-xs">
                Premium Indian cacao — from farm to fermentery to makers. West
                Godavari, Andhra Pradesh.
              </p>
            </div>

            <div>
              <p className="nav-link text-xs uppercase tracking-[0.2em] text-chocolate/40 mb-4">
                Explore
              </p>
              <ul className="space-y-3">
                {footerLinks.explore.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="nav-link text-sm text-chocolate/70 hover:text-earth-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="nav-link text-xs uppercase tracking-[0.2em] text-chocolate/40 mb-4">
                Connect
              </p>
              <ul className="space-y-3">
                {footerLinks.connect.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="nav-link text-sm text-chocolate/70 hover:text-earth-gold transition-colors"
                      {...(link.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="divider-line mb-8" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="nav-link text-xs text-chocolate/40">
              &copy; {new Date().getFullYear()} Origins Cocoa. All rights reserved.
            </p>
            <div className="flex gap-6">
              {[
                { label: "Instagram", href: "https://instagram.com" },
                { label: "LinkedIn", href: "https://linkedin.com" },
                { label: "YouTube", href: "https://youtube.com" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link text-xs uppercase tracking-[0.15em] text-chocolate/40 hover:text-earth-gold transition-colors"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
