import Fastify, { FastifyInstance } from "fastify";
import { start } from "../src/app";
import { activitiesList } from "../src/data";

// filepath: /Users/hweelernlerh/projects/fs-live-coding-assignment/packages/server/src/index.test.ts

describe("GET /activities", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    global.Date.now = jest.fn(() => new Date("2025-01-01T00:00:00Z").getTime());
    app = Fastify();
    await start(app);
  });

  afterAll(() => {
    app.close();
  });

  it("should return the list of activities", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/activities",
    });

    expect(response.statusCode).toBe(200);

    const receivedActivities = response.json();
    const expectedActivities = activitiesList.map((activity) => ({
      ...activity,
      activityDate: new Date(activity.activityDate).toISOString(),
      createdAt: new Date(activity.createdAt).toISOString(),
      updatedAt: new Date(activity.updatedAt).toISOString(),
    }));

    expect(receivedActivities).toEqual(expectedActivities);
  });
});

describe("POST /activities", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = Fastify();
    await start(app);
  });

  afterAll(() => {
    app.close();
  });

  it("should create a new activity and return it", async () => {
    const newActivity = {
      name: "New Activity",
      description: "This is a new activity",
      emissionVolume: 100,
      unit: "kg",
      activityDate: "2025-01-01T00:00:00.000Z",
    };

    const response = await app.inject({
      method: "POST",
      url: "/activities",
      payload: newActivity,
    });

    expect(response.statusCode).toBe(201);

    const createdActivity = response.json();
    expect(createdActivity).toMatchObject(newActivity);
    expect(createdActivity).toHaveProperty("id");

    // Ensure the activity was added to the activitiesList
    const activityInList = activitiesList.find(
      (activity) => activity.id === createdActivity.id
    );
    expect(activityInList).toBeDefined();
    expect(activityInList).toMatchObject({
      ...newActivity,
      activityDate: new Date(newActivity.activityDate),
    });
  });
});
