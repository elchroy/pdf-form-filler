#!/usr/bin/env node

const readline = require("readline");
const fs = require("fs");
const PDFFillForm = require("pdf-fill-form");
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
        PDFFillForm.write("./testpdfs/test.pdf", user, {
          save: "pdf",
          cores: 4,
          scale: 0.2,
          antialias: true
        }).then(result => {
          fs.writeFile(`./testpdfs/gen-${value}.pdf`, result, () => {
            console.log(`PDF file saved - gen-${value}.pdf`);
          });
        });
      }
    }
  );
});
