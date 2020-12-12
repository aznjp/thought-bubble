const router = require('express').Router();
const {

} = require('../../controllers/thought-controller');

// /api/thoughts
router
    .route('/')
    .get()
    .post();

// /api/thoughts/:id
router
    .route('/:id')
    .get()
    .put()
    .delete();

// /api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .post()

router
    .route('/:thoughtId/reactions/:reactionId')
    .delete();

module.exports = router;