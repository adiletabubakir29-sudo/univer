import React from "react";
import FeatureScreen from "./FeatureScreen";
import { schedule } from "../data/mockData";

export default function ScheduleScreen() {
  return <FeatureScreen title="Сабақ кестесі" description="Апталық сабақтарға арналған демонстрациялық кесте." items={schedule.map((s) => ({
    id: s.id, title: s.title, subtitle: s.room, right: s.time
  }))} />;
}
