import type { Metadata } from "next";
import { Connect } from "@/components/Connect";

export const metadata: Metadata = {
  title: "Connect — Origins Cocoa",
  description:
    "Reach out to Origins Cocoa — whether you're a professional chocolatier or a passionate maker exploring Indian cacao.",
};

export default function ConnectPage() {
  return (
    <main>
      <Connect />
    </main>
  );
}
