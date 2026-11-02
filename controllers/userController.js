
const { getUsers } = require("../data/store");

function getAllUsers(req, res) {
    const users = getUsers();

    res.status(200).json({
        success: true,
        totalUsers: users.length,
        users
    });
}

module.exports = { getAllUsers };
