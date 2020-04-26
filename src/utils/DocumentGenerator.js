const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const Handlebars = require('handlebars');
const util = require('util');
const moment = require('moment');
const readFile = util.promisify(fs.readFile);

Handlebars.registerHelper('subString', function(passedString) {
    let theString = passedString.substring(6);
    return new Handlebars.SafeString(theString)
});

Handlebars.registerHelper('getYear', function(passedString) {
    let theString = passedString.substring(passedString.length - 4);
    return new Handlebars.SafeString(theString)
});

class DocumentGenerator {
	constructor(dirDocFiles, documentsDir, company) {
		this.company = company ? company : {name: 'ETS', address: 'Bouter'};
		this.dirDocFiles = dirDocFiles;
		this.documentsDir = documentsDir;
	}
	async html(invoice, documentType) {
		try {
			// console.log('__dirname', __dirname)
			// let templatepath = path.resolve(`${this.documentsDir}/templates/${documentType}.html`);
			let templatepath = path.resolve(`${__static}/templates/${documentType}.html`);
			const content = await readFile(templatepath, 'utf8');
			const template = Handlebars.compile(content);
			return template({invoice, company: this.company});
		} catch (e) {
			console.log(e);
			throw e;
		}
	}

	// datasArray as array
	async pdf(datasArray, documentType) {
		try {
			let executablePath = '';
			if (fs.existsSync(`C:\\Program Files (x86)\\Google\\`)) {
			    executablePath = `C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe`;
			} else if (fs.existsSync(`C:\\Programmes (x86)\\Google\\`)) {
				executablePath = `C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe`
			} else if (fs.existsSync(`C:\\Program Files\\Google\\`)) {
				executablePath = `C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe`
			} else if (fs.existsSync(`C:\\Programmes\\Google\\`)) {
				executablePath = `C:\\Programmes\\Google\\Chrome\\Application\\chrome.exe`
			} else {
				executablePath = `C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe`;
			}
			const browser = await puppeteer.launch({
				executablePath,
				ignoreDefaultArgs: ['--disable-extensions']
			});
			const page = await browser.newPage();
			const printedAt = moment().format('DD-MM-YYYY HH.mm.ss');
			let finalFilePath;

			// datasArray[i].formattedDate = moment(datasArray[i].date).format('DD-MM-YYYY');
			// datasArray[i].printedAt = moment().format('DD-MM-YYYYTHH.mm.ss')
			const outputName = `${documentType} document ${printedAt}`;
			let html = await this.html(datasArray[0], documentType);
			let filePath = path.join(this.dirDocFiles, `/documents/${outputName}.pdf`);
			let options = {
				// path: filePath,
				format: 'A4'
			};
			await page.setContent(html);
			let returned = await page.pdf(options);
			console.log('returned', returned)
			console.log('typeof returned', typeof returned)
			await browser.close();
					
			return returned;
		} catch(e) {
			console.log(e);
			throw e;
		}
	}
}

module.exports = DocumentGenerator;