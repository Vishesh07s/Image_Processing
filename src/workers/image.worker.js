import { Worker } from "bullmq";
//importing worker class from bullmq
const worker = new Worker(
  "image-processing",
  async (job) => {
    console.log("Job received");
    console.log("Job Id:", job.id);
    console.log("Job name:", job.name);
    console.log("Job data:", job.data);

    console.log("Processing job...");

    return {
      message: "Job processed successfully",
    };
  },
  {
    connection: {
      host: "localhost",
      port: 6379,
    },
  },
);
