import { Queue } from "bullmq";
//QUEUE Is created
const imageQueue = new Queue("image-processing", {
  connection: {
    //location where redis server is running
    host: "localhost",
    port: 6379,
  },
});

export default imageQueue;
