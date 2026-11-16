import React from "react";
import FeatureScreen from "./FeatureScreen";
import { achievements } from "../data/mockData";

export default function AchievementsScreen() {
  return <FeatureScreen title="Жетістіктерім" description="Оқу және жеке жетістіктер жинағы." items={achievements.map((a) => ({
    id: a.id, title: a.title, subtitle: a.detail, right: "★"
  }))} />;
}
