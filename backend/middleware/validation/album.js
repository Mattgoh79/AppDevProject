import Joi from "joi";

const validatePostAlbum = (req, res, next) => {
  const albumSchema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
      "string.base": "name should be a string",
      "string.empty": "name cannot be empty",
      "string.min": "name should have a minimum length of {#limit}",
      "string.max": "name should have a maximum length of {#limit}",
      "any.required": "name is required",
    }),
    genre: Joi.string().min(3).max(100).required().messages({
      "string.base": "genre should be a string",
      "string.empty": "genre cannot be empty",
      "string.min": "genre should have a minimum length of {#limit}",
      "string.max": "genre should have a maximum length of {#limit}",
      "any.required": "genre is required",
    }),
    releaseDate: Joi.string().min(3).max(100).required().messages({
      "string.base": "releaseDate should be a string",
      "string.empty": "releaseDate cannot be empty",
      "string.min": "releaseDate should have a minimum length of {#limit}",
      "string.max": "releaseDate should have a maximum length of {#limit}",
      "any.required": "releaseDate is required",
    }),// hopefully this .valid works for enum, there was nothing int eh lecture notes for enum so
    // albumType: Joi.string().valid([albumType.EP, albumType.Single, albumType.Album]).required().messages({
    //   "string.base": "albumType should be an EP, Single or Album",
    //   "string.empty": "albumType cannot be empty",
    //   "any.required": "albumType is required",
    // }),
    artistId: Joi.string().min(3).max(100).required().messages({
      "string.base": "artistId should be a string",
      "string.empty": "artistId cannot be empty",
      "string.min": "artistId should have a minimum length of {#limit}",
      "string.max": "artistId should have a maximum length of {#limit}",
      "any.required": "artistId is required",
    }),
  });

  const { name, genre, releaseDate, artistId} = req.body;
  const { error } = albumSchema.validate(
    {  name, genre, releaseDate, artistId },
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

export { validatePostAlbum};
// export { validatePostInstitution, validatePutInstitution };
