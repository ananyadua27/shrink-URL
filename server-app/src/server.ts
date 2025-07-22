import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/dbConfig.js";
import shortUrl from "./routes/shortUrl.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

app.use(cors());

app.use("/api", shortUrl);

const port = process.env.PORT ? parseInt(process.env.PORT) : 8080;
const startServer = async () => {
  try {
    await connectDb();  
    app.listen(port, () => {
      console.log(`server started on ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to database", error);
    process.exit(1);
  }
};

startServer();

app.get("/", (req, res) => {
    res.send("Hello!");
});
