const service = require("../service/index");

const get = async (req, res, next) => {
	try {
		const contacts = await service.getAllContacts();
		res.json({
			status: "success",
			code: 200,
			data: { contacts },
		});
	} catch (error) {
		next(error);
	}
};

const getOne = async (req, res, next) => {
	const { contactId } = req.params;
	try {
		const contact = await service.getOneContact(contactId);
		if (contact) {
			res.json({
				status: "success",
				code: 200,
				data: { contact },
			});
		} else {
			res.json({
				status: "failure",
				code: 404,
				message: "Not found",
			});
		}
	} catch (error) {
		next(error);
	}
};



// router.post("/", validate.createContact, async (req, res, next) => {
// 	try {
// 		const newContact = await contactsActions.addContact(req.body);
// 		res.json({
// 			status: "success",
// 			code: 201,
// 			data: { newContact },
// 		});
// 	} catch (error) {
// 		console.log(error.message);
// 	}
// });

// router.delete("/:contactId", async (req, res, next) => {
// 	try {
// 		const { contactId } = req.params;
// 		const contact = await contactsActions.removeContact(contactId);
// 		if (contact) {
// 			res.json({
// 				status: "success",
// 				code: 200,
// 				message: "Contact deleted",
// 			});
// 		} else {
// 			res.json({
// 				status: "failure",
// 				code: 404,
// 				message: "Not found",
// 			});
// 		}
// 	} catch (error) {
// 		console.log(error.message);
// 	}
// });

// router.put("/:contactId", validate.updateContact, async (req, res, next) => {
// 	try {
// 		const { contactId } = req.params;
// 		const contact = await contactsActions.updateContact(contactId, req.body);
// 		if (contact) {
// 			return res.json({
// 				status: "success",
// 				code: 200,
// 				data: {
// 					contact,
// 				},
// 			});
// 		} else {
// 			return res.status(404).json({
// 				status: "failure",
// 				code: 404,
// 				message: "Not Found",
// 			});
// 		}
// 	} catch (error) {
// 		console.log(error);
// 	}
// });

module.exports = {
	get,
	getOne,
};
