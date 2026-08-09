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

function FooterColumns() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-8 mb-6 md:mb-5">
      <div>
        <p className="body-text text-lg md:text-xl text-chocolate mb-2">Origins Cocoa</p>
        <p className="body-text text-sm text-chocolate/75 max-w-xs leading-snug">
          Premium Indian cacao — from farm to fermentery to makers. West Godavari, Andhra Pradesh.
        </p>
      </div>
      <div>
        <p className="nav-link text-xs uppercase tracking-[0.2em] text-chocolate/60 mb-2">Explore</p>
        <ul className="space-y-2">
          {footerLinks.explore.map((link) => (
            <li key={link.label}>
              <Link href={link.href} className="nav-link text-sm text-chocolate/85 hover:text-earth-gold transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="nav-link text-xs uppercase tracking-[0.2em] text-chocolate/60 mb-2">Connect</p>
        <ul className="space-y-2">
          {footerLinks.connect.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="nav-link text-sm text-chocolate/85 hover:text-earth-gold transition-colors"
                {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function FooterLegal() {
  return (
    <>
      <div className="divider-line mb-4 opacity-50" />
      <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between md:gap-3">
        <p className="nav-link text-xs text-chocolate/65 text-center md:text-left">
          &copy; {new Date().getFullYear()} Origins Cocoa. All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link text-xs uppercase tracking-[0.15em] text-chocolate/65 hover:text-earth-gold transition-colors"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

function ConnectCta({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "mb-8 text-center" : "text-center"}>
      <p className="section-label mb-3 md:mb-5">Connect</p>
      <h2
        className={
          compact
            ? "font-presto text-[1.35rem] sm:text-2xl leading-snug text-chocolate max-w-md mx-auto mb-4"
            : "heading-h2 max-w-2xl mb-5 md:mb-6 text-chocolate text-[36px] md:text-[44px] leading-tight mx-auto"
        }
      >
        Be part of a bold new Indian craft chocolate experience
      </h2>
      <Link href="/connect" className="cta-link">
        Get in Touch
      </Link>
    </div>
  );
}

export function SiteClosing() {
  const pathname = usePathname();
  const showCta = pathname === "/";

  return (
    <footer className="relative w-full bg-cream">
      <div className="md:hidden">
        <div className="relative w-full h-[32vh] min-h-[220px] max-h-[280px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/mural-footer-gouache.png"
            alt=""
            width={1774}
            height={887}
            className="absolute inset-0 h-full w-full object-cover object-top pointer-events-none select-none"
            aria-hidden
            draggable={false}
          />
        </div>

        <div className="px-6 py-8 sm:px-8">
          {showCta && <ConnectCta compact />}
          <FooterColumns />
          <FooterLegal />
        </div>
      </div>

      <div className="relative hidden w-full aspect-[2/1] md:block">
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
            <div className="absolute inset-x-0 top-0 flex h-[58%] flex-col items-center justify-start px-12 pt-[9%] text-center pointer-events-auto">
              <ConnectCta />
            </div>
          )}

          <div className="absolute inset-x-0 top-[74%] bottom-0 flex flex-col justify-start px-12 lg:px-20 pt-4 pb-5 pointer-events-auto">
            <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-col">
              <FooterColumns />
              <FooterLegal />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
