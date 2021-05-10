const router = require('express').Router();
const product = require('../../controller/product/product');
/**
 * route : /product/all
 * method : GET
 */
router.get('/all', product.getAll);

/**
 * route : /product/add
 * method :POST
 */
router.post('/add', product.addItem);

module.exports = router;