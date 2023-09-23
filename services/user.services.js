import usersDB from "../data/user.data.js";

async function listAllUsers() {
    const users = await usersDB.findAll();
    return users;
}

async function updateUserState(userId, newState) {
    const updatedUser = await usersDB.update(userId, { status: newState });
    return updatedUser;
}

const userServices = {
    listAllUsers,
    updateUserState,
};

export default userServices;
