import imageQueue from "./queues/image.queue.js";

const job = await imageQueue.add("resize-image", {
  imageId: 4,
});

console.log("Job added: ", job.id);
