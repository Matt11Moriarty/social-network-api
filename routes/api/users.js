const router = require('express').Router();

const {
    getAllUsers,
    getOneUser,
    createOneUser,
    updateOneUser,
    deleteOneUser,
    addToFriendList
} = require('../../controllers/usersController');

router.route('/')
    .get(getAllUsers)
    .post(createOneUser);

router.route('/:id')
    .get(getOneUser)
    .put(updateOneUser)
    .delete(deleteOneUser);

router.route('/:id/friends/:friendId')
    .post(addToFriendList)



module.exports = router;