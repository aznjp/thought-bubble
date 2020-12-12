const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} = require('../../controllers/user-controller');

// /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// /api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// /api/users/:id/friends/:friendId
// These methods will reference back to the friends array values which will self reference the User model
router
    .route('/:id/friends/:friendId')
    .post()
    .delete();

module.exports = router;