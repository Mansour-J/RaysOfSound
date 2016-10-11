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
	timestamps: false,
	freezeTableName: true // Model tableName will be the same as the model name
});

// Creating User table schema
var User = sequelize.define('users', {
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
	},
	password: {
		type: Sequelize.STRING
	}
}, {
	timestamps: false,
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
		type: Sequelize.STRING(400)
	},
	image: {
		type: Sequelize.STRING
	},
	user_id: {
		type: Sequelize.INTEGER
	},
	metadata: {
		type: Sequelize.TEXT
	}
}, {
	timestamps: false,
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
	},
	audio_location: {
		type: Sequelize.STRING
	}
}, {
	timestamps: false,
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

User.hasMany(Item, {
	foreignKey: 'user_id',
	constraints: true
});

Item.belongsTo(User, {
	foreignKey: 'user_id',
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
// NOTE: will need to take out force:true when we deploy
// Only using the {force:true} for debugging and testing purposes. This automatically drops the tables and recreates them
// 
// (http://stackoverflow.com/questions/21066755/how-does-sequelize-sync-work-specifically-the-force-option)
User.sync().then(function(){
Category.sync().then(function(){
	Item.sync({force:true}).then(function(){ //currently not forced because I am populating from script

		// User.create({username: 'test_account', role: 'admin', first_name: 'test', last_name: 'test2'});
		// 	Category.create({title: "Gagana Sāmoan"}).then(function(item) {
		// 		Item.create({category_id: item.id, item_name:'Test Item', location: 'Location', description: 'description', image: 'imageurl', user_id: user.id});
		// 		Item.create({category_id: item.id, item_name:'Test Item2', location: 'Location', description: 'description', image: 'imageurl', user_id: user.id})
		// 		Item.create({category_id: item.id, item_name:'Test Item3', location: 'Location', description: 'description', image: 'imageurl', user_id: user.id})
		// 		Item.create({category_id: item.id, item_name:'Test Item4', location: 'Location', description: 'description', image: 'imageurl', user_id: user.id})
		// 	});
		// });
		// Category.create({title: "Gagana Sāmoan"});
		// Category.create({title: "Māori - Tamariki"});
		// Category.create({title: "Māori - Rangatahi"});
		// Category.create({title: "Māori Kūki 'Āirani"});

	Audio.sync({force:true});
	});

	Permission.sync();
})
});


module.exports = {
	Category: Category,
	Item: Item,
	User: User,
	Permission: Permission,
	Audio: Audio
};