import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import fetch from "node-fetch";
import { Configuration, OpenAIApi } from "openai";
import { sourceTextsValues } from "../../sourceTexts.js";

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/location", async (req, res) => {
  try {
    const data = await fetch(
      `https://api.ipregistry.co/?key=${process.env.IPREGISTRY_API_KEY}`
    ).then((response) => response.json());

    const { country, city } = data.location;

    res.json({
      country: country.name,
      city,
      flag: country.flag.emoji,
      language: country.languages[0].name,
    });
  } catch (error) {}
});

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

app.post("/gpt", async (req, res) => {
  try {
    const { language } = req.body;
    const sourceTextsArray = JSON.stringify(sourceTextsValues);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Translate elements of ${sourceTextsArray} into ${language} and return a new array of translated elements.`,
      max_tokens: 1050,
    });

    const gptReply = JSON.parse(
      response.data.choices[0].text.replace(/\\/g, "").replace(/\n/g, "")
    );

    console.log(gptReply);

    res.json({ gptReply });
  } catch (error) {}
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
