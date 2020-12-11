const router = require('express').Router();
const {

} = require('../../controllers/user-controller');

// /api/users
router
    .route('/')

// /api/users/:id
router
    .route('/:id')

module.exports = router;