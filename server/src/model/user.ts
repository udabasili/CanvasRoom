import {Model, model, Schema} from 'mongoose';
import {IUser, Role} from "@/interface/IUser";
import bcrypt from 'bcrypt';
import Logger from "@/loaders/logger";

interface IUserMethods {
    fullName(): string;
    validatePassword(password: string): Promise<boolean>;
}

export type UserModel = Model<IUser, {}, IUserMethods>;


const userSchema = new Schema<IUser, UserModel, IUserMethods>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    avatarUrl:{
        type: String,
    },
    groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }], // Many-to-many relationship
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: Role,
        required: true
    },

}, {
    timestamps: true
});
//methods
userSchema.method('fullName', function fullName() {
    return this.firstName + ' ' + this.lastName;
});
// check if the password is valid
userSchema.method('validatePassword', async function validatePassword(password: string) {
    return bcrypt.compare(password, this.password);
});

// Hash the password before saving the user
userSchema.pre('save', async function save(next) {
    const user = this;
    if (!user.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        Logger.silly('Hashing password');
        user.password = await bcrypt.hash(user.password, salt);
        return next();
    } catch (error) {
        const err = new Error(error as string);
        return next(err);
    }
});

// delete user tokens before deleting user
userSchema.post('deleteOne', async function(doc) {
    await new this.model('Token').deleteMany({ userId: doc._id });
});

const User = model<IUser, UserModel>('User', userSchema);

export default User;