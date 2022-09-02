import * as puppeteer from "puppeteer";

export const scraper = async (
  url: string
): Promise<Array<string> | undefined> => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      devtools: true,
    });
    const page = (await browser.pages())[0];
    await page.setUserAgent(
      "Mozilla/5.0 (iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 105.0.0.11.118 (iPhone11,8; iOS 12_3_1; en_US; en-US; scale=2.00; 828x1792; 165586599)"
    );

    // await page.goto(`${urlFirst}_filmography`);
    await page.goto(url);

    const data = await page.$$eval(
      'td[class="celebrity-filmography__title"]',
      (titles) => {
        const films = titles.map((title) => title.innerText);
        return films;
      }
    );
    await browser.close();

    return data;
  } catch (error) {
    console.log(error);
  }
};
