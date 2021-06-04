import * as puppeteer from 'puppeteer';

const HOMEPAGE = 'https://www15.iclub.be/myiclub.asp?ClubID=612';
const CREDENTIALS = {
  username: 'quentin.vanderlinden@gmail.com',
  password: 'LAnDoUntqvNiNh4sitH9',
};

const notify = (e: Error) => {
	console.error(e)
}

const main = async () => {
	try {
		// navigate to page
		const browser = await puppeteer.launch({
			defaultViewport: {
				width: 1600,
				height: 800,
			},
			headless: false
		});
		const page = await browser.newPage();
		await page.goto(HOMEPAGE);
	
		// insert credentials
		const usernameInput = await page.$("[name=Login]")
		if (!usernameInput) {
			throw new Error("Cannot find username form input")
		}
		await usernameInput.type(CREDENTIALS.username)
		
		const passwordInput = await page.$("[name=Password]")
		if (!passwordInput) {
			throw new Error("Cannot find password form input")
		}
		await passwordInput.type(CREDENTIALS.password)

		// submit form
		const loginForm = await page.$("[id=SignIn]")
		if (!loginForm) {
			throw new Error("Cannot find the form to submit")
		}
		await loginForm.evaluate(form => (form as HTMLFormElement).submit())

		// wait 
		await page.waitForNavigation()

		// go to calendar
		const calendarButton = await page.$("[calendar=calendar]")
		if (!calendarButton) {
			throw new Error("Cannot find calendar button in side menu")
		}
		await calendarButton.click()

	} catch (e) {
		notify(e)
	}
};

main();
