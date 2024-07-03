const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    pname: String,
    pdesc: String,
    price: String,
    category: String,
    pimage: String,
    pimage2: String,
    addedBy: mongoose.Schema.Types.ObjectId,
    ploc: String
});

const Products = mongoose.model('Products', schema);

module.exports.search = (req, res) => {
    console.log('Query parameters:', req.query);

    let search = req.query.search;
    let loc = req.query.loc;

    let query = {
        $or: [
            { pname: { $regex: search, $options: 'i' } },
            { pdesc: { $regex: search, $options: 'i' } },
            { category: { $regex: search, $options: 'i' } },
            { price: { $regex: search, $options: 'i' } }
        ]
    };

    // Add the location filter if loc is not 'Any'
    if (loc && loc !== 'Any') {
        query.ploc = loc;
    }

    // Log the constructed query
    // console.log('Constructed query:', JSON.stringify(query, null, 2));

    Products.find(query)
        .then((results) => {
            ('Search results:', results);
            res.send({ message: 'success', products: results });
        })
        .catch((err) => {
            console.error('Error during search:', err);
            res.send({ message: 'server err' });
        });
};



module.exports.addProduct = (req, res) => {
    // console.log(req.files);
    // console.log(req.body);

    const ploc = req.body.ploc;
    const pname = req.body.pname;
    const pdesc = req.body.pdesc;
    const price = req.body.price;
    const category = req.body.category;
    const pimage = req.files.pimage[0].path;
    const pimage2 = req.files.pimage2[0].path;
    const addedBy = req.body.userId;

    const product = new Products({
        pname, pdesc, price, category, pimage, pimage2, addedBy, ploc
    });
    product.save()
        .then(() => {
            res.send({ message: 'saved success.' });
        })
        .catch(() => {
            res.send({ message: 'server err' });
        });
};

module.exports.getProducts = (req, res) => {
    const catName = req.query.catName;
    let _f = {};

    if (catName) {
        _f = { category: catName };
    }

    Products.find(_f)
        .then((result) => {
            res.send({ message: 'success', products: result });
        })
        .catch((err) => {
            res.send({ message: 'server err' });
        });
};

module.exports.deleteProduct = (req, res) => {
    Products.findOne({ _id: req.body.pid })
        .then((result) => {
            if (result.addedBy == req.body.userId) {
                Products.deleteOne({ _id: req.body.pid })
                    .then((deleteResult) => {
                        if (deleteResult.acknowledged) {
                            res.send({ message: 'success.' })
                        }
                    })
                    .catch(() => {
                        res.send({ message: 'server err' })
                    })
            }
        })
        .catch(() => {
            res.send({ message: 'server err' })
        })
}

module.exports.getProductsById = (req, res) => {
    // console.log(req.params);

    Products.findOne({ _id: req.params.pId })
        .then((result) => {
            res.send({ message: 'success', product: result });
        })
        .catch((err) => {
            res.send({ message: 'server err' });
        });
};

module.exports.myProducts = (req, res) => {
    const userId = req.body.userId;

    Products.find({ addedBy: userId })
        .then((result) => {
            res.send({ message: 'success', products: result });
        })
        .catch((err) => {
            res.send({ message: 'server err' });
        });
};
