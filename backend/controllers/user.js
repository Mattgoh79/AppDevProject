/**
 * @file Manages all operations related to users
 * @author John Doe
 */
import prisma from "../prisma/db.js";

const createUser = async (req, res) => {
  try { //maybe get rid of role later, or create another request for role cause users shouldnt be able to be admin
    const {username, email, password, gender, role, bio, journalId }  = req.body;

    const user = await prisma.user.create({
      data: { username, email, password, gender, role, bio, journalId},
    });

    return res.status(201).json({
      message: "User successfully created",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getUsers = async (req, res) => {
  try{
    const users = await prisma.user.findMany();
    if(users.length === 0){
      return res.status(404).json({ message: "No users found"});
    }
    return res.status(200).json({message: users});

  }catch (err){
    return res.status(500).json({message: err.message});
  }
};

const getUser = async (req, res) => {
  try{
    const{id} = req.params;
    const user = await prisma.user.findUnique();
    if(!user){
      return res.status(404).json({
        message: `No User with the id: ${id} found`,
      });
    }
    return res.status(200).json({data: user});
  }catch(err) {
    return res.status(500).json({message: err.message});
  }

};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {username, email, password, gender, role, bio, journalId} = req.body;
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return res.status(404).json({
        message: `No user with the id: ${id} found`,
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { username, email, password, gender, role, bio, journalId: journalId },
    });

    return res.status(200).json({
      message: `User with the id: ${id} successfully updated`,
      data: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return res.status(404).json({
        message: `No user with the id: ${id} found`,
      });
    }

    await prisma.user.delete({ where: { id } });

    return res.status(200).json({
      message: `User with the id: ${id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};