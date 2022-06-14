var express = require('express')
var app = express()

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('myDB');      // file database

db.serialize(function() {
        
    db.run("CREATE TABLE IF NOT EXISTS User (id INTEGER PRIMARY KEY AUTOINCREMENT, username UNIQUE, password TEXT, fullname TEXT, purchased INTEGER, delivered INTEGER, voucher INTEGER)");

    db.run("DELETE FROM User");
    db.run(`INSERT INTO User (id, username, password, fullname, purchased, delivered, voucher) VALUES ("1", "bugsbunny23", "whastupdoc", "Bugs Bunny", "3", "14", "2")`);
    db.run(`INSERT INTO User (id, username, password, fullname, purchased, delivered, voucher) VALUES ("2", "worldpeace", "beatles1", "John Lennon", "0", "43", "8")`);
    db.run(`INSERT INTO User (id, username, password, fullname, purchased, delivered, voucher) VALUES ("3", "drummerboy68", "starrynight", "Ringo Starr", "3", "2", "1")`);
    db.run(`INSERT INTO User (id, username, password, fullname, purchased, delivered, voucher) VALUES ("4", "sirpaul97", "yesterday1966", "Paul McCartney", "89", "39", "29")`);
    db.run(`INSERT INTO User (id, username, password, fullname, purchased, delivered, voucher) VALUES ("5", "stoneman12", "pebbles4ever", "Fred Flintstone", "38", "0", "1")`);
    
    // The SELECT operation is performed on the DB one row at a time and the function
    // is called for each row 'selected'
    console.log('Display all content from all rows of the DB');
    db.each("SELECT * FROM User", function(err, row) {
        console.log("[all] ID: " + row.id + "  Username: " + row.username + "  Password: " + row.password + "  Full Name: " + row.fullname + "  Purchased: " + row.purchased + "  Delivered: " + row.delivered + "  Voucher: " + row.voucher); 
    });
    // Or you can select 'specific' fields from a data row
});
db.close(); 
//now any files in public are routed



app.listen(3000, function () {
    console.log('App listening on port 3000!')
})

