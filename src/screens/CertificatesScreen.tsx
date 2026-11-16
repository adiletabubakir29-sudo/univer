import React from "react";
import FeatureScreen from "./FeatureScreen";
import { certificates } from "../data/mockData";

export default function CertificatesScreen() {
  return <FeatureScreen title="Сертификаттар" description="Алынған сертификаттар мен курстар." items={certificates.map((c) => ({
    id: c.id, title: c.title, subtitle: c.organization, right: c.year
  }))} />;
}
