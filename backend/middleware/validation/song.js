import Joi from "joi";

const validatePostSong = (req, res, next) => {
  const songschema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
      "string.base": "name should be a string",
      "string.empty": "name cannot be empty",
      "string.min": "name should have a minimum length of {#limit}",
      "string.max": "name should have a maximum length of {#limit}",
      "any.required": "name is required",
    }),
    trackNumber:  Joi.number().integer().min(1).max(100).required().messages({
      "number.base": "trackNumber should be a number",
      "number.integer": "trackNumber should be an integer",
      "number.min": "trackNumber should be at least {#limit}",
      "number.max": "trackNumber should be at most {#limit}",
      "any.required": "trackNumber is required",
    }),
    length:  Joi.number().integer().min(1).max(100).required().messages({
      "number.base": "length should be a number",
      "number.integer": "length should be an integer",
      "number.min": "length should be at least {#limit}",
      "number.max": "length should be at most {#limit}",
      "any.required": "length is required",
    }),
    genre: Joi.string().min(3).max(100).required().messages({
      "string.base": "genre should be a string",
      "string.empty": "genre cannot be empty",
      "string.min": "genre should have a minimum length of {#limit}",
      "string.max": "genre should have a maximum length of {#limit}",
      "any.required": "genre is required",
    }),
    description: Joi.string().min(3).max(100).required().messages({
      "string.base": "description should be a string",
      "string.empty": "description cannot be empty",
      "string.min": "description should have a minimum length of {#limit}",
      "string.max": "description should have a maximum length of {#limit}",
      "any.required": "description is required",
    }),
    albumId: Joi.string().min(3).max(100).required().messages({
      "string.base": "albumId should be a string",
      "string.empty": "albumId cannot be empty",
      "string.min": "albumId should have a minimum length of {#limit}",
      "string.max": "albumId should have a maximum length of {#limit}",
      "any.required": "albumId is required",
    }),
    artistId: Joi.string().min(3).max(100).required().messages({
      "string.base": "artistId should be a string",
      "string.empty": "artistId cannot be empty",
      "string.min": "artistId should have a minimum length of {#limit}",
      "string.max": "artistId should have a maximum length of {#limit}",
      "any.required": "artistId is required",
    }),
  });

  const {name, trackNumber,length,genre, description,albumId,artistId} = req.body;
  const { error } = songschema.validate(
    { name, trackNumber, length, genre, description, albumId, artistId},
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

const validatePutSong = (req, res, next) => {
  const songschema = Joi.object({
    name: Joi.string().min(3).max(100).optional().messages({
      "string.base": "name should be a string",
      "string.empty": "name cannot be empty",
      "string.min": "name should have a minimum length of {#limit}",
      "string.max": "name should have a maximum length of {#limit}",
    }),
    trackNumber:  Joi.number().integer().min(1).max(100).optional().messages({
      "number.base": "trackNumber should be a number",
      "number.integer": "trackNumber should be an integer",
      "number.min": "trackNumber should be at least {#limit}",
      "number.max": "trackNumber should be at most {#limit}",
    }),
    length:  Joi.number().integer().min(1).max(100).optional().messages({
      "number.base": "trackNumber should be a number",
      "number.integer": "trackNumber should be an integer",
      "number.min": "trackNumber should be at least {#limit}",
      "number.max": "trackNumber should be at most {#limit}",
    }),
    genre: Joi.string().min(3).max(100).optional().messages({
      "string.base": "userId should be a string",
      "string.empty": "userId cannot be empty",
      "string.min": "userId should have a minimum length of {#limit}",
      "string.max": "userId should have a maximum length of {#limit}",
    }),
    description: Joi.string().min(3).max(100).optional().messages({
      "string.base": "userId should be a string",
      "string.empty": "userId cannot be empty",
      "string.min": "userId should have a minimum length of {#limit}",
      "string.max": "userId should have a maximum length of {#limit}",
    }),
    albumId: Joi.string().min(3).max(100).optional().messages({
      "string.base": "userId should be a string",
      "string.empty": "userId cannot be empty",
      "string.min": "userId should have a minimum length of {#limit}",
      "string.max": "userId should have a maximum length of {#limit}",
    }),
    artistId: Joi.string().min(3).max(100).optional().messages({
      "string.base": "userId should be a string",
      "string.empty": "userId cannot be empty",
      "string.min": "userId should have a minimum length of {#limit}",
      "string.max": "userId should have a maximum length of {#limit}",
    }),
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

export { validatePostSong, validatePutSong };

