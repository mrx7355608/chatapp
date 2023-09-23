import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String,
            default:
                "https://res.cloudinary.com/doemiclic/image/upload/v1693055588/default_user_eqn3vt.png",
        },
        status: {
            type: String,
            default: "Offline",
        },
    },
    {
        timestamps: true,
        methods: {
            async verifyPassword(password) {
                return await bcrypt.compare(password, this.password);
            },
        },
    }
);

// Hash password when a new user is created or
// user updates his password
userSchema.pre("save", async function (next) {
    if (this.isModified("password") || this.isNew) {
        const hashedPassword = await bcrypt.hash(this.password, 11);
        this.password = hashedPassword;
        return next();
    }
    return next();
});

const UserModel = model("User", userSchema);

export default UserModel;
