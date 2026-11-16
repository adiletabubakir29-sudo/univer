import React from "react";
import FeatureScreen from "./FeatureScreen";
import { student } from "../data/mockData";

export default function EducationScreen() {
  return <FeatureScreen title="Оқу үлгерімі" description="Сіздің академиялық көрсеткіштеріңіз." items={[
    { id: "1", title: "GPA көрсеткіші", subtitle: "Жалпы академиялық үлгерім", right: String(student.gpa) },
    { id: "2", title: "Оқу курсы", subtitle: "Қазіргі оқу деңгейі", right: `${student.course}-курс` },
    { id: "3", title: "Оқу тобы", subtitle: "Студенттік топ", right: student.group },
  ]} />;
}
