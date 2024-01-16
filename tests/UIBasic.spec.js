// @ts-check
const { test, expect } = require('@playwright/test');

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

 test.only('Browser Playwright Test Let\'s Shop', async ({browser}) => 
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
