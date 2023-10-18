const router = require('express').Router();

const {
    getAllUsers,
    getOneUser,
    createOneUser,
    updateOneUser,
    deleteOneUser,
    addToFriendList,
    removeFromFriendList
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
    .delete(removeFromFriendList)



module.exports = router;