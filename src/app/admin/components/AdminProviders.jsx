"use client";

import { Toaster } from "sonner";
import { ConfirmProvider } from "./AdminConfirmDialog";

export default function AdminProviders({ children }) {
  return (
    <ConfirmProvider>
      {children}
      <Toaster
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          classNames: {
            toast: "admin-toast",
            title: "admin-toast-title",
            description: "admin-toast-desc",
          },
        }}
      />
    </ConfirmProvider>
  );
}
