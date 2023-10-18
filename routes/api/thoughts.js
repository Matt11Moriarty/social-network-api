const router = require('express').Router();

const {
    getAllThoughts,
    getOneThought,
    createOneThought,
    updateOneThought,
    deleteOneThought,
    addOneReaction
} = require('../../controllers/thoughtsController');

router.route('/')
    .get(getAllThoughts)
    .post(createOneThought)

router.route('/:id')
    .get(getOneThought)
    .put(updateOneThought)
    .delete(deleteOneThought)

router.route('/:thoughtId/reactions')
    .post(addOneReaction)

module.exports = router;