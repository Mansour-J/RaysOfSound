// var Client = require('mysql').Client;
// var client = new Client(); 
// client.host ='khmer.ecs.vuw.ac.nz';
// client.user = 'root';
// client.password = 'raysofsound';

var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'khmer.ecs.vuw.ac.nz',
    user : 'root',
    password : 'secret',
    database : 'ros_test'
});

consoe.log("connecting");
connection.connect(function(err, results){
   if (err) {
        console.log("ERROR: " + err.message);
        throw err;
    }
    console.log("connected.");
})

// console.log("connecting...");
// client.connect(function(err, results) {
//     if (err) {
//         console.log("ERROR: " + err.message);
//         throw err;
//     }
//     console.log("connected.");
//     clientConnected(client);
// });

// clientConnected = function(client)
// {
// 	tableHasData(client);
// }           


// tableHasData = function(client)
// {
//     client.query(
//         'SELECT * FROM [db].[table] LIMIT 0,10',
//         // you can keep this function anonymous
//         function (err, results, fields) {
//             if (err) {
//                 console.log("ERROR: " + err.message);
//                 throw err;
//             }
//             console.log("Got "+results.length+" Rows:");
//             for(var i in results){
// 		console.log(results[i].[column name]); 
// 		console.log('\n');
				
//             	//console.log("The meta data about the columns:");
//             	//console.log(fields);     
// 	    }
//             client.end();
//         });
// };