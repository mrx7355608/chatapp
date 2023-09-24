import { registerDataValidator } from "../validators/auth.validators.js";
import usersDB from "../data/user.data.js";
import ApiError from "../utils/ApiError.js";

async function register(data) {
    // validate user data
    registerDataValidator(data);
    // Check if user already exists or not
    const user = await usersDB.findByUsername(data.username);
    if (user) {
        throw new ApiError(
            "Username is already taken, try a different username",
            400
        );
    }
    // Add user in database
    const newUser = await usersDB.insert(data);
    return newUser;
}

const authServices = {
    register,
};

export default authServices;
