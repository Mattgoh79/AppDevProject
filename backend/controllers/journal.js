/**
 * @file Manages all operations related to journals
 * @author John Doe
 */
import prisma from "../prisma/db.js";

const createJournal = async (req, res) => {
  try {
    const {journalName, FavGenre, FavArtist }  = req.body;

    const journal = await prisma.journal.create({
      data: { journalName, FavGenre, FavArtist },
    });

    return res.status(201).json({
      message: "Journal successfully created",
      data: journal,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getJournals = async (req, res) => {
  try{
    const journals = await prisma.journal.findMany();
    if(journals.length === 0){
      return res.status(404).json({ message: "No journals found"});
    }
    return res.status(200).json({message: journals});

  }catch (err){
    return res.status(500).json({message: err.message});
  }
};

const getJournal = async (req, res) => {
  try{
    const{id} = req.params;
    const journal = await prisma.journal.findUnique();
    if(!journal){
      return res.status(404).json({
        message: `No Journal with the id: ${id} found`,
      });
    }
    return res.status(200).json({data: journal});
  }catch(err) {
    return res.status(500).json({message: err.message});
  }

};

const updateJournal = async (req, res) => {
  try {
    const { id } = req.params;
    const {journalName, FavGenre, FavArtist } = req.body;
    const journal = await prisma.journal.findUnique({ where: { id } });

    if (!journal) {
      return res.status(404).json({
        message: `No journal with the id: ${id} found`,
      });
    }

    const updatedJournal = await prisma.journal.update({
      where: { id },
      data: { journalName, FavGenre, FavArtist },
    });

    return res.status(200).json({
      message: `Journal with the id: ${id} successfully updated`,
      data: updatedJournal,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteJournal = async (req, res) => {
  try {
    const { id } = req.params;

    const journal = await prisma.journal.findUnique({ where: { id } });

    if (!journal) {
      return res.status(404).json({
        message: `No journal with the id: ${id} found`,
      });
    }

    await prisma.journal.delete({ where: { id } });

    return res.status(200).json({
      message: `Journal with the id: ${id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export {
  createJournal,
  getJournals,
  getJournal,
  updateJournal,
  deleteJournal,
};