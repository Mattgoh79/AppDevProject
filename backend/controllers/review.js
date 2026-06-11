/**
 * @file Manages all operations related to reviews
 * @author aTT
 */
import prisma from "../prisma/db.js";

const createReview = async (req, res) => {
  try {
    const {rating, paragraph, journalId, userId, albumId }  = req.body;

    const review = await prisma.review.create({
      data: {rating, paragraph, journalId, userId, albumId},
    });

    return res.status(201).json({
      message: "Review successfully created",
      data: review,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getReviews = async (req, res) => {
  try{
    const reviews = await prisma.review.findMany();
    if(reviews.length === 0){
      return res.status(404).json({ message: "No reviews found"});
    }
    return res.status(200).json({message: reviews});

  }catch (err){
    return res.status(500).json({message: err.message});
  }
};

const getReview = async (req, res) => {
  try{
    const{id} = req.params;
    const review = await prisma.review.findUnique();
    if(!review){
      return res.status(404).json({
        message: `No Review with the id: ${id} found`,
      });
    }
    return res.status(200).json({data: review});
  }catch(err) {
    return res.status(500).json({message: err.message});
  }

};

const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, paragraph, journalId, userId, albumId} = req.body;
    const review = await prisma.review.findUnique({ where: { id } });

    if (!review) {
      return res.status(404).json({
        message: `No review with the id: ${id} found`,
      });
    }

    const updatedReview = await prisma.review.update({
      where: { id },
      data: {rating, paragraph, journalId, userId: userId, albumId: albumId},
    });

    return res.status(200).json({
      message: `Review with the id: ${id} successfully updated`,
      data: updatedReview,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await prisma.review.findUnique({ where: { id } });

    if (!review) {
      return res.status(404).json({
        message: `No review with the id: ${id} found`,
      });
    }

    await prisma.review.delete({ where: { id } });

    return res.status(200).json({
      message: `Review with the id: ${id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export {
  createReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
};