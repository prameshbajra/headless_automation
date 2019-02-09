const puppeteer = require('puppeteer');
const express = require('express');
const app = express();

let register = async () => {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();
    await page.goto('https://reg.ebay.com/reg/PartialReg');
    // Fill the registration form ...
    await page.click('#firstname');
    await page.$eval('#firstname', el => el.value = "Brownel");
    await page.click('#lastname');
    await page.$eval('#lastname', el => el.value = "Sacar");
    await page.click('#email');
    await page.$eval('#email', el => el.value = "Scaar_B@all.com");

    // Password was a bit tricky, as ebay used api calls for each letter ...
    await page.click('#PASSWORD');
    await page.evaluate(() => document.getElementById("PASSWORD").value = "aasdfassasdf123123")
    const input = await page.$('#PASSWORD');
    await input.click({
        clickCount: 1
    })
    page.keyboard.sendCharacter("" + Math.floor(Math.random() * 10));

    // Check if the button is disabled or not before clicking submit
    await page.waitFor(() => document.querySelector("#ppaFormSbtBtn").getAttribute("disabled") == null)
    await page.click('#ppaFormSbtBtn');

    await page.waitForSelector("#msg2");
    const content_success = await page.evaluate(() => document.getElementById("msg2").textContent)

    browser.close();
    return {
        "result": content_success
    };
};


app.get("/register", (req, res, next) => {
    register().then((value) => {
        console.log(value);
        res.send(value)
    }).catch((e) => {
        console.log(e)
    });
})

app.listen(8090)