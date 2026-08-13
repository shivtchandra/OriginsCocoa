"use client";

export default function AdminContentSkeleton({ message = "Loading…" }) {
  return (
    <div className="admin-page-skeleton" aria-busy="true" aria-label={message}>
      <p className="admin-switching-label">{message}</p>
      <div className="admin-skeleton-header" />
      <div className="admin-skeleton-card">
        <div className="admin-skeleton-line is-wide" />
        <div className="admin-skeleton-line" />
        <div className="admin-skeleton-line" />
        <div className="admin-skeleton-line is-short" />
      </div>
    </div>
  );
}
