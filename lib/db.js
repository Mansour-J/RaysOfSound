var pg = require('pg');
var Sequelize = require('sequelize');

var connectionString = 'postgres://vxrebqhuwdodxj:4GH-oj44aX1A6W5i2OXIIfhViN@ec2-184-73-196-82.compute-1.amazonaws.com:5432/dddpqqg2ntj8g8';
var options = {
	dialect : 'postgres',
	dialectOptions : {ssl: true}
}

// Using Sequelize library with the above options. Need ssl for heroku database
var sequelize = new Sequelize(connectionString, options);

// Creating Category table schema
var Category = sequelize.define('categories', {
	title: {
		type: Sequelize.STRING
	}
}, {
	freezeTableName: true // Model tableName will be the same as the model name
});

// Creating User table schema
var User = sequelize.define('user', {
	username: {
		type: Sequelize.STRING
	},
	role: {
		type: Sequelize.STRING
	},
	first_name: {
		type: Sequelize.STRING
	},
	last_name: {
		type: Sequelize.STRING
	},
	email: {
		type: Sequelize.STRING
	}
}, {
	freezeTableName: true
});

// Creating Item table schema
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
	description: {
		type: Sequelize.STRING
	},
	image: {
		type: Sequelize.STRING
	},
	user_id: {
		type: Sequelize.INTEGER
	}
}, {
	freezeTableName: true
});

// Creating Permission table schema
var Permission = sequelize.define('permission', {
	user_id: {
		type: Sequelize.INTEGER
	},
	category_id: {
		type: Sequelize.INTEGER
	}
});

// Creating Audio table schema
var Audio = sequelize.define('audio', {
	item_id: {
		type: Sequelize.INTEGER
	},
	duration: {
		type: Sequelize.TIME
	},
	artist: {
		type: Sequelize.STRING
	}
}, {
	freezeTableName: true
});

// Setting up all relations between tables

// Setting up foreign key for Item and Category
Category.hasMany(Item, {
	foreignKey: 'category_id',
	constraints: true
});

Item.belongsTo(Category, {
	foreignKey: 'category_id',
	constraints: true
});

// Setting up foreign keys for Permission (Category and User)
Category.hasMany(Permission, {
	foreignKey: 'category_id',
	constraints: true
});

User.hasMany(Permission, {
	foreignKey: 'user_id',
	constraints: true
});

Permission.belongsTo(Category, {
	foreignKey: 'category_id',
	constraints: true
});

Permission.belongsTo(User, {
	foreignKey: 'user_id',
	constraints: true
});

// Setting up foreign key for Item and Audio
Item.hasMany(Audio, {
	foreignKey: 'item_id',
	constraints: true
});

Audio.belongsTo(Item, {
	foreignKey: 'item_id',
	constraints: true
})

// Syncing sequelize objects with remote database
// NOTE: will need to take out force:true when we deploy (http://stackoverflow.com/questions/21066755/how-does-sequelize-sync-work-specifically-the-force-option)
User.sync({force:true});

Category.sync().then(function(){
	Item.sync({force:true}).then(function(){
		Audio.sync();
	});

	Permission.sync();
});

module.exports = {
	Category: Category,
	Item: Item,
	User: User,
	Permission: Permission,
	Audio: Audio
};