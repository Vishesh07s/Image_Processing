import { Queue } from "bullmq";

const imageQueue = new Queue("image-processing", {
  connection: {
    //location where redis server is running
    host: "localhost",
    port: 6379,
  },
});

export default imageQueue;
