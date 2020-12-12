const { Thought, User } = require('../models');
// Import the User model for pushing the thoughts into the user thoughts array

const ThoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                res.sendStatus(400).json(err);
            });
    },
    getThoughtById(req, res) {
        Thought.findOne({
                _id: req.params.id
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtData =>
                res.status(200).json(dbThoughtData)
            )
            .catch(err => {
                res.sendStatus(400).json(err);
            });
    },
    createThought({ body }, res) {
        Thought.create(body)
            // Have the sent data be first pushed into User model thoughts field array
            .then(({ _id }) => {
                // When passing in the body make sure to add in the actual user ID as a field in the json object sent to ensure that it is referencing back to the User
                return User.findOneAndUpdate({ _id: body.userId }, { $push: { thoughts: _id } }, { new: true });
            })
            // Once this is done then send the JSON data to affirm and place data in database
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought found with this id." });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                res.sendStatus(400).json(err);
            });
    },
    updateThought({ params, body }, res) {
        // Find the data through params and then send the body to the database
        Thought.findOneAndUpdate({ _id: params.id }, body, {
                new: true,
                runValidators: true
            })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought found with this id." });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                res.sendStatus(400).json(err);
            });
    },
    deleteThought({ params }, res) {
        // Find the data through params and then delete the thought in database
        Thought.findOneAndDelete({ _id: params.id })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought found with this id." });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                res.sendStatus(400).json(err);
            });
    }
};

module.exports = ThoughtController;