import React from "react";
import FeatureScreen from "./FeatureScreen";
import { assignments } from "../data/mockData";

export default function AssignmentsScreen() {
  return <FeatureScreen title="Тапсырмалар" description="Оқу тапсырмалары мен олардың орындалу мәртебесі." items={assignments.map((a) => ({
    id: a.id, title: a.title, subtitle: `${a.subject} • ${a.deadline}`, right: a.status
  }))} />;
}
