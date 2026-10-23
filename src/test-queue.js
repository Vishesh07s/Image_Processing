import imageQueue from "./queues/image.queue.js";
import { QueueEvents } from "bullmq";

const queueEvents = new QueueEvents("image-processing", {
  connection: {
    //address of redis server where bullmq will publish queue events
    host: "localhost",
    port: 6379,
  },
});

await queueEvents.waitUntilReady();
//wait until queueEvents gets connected to redis

//adding job to queue, this is stored in redids
const job = await imageQueue.add(
  "resize-image",
  { imageId: 3 },
  {
    attempts: 3,
    backoff: { type: "exponential", delay: 1000 }, //wait time = initial delay * 2^n
  }, //attempts is a predefined option of bullMQ
);

console.log("Job added: ", job.id);

//BULLMQ 'Job object' provieds methods like .getState(), .attemptsMade

console.log("Attempts made:", job.attemptsMade);
console.log("Job state: ", await job.getState()); //state retrieve is an asynchronous operation

const result = await job.waitUntilFinished(queueEvents);
//result  will contain what worker returned in image.worker.js file
console.log("Processing result:", result);

// Short mein: Worker ka processor result deta hai → BullMQ completion event publish karta hai → Redis use carry karta hai → QueueEvents receive karta hai → waitUntilFinished() ko pata chal jaata hai.
