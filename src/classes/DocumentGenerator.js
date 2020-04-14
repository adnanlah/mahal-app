const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
// const merge = require(path.join(__dirname, '/../../app.asar.unpacked/node_modules/easy-pdf-merge'));
const merge = require('easy-pdf-merge');
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

function mergeMultipleFiles(filePaths, outputName) {
	return new Promise((resolve, reject) => {
		merge(filePaths, outputName, function (err) {
			if (err) {
				console.log(err);
				reject(err);
			}
			filePaths.forEach((fileName) => {
				fs.unlinkSync(fileName);
			})
			resolve();
		})
	})
}

class DocumentGenerator {
	constructor(dirDocFiles, documentsDir, company) {
		this.company = company ? company : {name: 'ETS', address: 'Bouter'};
		this.dirDocFiles = dirDocFiles;
		this.documentsDir = documentsDir;
	}
	async html(invoice, documentType) {
		try {
			// console.log('__dirname', __dirname)
			// let templatepath = path.resolve(`${this.dirDocFiles}/../assets/templates/${documentType}.html`);
			let templatepath = path.resolve(`${this.documentsDir}/templates/${documentType}.html`);
			const content = await readFile(templatepath, 'utf8');
			const template = Handlebars.compile(content);
			return template({invoice, company: this.company});
		} catch (e) {
			console.log(e);
			throw e;
		}
	}

	// documentDatasArray as array
	async pdf(documentDatasArray, documentType) {
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
			const date = moment().format('YYYY-MM-DDTHH.mm.ss');
			let filePaths = [];
			let finalFilePath;

			for (let i = 0; i < documentDatasArray.length; i++) {
				const outputName = `${documentType} document ${date} N${i}`;
				let html = await this.html(documentDatasArray[i], documentType);
				let filePath = path.join(this.dirDocFiles, `/documents/${outputName}.pdf`);
				let options = {
					path: filePath,
					format: 'A4'
				};
				await page.setContent(html);
				await page.pdf(options);
				filePaths.push(filePath);
			}

			if (filePaths.length > 1) {
				finalFilePath = path.join(this.dirDocFiles, `/documents/${documentType} document ${date}`);
				await mergeMultipleFiles(filePaths, finalFilePath);
			} else {
				finalFilePath = filePaths[0];
			}
			
			await browser.close();
					
			return finalFilePath;
		} catch(e) {
			console.log(e);
			throw e;
		}
	}
}

module.exports = DocumentGenerator;