var express = require('express');
var router = express.Router();

// Require controller modules.
var category_controller = require('../controllers/categoryController');
var item_controller = require('../controllers/itemController');

/// category ROUTES ///
router.get('/', category_controller.category_list);
// GET request for creating a Category. NOTE This must come before routes that display Category (uses id).
router.get('/category/create', category_controller.category_create_get);

/*
// POST request for creating Category.
router.post('/category/create', category_controller.category_create_post);

// GET request to delete Category.
router.get('/category/:id/delete', category_controller.category_delete_get);

// POST request to delete Category.
router.post('/category/:id/delete', category_controller.category_delete_post);

// GET request to update Category.
router.get('/category/:id/update', category_controller.category_update_get);

// POST request to update Category.
router.post('/category/:id/update', category_controller.category_update_post);

// GET request for one Category.
router.get('/category/:id', category_controller.category_detail);

// GET request for list of all Category items.
router.get('/categories', category_controller.category_list);*/

/// item ROUTES ///

/*

// GET catalog home page.
router.get('/', item_controller.index);

// GET request for creating a item. NOTE This must come before routes that display item (uses id).
router.get('/item/create', item_controller.item_create_get);

// POST request for creating item.
router.post('/item/create', item_controller.item_create_post);

// GET request to delete item.
router.get('/item/:id/delete', item_controller.item_delete_get);

// POST request to delete item.
router.post('/item/:id/delete', item_controller.item_delete_post);

// GET request to update item.
router.get('/item/:id/update', item_controller.item_update_get);

// POST request to update item.
router.post('/item/:id/update', item_controller.item_update_post);

// GET request for one item.
router.get('/item/:id', item_controller.item_detail);

// GET request for list of all item items.
router.get('/items', item_controller.item_list);*/



module.exports = router;