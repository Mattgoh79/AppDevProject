import Joi from "joi";

const validatePostArtist = (req, res, next) => {
  const artistschema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
      "string.base": "name should be a string",
      "string.empty": "name cannot be empty",
      "string.min": "name should have a minimum length of {#limit}",
      "string.max": "name should have a maximum length of {#limit}",
      "any.required": "name is required",
    }),
    birthYear:Joi.number().integer().min(1900).max(9999).required().messages({
        "number.base": "birthYear should be a number",
        "number.integer": "birthYear should be an integer",
        "number.min": "birthYear should be at least {#limit}",
        "number.max": "birthYear should be at most {#limit}",
        "any.required": "birthYear is required",
    }),
    bio: Joi.string().min(3).max(100).required().messages({
      "string.base": "bio should be a string",
      "string.empty": "bio cannot be empty",
      "string.min": "bio should have a minimum length of {#limit}",
      "string.max": "bio should have a maximum length of {#limit}",
      "any.required": "bio is required",
    })
  });

  const { name, birthYear, bio} = req.body;
  const { error } = artistschema.validate(
    {name, birthYear, bio},
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

const validatePutArtist = (req, res, next) => {
  const artistschema = Joi.object({
    name: Joi.string().min(3).max(100).optional().messages({
      "string.base": "name should be a string",
      "string.empty": "name cannot be empty",
      "string.min": "name should have a minimum length of {#limit}",
      "string.max": "name should have a maximum length of {#limit}",
    }),
    birthYear: Joi.number().integer().min(1).max(100).optional().messages({
      "number.base": "genre should be a number",
      "number.integer": "numberField should be an integer",
      "number.min": "numberField should be at least {#limit}",
      "number.max": "numberField should be at most {#limit}",
    }),
    bio: Joi.string().min(3).max(100).optional().messages({
      "string.base": "releaseDate should be a string",
      "string.empty": "releaseDate cannot be empty",
      "string.min": "releaseDate should have a minimum length of {#limit}",
      "string.max": "releaseDate should have a maximum length of {#limit}",
    }),
  }).min(1); // At least one field must be provided

  const { error } = artistschema.validate(req.body, {
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

export { validatePostArtist, validatePutArtist };

