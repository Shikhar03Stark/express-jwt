
const entryPoint = (req, res, next) => {
    return res.status(200).json({
        ok: true,
        message: `Accessing Secure route`,
        user: req.user,
    })
};

module.exports.entryPoint = entryPoint;