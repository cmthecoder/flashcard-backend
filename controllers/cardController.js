const asyncHandler = require('express-async-handler')
// Import the model
const Card = require('../models/cardModel')

// GET all cards
// GET /api/cards
// access private

const getCards = asyncHandler(async (req, res) => {
  const cards = await Card.find({user_id: req.user.id})

  res.status(200).json(cards)
})


// POST create card
// POST /api/cards
// access private

const createCard = asyncHandler(async (req, res) => {
  console.log("REQ.BODY", req.body);

  const {title, question, answer} = req.body

  if(!title || !question || !answer){
    res.status(400)
    throw new Error("All fields are required!")
  }

  const card = await Card.create({
    title,
    question,
    answer,
    user_id: req.user.id
  })

  res.status(201).json(card)
})

// GET get a card
// GET /api/cards/:id
// access private

const getCard = asyncHandler(async (req, res) => {
  const card = await Card.findById(req.params.id)

  if(!card) {
    res.status(404)
    throw new Error('Contact not found')
  }

  res.status(200).json(card)

})
// PUT create card
// PUT /api/cards/:id
// access private

const updateCard = asyncHandler(async (req, res) => {
  const card = await Card.findById(req.params.id)

  if(!card) {
    res.status(404)
    throw new Error('Card not found')
  }

  if(card.user_id.toString() !== req.user.id) {
    res.status(403)
    throw new Error('User does not have permission to update other users cards')
  }

  const updatedCard = await Card.findByIdAndUpdate(req.params.id, req.body, {new: true})

  res.status(200).json(updatedCard)
})
// DELETE delete a card
// DELETE /api/cards/:id
// access private

const deleteCard = asyncHandler(async (req, res) => {
  const card = await Card.findById(req.params.id)

  if(!card) {
    res.status(404)
    throw new Error('Card not found')
  }

  if(card.user_id.toString() !== req.user.id) {
    res.status(403)
    throw new Error('User does not have permission to update other users cards')
  }

  await Card.deleteOne(card)

  res.status(200).json(card)
})

module.exports = {getCards, createCard, getCard, updateCard, deleteCard}