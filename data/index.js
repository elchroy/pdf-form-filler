const { readFileSync } = require("fs");

const files = ["user1.json", "user2.json", "user3.json"];

const users = {};

const key = "EMP5624_E[0].Page1[0].txtF_Email[0]";

files.forEach(file => {
  let user = readFileSync(`./data/${file}`);
  user = JSON.parse(user);
  users[user[key]] = user;
});

module.exports = users;
