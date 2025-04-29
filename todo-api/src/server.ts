import dotEnv from "dotenv";
import app from "./app";
import { config } from "./config/config";
import connectDB from "./config/connect";

const port = config.port;
const mongoUri: string = process.env.MONGO_URI || "";
dotEnv.config();

connectDB(mongoUri);

app.listen(port, () => {
  console.log(`Server is running on environment ${port}`);
  console.log(`Environment: ${config.nodeEnv}`);
});
