import type { Metadata } from "next";
import { FarmerCommunity } from "@/components/FarmerCommunity";
import { AudienceSplit } from "@/components/AudienceSplit";

export const metadata: Metadata = {
  title: "Community — Origins Cocoa",
  description:
    "Meet our 100+ cacao farmer-member community and learn how we partner with makers at every level.",
};

export default function CommunityPage() {
  return (
    <main>
      <FarmerCommunity />
      <AudienceSplit />
    </main>
  );
}
