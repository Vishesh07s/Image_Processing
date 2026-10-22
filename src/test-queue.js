import imageQueue from "./queues/image.queue.js";
//adding job to queue, this is stored in redids
const job = await imageQueue.add("resize-image", {
  imageId: 3,
});

console.log("Job added: ", job.id);
