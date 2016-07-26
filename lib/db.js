var pg = require('pg');
var Sequelize = require('sequelize');

var connectionString = 'postgres://vxrebqhuwdodxj:4GH-oj44aX1A6W5i2OXIIfhViN@ec2-184-73-196-82.compute-1.amazonaws.com:5432/dddpqqg2ntj8g8';
var options = {
	dialect : 'postgres',
	dialectOptions : {ssl: true}
}

var sequelize = new Sequelize(connectionString, options);

var Category = sequelize.define('categories', {
	title: {
		type: Sequelize.STRING
	}
}, {
	freezeTableName: true // Model tableName will be the same as the model name
});

var Item = sequelize.define('item', {
	category_id: {
		type: Sequelize.INTEGER
	},

	item_name: {
		type: Sequelize.STRING
	},
	//Location of the tape in the library?
	location: {
		type: Sequelize.STRING
	},

	Description: {
		type: Sequelize.TYPE
	},

	image: {
		
	}
}, {
	freezeTableName: true
});

Category.hasMany(Item, {
	foreignKey: 'category_id',
	constraints: true
});

Item.belongsTo(Category, {
	foreignKey: 'category_id',
	constraints: true
});

Category.sync({force:true}).then(function(){
	Item.sync({force:true});
});

module.exports = {
	Category: Category,
	Item: Item
};