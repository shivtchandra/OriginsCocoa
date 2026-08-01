"use client";

import { FormEvent, useState } from "react";
import { FadeIn } from "./FadeIn";

const contactDetails = [
  {
    label: "Address",
    value: "Talikadapudi, West Godavari\nAndhra Pradesh, India",
  },
  {
    label: "Email",
    value: "hello@originscocoa.com",
    href: "mailto:hello@originscocoa.com",
  },
  {
    label: "Wholesale",
    value: "wholesale@originscocoa.com",
    href: "mailto:wholesale@originscocoa.com",
  },
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "YouTube", href: "https://youtube.com" },
];

type FormStatus = "idle" | "success" | "error";

export function Connect() {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = new FormData(form).get("email");

    if (!email || typeof email !== "string" || !email.includes("@")) {
      setFormStatus("error");
      return;
    }

    setFormStatus("success");
    form.reset();
  };

  return (
    <section id="connect" className="section-padding bg-cream-200/50 pt-32 md:pt-40">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <FadeIn>
            <p className="section-label mb-4">Connect</p>
            <h2 className="heading-h2 mb-6">
              Begin Your Origin Story
            </h2>
            <div className="divider-line mb-8" />
            <p className="body-paragraph mb-12">
              Whether you are a professional chocolatier seeking consistent,
              traceable beans or a passionate maker exploring Indian cacao for the
              first time — we would love to hear from you.
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-lg"
            >
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="your@email.com"
                className="body-text flex-1 px-5 py-3.5 bg-cream border border-chocolate/15 text-chocolate placeholder:text-chocolate/40 text-sm focus:outline-none focus:border-earth-gold/50 transition-colors"
              />
              <button
                type="submit"
                className="nav-link px-8 py-3.5 bg-chocolate text-cream text-xs uppercase tracking-[0.2em] font-medium hover:bg-chocolate/90 transition-colors"
              >
                Get in Touch
              </button>
            </form>

            {formStatus === "success" && (
              <p className="body-text text-sm text-earth-gold mt-4" role="status">
                Thank you. Our team will be in touch within 48 hours.
              </p>
            )}
            {formStatus === "error" && (
              <p className="body-text text-sm text-chocolate/70 mt-4" role="alert">
                Something went wrong. Please try again or email{" "}
                <a
                  href="mailto:hello@originscocoa.com"
                  className="underline hover:text-earth-gold transition-colors"
                >
                  hello@originscocoa.com
                </a>
                .
              </p>
            )}
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="border border-chocolate/10 p-10 md:p-12">
              <p className="section-label mb-8">Reach Us</p>
              <ul className="space-y-8">
                {contactDetails.map((item) => (
                  <li key={item.label}>
                    <p className="nav-link text-xs uppercase tracking-[0.2em] text-chocolate/40 mb-2">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="body-paragraph hover:text-earth-gold transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="body-paragraph whitespace-pre-line">
                        {item.value}
                      </p>
                    )}
                  </li>
                ))}
              </ul>

              <div className="divider-line my-10" />

              <p className="nav-link text-xs uppercase tracking-[0.2em] text-chocolate/40 mb-4">
                Follow Along
              </p>
              <div className="flex flex-wrap gap-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-link text-sm uppercase tracking-[0.15em] text-chocolate/70 hover:text-earth-gold transition-colors"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
