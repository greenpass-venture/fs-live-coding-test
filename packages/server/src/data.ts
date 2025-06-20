import { v4 as uuidv4 } from "uuid";

export type Activity = {
  id: string;
  name: string;
  description: string;
  emissionVolume: number;
  unit: string;
  activityDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

const noOfActivities = 10;

export const activitiesList: Activity[] = [
  ...Array.from({ length: noOfActivities }, (_, i) => ({
    id: uuidv4(),
    name: `Activity ${i}`,
    description: `Description of activity ${i}`,
    emissionVolume: (i + 1) * 100,
    unit: "kg",
    activityDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  })),
];
