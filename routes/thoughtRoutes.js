const router = require("express").Router();
const {
  getThoughts,
  getOneThought,
  newThought,
  updateThought,
  deleteThought,
  newReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

router
  .route("/")
  .get(getThoughts)
  .post(newThought)
  .put(updateThought)
  .delete(deleteThought);

router.route("/:thoughtId")
  .get(getOneThought);

router.route("/:thoughtId/reaction")
  .post(newReaction)
  .delete(deleteReaction);

module.exports = router;