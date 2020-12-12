const { Thought, User } = require('../models');

const ThoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
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
                console.log(err);
                res.sendStatus(400);
            });
    },

};

module.exports = ThoughtController;