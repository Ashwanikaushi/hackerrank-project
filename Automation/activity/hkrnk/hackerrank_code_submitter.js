// browser control
// controls a headless browser -> browser that is by default not visible
// npm i puppeteer
const puppeteer = require("puppeteer");
const credObj = require("./cred");
const fs = require("fs");
// nearly every function of puppeteer returns a promise
async function fn(){
    const browserRepresentativeObj = await puppeteer.launch({
        headless: false,// is line ke baad browser visible ho jata h smjhne ke liye only launch(); ye type krke run krna is line ko hta dena.
        // executablePath: "C:\Program Files (x86)\Mozilla Firefox\firefox.exe",// ye function mere me nhi chal rha lekin sir ke me chal rha tha isse fullscreen ho jati h
        defaultViewport: null,
        args: ["--start-maximized","--start-in-incognito"],
        slowMo:20
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
    //promises compose
    await waitAndClickTopic("Java", tab);
    // select questions -> ??  Java Stdin and Stdout I ✔
    await waitAndClickQuestion("Java Stdin and Stdout I", tab)
    // write the code ->  -> code read type 
    // code -> input 
    // read -> pupptee pass
    let code = await fs.promises.readFile("code.java", "utf-8");
    await copyPasteQuestion(code, tab);
    // // submit the code  -> button click n-> easy -> 
    await submitCode(tab);
}
fn();
// keyboard , mouse , scroll
async function waitAndClickTopic(name,tab){
    await tab.waitForSelector(".topics-list", { visible: true });
    await tab.evaluate(findAndClick, name);
    // console.log(idx);
    function findAndClick(name){
        let alltopics = document.querySelectorAll(".topics-list .topic-card a");

        // return idx
        let idx;
        for(idx =0; idx<alltopics.length;idx++){
            let cTopic = alltopics[idx].textContent.trim();
            console.log(cTopic);
            if(cTopic==name){
                break;
            }
        }
        alltopics[idx].click();
    }
}
    async function waitAndClickQuestion(name,tab){
        await tab.waitForSelector(".challenges-list", { visible: true });
        await tab.evaluate(findAndClick, name);
        // console.log(questions);
        // console.log(idx);
        function findAndClick(name){
            let allquestions = document.querySelectorAll(".challenges-list .challengecard-title");
    
            // return idx
            let idx;
            let textContent = [];
            for(idx =0; idx<allquestions.length;idx++){
                let cTopic = allquestions[idx].textContent.trim();
                textContent.push(cTopic);
                // console.log(cTopic);
                if(cTopic.includes(name.trim())){
                    break;
                }
            }
            allquestions[idx].click();
        }
}

async function copyPasteQuestion(code, tab){
    await tab.waitForSelector('input[type="checkbox"]', { visible: true });
    await tab.click('input[type="checkbox"]');
    await tab.waitForSelector("textarea[id='input-1']", { visible: true });
    await tab.type("textarea[id='input-1']", code);

    await tab.keyboard.down('ControlLeft')
    await tab.keyboard.press('KeyA')
    await tab.keyboard.press('KeyX');
    await tab.keyboard.up('ControlLeft');

    // *****************It has a hight to fail
    await tab.waitForSelector(".monaco-editor");
    await tab.click(".monaco-editor");
    await tab.keyboard.down('ControlLeft')
    await tab.keyboard.press('KeyA')
    await tab.keyboard.press('KeyV');
    await tab.keyboard.up('ControlLeft');
}

async function submitCode(tab) {
    await tab.waitForSelector(".hr-monaco-submit");
    await tab.click(".hr-monaco-submit");
}

