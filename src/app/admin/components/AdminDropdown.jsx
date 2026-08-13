"use client";

import { useEffect, useId, useRef, useState } from "react";

/**
 * Custom dropdown — matches admin panel styling (replaces native <select>).
 */
export default function AdminDropdown({
  label,
  value,
  options,
  onChange,
  disabled = false,
  busy = false,
  id: idProp,
  placeholder = "Select…",
  className = "",
}) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const rootRef = useRef(null);
  const [open, setOpen] = useState(false);

  const selected = options.find((opt) => opt.value === value);

  useEffect(() => {
    function onPointerDown(e) {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    }
    function onKeyDown(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  function pick(next) {
    setOpen(false);
    if (next !== value) onChange(next);
  }

  return (
    <div className={`admin-dropdown${className ? ` ${className}` : ""}`} ref={rootRef}>
      {label ? (
        <span className="admin-dropdown-label" id={`${id}-label`}>
          {label}
        </span>
      ) : null}
      <button
        id={id}
        type="button"
        className={`admin-dropdown-trigger${open ? " is-open" : ""}${busy ? " is-busy" : ""}`}
        onClick={() => !disabled && setOpen((v) => !v)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={label ? `${id}-label` : undefined}
      >
        <span className="admin-dropdown-value">
          {selected?.label ?? placeholder}
        </span>
        <span className="admin-dropdown-chevron" aria-hidden="true" />
      </button>
      {open ? (
        <ul className="admin-dropdown-menu" role="listbox" aria-labelledby={id}>
          {options.map((opt) => (
            <li key={opt.value} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={opt.value === value}
                className={`admin-dropdown-option${opt.value === value ? " is-selected" : ""}`}
                onClick={() => pick(opt.value)}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
