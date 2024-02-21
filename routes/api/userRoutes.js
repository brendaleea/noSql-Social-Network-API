const router = require("express").Router();
const {
  getUsers,
  getOneUser,
  newUser,
  updateUser,
  deleteUser,
  newFriend,
  deleteFriend,
} = require("../../controllers/userController");

router
  .route("/")
  .get(getUsers)
  .post(newUser)
  .put(updateUser)
  .delete(deleteUser);

router.route("/:userId")
  .get(getOneUser);

router.route("/:userId/friends/:friendId")
  .post(newFriend)
  .delete(deleteFriend);

module.exports = router;