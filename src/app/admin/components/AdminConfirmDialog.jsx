"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import { createPortal } from "react-dom";

const ConfirmContext = createContext(null);

export function ConfirmProvider({ children }) {
  const [state, setState] = useState(null);
  const resolveRef = useRef(null);

  const confirm = useCallback(({ title, description, confirmLabel = "Confirm", cancelLabel = "Cancel", destructive = false }) => {
    return new Promise((resolve) => {
      resolveRef.current = resolve;
      setState({ title, description, confirmLabel, cancelLabel, destructive });
    });
  }, []);

  function close(result) {
    setState(null);
    resolveRef.current?.(result);
    resolveRef.current = null;
  }

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {state &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="admin-confirm-backdrop"
            role="presentation"
            onClick={() => close(false)}
          >
            <div
              className="admin-confirm-dialog"
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="admin-confirm-title"
              aria-describedby="admin-confirm-desc"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 id="admin-confirm-title" className="admin-confirm-title">
                {state.title}
              </h2>
              {state.description ? (
                <p id="admin-confirm-desc" className="admin-confirm-desc">
                  {state.description}
                </p>
              ) : null}
              <div className="admin-confirm-actions">
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary"
                  onClick={() => close(false)}
                >
                  {state.cancelLabel}
                </button>
                <button
                  type="button"
                  className={`admin-btn${state.destructive ? " admin-btn-danger" : " admin-btn-primary"}`}
                  onClick={() => close(true)}
                  autoFocus
                >
                  {state.confirmLabel}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const confirm = useContext(ConfirmContext);
  if (!confirm) {
    throw new Error("useConfirm must be used within ConfirmProvider");
  }
  return confirm;
}
