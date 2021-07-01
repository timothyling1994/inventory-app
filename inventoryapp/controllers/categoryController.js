const { body,validationResult } = require('express-validator');
var Category = require('../models/category');
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
    
};

// Display category create form on GET.
exports.category_create_get = function(req, res) {

};

// Handle category create on POST.
exports.category_create_post = [
    
];

// Display category delete form on GET.
exports.category_delete_get = function(req, res,next) {
    

};

// Handle category delete on POST.
exports.category_delete_post = function(req, res) {
    
};

// Display category update form on GET.
exports.category_update_get = function(req, res) {
    

};

// Handle category update on POST.
exports.category_update_post = [

];