import Joi from "joi";

const validatePostUser = (req, res, next) => {
  const songschema = Joi.object({
    username: Joi.string().min(3).max(100).required().messages({
      "string.base": "name should be a string",
      "string.empty": "name cannot be empty",
      "string.min": "name should have a minimum length of {#limit}",
      "string.max": "name should have a maximum length of {#limit}",
      "any.required": "name is required",
    }),
    email: Joi.string().min(3).max(100).required().messages({
      "string.base": "email should be a string",
      "string.empty": "email cannot be empty",
      "string.min": "email should have a minimum length of {#limit}",
      "string.max": "email should have a maximum length of {#limit}",
      "any.required": "email is required",
    }),
    password: Joi.string().min(3).max(100).required().messages({
      "string.base": "password should be a string",
      "string.empty": "password cannot be empty",
      "string.min": "password should have a minimum length of {#limit}",
      "string.max": "password should have a maximum length of {#limit}",
      "any.required": "password is required",
    }),
    bio: Joi.string().min(3).max(100).required().messages({
      "string.base": "bio should be a string",
      "string.empty": "bio cannot be empty",
      "string.min": "bio should have a minimum length of {#limit}",
      "string.max": "bio should have a maximum length of {#limit}",
      "any.required": "bio is required",
    }),
    journalId: Joi.string().min(3).max(100).required().messages({
      "string.base": "journalId should be a string",
      "string.empty": "journalId cannot be empty",
      "string.min": "journalId should have a minimum length of {#limit}",
      "string.max": "journalId should have a maximum length of {#limit}",
      "any.required": "journalId is required",
    })
  });

  const {username, email, password, bio, journalId} = req.body;
  const { error } = songschema.validate(
    { username, email, password, bio, journalId},
    {
      abortEarly: false, // Collect all errors, not just the first
      convert: false, // Disable type coercion
    },
  );

  if (error) {
    const formattedErrors = error.details.map(({ message, type }) => ({
      message,
      type,
    }));
    return res.status(409).json({ errors: formattedErrors });
  }

  next();
};

const validatePutUser = (req, res, next) => {
  const songschema = Joi.object({
    username: Joi.string().min(3).max(100).optional().messages({
      "string.base": "username should be a string",
      "string.empty": "username cannot be empty",
      "string.min": "username should have a minimum length of {#limit}",
      "string.max": "username should have a maximum length of {#limit}"
    }),
    email: Joi.string().min(3).max(100).optional().messages({
      "string.base": "email should be a string",
      "string.empty": "email cannot be empty",
      "string.min": "email should have a minimum length of {#limit}",
      "string.max": "email should have a maximum length of {#limit}"
    }),
    password: Joi.string().min(3).max(100).optional().messages({
      "string.base": "password should be a string",
      "string.empty": "password cannot be empty",
      "string.min": "password should have a minimum length of {#limit}",
      "string.max": "password should have a maximum length of {#limit}"
    }),
    bio: Joi.string().min(3).max(100).optional().messages({
      "string.base": "bio should be a string",
      "string.empty": "bio cannot be empty",
      "string.min": "bio should have a minimum length of {#limit}",
      "string.max": "bio should have a maximum length of {#limit}"
    }),
    journalId: Joi.string().min(3).max(100).optional().messages({
      "string.base": "journalId should be a string",
      "string.empty": "journalId cannot be empty",
      "string.min": "journalId should have a minimum length of {#limit}",
      "string.max": "journalId should have a maximum length of {#limit}"
    })
  }).min(1); // At least one field must be provided

  const { error } = songschema.validate(req.body, {
    abortEarly: false,
    convert: false,
  });

  if (error) {
    const formattedErrors = error.details.map(({ message, type }) => ({
      message,
      type,
    }));
    return res.status(409).json({ errors: formattedErrors });
  }

  next();
};

export { validatePostUser, validatePutUser };

