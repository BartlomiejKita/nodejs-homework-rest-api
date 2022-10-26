const Contact = require("./schemas/contact");

const getAllContacts = async () => Contact.find({}).lean();
const getOneContact = async (contactId) =>
	Contact.findOne({ _id: contactId }).lean();

module.exports = {
	getAllContacts,
	getOneContact,
};
