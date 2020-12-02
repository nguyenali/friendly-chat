const router = require('express').Router();

const { 
    getAllThoughts,
    getThoughtById,
    addReaction,
    addThought,
    updateThought,
    deleteReaction,
    deleteThought
    } = require('../../controllers/thought-controller');

router
    .route('/')
    .get(getAllThoughts)
    .post(addThought)

router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

router
    .route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(deleteReaction)

// router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);
module.exports = router;