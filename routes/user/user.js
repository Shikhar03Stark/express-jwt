const router = require('express').Router();
const user = require('../../controller/user/user');

/**
 * route: /user/
 * method: GET
 */
router.get('/', user.entryPoint);

/**
 * route : /user/cart
 * method : GET
 */
router.get('/cart', user.getCart);

/**
 * route : /user/cart/add/{pid}
 * method : POST
 */
router.post('/cart/add/:pid', user.addToCart);

/**
 * route : /user/cart/delete/{pid}
 * method : DELETE
 */
router.delete('/cart/delete/:pid', user.deleteItem);

module.exports = router;