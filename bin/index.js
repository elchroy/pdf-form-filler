#!/usr/bin/env node

const readline = require("readline");
const pdfFiller = require("pdffiller");
const inquirer = require("inquirer");
const users = require("../data/index");
const userEmails = Object.keys(users);
const boxen = require("boxen");
const { log, error, info } = console;
readline.emitKeypressEvents(process.stdin);
const {
  welcomeMsg,
  noMatchMsg,
  errorMsg,
  infoMsg,
  readEmailMsg,
  selectedUserMsg,
  pdfGenerated
} = require("../src/helpers");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const msg = boxen(welcomeMsg, {
  padding: 1,
  margin: 0,
  backgroundColor: "#545454"
});

log(msg);

rl.question(readEmailMsg, email => {
  email = email.trim();
  if (["q", "quit"].includes(email)) {
    log("Bye!");
    return rl.close();
  }

  const filteredEmails = userEmails.filter(userEmail =>
    userEmail.toLowerCase().includes(email.toLowerCase())
  );

  if (filteredEmails.length === 0) {
    error(noMatchMsg(email));
    return rl.close();
  } else {
    inquirer
      .prompt([
        {
          type: "list",
          name: "email",
          message: infoMsg("Select user: "),
          choices: filteredEmails
        }
      ])
      .then(({ email }) => {
        info(selectedUserMsg(email));
        info(infoMsg(`Generating PDF for user with email - ${email}`));

        const user = users[email];
        const sourcePDF = "./testpdfs/immigration_unlokced.pdf";
        const destinationPDF = `./testpdfs/vh-immigration-${email}-cnd.pdf`;

        pdfFiller.fillForm(sourcePDF, destinationPDF, user, function(err) {
          if (err) throw err;
          info(pdfGenerated(email));
        });
      });
  }
});
