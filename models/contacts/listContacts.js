const { Сontact } = require('../category');
const listContacts = async (req) => {
    const { _id } = req.user;
    return Сontact.find({ owner: _id });
};
module.exports = listContacts;
