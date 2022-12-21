const { Сontact } = require('../category');
console.log(Сontact);
const listContacts = async () => Сontact.find({});
module.exports = listContacts;
