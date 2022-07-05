import * as puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({
    // headless: false,
    // slowMo: 50,
  });
  const page = await browser.newPage();
  // login
  await page.goto("https://www.saucedemo.com/");
  await page.type("#user-name", "standard_user");
  await page.type("#password", "secret_sauce");
  await page.click("#login-button");
  // Add to cart
  await page.click("#add-to-cart-sauce-labs-backpack");
  await page.click("#add-to-cart-sauce-labs-bike-light");
  // open cart
  await page.click("#shopping_cart_container");
  // remove some item
  await page.click("#remove-sauce-labs-bike-light");
  const [button] = await page.$x("//button[contains(., 'Checkout')]");
  if (button) {
    button.click();
  }
  // Checkout Information
  await page.waitForSelector("#first-name");
  await page.type("#first-name", "John");
  await page.type("#last-name", "Smith");
  await page.type("#postal-code", "12345");
  await page.click("#continue");
  await page.click("#finish");
  await page.waitForSelector("#checkout_complete_container");
  const success = await page.evaluate(() => {
    let element = document.querySelector(
      "#checkout_complete_container h2:nth-child(1)"
    );
    if (element && element.innerHTML === "THANK YOU FOR YOUR ORDER") {
      return true;
    } else {
      return false;
    }
  });
  if (success) {
    console.log("Checkout success");
  } else {
    console.log("Checkout failed");
  }
  //   ...
  await browser.close();
})();
