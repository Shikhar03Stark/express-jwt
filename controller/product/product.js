const Products = require('../../model/Product');

const getAll = async (req, res, next) => {
    try {
        const results = await Products.findAll();
        return res.status(200).json({
            ok: true,
            products: results || [],
        });
        
    } catch (e) {
        next(e);
    }

};

const addItem = async (req, res, next) => {
    const pname = req.body.name;
    const desc = req.body.description
    const price = req.body.price;
    if (pname) {

        try {
            const product = await Products.create({
                name: pname,
                description: desc || "No Description",
                price: price || 0.0,
            });

            return res.status(200).json({
                ok: true,
                product : product
            })
            
        } catch (e) {
            return next(e);
        }

    }
    else{
        res.status(400);
        next({
            error : `ill-formated input`
        });
    }
}

module.exports.getAll = getAll;
module.exports.addItem = addItem;