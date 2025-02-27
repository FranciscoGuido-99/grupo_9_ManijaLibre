const db = require ('../database/models/');
const { validationResult } = require('express-validator');
const { array } = require('../middlewares/productMid');

module.exports = {
    detail: function (req, res) {
        db.Product.findByPk (req.params.id)
        .then (function(detail){
            res.render('editarProducto', {detail:detail})
        })
        .catch(function(e) {
            res.send (e)
        })
    },
    /* create: function (req, res) {
        db.Category.findAll().then(function (category) {
        db.Size.findAll().then(function (talle) {
            db.Color.findAll().then(function (color) {
                return res.render("agregarProduct", { talle, color, category })
            })

        })
    }) */
    update: function(req,res){
    db.Product.findAll()
     .then (function(vistaAdmin){
        db.Collection.findAll().then(function (coleccion){
         res.render('updateProduct', {vistaAdmin, coleccion}) 
     })
})},

 delete: async function (req, res) {

    let product1 = await db.UserProduct.destroy ({
        where: {
            id_product: req.params.id
        }
    })
    let product = await db.Product.destroy ({
        where: {
            id: req.params.id
        }
    })
    return res.redirect('/updateProduct')

},
modificar: function (req, res) {
    let errorsEdit = validationResult(req);
    if(errorsEdit.isEmpty()){
    db.Product.update ({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        quantity: req.body.quantity
    },{
        where: {
            id : req.params.id
        }
    })
    .then(function(data){
        res.redirect('/updateProduct')
    })
    .catch(function(e){
        res.send(e)
    })
    }else{
        db.Product.findByPk (req.params.id)
        .then(function(detail){
            res.render('editarProducto', {
                errorsEdit: errorsEdit.mapped(), detail:detail
            })
        })
        .catch(function(e){
            res.send(e)
        })
        } 
    
}
}





