import express from "express";
import { urlModel } from "../model/shortUrl.js";
import axios from "axios";
const TOKEN = process.env.TOKEN || ""; 

export const createUrl = async (req: express.Request, res: express.Response) => {
  try {
    const urlFound = await urlModel.find({ fullUrl: req.body.fullUrl });
    if (urlFound.length > 0) {
      return res.status(409).send(urlFound);
    } else {
      const shortUrl = await urlModel.create({ fullUrl: req.body.fullUrl });
      console.log("Created shortUrl:", shortUrl); 
      return res.status(201).send(shortUrl);
    }
  } catch (error) {
    console.error("Error in createUrl:", error);  
    return res.status(500).send({ message: "Something went wrong!" });
  }
};

export const delUrl = async (req: express.Request, res: express.Response) => {
  try {
    const shortUrl = await urlModel.findByIdAndDelete({ _id: req.params.id });
    if (shortUrl) {
      return res.status(204).send(); // no content with 204 status
    }
    return res.status(404).send({ message: "URL not found to delete" });
  } catch (error) {
    console.error("Error in delUrl:", error);  
    return res.status(500).send({ message: "Something went wrong!" });
  }
};

export const getAllUrl = async (req: express.Request, res: express.Response) => {
  try {
    const shortUrls = await urlModel.find();
    if (shortUrls.length === 0) {
      return res.status(404).send({ message: "full urls not found!" });
    } else {
      return res.status(200).send(shortUrls);
    }
  } catch (error) {
    console.error("Error in getAllUrl:", error);  
    return res.status(500).send({ message: "Something went wrong!" });
  }
};

export const getUrl = async (req: express.Request, res: express.Response) => {
  try {
    const shortUrl = await urlModel.findOne({ shortUrl: req.params.id });
    if (!shortUrl) return res.status(404).send({ message: "URL not found" });

    shortUrl.clicks++;
    shortUrl.lastClickedAt = new Date();
    const ip =
      req.headers["x-forwarded-for"]?.toString().split(",")[0] || req.ip;

    try {
      const geo = await axios.get(`https://ipinfo.io/${ip}?token=${TOKEN}`);
      console.log("Geo data:", geo.data);
      const country = geo.data.country;
      const city = geo.data.city;
      console.log(city, country)
      shortUrl.lastClickedLocation = `${city}, ${country}`;
    } catch (err) {
      shortUrl.lastClickedLocation = "Unknown";
      console.warn("Geo lookup failed:", err);
    }

    await shortUrl.save();
    return res.redirect(shortUrl.fullUrl);
  } catch (err) {
    console.error("getUrl error:", err);
    return res.status(500).send({ message: "Server error" });
  }
};

