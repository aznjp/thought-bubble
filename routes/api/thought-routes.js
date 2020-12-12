const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
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
// posts reactions into the reaction field array in Thought model
router
    .route('/:thoughtId/reactions')
    .post()

// /api/thoughts/:thoughtId/reactions/:reactionId
// deletes from the reactions field array based on each reactions id value
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete();

module.exports = router;