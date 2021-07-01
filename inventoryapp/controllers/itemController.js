const { body,validationResult } = require('express-validator');
var Category = require('../models/category');
var Item = require('../models/item');
var async = require('async');

// Display list of all items.
exports.items_list = function(req, res, next) {
    Item.find({}).populate('Category').exec(function(err,list_items){
        if(err){
            return next(err);
        }
        res.render('item_list',{title:"All Items",items_list:list_items});
    });
};

// Display detail page for a specific item.
exports.item_detail = function(req, res, next) {
    Item.findById(req.params.id).populate("Category").exec(function(err,item){
        if(err)
        {
            return next(err);
        }
        res.render('item_detail',{title:"Item: "+ item.name, item:item})
    });
};

// Display item create form on GET.
exports.item_create_get = function(req, res) {
    Category.find({}).exec(function(err,categories){
        if(err)
        {
            return next(err);
        }

        res.render('item_form',{title:"Create Item", categories:categories});
        });
    
};

// Handle item create on POST.
exports.item_create_post = [
    body('item_name', 'Item Name must be specified').isLength({ min: 1 }).escape(),
    body('item_description', 'Item Description must be specified').isLength({ min: 1 }).escape(),
    body('item_price').escape(),
    body('item_stock').escape(),
    body('category.*').escape(),

    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Book object with escaped and trimmed data.
        var item = new Item(
          { name: req.body.item_name,
            description: req.body.item_description,
            price: req.body.item_price,
            stock: req.body.item_stock,
            category: req.body.category
           });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            async.parallel({
                categories: function(callback) {
                    Category.find(callback);
                },
            }, function(err, results) {
                if (err) { return next(err); }

                // Mark our selected genres as checked.
                for (let i = 0; i < results.categories.length; i++) {
                    if (item.category.indexOf(results.categories[i]._id) > -1) {
                        results.categories[i].checked='true';
                    }
                }
                res.render('item_form', { title: 'Create Item',categories:results.categories, item: item, errors: errors.array() });
            });
            return;
        }
        else {
            // Data from form is valid. Save book.
            item.save(function (err) {
                if (err) { return next(err); }
                   //successful - redirect to new book record.
                   res.redirect(item.url);
                });
        }
    }
    //body('due_back', 'Invalid date').optional({ checkFalsy: true }).isISO8601().toDate(),
];

// Display item delete form on GET.
exports.item_delete_get = function(req, res,next) {
    

};

// Handle item delete on POST.
exports.item_delete_post = function(req, res,next) {


};

// Display item update form on GET.
exports.item_update_get = function(req, res) {

};

// Handle item update on POST.
exports.item_update_post = [
    
];