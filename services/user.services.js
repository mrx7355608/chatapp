import usersDB from "../data/user.data.js";

async function listAllUsers() {
    const users = await usersDB.findAll();
    return users;
}

const userServices = {
    listAllUsers,
};

export default userServices;
