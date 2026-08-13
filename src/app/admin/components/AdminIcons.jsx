/** Shared 20px stroke icons for the admin panel. */

function IconBase({ children, className = "" }) {
  return (
    <svg
      className={`admin-icon${className ? ` ${className}` : ""}`}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function IconPackage() {
  return (
    <IconBase>
      <path d="M12 22l8-4.5V7.5L12 3 4 7.5v10L12 22z" />
      <path d="M12 22V12" />
      <path d="M20 7.5L12 12 4 7.5" />
      <path d="M7.5 5.2L16.5 9.7" />
    </IconBase>
  );
}

export function IconFolderTree() {
  return (
    <IconBase>
      <path d="M4 6h5l2 2h9v11H4V6z" />
      <path d="M4 10h16" />
    </IconBase>
  );
}

export function IconFilm() {
  return (
    <IconBase>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M7 5v14M17 5v14M3 10h4M17 10h4M3 14h4M17 14h4" />
    </IconBase>
  );
}

export function IconBookOpen() {
  return (
    <IconBase>
      <path d="M12 7v14" />
      <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v20H8.5A3.5 3.5 0 0 1 5 18.5V5.5z" />
      <path d="M19 5.5A3.5 3.5 0 0 0 15.5 2H12v20h3.5A3.5 3.5 0 0 0 19 18.5V5.5z" />
    </IconBase>
  );
}

export function IconExternalLink() {
  return (
    <IconBase>
      <path d="M15 3h6v6" />
      <path d="M10 14L21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </IconBase>
  );
}

export function IconPlus() {
  return (
    <IconBase>
      <path d="M12 5v14M5 12h14" />
    </IconBase>
  );
}

export function IconSearch() {
  return (
    <IconBase>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </IconBase>
  );
}

export function IconLayoutList() {
  return (
    <IconBase>
      <rect x="4" y="5" width="16" height="4" rx="1" />
      <rect x="4" y="11" width="16" height="4" rx="1" />
      <rect x="4" y="17" width="16" height="4" rx="1" />
    </IconBase>
  );
}

export function IconLayers() {
  return (
    <IconBase>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 12l9 5 9-5" />
      <path d="M3 17l9 5 9-5" />
    </IconBase>
  );
}

export function IconImage() {
  return (
    <IconBase>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.75" />
      <path d="M21 15l-5-5-11 11" />
    </IconBase>
  );
}

export function IconGrid() {
  return (
    <IconBase>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </IconBase>
  );
}

export const ADMIN_NAV_ICONS = {
  dashboard: IconGrid,
  products: IconPackage,
  categories: IconFolderTree,
  homepage: IconFilm,
  about: IconBookOpen,
  assets: IconImage,
  external: IconExternalLink,
};
