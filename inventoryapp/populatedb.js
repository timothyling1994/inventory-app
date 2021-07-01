#! /usr/bin/env node

console.log('This script populates some categories and items to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Category = require('./models/category')
var Item = require('./models/item')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var categories = []
var items = []


function categoryCreate(name,description, cb) {
  categorydetail = {name:name , description: description }
  
  var category = new Category(categorydetail);
       
  category.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Category: ' + category);
    categories.push(category)
    cb(null, category)
  }  );
}

function itemCreate(name, description, price, stock,category, cb) {
  var item = new Item({ name: name, description:description,price:price,stock:stock,category:category });
       
  item.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New item: ' + item);
    items.push(item)
    cb(null, item);
  }   );
}


function createCategories(cb) {
    async.series([
        function(callback) {
          categoryCreate('Suspension', 'Bicycle suspension is the system, or systems, used to suspend the rider and bicycle in order to insulate them from the roughness of the terrain.', callback);
        },
        function(callback) {
          categoryCreate('Brakes', 'Bicycle brakes reduce the speed of a bicycle or prevents it from moving. The three main types are: rim brakes, disc brakes, and drum brakes.', callback);
        },
        function(callback) {
          categoryCreate('Drivetrain', 'The drivetrain of the bike consists of all the bits that you use to push (or pull) the bike along. The key components are the pedals, cranks, chainrings, chain, cogs (cassette) and derailleur.', callback);
        },
        ],
        // optional callback
        cb);
}


function createItems(cb) {
    async.parallel([
        function(callback) {
          itemCreate('RockShox Judy Silver TK', 'Air Spring, 42mm offset, 130mm travel', 199.99, 10, categories[0], callback);
        },
        function(callback) {
          itemCreate('Tektro HD-M275', 'Hydraulic disc', 99.99, 20, categories[1], callback);
        },
        function(callback) {
          itemCreate('Shimano Deore', '10-speed Rear Derailleur', 79.99, 15, categories[2], callback);
        },
        ],
        // optional callback
        cb);
}

async.series([
    createCategories,
    createItems,
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Items: '+items);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



