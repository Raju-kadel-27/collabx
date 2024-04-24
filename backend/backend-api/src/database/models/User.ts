import bcrypt from 'bcryptjs';
import mongoose, { Document, Model } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    pic: string;
    isAdmin: boolean;
    teams: string[];
    rooms: string[];
};

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            index: true,
            required: [true, 'Please enter your full name'],
        },
        email: {
            type: String,
            unique: true,
            index: true,
            lowercase: true,
            required: [true, 'Please enter your email'],
        },
        password: {
            type: String,
            required: true
        },
        pic: {
            type: String,
            required: false,
            default:
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        teams: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Team',

            }
        ],
        
        rooms: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Room',
            }
        ],
    },
    { timestamps: true }
);


// UserSchema.methods.matchPassword = async function (enteredPassword: string) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };

// UserSchema.pre("save", async function (next) {
//     if (!this.isModified) {
//         next();
//     }
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
// });

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;

// complex user member scaling issues