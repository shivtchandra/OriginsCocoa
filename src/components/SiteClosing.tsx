"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "YouTube", href: "https://youtube.com" },
];

export function SiteClosing() {
  const pathname = usePathname();
  const showCta = pathname === "/";

  return (
    <footer className="relative w-full bg-cream">
      <div className="relative w-full aspect-[2/1]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/mural-footer-gouache.png"
          srcSet="/images/mural-footer-gouache.png 1774w"
          alt=""
          width={1774}
          height={887}
          sizes="100vw"
          className="absolute inset-0 h-full w-full pointer-events-none select-none"
          aria-hidden
          draggable={false}
        />

        <div className="absolute inset-0 z-10 pointer-events-none">
          {showCta && (
            <div className="absolute inset-x-0 top-0 h-[58%] flex flex-col items-center justify-start text-center px-6 md:px-12 pt-[7%] md:pt-[9%] pointer-events-auto">
              <p className="section-label mb-4 md:mb-5">Connect</p>
              <h2 className="heading-h2 max-w-2xl mb-5 md:mb-6 text-chocolate text-[36px] md:text-[44px] leading-tight">
                Be part of a bold new Indian craft chocolate experience
              </h2>
              <Link href="/connect" className="cta-link">
                Get in Touch
              </Link>
            </div>
          )}

          {/* Link columns only — pinned to cream band */}
          <div className="absolute inset-x-0 top-[74%] bottom-0 flex flex-col justify-start px-6 md:px-12 lg:px-20 pt-3 md:pt-4 pb-4 md:pb-5 pointer-events-auto">
            <div className="max-w-7xl mx-auto w-full min-h-0 flex flex-col">
              <div className="grid md:grid-cols-3 gap-5 md:gap-8 mb-4 md:mb-5">
                <div>
                  <p className="body-text text-lg md:text-xl text-chocolate mb-1.5">Origins Cocoa</p>
                  <p className="body-text text-xs md:text-sm text-chocolate/75 max-w-xs leading-snug">
                    Premium Indian cacao — from farm to fermentery to makers. West Godavari, Andhra Pradesh.
                  </p>
                </div>
                <div>
                  <p className="nav-link text-[10px] md:text-xs uppercase tracking-[0.2em] text-chocolate/60 mb-1.5">Explore</p>
                  <ul className="space-y-1 md:space-y-1.5">
                    {footerLinks.explore.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href} className="nav-link text-xs md:text-sm text-chocolate/85 hover:text-earth-gold transition-colors">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="nav-link text-[10px] md:text-xs uppercase tracking-[0.2em] text-chocolate/60 mb-1.5">Connect</p>
                  <ul className="space-y-1 md:space-y-1.5">
                    {footerLinks.connect.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="nav-link text-xs md:text-sm text-chocolate/85 hover:text-earth-gold transition-colors"
                          {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="divider-line mb-3 md:mb-4 opacity-50 mt-auto" />
              <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-3">
                <p className="nav-link text-[10px] md:text-xs text-chocolate/65">
                  &copy; {new Date().getFullYear()} Origins Cocoa. All rights reserved.
                </p>
                <div className="flex gap-4 md:gap-6">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nav-link text-[10px] md:text-xs uppercase tracking-[0.15em] text-chocolate/65 hover:text-earth-gold transition-colors"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
