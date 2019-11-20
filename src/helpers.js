const chalk = require("chalk");
const boxen = require("boxen");

const infoMsg = msg => chalk.yellow.italic(msg);
const errorMsg = msg => chalk.red.italic(msg);
const enterInputMsg = msg => chalk.blueBright.italic(msg);
const successMsg = msg => chalk.inverse.green.bold.italic(msg);

const welcomeMsg = boxen(
  chalk.white.underline("Canadian Immigration PDF Form Filler for VanHack!"),
  {
    padding: 1,
    margin: 0,
    backgroundColor: "#545454"
  }
);

const sourceFilePath = "./src/pdfs/immigration_source.pdf";
const desFilePath = email =>
  `./src/pdfs/generated/vh-immigration-${email}-cnd.pdf`;

const readEmailMsg = enterInputMsg("Enter email address (to search): ");

const noMatchMsg = email => errorMsg(`There's no user with like - ${email}`);

const selectedUserMsg = email => infoMsg(`Selected user with email - ${email}`);

const pdfGenerated = email =>
  successMsg(
    `PDF generated successfully -> ./src/pdfs/generated/vh-immigration-${email}-cnd.pdf`
  );

module.exports = {
  infoMsg,
  errorMsg,
  selectedUserMsg,
  noMatchMsg,
  pdfGenerated,
  readEmailMsg,
  welcomeMsg,
  sourceFilePath,
  desFilePath
};
