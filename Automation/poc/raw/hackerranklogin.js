// browser control
// controls a headless browser -> browser that is by default not visible
// npm i puppeteer
const puppeteer = require("puppeteer");
const credObj = require("./cred");
// nearly every function of puppeteer returns a promise
async function fn(){
    let browserRepresentativeObj = await puppeteer.launch({
        headless: false,// is line ke baad browser visible ho jata h smjhne ke liye only launch(); ye type krke run krna is line ko hta dena.
        // executablePath: "C:\Program Files (x86)\Mozilla Firefox\firefox.exe",// ye function mere me nhi chal rha lekin sir ke me chal rha tha isse fullscreen ho jati h
        defaultViewport: null,
        args: ["--start-maximized","--start-in-incognito"],
        // slowMo:100
    });
    // new tab open
    const tab = await browserRepresentativeObj.newPage();
    // to go google's homepage
    await tab.goto("https://www.hackerrank.com/auth/login");
    // type 
    await tab.type("input[type='text']", credObj.email, { delay: 20});
    await tab.type("input[type='password']", credObj.password, { delay: 20});
    // to press  a specific key
    await tab.keyboard.press("Enter");
    // // page change error prevent -> to wait for selector that is present on the second page
    // await tab.waitForSelector(".TbwUpd.NJjxre", {visible: true});
    // await tab.click(".TbwUpd.NJjxre", { delay: 200});
}
fn();
// keyboard , mouse , scroll