const users = [];

function addUser(username, password) {
    const newUser = {
        id: users.length + 1,
        username,
    }
    users.push(newUser);
    return newUser;
}

function findUser(id) {
    const user = users.filter((user) => {
        return user.id === id
    })[0];
    return user;
}

function findByUsername(username) {
    const user = users.filter((user) => {
        return user.username === username
    })[0];
    return user;
}

export default {
    addUser,
    findUser,
    findByUsername
}
