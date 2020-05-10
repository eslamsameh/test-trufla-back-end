var modal = require("./modal");
var productPromotions = require('../products-promotions/modal');
var mongoose = require("mongoose");
var _ = require("lodash");
const controller = {
    getCountOfProduct: (req, resp) => {
        const department = req.query.department;
        const name = req.query.name;
        const promotion = req.query.promo;
        let params = {
            department: department ? new mongoose.Types.ObjectId(department) : null,
            name: { "$regex": name, "$options": "i" },
        }
        if (!params.department) {
            delete params.department
        }
        if (!params.name.$regex) {
            delete params.name
        }
        if (promotion) {
            var newParams = {
                "products.department": department ? new mongoose.Types.ObjectId(department) : null,
                "products.name": { "$regex": name, "$options": "i" },
                "promotion": promotion ? new mongoose.Types.ObjectId(promotion) : null,
            }

            if (!newParams['products.department']) {
                delete newParams['products.department'];
            }
            if (!newParams['products.name'].$regex) {
                delete newParams['products.name'];
            }

            productPromotions.aggregate([
                {
                    $lookup: {
                        from: "productmodels",
                        localField: "product",
                        foreignField: "_id",
                        as: "products",
                    },
                },
                {
                    $lookup: {
                        from: "promotionsmodels",
                        localField: "promotion",
                        foreignField: "_id",
                        as: "promotions",
                    },
                },
                { $unwind: "$products" }, { $unwind: "$promotions" }, { $match: newParams },
                { $group: { _id: null, count: { $sum: 1 } } }, { $project: { _id: 0 } }

            ]).exec((err, products) => {
                if (err) {
                    resp.status(400).send({ success: false, message: err.message || "No Products" });
                } else {
                    resp.status(200).send({ success: true, products: products[0].count })
                }
            })

        } else {
            modal.countDocuments(params).then((products) => {
                resp.status(200).send({ success: true, products: products })
            }).catch((err) => {
                resp.status(400).send({ success: false, message: err.message || "No Products" });
            })
        }

    },
    getProducts: async (req, resp) => {
        const limit = parseInt(req.query.limit);
        const department = req.query.department;
        const name = req.query.name;
        const promotion = req.query.promo;
        const offset = parseInt(req.query.offset);
        let params = {
            department: department ? new mongoose.Types.ObjectId(department) : null,
            name: { "$regex": name, "$options": "i" },
        }
        if (!params.department) {
            delete params.department
        }
        if (!params.name.$regex) {
            delete params.name
        }
        try {
            if (promotion) {
                var newParams = {
                    "products.department": department ? new mongoose.Types.ObjectId(department) : null,
                    "products.name": { "$regex": name, "$options": "i" },
                    "promotion": promotion ? new mongoose.Types.ObjectId(promotion) : null,
                }

                if (!newParams['products.department']) {
                    delete newParams['products.department'];
                }
                if (!newParams['products.name'].$regex) {
                    delete newParams['products.name'];
                }
                productPromotions.aggregate([
                    {
                        $lookup: {
                            from: "productmodels",
                            localField: "product",
                            foreignField: "_id",
                            as: "products",
                        },
                    },
                    {
                        $lookup: {
                            from: "promotionsmodels",
                            localField: "promotion",
                            foreignField: "_id",
                            as: "promotions",
                        },
                    }, { $unwind: "$products" }, { $unwind: "$promotions" }, { $match: newParams },
                    { $skip: offset }, { $limit: limit },

                ]).exec((err, products) => {
                    if (err) {
                        resp.status(400).send({ success: false, message: err.message || "No Products" });

                    } else {
                        var newPro = products.map(v => v = {
                            "_id": v.products._id,
                            "name": v.products.name,
                            "price": v.products.price,
                            "department": v.products.department,
                            promotions: v.promotions
                        })
                        var result = _(newPro)
                            .groupBy('_id')
                            .map(function (items, product) {
                                return {
                                    product: product,
                                    promotions: _.map(items, 'promotions')
                                };
                            }).value();
                        var newResult = result.map(v => {
                            newPro.map(ele => {
                                if (v.product == ele._id) {
                                    v = {
                                        "_id": ele._id,
                                        "name": ele.name,
                                        "price": ele.price,
                                        "department": ele.department,
                                        promotions: v.promotions
                                    }
                                }
                            })
                            return v;
                        })

                        resp.status(200).send({ success: true, products: newResult });

                    }

                })
            } else {
                modal.aggregate([
                    { $match: params },
                    {
                        $lookup: {
                            from: "productpromotionsmodels",
                            localField: "_id",
                            foreignField: "product",
                            as: "promotions",
                        },
                    },
                    { $skip: offset },
                    { $limit: limit },

                ]).exec(function (err, products) {
                    if (err) {
                        resp.status(400).send({ success: false, products: err.message || "No Products" })

                    } else {
                        modal.populate(products, { path: "promotions.promotion", model: "promotionsModel" }, (err, data) => {
                            newData = data.map(v => {
                                v = {
                                    "_id": v._id,
                                    "name": v.name,
                                    "price": v.price,
                                    "department": v.department,
                                    promotions: v.promotions.map(ele => ele = { _id: ele.promotion._id, code: ele.promotion.code, active: ele.promotion.active, discount: ele.promotion.discount })
                                }
                                return v;
                            })
                            resp.status(200).send({ success: true, products: newData })
                        })
                    }

                });
            }

        } catch (error) {
            if (err) {
                resp.status(400).send({ success: false, message: err.message || "No Products" });
            } else {

                resp.status(400).send({ success: false, message: error.message || "No Products" });
            }

        }
    },
    saveProduct: (req, resp) => {
        const productInsertion = new modal({
            name: req.body.name,
            price: req.body.price,
            department: req.body.department,
        });
        productInsertion.save().then((Res) => {
            resp.status(200).send({ success: true, message: "Successfully Added" })
        }).catch((err) => {
            resp.status(400).send({ success: false, message: err.message || "No Product" });
        })
    }
};
module.exports = controller;
