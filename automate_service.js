const puppeteer = require('puppeteer');
const express = require('express');
const app = express();

class ConnectPool {


    constructor() {
        this.availablePages = [];
        this.createPages(3);
        this.busyPages = []
    }


    async createPages(number_of_pages) {
        let pages = [];
        this.browser = await puppeteer.launch({
            headless: false,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        for (let i = 0; i < number_of_pages; i++) {
            const page = await this.browser.newPage();
            pages.push(page);
        }
        this.availablePages = pages;

    }

    async process(number_of_registrations = 6) {
        for (let i = 0; i < number_of_registrations; i++) {
            this.register();
        }
    }

    async register() {
        if (this.availablePages.length > 0) {
            let page = this.availablePages.pop();
            this.busyPages.push(page);
            setInterval(async () => {
                const pages = await this.browser.pages();
                pages.shift();
                pages[Math.floor(Math.random() * pages.length)].bringToFront();
            }, 2000)
            const result = this.register_page(this.busyPages[this.busyPages.length - 1]);
            result.then((rest) => {
                console.log(rest);
            })
        } else {
            setInterval(async () => {
                this.register();
            }, 10000)
        }
    }

    async register_page(page) {
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

        this.availablePages.push(page);
        this.busyPages.splice(page);
        return {
            "result": content_success
        };
    }

}


const newCon = new ConnectPool();

newCon.process()