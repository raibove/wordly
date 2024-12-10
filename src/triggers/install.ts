import { Devvit, TriggerContext } from "@devvit/public-api";
import { Challenge } from "../challenge.js";

export const initialize = async (context: TriggerContext) => {
    // Certain things need to be initialized in Redis to run correctly
    // await WordList.initialize({ context });
    await Challenge.initialize({
      redis: context.redis,
    });
  
    // let jobs = await context.scheduler.listJobs();
    // for (let job of jobs) {
    //   await context.scheduler.cancelJob(job.id);
    // }
  
    // await context.scheduler.runJob({
    //   // Time is in UTC, so I think this is 8am? It's around there :D
    //   cron: "0 13 * * *",
    //   name: "DAILY_GAME_DROP",
    //   data: {},
    // });
  };
  
  Devvit.addTrigger({
    events: ["AppInstall"],
    onEvent: async (_, context) => {
      await initialize(context);
    },
  });
  