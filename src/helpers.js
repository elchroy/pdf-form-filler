const chalk = require("chalk");

const infoMsg = msg => chalk.yellow.italic(msg);
const errorMsg = msg => chalk.red.italic(msg);
const enterInputMsg = msg => chalk.blueBright.italic(msg);
const successMsg = msg => chalk.inverse.green.bold.italic(msg);

const welcomeMsg = chalk.white.underline(
  "Welcome to the Canadian Immigration PDF Form Filler for VanHack!"
);

const readEmailMsg = enterInputMsg("Enter email address (to search): ");

const noMatchMsg = email =>
  errorMsg(`There's no user with given email - ${email}`);

const selectedUserMsg = email => infoMsg(`Selected user with email - ${email}`);

const pdfGenerated = email =>
  successMsg(`PDF generated successfully - vh-immigration-${email}-cnd.pdf`);

module.exports = {
  infoMsg,
  errorMsg,
  selectedUserMsg,
  noMatchMsg,
  pdfGenerated,
  readEmailMsg,
  welcomeMsg
};
