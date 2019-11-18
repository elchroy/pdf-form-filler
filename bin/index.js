#!/usr/bin/env node

const readline = require("readline");
const fs = require("fs");
const PDFFillForm = require("pdf-fill-form");

console.log("Welcome to the Canadian Immigration PDF Form Filler for VanHack");

const findUserByEmail = async email => {
  const user = fs.readFileSync("./data/user1.json");
  return JSON.parse(user);
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Please enter email address: ", email => {
  if (["q", "quit"].includes(email)) {
    console.log("Bye!");
    return rl.close();
  }
  // TODO: validate email

  // search for user
  console.log(`Searching for user with email - ${email}`);
  const user = findUserByEmail(email);

  if (!user) {
    console.log(`User with email - ${email} not found!`);
  } else {
    // if found: User Found!
    console.log(`Generating PDF for user with email - ${email}...`);
    PDFFillForm.write("./testpdfs/test.pdf", user, {
      save: "pdf",
      cores: 4,
      scale: 0.2,
      antialias: true
    }).then(result => {
      fs.writeFile(`./testpdfs/gen_${email}.pdf`, result, () => {
        console.log(`PDF file saved - gen_${email}.pdf`);
      });
    });
  }
});
