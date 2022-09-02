import express from "express";
import { getResponse } from "./getResponse";
import { IParams, IResponse } from "./interfaces";
import { mockScraper } from "./mockScraper";
import { scraper } from "./scraper";
const app = express();
const port = 3001;

export const server = () => {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  app.get("/", async (req, res) => {
    const {
      firstFirstName,
      firstSecondName,
      secondFirstName,
      secondSecondName,
    } = req.query as unknown as IParams;

    // const response = mockScraper();
    const response = await getResponse({
      firstFirstName: firstFirstName,
      firstSecondName: firstSecondName,
      secondFirstName: secondFirstName,
      secondSecondName: secondSecondName,
    });

    res.status(200).send(response);
  });

  app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
  });
};
