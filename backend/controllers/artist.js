/**
 * @file Manages all operations related to courses
 * @author ATT
 */
import artistRepository from "../repositories/artist.js";

const createArtist = async (req, res) => {
  try {
    const { name, birthYear, bio} = req.body;
    const artist = await artistRepository.create({name,birthYear,bio});
    return res.status(201).json({
      message: "Artist successfully created",
      data: artist,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getArtists = async (req, res) => {
  try {
    const {
      name,
      birthYear,
      bio,
      sortBy = "id",
      sortOrder = "asc",
      page = "1",
      pageSize = "10",
    } = req.query;

    // Build filters from provided query params
    const filters = {};
    if (name) filters.name = name;
    if (birthYear) filters.birthYear = birthYear;
    if (bio) filters.bio = bio;

    // Validate sortOrder - default to "asc" if invalid
    const validSortOrders = ["asc", "desc"];
    const order = validSortOrders.includes(sortOrder.toLowerCase())
      ? sortOrder.toLowerCase()
      : "asc";

    // Validate sortBy field - default to "id" if invalid
    const validSortFields = ["id", "name", "birthYear", "bio"];
    const fields = validSortFields.includes(sortBy.toLowerCase())
      ? sortBy.toLowerCase()
      : "id";

    const artists = await artistRepository.findAll(
      filters,
      fields,
      order,
      page,
      pageSize,
    );

    if (artists.data.length === 0) {
      return res.status(404).json({ message: "No artists found" });
    }

    return res.status(200).json({
      data: artists.data,
      pagination: artists.pagination,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getArtist = async (req, res) => {
  try {
    const { id } = req.params;
    const artist = await artistRepository.findById(id);
    if (!artist) {
      return res.status(404).json({
        message: `No artist with the id: ${id} found`,
      });
    }
    return res.status(200).json({ data: artist });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateArtist = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, birthYear, bio } = req.body;
    const artist = await artistRepository.findById(id);
    if (!artist) {
      return res.status(404).json({
        message: `No artist with the id: ${id} found`,
      });
    }
    const updatedArtist = await artistRepository.update(id, {
      name,
      birthYear,
      bio,
    });
    return res.status(200).json({
      message: `Artist with the id: ${id} successfully updated`,
      data: updatedArtist,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteArtist = async (req, res) => {
  try {
    const { id } = req.params;
    const artist = await artistRepository.findById(id);
    if (!artist) {
      return res.status(404).json({
        message: `No artist with the id: ${id} found`,
      });
    }
    await artistRepository.delete(id);
    return res.status(200).json({
      message: `Artist with the id: ${id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export {
  createArtist,
  getArtists,
  getArtist,
  updateArtist,
  deleteArtist,
};