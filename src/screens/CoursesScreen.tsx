import React from "react";
import FeatureScreen from "./FeatureScreen";
import { courses } from "../data/mockData";

export default function CoursesScreen() {
  return <FeatureScreen title="Менің пәндерім" description="Оқу бағдарламасындағы пәндер." items={courses.map((c) => ({
    id: c.id, title: c.title, subtitle: `${c.teacher} • Үлгерім ${c.progress}%`, right: c.grade
  }))} />;
}
