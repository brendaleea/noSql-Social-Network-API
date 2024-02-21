const { User, Thought } = require("../models/index");

module.exports = {

  async getThoughts(req, res) {
    try {
      const result = await Thought.find();
      res.status(200).json(result);
    } catch (e) {
      console.error(e);
      res.status(500).json(e);
    }
  },
  
  async getOneThought(req, res) {
    try {
      const result = await Thought.findOne({ _id: req.params.thoughtId });
      res.status(200).json(result);
    } catch (e) {
      console.error(e);
      res.status(500).json(e);
    }
  },

  async newThought(req, res) {
    try {
      const thought = new Thought({
        thoughtText: req.body.thoughtText,
        username: req.body.username,
      });
      await thought.save();
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: thought._id } }
      );
      if (!user) {
        return res
          .status(400)
          .json({ message: "Thought created but not added to user" });
      }
      res.status(200).json(thought);
    } catch (e) {
      console.error(e);
      res.status(500).json(e);
    }
  },
  
  async updateThought(req, res) {
    try {
      const result = await Thought.findOneAndUpdate(
        { _id: req.body.thoughtId },
        { thoughtText: req.body.thoughtText },
        { new: true }
      );
      if (!result) {
        return res.status(404).json({ message: "unable to find thought" });
      }
      res.status(200).json(result);
    } catch (e) {
      console.error(e);
      res.status(500).json(e);
    }
  },

  async deleteThought(req, res) {
    try {
      const result = await Thought.findOneAndDelete({
        _id: req.body.thoughtId,
      });
      await User.findOneAndUpdate(
        { username: result.username },
        { $pull: { thoughts: req.body.thoughtId } }
      );
      res.status(200).json(result);
    } catch (e) {
      console.error(e);
      res.status(500).json(e);
    }
  },

  async newReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true }
      );
      if (!thought)
        return res
          .status(400)
          .json({ message: "Couldn't add reaction to thought." });
      res.status(200).json(thought);
    } catch (e) {
      console.error(e);
      res.status(500).json(e);
    }
  },

  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.body.reactionId } } },
        { new: true }
      );
      if (!thought)
        return res
          .status(400)
          .json({ message: "Couldn't add reaction to thought." });
      res.status(200).json(thought);
    } catch (e) {
      console.error(e);
      res.status(500).json(e);
    }
  },
};