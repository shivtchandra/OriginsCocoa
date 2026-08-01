import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center section-padding bg-cream pt-32 md:pt-40 text-center">
      <h1 className="heading-h2 mb-6">This origin has not been charted yet.</h1>
      <p className="body-paragraph max-w-md mb-10 text-chocolate/70">
        The page you are looking for does not exist. Return to the beginning of our
        story.
      </p>
      <Link href="/" className="cta-link">
        Return Home
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </Link>
    </main>
  );
}
