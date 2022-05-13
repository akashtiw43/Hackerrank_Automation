const puppeteer=require("puppeteer");
let page;
const link="https://www.hackerrank.com/auth/login";
const email="coxadi4295@flowminer.com";
const pass="123456";
const codeObj=require("./soln");
const browserPromise=puppeteer.launch({headless:false,defaultViewport:null,args:["--start-maximized"]});
browserPromise.then(function(browser){
    const pagesPromise=browser.pages();
    return pagesPromise;
}).then(function (browserPages){
    page=browserPages[0];
    const gotoPromise=page.goto("https://www.google.com/");
    return gotoPromise;
}).then(function (){
    //console.log("opened chrome");
    const waitForGoogle=page.waitForSelector("input[type='text']",{visible:true});
    return waitForGoogle;
}).then(function(){
    const typeSearch=page.type("input[type='text']","hackerrank",{delay : 50});
    return typeSearch;
}).then(function(){
    const enterPromise=page.keyboard.press("Enter");
    return enterPromise;
}).then(function(){
    const waitForHk=page.waitForSelector("h3.LC20lb.MBeuO.DKV0Md",{visible:true});
    return waitForHk;
}).then(function(){
    const accessLink=page.click("h3.LC20lb.MBeuO.DKV0Md");
    return accessLink;
}).then(function(){
    const waitForLogin=page.waitForSelector('a[data-event-action="Login"]',{visiblee:true});
    return waitForLogin;
}).then(function(){
    const loginPromise=page.click('a[data-event-action="Login"]');
    return loginPromise;
}).then(function(){
    const waitForLoginBtn=page.waitForSelector(".fl-button-width-auto.fl-button-left a",{visible:true});
    return waitForLoginBtn;
}).then(function(){
    const loginBtnPromise=page.click('.fl-button-width-auto.fl-button-left a');
    return loginBtnPromise;
}).then(function(){
    const waitForEmail=page.waitForSelector('input[type="text"]',{visible:true});
    return waitForEmail;
}).then(function (){
    const emailPromise=page.type('input[type="text"]',email,{delay:50});
    return emailPromise;
}).then(function(){
    const waitForpass=page.waitForSelector('input[type="password"]',{visible:true});
    return waitForpass;
}).then(function (){
    const passPromise=page.type('input[type="password"]',pass,{delay:50});
    return passPromise;
}).then(function(){
    const enterLogin=page.keyboard.press("Enter");
    return enterLogin;
}).then(function(){
    const algoPromise=waitAndClick('.topic-card a[data-attr1="algorithms"]',page);
    return algoPromise;
}).then(function(){
    const warmupPromise=waitAndClick('input[value="warmup"]',page);
    return warmupPromise;
}).then(function(){
    const waitFor3secs=page.waitFor(3000);
    return waitFor3secs;
}).then(function(){
    const allQuesPromise=page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled");
    return allQuesPromise;
}).then(function(questionArr){
    console.log(questionArr.length);
    const questionSolving=questionSolver(page,questionArr[0],codeObj.answers[0]);
    return questionSolving;
}).catch(function(err){
    console.log(err);
})

function waitAndClick(selector,cPage){
    return new Promise(function(resolve,reject){
        let waitForModel=cPage.waitForSelector(selector);
        waitForModel.then(function(){
            let clickModel=cPage.click(selector);
            return clickModel;
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject();
        })
    })
}
function questionSolver(page,question,answer){
    return new Promise(function(resolve,reject){
        let questionClick=question.click();
        questionClick.then(function(){
            let editorFocus=waitAndClick('.monaco-editor.no-user-select.vs',page);
            return editorFocus;
        }).then(function(){
            return waitAndClick('.checkbox-input',page);
        }).then(function(){
            return page.waitForSelector('textarea.custominput',page);
        }).then(function(){
            return page.type('textarea.custominput',answer,{delay:10});
        }).then(function(){
            const ctrlisPressed=page.keyboard.down("Control");
            return ctrlisPressed;
        }).then(function(){
            let AisPressed=page.keyboard.press("A",{delay:200});
            return AisPressed;
        }).then(function(){
            const XisPressed=page.keyboard.press("X",{delay:200});
            return XisPressed;
        }).then(function(){
            let CtrlisUnpressed=page.keyboard.up("Control");
            return CtrlisUnpressed;
        }).then(function(){
            const mainEditorFocus=waitAndClick('.monaco-editor.no-user-select.vs',page);
            return mainEditorFocus;
        }).then(function(){
            const ctrlisPressedinMain=page.keyboard.down("Control");
            return ctrlisPressedinMain;
        }).then(function(){
            let AisPressed=page.keyboard.press("A",{delay:200});
            return AisPressed;
        }).then(function(){
            const VisPressed=page.keyboard.press("V",{delay:200});
            return VisPressed;
        }).then(function(){
            let CtrlisUnpressed=page.keyboard.up("Control");
            return CtrlisUnpressed;
        }).then(function(){
            return page.click(".hr-monaco__run-code",{delay:50});
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject();
        })
        
    })
}