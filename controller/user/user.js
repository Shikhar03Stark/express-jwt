const User = require('../../model/User');
const Cart = require('../../model/Cart');
const Product = require('../../model/Product');
const {QueryTypes} = require('sequelize');
const sequalize = require('../../config/db');
const e = require('express');

const entryPoint = (req, res, next) => {
    return res.status(200).json({
        ok: true,
        message: `Accessing Secure route`,
        user: req.user,
    })
};

const getCart = async (req, res, next) => {
    const uid = req.user.uid;
    console.log(uid);
    const query = `SELECT * FROM "Products" WHERE "Products"."pid" IN (SELECT "Carts"."pid" FROM "Carts" WHERE "Carts"."uid" = :uid)`;

    try {
        const results = await sequalize.query(
            query,
            {
                replacements: {uid: uid},
                type: QueryTypes.SELECT,
            }
        )
        console.log(results);
    
        return res.status(200).json({
            ok : true,
            products : results || [],
        });

    } catch (e) {
        return next(e)
    }
}

const addToCart = async (req, res, next) => {
    //add product to card by id
    const uid = req.user.uid;
    const pid = req.params.pid;

    if (pid) {
        try {
            const count = await Cart.findOne({where: {
                uid: uid,
                pid: pid,
            }})
            
            if (count) {
                const result = count;
                return res.status(200).json({
                    ok: true,
                    result: result,
                })
            }
            else{
                const result = await Cart.create({
                    uid: uid,
                    pid: pid
                });
    
                return res.status(200).json({
                    ok: true,
                    result: result,
                });
            }


        } catch (e) {
            return next(e);
        }
    }
    else{
        res.status(400);
        next({
            ok: false,
            error: `missing productId`
        })
    }
}

const deleteItem = async (req, res, next) => {
    const pid = req.params.pid;
    const uid = req.user.uid;
    if (pid) {
        const result = await Cart.destroy({
            where:{
                uid: uid,
                pid: pid,
            }
        });

        return res.status(200).json({
            ok: true,
            result: result,
        })

    }
    else{
        res.status(400);
        return next({
            ok: false,
            error: 'missing productID',
        })
    }
}

const getFamily = async (req, res, next) => {
    
}

module.exports.getFamily = getFamily;
module.exports.deleteItem = deleteItem;
module.exports.entryPoint = entryPoint;
module.exports.getCart = getCart;
module.exports.addToCart = addToCart;