// @ts-check
const { test, expect } = require('@playwright/test');
const { text } = require('stream/consumers');

test('Page Playwright test', async ({page}) => {
  await page.goto("https://google.com")
  await page.click("//*[@id='L2AGLb']")
  // const title = await page.title()
  // console.log(title)
  console.log(await page.title())
  await expect(page).toHaveTitle("Google")
 })

test('Browser Playwright test', async ({browser}) => {
  // chrome - plugins/cookies
  const context = await browser.newContext()
  const page =  await context.newPage()
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
  console.log(await page.title())
  // xpath Or css as below
  // await page.locator("//input[@id='username']").fill("rahulshettyacademy")
  // await page.locator("//input[@id='password']").fill("learning")
  // await page.locator("//input[@id='terms']").check()
  // await page.locator("//input[@id='signInBtn']").click()
  // css
  await page.locator("#username").fill("rahulshettyacademy")
  // await page.locator("#password").fill("learning")
  await page.locator("[type='password']").fill("learning2")
  await page.locator("#terms").check()
  await page.locator("#signInBtn").click()
  // webdriver wait automatically with Playwright
  console.log(await page.locator("[style*='block']").textContent()) // once show Playwright waits
  await expect(page.locator("[style*='block']")).toContainText('Incorrect username/password.');
 })

// New test case

 test('Browser Playwright New Test', async ({browser}) => 
 {
    const context = await browser.newContext()
    const page =  await context.newPage()
    const userName = page.locator("#username")
    const signIn = page.locator("#signInBtn")
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await page.title())
    // css
    await userName.type("rahulshetty")
    await page.locator("[type='password']").fill("learning")
    await signIn.click()
    console.log(await page.locator("[style*='block']").textContent())
    await expect(page.locator("[style*='block']")).toContainText('Incorrect username');    
    // type fill
    await userName.fill("")
    await userName.fill("rahulshettyacademy")
    await signIn.click()
    console.log(await page.locator(".card-body a").first().textContent())    
    console.log(await page.locator(".card-body a").nth(1).textContent())
 })

 test('Browser Playwright Last Test', async ({browser}) => 
 {
    const context = await browser.newContext()
    const page =  await context.newPage()
    const userName = page.locator("#username")
    const signIn = page.locator("#signInBtn")
    const cardTitles = page.locator(".card-body a")
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await page.title())
    // css
    await userName.type("rahulshetty")
    await page.locator("[type='password']").fill("learning")
    await signIn.click()
    console.log(await page.locator("[style*='block']").textContent())
    await expect(page.locator("[style*='block']")).toContainText('Incorrect username');    
    // type fill
    await userName.fill("")
    await userName.fill("rahulshettyacademy")
    await signIn.click()
    console.log(await cardTitles.first().textContent())    
    console.log(await cardTitles.nth(1).textContent())
    // seems to need these console.log(s) before line 72 -	https://playwright.dev/docs/actionability [NOT auto-waiting]
    const allTitles = await cardTitles.allTextContents()
    console.log(allTitles)
 })

 test('Browser Playwright Test Let\'s Shop', async ({browser}) => 
 {
    const context = await browser.newContext()
    const page =  await context.newPage()
    const userName = page.locator("//input[@id='userEmail']")
    const signIn = page.locator("//input[@id='login']")
    const cardTitles = page.locator(".card-body h5 b")
    await page.goto("https://rahulshettyacademy.com/client")
    console.log(await page.title())
    console.log("------------------")
    // css
    await userName.type("lasse@gmail.com")
    await page.locator("//input[@id='userPassword']").fill("Salasana@1")
    await signIn.click()
    await userName.fill("")
    await userName.fill("lasse@gmail.com")
    await signIn.click() 
    console.log(await cardTitles.nth(0).textContent())
    const allTitles = await cardTitles.allTextContents()
    console.log(allTitles)
 })

test('Browser Playwright Test Let\'s Shop Lecturer example', async ({page}) => {
   await page.goto("https://rahulshettyacademy.com/client")
   await page.locator("#userEmail").fill("lasse@gmail.com")
   await page.locator("#userPassword").fill("Salasana@1")
   await page.locator("[value='Login']").click()
   //  await page.locator("//input[@id='login']").click()
   console.log(await page.title())
   console.log("--------------------<>---------------------")
   // await page.waitForLoadState('networkidle') might be Flacky -> latter is BETTER
   await page.locator(".card-body b").first().waitFor() 
   const allTitles = await page.locator(".card-body b").allTextContents()
   console.log(allTitles)
})

// Dropdowns

test('UI Controls', async ({browser}) => 
{
   const context = await browser.newContext()
   const page =  await context.newPage()
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
   const documentLink = page.locator("[href*='documents-request']")
   await page.locator(".radiotextsty").last().click()
   await page.locator("#okayBtn").click() // by ID
   console.log(await page.locator(".radiotextsty").last().isChecked())   
   await expect(page.locator(".radiotextsty").last()).toBeChecked()
   // await page.locator("//input[@id='terms']").click()
   await page.locator("#terms").click()
   await expect(page.locator("//input[@id='terms']")).toBeChecked()
   await page.locator("#terms").uncheck()
   expect(await page.locator("#terms").isChecked()).toBeFalsy()
   await expect(documentLink).toHaveAttribute('class', 'blinkingText');
   // assertion
   // await page.pause()
})


test('Windows handle all', async ({browser}) => 
{
   const context = await browser.newContext()
   const page =  await context.newPage()
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
   const userName = page.locator("#username")
   const signIn = page.locator("#signInBtn")
   const documentLink = page.locator("[href*='documents-request']")
   await userName.type("rahulshettyacademy")
   await page.locator("[type='password']").fill("learning")
   await page.locator(".radiotextsty").last().click()
   await page.locator("#okayBtn").click() // by ID
   console.log(await page.locator(".radiotextsty").last().isChecked())   
   await expect(page.locator(".radiotextsty").last()).toBeChecked()
   // await page.locator("//input[@id='terms']").click()
   await page.locator("#terms").click()
   await expect(page.locator("//input[@id='terms']")).toBeChecked()
   await page.locator("#terms").uncheck()
   expect(await page.locator("#terms").isChecked()).toBeFalsy()
   await expect(documentLink).toHaveAttribute('class', 'blinkingText');

   // assertion
   // await page.pause()
   const dropdown = page.locator("select.form-control ")
   await dropdown.selectOption("consult")
   await signIn.click()
})


test.only('@Child Windows handle', async ({ browser }) => {
   const context = await browser.newContext();
   const page = await context.newPage();
   const page2 = await context.newPage(); // extra
   const userName = page.locator("#username");
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   await page2.goto("https://dance-calendar.herokuapp.com");
   const documentLink = page.locator("[href*='documents-request']");
 
   const [newPage] = await Promise.all([
     context.waitForEvent('page'), // listen for any new page pending, rejected, fulfilled
     documentLink.click(),
   ]); // new page is opened, you can open more windows
 
   const text = await newPage.locator(".im-para.red").textContent();
   const arrayText = text?.split("@");
   // @ts-ignore
   const domain = arrayText[1].split(" ")[0];
   console.log(domain);
   await page.locator("#username").type(domain);
   console.log(await page.locator("#username").inputValue()); // Use `inputValue` instead of `textContent`
 
   // @ts-ignore
   const text2 = await page2.locator(".content").textContent(); // Use `page2` instead of `newPage2`
   console.log(text2);
 });
 