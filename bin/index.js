#!/usr/bin/env node

const readline = require("readline");
const pdfFiller = require("pdffiller");
const cliSelect = require("cli-select");
const users = require("../data/index");
const userEmails = Object.keys(users);
const chalk = require("chalk");
const boxen = require("boxen");
const { log, error, info } = console;
readline.emitKeypressEvents(process.stdin);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const welcomeMsg = chalk.white.underline(
  "Welcome to the Canadian Immigration PDF Form Filler for VanHack!"
);

const getEmail = chalk.white.italic("Enter email address (to search): ");
const noMatchMsg = chalk.red.italic("There's no user with given email");
const selectedUserMsg = email =>
  chalk.yellow.italic(`Selected user with email - ${email}`);
const infoMsg = msg => chalk.yellow.italic(msg);
const successMsg = msg => chalk.inverse.green.bold.italic(msg);

const msg = boxen(welcomeMsg, {
  padding: 1,
  margin: 0,
  backgroundColor: "#545454"
});

log(msg);

rl.question(getEmail, email => {
  email = email.trim();
  if (["q", "quit"].includes(email)) {
    log("Bye!");
    return rl.close();
  }

  const filteredEmails = userEmails.filter(userEmail =>
    userEmail.toLowerCase().includes(email.toLowerCase())
  );

  filteredEmailsObj = {};
  filteredEmails.forEach(e => {
    filteredEmailsObj[e] = chalk.yellow.italic(e);
  });

  if (filteredEmails.length === 0) {
    error(noMatchMsg);
    return rl.close();
  } else {
    cliSelect(
      {
        values: filteredEmailsObj
      },
      ({ id, value }) => {
        info(selectedUserMsg(value));
        info(infoMsg(`Generating PDF for user with email - ${email}`));
        if (id === null && value === null) {
          // none was selected
          log("none was selected");
        } else {
          const user = users[id];
          const sourcePDF = "./testpdfs/immigration_unlokced.pdf";
          const destinationPDF = `./testpdfs/vh-immigration-${id}-cnd.pdf`;

          pdfFiller.fillForm(sourcePDF, destinationPDF, user, function(err) {
            if (err) throw err;
            info(
              successMsg(
                `PDF generated successfully - vh-immigration-${id}-cnd.pdf`
              )
            );
          });
        }
      }
    );
  }
});
