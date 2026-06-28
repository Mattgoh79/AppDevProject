import Joi from "joi";

const validatePostJournal = (req, res, next) => {
  const journalschema = Joi.object({
    journalName: Joi.string().min(3).max(100).required().messages({
      "string.base": "JounrnalName should be a string",
      "string.empty": "JournalName cannot be empty",
      "string.min": "JournalName should have a minimum length of {#limit}",
      "string.max": "JournalName should have a maximum length of {#limit}",
      "any.required": "JournalName is required",
    }),
    FavGenre: Joi.string().min(3).max(100).required().messages({
      "string.base": "FavGenre should be a string",
      "string.empty": "FavGenre cannot be empty",
      "string.min": "FavGenre should have a minimum length of {#limit}",
      "string.max": "FavGenre should have a maximum length of {#limit}",
      "any.required": "FavGenre is required",
    }),
    FavArtist: Joi.string().min(3).max(100).required().messages({
      "string.base": "FavArtist should be a string",
      "string.empty": "FavArtist cannot be empty",
      "string.min": "FavArtist should have a minimum length of {#limit}",
      "string.max": "FavArtist should have a maximum length of {#limit}",
      "any.required": "FavArtist is required",
    }),
  });

  const { journalName, FavGenre, FavArtist} = req.body;
  const { error } = journalschema.validate(
    { journalName, FavGenre, FavArtist },
    {
      abortEarly: false,
      convert: false, 
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

const validatePutJournal = (req, res, next) => {
  const journalschema = Joi.object({
    journalName: Joi.string().min(3).max(100).optional().messages({
      "string.base": "JounrnalName should be a string",
      "string.empty": "JournalName cannot be empty",
      "string.min": "JournalName should have a minimum length of {#limit}",
      "string.max": "JournalName should have a maximum length of {#limit}",
    }),
    FavGenre: Joi.string().min(3).max(100).optional().messages({
      "string.base": "FavGenre should be a string",
      "string.empty": "FavGenre cannot be empty",
      "string.min": "FavGenre should have a minimum length of {#limit}",
      "string.max": "FavGenre should have a maximum length of {#limit}",
    }),
    FavArtist: Joi.string().min(3).max(100).optional().messages({
      "string.base": "FavArtist should be a string",
      "string.empty": "FavArtist cannot be empty",
      "string.min": "FavArtist should have a minimum length of {#limit}",
      "string.max": "FavArtist should have a maximum length of {#limit}",
    }),
  }).min(1); // At least one field must be provided

  const { error } = journalschema.validate(req.body, {
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

export { validatePostJournal, validatePutJournal };

