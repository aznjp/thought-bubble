const router = require('express').Router();
const {
    getAllThoughts,
    createThought,
    getThoughtById,
    updateThought,
    deleteThought
} = require('../../controllers/thought-controller');


// /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

// /api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .post()

router
    .route('/:thoughtId/reactions/:reactionId')
    .delete();

module.exports = router;