import Joi from "joi";

const validatePostReview = (req, res, next) => {
  const reviewschema = Joi.object({
    rating:  Joi.number().integer().min(1).max(100).required().messages({
      "number.base": "rating should be a number",
      "number.integer": "rating should be an integer",
      "number.min": "rating should be at least {#limit}",
      "number.max": "rating should be at most {#limit}",
      "any.required": "rating is required",
    }),
    paragraph: Joi.string().min(3).max(100).required().messages({
      "string.base": "paragraph should be a string",
      "string.empty": "paragraph cannot be empty",
      "string.min": "paragraph should have a minimum length of {#limit}",
      "string.max": "paragraph should have a maximum length of {#limit}",
      "any.required": "paragraph is required",
    }),
    journalId: Joi.string().min(3).max(100).required().messages({
      "string.base": "FavArtist should be a string",
      "string.empty": "FavArtist cannot be empty",
      "string.min": "FavArtist should have a minimum length of {#limit}",
      "string.max": "FavArtist should have a maximum length of {#limit}",
      "any.required": "FavArtist is required",
    }),
    userId: Joi.string().min(3).max(100).required().messages({
      "string.base": "userId should be a string",
      "string.empty": "userId cannot be empty",
      "string.min": "userId should have a minimum length of {#limit}",
      "string.max": "userId should have a maximum length of {#limit}",
      "any.required": "userId is required",
    }),
    albumId: Joi.string().min(3).max(100).required().messages({
      "string.base": "albumId should be a string",
      "string.empty": "albumId cannot be empty",
      "string.min": "albumId should have a minimum length of {#limit}",
      "string.max": "albumId should have a maximum length of {#limit}",
      "any.required": "album is required",
    }),
  });

  const { rating, paragraph, journalId, userId, albumId} = req.body;
  const { error } = reviewschema.validate(
    { rating, paragraph, journalId, userId, albumId},
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

const validatePutReview = (req, res, next) => {
  const reviewschema = Joi.object({
    rating:  Joi.number().integer().min(1).max(100).optional().messages({
      "number.base": "rating should be a number",
      "number.integer": "rating should be an integer",
      "number.min": "rating should be at least {#limit}",
      "number.max": "rating should be at most {#limit}",
      "any.required": "rating is required",
    }),
    paragraph: Joi.string().min(3).max(100).optional().messages({
      "string.base": "paragraph should be a string",
      "string.empty": "paragraph cannot be empty",
      "string.min": "paragraph should have a minimum length of {#limit}",
      "string.max": "paragraph should have a maximum length of {#limit}",
    }),
    journalId: Joi.string().min(3).max(100).optional().messages({
      "string.base": "FavArtist should be a string",
      "string.empty": "FavArtist cannot be empty",
      "string.min": "FavArtist should have a minimum length of {#limit}",
      "string.max": "FavArtist should have a maximum length of {#limit}",
    }),
    userId: Joi.string().min(3).max(100).optional().messages({
      "string.base": "userId should be a string",
      "string.empty": "userId cannot be empty",
      "string.min": "userId should have a minimum length of {#limit}",
      "string.max": "userId should have a maximum length of {#limit}",
    }),
    albumId: Joi.string().min(3).max(100).optional().messages({
      "string.base": "albumId should be a string",
      "string.empty": "albumId cannot be empty",
      "string.min": "albumId should have a minimum length of {#limit}",
      "string.max": "albumId should have a maximum length of {#limit}",
    }),  }).min(1); // At least one field must be provided

  const { error } = reviewschema.validate(req.body, {
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

export { validatePostReview, validatePutReview };

