const { User } = require("../models");

module.exports = {

  async getUsers(req, res) {
    try {
      const result = await User.find();
      res.status(200).json(result);
    } catch (e) {
      console.error(e);
      res.status(500).json(e);
    }
  },
  
  async getOneUser(req, res) {
    try {
      const result = await User.findOne({ _id: req.params.userId });
      res.status(200).json(result);
    } catch (e) {
      console.error(e);
      res.status(500).json(e);
    }
  },
 
  async newUser(req, res) {
    try {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
      });
      await user.save();
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(400).json({ message: "Bad request" });
      }
    } catch (e) {
      console.error(e);
      res.status(500).json(e);
    }
  },

  async updateUser(req, res) {
    try {
      const result = await User.findOneAndUpdate(
        { _id: req.body.userId },
        {
          username: req.body.username,
          email: req.body.email,
        },
        { new: true }
      );
      if (!result) {
        return res.status(404).json({ message: "unable to find user" });
      }
      res.status(200).json(result);
    } catch (e) {
      console.error(e);
      res.status(500).json(e);
    }
  },
  
  async deleteUser(req, res) {
    try {
      const result = await User.findOneAndDelete({ _id: req.body.userId });
      res.status(200).json(result);
    } catch (e) {
      console.error(e);
      res.status(500).json(e);
    }
  },
 
  async newFriend(req, res) {
    try {
      const result = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      res.status(200).json(result);
    } catch (e) {
      console.error(e);
      res.status(500).json(e);
    }
  },
  
  async deleteFriend(req, res) {
    try {
      const result = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      res.status(200).json(result);
    } catch (e) {
      console.error(e);
      res.status(500).json(e);
    }
  },
};