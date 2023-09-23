import UserModel from "../models/user.model.js";

// 1) Returns a list of all users in database
async function findAll() {
    const users = await UserModel.find(
        {},
        "fullname username profilePicture status"
    ).sort("-createdAt");

    return users;
}

// 2) Returns the user that has a matching username, otherwise returns null
async function findByUsername(username) {
    const user = await UserModel.findOne(
        { username },
        "fullname username profilePicture status"
    );
    return user;
}

// 3) Returns the user that has a matching id, otherwise returns null
async function findById(id) {
    const user = await UserModel.findById(
        id,
        "fullname username profilePicture status"
    );
    return user;
}

// 4) Adds a new user in database
async function insert(user) {
    const newUser = await UserModel.create(user);
    return {
        _id: newUser._id,
        fullname: newUser.fullname,
        profilePicture: newUser.profilePicture,
        username: newUser.username,
    };
}

// async function update() {}
// async function deleteUser() {}

const usersDB = {
    findAll,
    findByUsername,
    findById,
    insert,
};

export default usersDB;
