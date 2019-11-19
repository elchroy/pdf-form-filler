#!/usr/bin/env node

const readline = require("readline");
const pdfFiller = require("pdffiller");
const cliSelect = require("cli-select");
const users = require("../data/index");
const userEmails = Object.keys(users);

readline.emitKeypressEvents(process.stdin);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Welcome to the Canadian Immigration PDF Form Filler for VanHack");

rl.question("Enter email address (to search) ", email => {
  email = email.trim();
  if (["q", "quit"].includes(email)) {
    console.log("Bye!");
    return rl.close();
  }

  cliSelect(
    {
      values: userEmails.filter(userEmail =>
        userEmail.toLowerCase().includes(email.toLowerCase())
      )
    },
    ({ id, value }) => {
      if (id === null && value === null) {
        // none was selected
      } else {
        const user = users[value];
        const sourcePDF = "./testpdfs/immigration_unlokced.pdf";
        const destinationPDF = `./testpdfs/vh-immigration-${value}-cnd.pdf`;

        pdfFiller.fillForm(sourcePDF, destinationPDF, user, function(err) {
          if (err) throw err;
          console.log("In callback (we're done).");
        });
      }
    }
  );
});
