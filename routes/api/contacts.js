const express = require("express");
const router = express.Router();
const contactsActions = require("../../models/contacts.js");
const {
	schemaCreateContact,
	schemaUpdateContact,
} = require("../../utilities/validation.js");

router.get("/", async (req, res, next) => {
	try {
		const contacts = await contactsActions.listContacts();
		res.json({
			status: "success",
			code: 200,
			data: { contacts },
		});
	} catch (error) {
		console.log(error.message);
	}
});

router.get("/:contactId", async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const contact = await contactsActions.getContactById(contactId);
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
		console.log(error.message);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const result = await schemaCreateContact.validate(req.body);
		if (result.error) {
			res.json({
				status: "failure",
				code: 400,
				message: `missing required name field ${result.error}`,
			});
		} else {
			const newContact = await contactsActions.addContact(req.body);
			res.json({
				status: "success",
				code: 201,
				data: { newContact },
			});
		}
	} catch (error) {
		console.log(error.message);
	}
});

router.delete("/:contactId", async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const contact = await contactsActions.removeContact(contactId);
		if (contact) {
			res.json({
				status: "success",
				code: 200,
				message: "Contact deleted",
			});
		} else {
			res.json({
				status: "failure",
				code: 404,
				message: "Not found",
			});
		}
	} catch (error) {
		console.log(error.message);
	}
});

router.put("/:contactId", async (req, res, next) => {
	try {
		const result = await schemaUpdateContact.validate(req.body);
		if (result.error) {
			res.json({
				status: "failure",
				code: 400,
				message: `missing fields ${result.error}`,
			});
		} else {
			const { contactId } = req.params;
			const contact = await contactsActions.updateContact(contactId, req.body);
			if (contact) {
				return res.json({
					status: "success",
					code: 200,
					data: {
						contact,
					},
				});
			} else {
				return res.status(404).json({
					status: "failure",
					code: 404,
					message: "Not Found",
				});
			}
		}
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
