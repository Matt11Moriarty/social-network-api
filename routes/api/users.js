const router = require('express').Router();
const { up } = require('inquirer/lib/utils/readline');
const {
    getAllUsers,
    getOneUser,
    createOneUser,
    updateOneUser,
    deleteOneUser
} = require('../../controllers/usersController');

router.route('/')
    .get(getAllUsers)
    .post(createOneUser);
    
router.route('/:id')
    .get(getOneUser)
    .put(updateOneUser)
    .delete(deleteOneUser);



module.exports = router;