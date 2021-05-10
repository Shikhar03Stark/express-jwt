const router = require('express').Router();
const user = require('../../controller/user/user');

/**
 * route: /user/
 * method: GET
 */
router.get('/', user.entryPoint);

module.exports = router;