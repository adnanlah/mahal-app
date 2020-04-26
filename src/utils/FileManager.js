const fs = require('fs');
const moment = require('moment');

class FileManager {
	constructor(logPath) {
		this.logPath = logPath;
		
		this.file =	this.createFile(logPath);
	}

	createFile(filename) {
	  fs.open(filename,'r',function(err, fd){
	    if (err) {
	      fs.writeFile(filename, 'First line\n\n', function(err) {
	          if(err) {
	              console.log(err);
	          }
	          console.log("The file was saved!");
	      });
	    } else {
	      console.log("The file exists!");
	    }
	  });
	}

	removeFirstLine(logPath) {
		fs.readFile(logPath, function(err, data) { // read file to memory
		    if (!err) {
		        data = data.toString(); // stringify buffer
		        var position = data.toString().indexOf('\n'); // find position of new line element
		        if (position != -1) { // if new line element found
		            data = data.substr(position + 1); // subtract string based on first line length

		            fs.writeFile(logPath, data, function(err) { // write file
		                if (err) { // if error, report
		                    console.log (err);
		                }
		            });
		        } else {
		            console.log('no lines found');
		        }
		    } else {
		        console.log(err);
		    }
		});
	}

	countFileLines(logPath){
	  return new Promise((resolve, reject) => {
	  let lineCount = 0;
	  fs.createReadStream(this.logPath)
	    .on("data", (buffer) => {
	      let idx = -1;
	      lineCount--; // Because the loop will run once for idx=-1
	      do {
	        idx = buffer.indexOf(10, idx+1);
	        lineCount++;
	      } while (idx !== -1);
	    }).on("end", () => {
	      resolve(lineCount);
	    }).on("error", reject);
	  });
	};

	async writeLine(line) {
		try {
			let stream = fs.createWriteStream(this.logPath, {flags:'a'});
			// console.log('line', line)
			stream.once('open', function(fd) {
			  stream.write(`[${moment().locale('fr').format('lll').toUpperCase()}] ${line}\n`);
			  stream.end();
			});
			let countL = await this.countFileLines(this.logPath)
			// delete first line
			if (countL > 100) {
				// console.log('removing first line');
				this.removeFirstLine(this.logPath);
			}
		} catch(e) {
			console.log(e)
			throw e;
		}
	}
}

module.exports = FileManager;