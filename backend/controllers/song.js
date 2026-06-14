/**
 * @file Manages all operations related to songs
 * @author aTT
 */
import prisma from "../prisma/db.js";

const createSong = async (req, res) => {
  try {
    const {name, trackNumber, length, genre, description, albumId, artistId }  = req.body;

    const song = await prisma.song.create({
      data: { name, trackNumber, length, genre, description, albumId: albumId, artistId:artistId },
    });

    return res.status(201).json({
      message: "Song successfully created",
      data: song,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getSongs = async (req, res) => {
  try{
    const songs = await prisma.song.findMany();
    if(songs.length === 0){
      return res.status(404).json({ message: "No songs found"});
    }
    return res.status(200).json({message: songs});

  }catch (err){
    return res.status(500).json({message: err.message});
  }
};

const getSong = async (req, res) => {
  try{
    const{id} = req.params;
    const song = await prisma.song.findUnique();
    if(!song){
      return res.status(404).json({
        message: `No Song with the id: ${id} found`,
      });
    }
    return res.status(200).json({data: song});
  }catch(err) {
    return res.status(500).json({message: err.message});
  }

};

const updateSong = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, trackNumber, length, genre, description, albumId, artistId } = req.body;
    const song = await prisma.song.findUnique({ where: { id } });

    if (!song) {
      return res.status(404).json({
        message: `No song with the id: ${id} found`,
      });
    }

    const updatedSong = await prisma.song.update({
      where: { id },
      data: { name, trackNumber, length, genre, description, albumId: albumId , artistId:  artistId },
    });

    return res.status(200).json({
      message: `Song with the id: ${id} successfully updated`,
      data: updatedSong,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteSong = async (req, res) => {
  try {
    const { id } = req.params;

    const song = await prisma.song.findUnique({ where: { id } });

    if (!song) {
      return res.status(404).json({
        message: `No song with the id: ${id} found`,
      });
    }

    await prisma.song.delete({ where: { id } });

    return res.status(200).json({
      message: `Song with the id: ${id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export {
  createSong,
  getSongs,
  getSong,
  updateSong,
  deleteSong,
};