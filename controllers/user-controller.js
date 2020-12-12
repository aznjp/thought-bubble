const { User, Thought } = require('../models');

const UserController = {
    // get all Users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // get one User by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // createUser
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    // update User by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // delete User
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                /* Once it checks to ensure this user exists it will then delete every thought associated to the user though the _id's shown in the thoughts field array
                by using the $in function for mongodb (https://docs.mongodb.com/manual/reference/operator/query/in/) which will search and match all values it finds in the array.
                The deleteMany method will then delete all thoughts that match the id's found and matched in the array*/
                return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } })
            })
            .then(() => {
                res.json({ message: "User and all thoughts associated have been deleted" })
            })
            .catch(err => res.json(err));
    },

    newFriend({ params }, res) {
        // this will be using the initial params to find the initial userId and then push in the new id into the friends field array with a new ID
        // used addtoSet to prevent any duplicates from being added
        User.findByIdAndUpdate({ _id: params.id }, { $addToSet: { friends: params.friendId } }, { new: true })
            .select("-__v")
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    deleteFriend({ params }, res) {
        // this will do the same thing the previous route for newFriends does but will pull the info from the field array and pulls it
        // NOTE YOU DONT USE A DELETE FUNCTION BECAUSE YOU ARENT REMOVING THE INFORMATION FROM THE DATABASE ITSELF BUT RATHER JUST PULLING THE ID OUT OF THE FIELD ARRAY AND REMOVING THAT RELATION
        User.findByIdAndUpdate({ _id: params.id }, { $pull: { friends: params.friendId } }, { new: true })
            .select("-__v")
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
};

module.exports = UserController;