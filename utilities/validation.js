const Joi = require("joi");

const schemaCreateContact = Joi.object({
	name: Joi.string().alphanum().min(3).max(30).required(),
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ["com", "net", "pl"] },
		})
		.required(),
	phone: Joi.string()
		.pattern(/^(\+48\s+)?\d{3}(\s*|\-)\d{3}(\s*|\-)\d{3}$/)
		.required(),
});

const schemaUpdateContact = Joi.object({
	name: Joi.string().alphanum().min(3).max(30).optional(),
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ["com", "net", "pl"] },
		})
		.optional(),
	phone: Joi.string()
		.pattern(/^(\+48\s+)?\d{3}(\s*|\-)\d{3}(\s*|\-)\d{3}$/)
		.optional(),
}).min(1);

module.exports = { schemaCreateContact, schemaUpdateContact };
