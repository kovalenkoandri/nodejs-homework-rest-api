const listContacts = require("./listContacts");
const getContactById = require("./getContactById");
const rewriteContacts = require("./rewriteContacts");
const addContact = require("./addContact");
const updateContact = require("./updateContact");
const removeContact = require("./removeContact");

module.exports = {
    listContacts,
    getContactById,
    rewriteContacts,
    addContact,
    updateContact,
    removeContact
}

