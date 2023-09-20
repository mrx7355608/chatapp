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
    },
    {
        methods: {
            async verifyPassword(password) {
                return await bcrypt.compare(password, this.password);
            },
        },
    }
);

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
