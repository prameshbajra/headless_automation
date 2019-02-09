const puppeteer = require('puppeteer');
const express = require('express');
const app = express();

class ConnectPool {

    // browser = await puppeteer.launch({
    //     headless: false,
    //     args: ['--no-sandbox', '--disable-setuid-sandbox']
    // });

    constructor() {
        // this.browser = this.makeBrowser()
        // this.availablePages = this.createPages(3);
        this.busyPages = []
    }

    async makeBrowser() {

        return browser_new;
    }

    async createPages(number_of_pages) {
        let pages = [];
        let browser = await puppeteer.launch({
            headless: false,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        for (let i = 0; i < number_of_pages; i++) {
            const page = await browser.newPage();
            pages.push(page);
        }
        return pages;
    }

    async process(number_of_registrations = 10) {
        // const availablePages = this.createPages(3)
        let pages = [];
        let browser = await puppeteer.launch({
            headless: false,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        for (let i = 0; i < 3; i++) {
            const page = await browser.newPage();
            pages.push(page);
        }
        for (let i = 0; i < number_of_registrations; i++) {
            this.register(pages, this.busyPages);
        }
    }

    register(availablePages, busyPages) {
        if (availablePages.length > 0) {
            busyPages.push(availablePages.splice(availablePages[0]));
            // console.log("\n\n\n\n\n");
            // console.log(busyPages[busyPages.length - 1][0])
            const result = this.register_page(busyPages[busyPages.length - 1][0], availablePages, busyPages);
            console.log(result);
        } else {
            setInterval(() => {
                this.register(availablePages, busyPages);
            }, 10000)
        }
    }

    async register_page(page, availablePages, busyPages) {
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

        // browser.close();
        availablePages.push(page);
        busyPages.splice(page);
        return {
            "result": content_success
        };
    }
}


const newCon = new ConnectPool();

newCon.process()