import compression from "compression";
import { getAllActivities } from "../services/activities.service.js";

export async function getActivitiesUncompressed(req, res, next) {
  try {
    const start = Date.now();
    console.log("[chapter-10][baseline] request started");

    const activities = await getAllActivities();

    console.log(
      "[chapter-10][baseline] payload size (bytes):",
      Buffer.byteLength(JSON.stringify(activities))
    );

    res.json(activities);

    console.log(
      "[chapter-10][baseline] response time:",
      Date.now() - start,
      "ms"
    );
  } catch (err) {
    next(err);
  }
}

const compressAll = compression();

export async function getActivitiesCompressedBuggy(req, res, next) {
  try {
    const start = Date.now();
    console.log("[chapter-10][buggy] request started");

    compressAll(req, res, async () => {
      const activities = await getAllActivities();

      console.log(
        "[chapter-10][buggy] payload size before compression:",
        Buffer.byteLength(JSON.stringify(activities))
      );

      res.json(activities);

      console.log(
        "[chapter-10][buggy] response time:",
        Date.now() - start,
        "ms"
      );
    });
  } catch (err) {
    next(err);
  }
}