'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.createTable('users', {
    id: { type: 'serial', primaryKey: true },
    first_name: 'varchar',
    last_name: 'varchar',
    password: 'varchar'
  }, callback);

  db.createTable('products', {
    id: { type: 'serial', primaryKey: true },
    name: 'varchar',
    price: 'decimal'
  }, callback);

  db.createTable('orders', {
    id: { type: 'serial', primaryKey: true },
    user_id: { type: 'int', notNull: true, foreignKey: { name: 'user_id_fk', table: 'users', mapping: 'id' } },
    status: 'varchar'
  }, callback);

  db.createTable('order_items', {
    id: { type: 'serial', primaryKey: true },
    order_id: { type: 'int', notNull: true, foreignKey: { name: 'order_id_fk', table: 'orders', mapping: 'id' } },
    product_id: { type: 'int', notNull: true, foreignKey: { name: 'product_id_fk', table: 'products', mapping: 'id' } },
    quantity: 'int'
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('order_items', function() {
    db.dropTable('orders', function() {
      db.dropTable('products', function() {
        db.dropTable('users', callback);
      });
    });
  });
};


exports._meta = {
  "version": 1
};
