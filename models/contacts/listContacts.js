const { Сontact } = require('../category');
const listContacts = async () => Сontact.find({});
module.exports = listContacts;
