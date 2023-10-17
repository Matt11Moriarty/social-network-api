const router = require('express').Router();
const {
    getAllUsers
} = require('../../controllers/usersController');

router.route('/').get(getAllUsers)

module.exports = router;