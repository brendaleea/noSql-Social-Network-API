const { Schema, model } = require('mongoose');
const Tag = require('./Tag');

// Schema to create Post model
const thoughtSchema = new Schema(
  {
    thoughtText:{
      type:String,
      required:true,
      minlength: 1,
      maxlength:280
    },
    
    createdAt: {
      type: Date,
      default: Date.now,
    },
    
    username: {
      type: String,
      required:true,
    },
    reactions: [reactionsSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `getTags` that gets the amount of tags associated with an application
thoughtSchema
  .virtual('reactionCounts')
  // Getter
  .get(function () {
    return this.reactions.length;
  });


const Thought = model('thought', thoughtSchema);

module.exports = Thought;
