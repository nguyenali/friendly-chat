const { User, Thought } =require('../models');


const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
            .then(thoughts => res.json(thoughts))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    getThoughtById({params}, res) {
        Thought.findOne({_id: params.thoughtId})
            .then(thoughtData => {
                if(!thoughtData) {
                    return res.status(404).json({ message: 'No thought found!'});
                }
                return res.json(thoughtData);
            })
            .catch(err => res.json(err));
    },
    addThought({body}, res) {
        Thought.create(body)
            .then(({_id}) => {
                return User.findOneAndUpdate(
                    {_id: body.userId},
                    {$push: {thoughts: _id}},
                    {new: true}
                );
            })
            .then(userData => {
                if(!userData) {
                    return res.status(404).json({ message: 'No user found!' });
                }
                res.json(userData)
            })
            .catch(err => res.json(err));
    },
    addReaction({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body}},
            {new: true}
        )
        .then(thoughtData => {
            if(!thoughtData) {
                return res.status(400).json({ message: 'No thought found!'});
            }
            res.json(thoughtData);
        })
        .catch(err => res.json(err));
    },
    updateThought({params,  body}, res) {
        Thought.findOneAndUpdate({_id: params.thoughtId}, body, {new: true})
            .then(thoughtData => {
                if(!thoughtData) {
                    return res.status(404).json({ message: 'No thought found!'});
                }
                res.json(thoughtData);
            })
            .catch(err => res.json(err));
    },
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId})
                .then(thoughtData => {
                    if(!thoughtData) {
                        return res.status(404).json({message:'No thought found!'});
                    }
                    res.json(thoughtData);
                })
                .catch(err => res.json(err));
    },
    deleteReaction({params, body }, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: {reactionId: body.reactionId}}},
            {new: true}
        )
        .then(thoughtData => res.json(thoughtData))
        .catch(err => res.json(err));
    }
}

module.exports = thoughtController;