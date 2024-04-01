import mongoose, { Document } from "mongoose";

export interface IReplies extends Document {
    userId: string;
    content: string;
    replies: [string];
}

const RepliesSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },

        content: {
            type: String,
            // required: true
        },

        replies: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Replies'
            }
        ]
    },

    { timestamps: true }
);

const RepliesModel = mongoose.model<IReplies>("Replies", RepliesSchema);

export default RepliesModel;


// // Create replies with references to user
// const reply1 = new Reply({ user: user, content: 'Great post!' });
// const reply2 = new Reply({ user: user, content: 'I have a question...' });

// // Save replies to get their ObjectIds
// reply1.save();
// reply2.save();

// // Link reply2 as a nested reply inside reply1 by pushing its ObjectId
// reply1.replies.push(reply2._id); // Store the ObjectId of reply2

// // Save reply1 to get its ObjectId
// reply1.save();

// // Create a post with references to user and replies
// const post = new Post({
//   user: user,
//   title: 'Introduction to Mongoose',
//   content: 'Mongoose is an ODM for MongoDB...',
//   replies: [reply1._id], // Store the ObjectId of reply1
// });

// // Save the post
// post.save();


// Output the saved post with populated user and replies
// Post.findOne({ title: 'Introduction to Mongoose' })
//   .populate({
//     path: 'user replies',
//     populate: {
//       path: 'user replies',
//     },
//   })
//   .exec((err, savedPost) => {
//     if (err) {
//       console.error('Error retrieving post:', err);
//     } else {
//       console.log('Saved Post:', savedPost);
//     }
//     mongoose.connection.close();
//   });
