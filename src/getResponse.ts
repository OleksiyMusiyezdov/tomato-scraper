import * as puppeteer from "puppeteer";
import { IParams, IResponse } from "./interfaces";
import { scraper } from "./scraper";

const paramsMock = {
  firstFirstName: "Dustin",
  firstSecondName: "Hoffman",
  secondFirstName: "Meryl",
  secondSecondName: "Streep",
};

export const getResponse = async (
  params: IParams
): Promise<IResponse | undefined> => {
  const replacer = (name: string): string => name.replace(" ", ""); // "_"

  for (let [key, value] of Object.entries(params)) {
    // @ts-ignore: Unreachable code error
    params[key] = replacer(value);
  }
  const urlFirst = `https://www.rottentomatoes.com/celebrity/${params.firstFirstName}_${params.firstSecondName}`;
  const urlSecond = `https://www.rottentomatoes.com/celebrity/${params.secondFirstName}_${params.secondSecondName}`;

  console.log(urlFirst);
  console.log(urlSecond);

  try {
    const firstArray = await scraper(urlFirst);
    const secondArray = await scraper(urlSecond);

    let matches: Array<string> = [];
    firstArray?.forEach((film) => {
      if (secondArray?.includes(film)) {
        matches.push(film);
      }
    });

    console.log({
      count: matches.length,
      list: matches,
    });

    return {
      count: matches.length,
      list: matches,
    };
  } catch (error) {
    console.log(error);
  }
};
