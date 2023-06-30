const express = require("express")
const router = express.Router()
const {getCards, createCard, getCard, updateCard, deleteCard} = require('../controllers/cardController')
const validateToken = require("../middleware/validateTokenHandler")


router.use(validateToken)

router.route('/').get(getCards)

router.route('/').post(createCard)

router.route('/:id').get(getCard)

router.route('/:id').put(updateCard)

router.route('/:id').delete(deleteCard)

module.exports = router