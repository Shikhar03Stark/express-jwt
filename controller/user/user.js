const User = require('../../model/User');
const Cart = require('../../model/Cart');
const Product = require('../../model/Product');
const Family = require('../../model/Family');
const {QueryTypes, Op} = require('sequelize');
const sequalize = require('../../config/db');
const util = require('../../util/util');

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
            count: results?results.length:0,
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
    const uid = req.user.uid;
    const query = `SELECT "uid", "email", "name" FROM "Users" WHERE "uid" IN (SELECT "user_to" FROM "Families" WHERE "user_from" = :uid)`;
    try {
        const members = await sequalize.query(
            query,
            {
                replacements: {uid: uid},
                type: QueryTypes.SELECT,
            }
            );
        return res.status(200).json({
            ok: true,
            count: (members)?members.length:0,
            family: members || [],
        });
        
    } catch (e) {
        return next(e);
    }
}

const addMember = async (req, res, next) => {
    let mem_email = req.body.email;
    let mem_password = req.body.password;

    try {
        if (mem_email && mem_password) {
            if (mem_email === req.user.email){
                return res.status(200).json({
                    ok: false,
                    error : `Email can't be same as user email`,
                })
            }
            mem_email = mem_email.trim();
            mem_password = mem_password.trim();
    
            const member = await User.findOne({
                where: {
                    email: mem_email,
                }
            });
    
            if (member) {
                const relation = await Family.findOne({
                    where: {
                        user_from: req.user.uid,
                        user_to: member.uid,
                    }
                });
    
                if (!relation){
                    if(!util.isValidPassword(mem_password, member.password)){
                        return res.status(200).json({
                            ok: false,
                            error: `Password did not match`,
                        })
                    }

                    const relation = await Family.bulkCreate([{
                        user_from: req.user.uid,
                        user_to: member.uid,
                    }, {
                        user_from: member.uid,
                        user_to: req.user.uid,
                    }]);
    
                    return res.status(200).json({
                        ok: true,
                        relation: relation[0],
                    })
    
                }
                else{
                    //relation already exists
                    return res.status(200).json({
                        ok: true,
                        relation: relation,
                    })
                }
    
            }
            else{
                //member doesn't exist
                return res.status(200).json({
                    ok: false,
                    error: `Member with email doesn't exists`,
                })
            }
        }
        else{
            return res.status(400).json({
                ok: false,
                error: 'Member email and password is required',
            })
        }
    } catch (e) {
        return next(e);
    }

}

const removeMember = async (req, res, next) => {
    const uid = req.user.uid;
    const mem_email = req.body.email;

    try {
        if(mem_email){
            const member = await User.findOne({
                where:{
                    email: mem_email,
                }
            });

            if (member){
                const count = await Family.destroy({
                    where : {
                        [Op.or]: [
                            {
                                user_from: uid,
                                user_to: member.uid
                            },
                            {
                                user_from: member.uid,
                                user_to: uid,
                            }
                        ],
                }});

                return res.status(200).json({
                    ok: true,
                    count: Math.floor(count/2),
                })
            }
            else{
                return res.status(200).json({
                    ok: false,
                    error: `Member doesn't exist`,
                })
            }
        }
        else{
            return res.status(200).json({
                ok: false,
                error: `email is required`
            })
        }
    } catch (e) {
        return next(e);
    }
}

module.exports.removeMember = removeMember;
module.exports.addMember = addMember;
module.exports.addToCart = addMember;
module.exports.getFamily = getFamily;
module.exports.deleteItem = deleteItem;
module.exports.entryPoint = entryPoint;
module.exports.getCart = getCart;
module.exports.addToCart = addToCart;