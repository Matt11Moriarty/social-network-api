const router = require('express').Router();
const {
    getAllUsers,
    getOneUser,
    createOneUser
} = require('../../controllers/usersController');

router.route('/').get(getAllUsers).post(createOneUser);
router.route('/:id').get(getOneUser);



module.exports = router;