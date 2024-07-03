const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Users = mongoose.model('Users', {
    username: String,
    mobile: String,
    email: String,
    password: String,
    likedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }]
});

module.exports.likeProducts = (req, res) => {
    let productId = req.body.productId;
    let userId = req.body.userId;

    Users.updateOne({ _id: userId }, { $addToSet: { likedProducts: productId } })
        .then(() => {
            res.send({ message: 'liked success.' })
        })
        .catch(() => {
            res.send({ message: 'server err' })
        })
}

module.exports.dislikeProducts = (req, res) => {
    let productId = req.body.productId;
    let userId = req.body.userId;

    Users.updateOne({ _id: userId }, { $pull: { likedProducts: productId } })
        .then(() => {
            res.send({ message: 'disliked success.' })
        })
        .catch(() => {
            res.send({ message: 'server err' })
        })
}

module.exports.signup = (req, res) => {
    const { username, password, email, mobile } = req.body;
    const user = new Users({ username, password, email, mobile });
    user.save()
        .then(() => {
            res.send({ message: 'saved success.' });
        })
        .catch(() => {
            res.send({ message: 'server err' });
        });
}

module.exports.myProfileById = (req, res) => {
    let uid = req.params.userId
    Users.findOne({ _id: uid })
        .then((result) => {
            res.send({
                message: 'success.', 
                user: {
                    email: result.email,
                    mobile: result.mobile,
                    username: result.username
                }
            })
        })
        .catch(() => {
            res.send({ message: 'server err' })
        })
    return;
}

module.exports.getUserById = (req, res) => {
    const _userId = req.params.uId;
    Users.findOne({ _id: _userId })
        .then((result) => {
            res.send({
                message: 'success.', 
                user: {
                    email: result.email,
                    mobile: result.mobile,
                    username: result.username
                }
            })
        })
        .catch(() => {
            res.send({ message: 'server err' })
        })
}


module.exports.login = (req, res) => {
    const { username, password } = req.body;

    Users.findOne({ username })
        .then((result) => {
            if (!result) {
                res.send({ message: 'User not found.' });
            } else {
                bcrypt.compare(password, result.password, (err, isMatch) => {
                    if (err) {
                        res.send({ message: 'Server error' });
                    } else if (isMatch) {
                        const token = jwt.sign({ data: result }, 'MYKEY', { expiresIn: '1h' });
                        res.send({ message: 'Login successful.', token, userId: result._id });
                    } else {
                        res.send({ message: 'Wrong password.' });
                    }
                });
            }
        })
        .catch(() => {
            res.send({ message: 'Server error' });
        });
};

module.exports.likedProducts = (req, res) => {
    Users.findOne({ _id: req.body.userId }).populate('likedProducts')
        .then((result) => {
            res.send({ message: 'success', products: result.likedProducts })
        })
        .catch((err) => {
            res.send({ message: 'server err' })
        })
}