/**
 * @file Manages all operations related to albums
 * @author John Doe
 */
import prisma from "../prisma/db.js";

const createAlbum = async (req, res) => {
  try {
    const {name, genre, releaseDate, albumType, artistId }  = req.body;

    const album = await prisma.album.create({
      data: { name, genre, releaseDate, albumType, artistId: artistId },
    });

    return res.status(201).json({
      message: "Album successfully created",
      data: album,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getAlbums = async (req, res) => {
  try{
    const albums = await prisma.album.findMany();
    if(albums.length === 0){
      return res.status(404).json({ message: "No albums found"});
    }
    return res.status(200).json({message: albums});

  }catch (err){
    return res.status(500).json({message: err.message});
  }
};

const getAlbum = async (req, res) => {
  try{
    const{id} = req.params;
    const album = await prisma.album.findUnique( {where: { id }});
    if(!album){
      return res.status(404).json({
        message: `No Album with the id: ${id} found`,
      });
    }
    return res.status(200).json({data: album});
  }catch(err) {
    return res.status(500).json({message: err.message});
  }

};

const updateAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const {name, genre, releaseDate, albumType, artistId } = req.body;
    const album = await prisma.album.findUnique({ where: { id } });

    if (!album) {
      return res.status(404).json({
        message: `No album with the id: ${id} found`,
      });
    }

    const updatedAlbum = await prisma.album.update({
      where: { id },
      data: { name, genre, releaseDate, albumType, artistId: artistId},
    });

    return res.status(200).json({
      message: `Album with the id: ${id} successfully updated`,
      data: updatedAlbum,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteAlbum = async (req, res) => {
  try {
    const { id } = req.params;

    const album = await prisma.album.findUnique({ where: { id } });

    if (!album) {
      return res.status(404).json({
        message: `No album with the id: ${id} found`,
      });
    }

    await prisma.album.delete({ where: { id } });

    return res.status(200).json({
      message: `Album with the id: ${id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export {
  createAlbum,
  getAlbums,
  getAlbum,
  updateAlbum,
  deleteAlbum,
};