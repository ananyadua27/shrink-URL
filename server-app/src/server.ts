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
}))

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use("/api", shortUrl);

const port = process.env.PORT || 5001;

app.get("/", (req, res) => {
    res.send("Hello!");

})

app.listen(port, () => {
    console.log(`server started on ${port}`)
})
