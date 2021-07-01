const { body,validationResult } = require('express-validator');
var Category = require('../models/category');
var Item = require('../models/item');
var async = require('async');

// Display list of all categorys.
exports.category_list = function(req, res) {

    Category.find({}, 'name description')
    .exec(function (err, list_categories) {
      if (err) {
        return next(err);
    }
      //Successful, so render
      res.render('category_list', { title: 'All Categories', category_list: list_categories });
    });

};



// Display detail page for a specific category.
exports.category_detail = function(req, res, next) {
    Category.findById(req.params.id).exec(function(err,category){
        if(err){
            return next(err);
        }

        res.render('category_detail',{title:'Category: '+category.name, category:category});
    });
};

// Display category create form on GET.
exports.category_create_get = function(req, res) {
    res.render('category_form', { title: 'Create Category'});
};

// Handle category create on POST.
exports.category_create_post = [
    body('category_name').trim().isLength({ min: 1 }).escape().withMessage('Category name must be specified.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('category_description').escape(),

    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log("errors");
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('category_form', { title: 'Create Category', category: req.body, errors: errors.array() });
            return;
        }

        else
        {
            var category = new Category(
            { 
                name: req.body.category_name,
                description: req.body.category_description,
            });

            category.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new author record.
                res.redirect(category.url);
            });
        }

    }
];

// Display category delete form on GET.
exports.category_delete_get = function(req, res,next) {
    async.parallel({
        category: function(callback) {
            Category.findById(req.params.id).exec(callback)
        },
        category_items: function(callback) {
          Item.find({ 'category': req.params.id }).exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.category==null) { // No results.
            res.redirect('/catalog/');
        }
        // Successful, so render.
        res.render('category_delete', { title: 'Delete Category', category: results.category, category_items: results.category_items } );
    });

};

// Handle category delete on POST.
exports.category_delete_post = function(req, res,next) {
    async.parallel({
        category: function(callback) {
            Category.findById(req.params.id).exec(callback)
        },
        category_items: function(callback) {
          Item.find({ 'category': req.params.id }).exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); }
        // Success
        if (results.category_items.length > 0) {
            // Genre has books. Render in same way as for GET route.
            res.render('category_delete', { title: 'Delete Category', category: results.category, category_items: results.category_items } );
            return;
        }
        else {
            // Author has no books. Delete object and redirect to the list of authors.
            Category.findByIdAndRemove(req.body.categoryid, function deleteGenre(err) {
                if (err) { return next(err); }
                // Success - go to author list
                res.redirect('/catalog/')
            })
        }
    });

};

// Display category update form on GET.
exports.category_update_get = function(req, res) {
    

};

// Handle category update on POST.
exports.category_update_post = [

];