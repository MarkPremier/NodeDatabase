var express = require("express");
var app = express();
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("myDB");

db.serialize(function () {
  db.run(
    "CREATE TABLE IF NOT EXISTS User (id INTEGER PRIMARY KEY AUTOINCREMENT, username UNIQUE, password TEXT, fullname TEXT, purchased INTEGER, delivered INTEGER, voucher INTEGER)"
  );

  db.run("DELETE FROM User");
  db.run(
    `INSERT INTO User (id, username, password, fullname, purchased, delivered, voucher) VALUES ("1", "bugsbunny23", "whastupdoc", "Bugs Bunny", "3", "14", "2")`
  );
  db.run(
    `INSERT INTO User (id, username, password, fullname, purchased, delivered, voucher) VALUES ("2", "worldpeace", "beatles1", "John Lennon", "0", "43", "8")`
  );
  db.run(
    `INSERT INTO User (id, username, password, fullname, purchased, delivered, voucher) VALUES ("3", "drummerboy68", "starrynight", "Ringo Starr", "3", "2", "1")`
  );
  db.run(
    `INSERT INTO User (id, username, password, fullname, purchased, delivered, voucher) VALUES ("4", "sirpaul97", "yesterday1966", "Paul McCartney", "89", "39", "29")`
  );
  db.run(
    `INSERT INTO User (id, username, password, fullname, purchased, delivered, voucher) VALUES ("5", "stoneman12", "pebbles4ever", "Fred Flintstone", "38", "0", "1")`
  );

  console.log("Display all content from all rows of the DB");
  db.each("SELECT * FROM User", function (err, row) {
    console.log(
      "[all] ID: " +
        row.id +
        "  Username: " +
        row.username +
        "  Password: " +
        row.password +
        "  Full Name: " +
        row.fullname +
        "  Purchased: " +
        row.purchased +
        "  Delivered: " +
        row.delivered +
        "  Voucher: " +
        row.voucher
    );
  });
});

function addHeader() {
  let output = `<!doctype html>
  <html lang="en">
  
  <head>
      <title>Task 10.2C</title>
  
      <meta charset="utf-8">
      <meta name="author" content="SIT774">
      <meta name="description" content="DB demo">
      <meta name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no">
  
      <!-- Latest compiled and minified CSS -->
      <!-- CSS only -->
      <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
          integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
          crossorigin="anonymous">
  </head>
  
  <body>
      <div class="container">`;

  return output;
}

function addTail() {
  let output = `</div>

  <!-- jQuery library -->
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
      integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
      crossorigin="anonymous"></script>
  <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns"
      crossorigin="anonymous"></script>
</body>

</html>`;

  return output;
}

app.use(express.static("public_html"));

//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));

// REST endpoint for posting a new user
app.post("/users", function (req, res, next) {
  let html = "";
  var username = req.body.usrform;
  var password = req.body.pswform;

  console.log("Just received POST data for users endpoint!");
  console.log(`Data includes: ${username} and ${password}`);

  db.all(
    `SELECT * FROM User WHERE username = "${username}" AND password = "${password}"`,
    function (err, row) {
      if (row.length === 0) {
        html = addHeader();
        console.log("Unknown user!");
        html += "<h1>Login Failed</h1>";
        html +=
          "the <i>User Name</i> or <i>Password</i> provide does not match our records.";
        html += addTail();
      } else {
        let purchased = row[0].purchased;
        let delivered = row[0].delivered;
        let sumq = purchased + delivered;
        html = addHeader();
        console.log("Known user!");
        html += "<h1>Login Success</h1>";
        html +=
          "<p>Thank you <strong>" +
          row[0].fullname +
          "</strong> (username '<strong>" +
          row[0].username +
          "</strong>'), your login has been successful.</p>";
        html += `<p>Our records show you have purchased a total of <strong>${sumq}</strong> pizzas from <strong>dKin Pizza</strong></p>`;
        html += "<p>Your purchase breakdowns are:</p>";
        html +=
          "<ul><li><p>INSTORE = <strong>" +
          row[0].purchased +
          "</strong></p></li>";
        html +=
          "<li><p>DELIVERED = <strong>" +
          row[0].delivered +
          "</strong></p></li>";
        html +=
          "<li><p>VOUCHERS = <strong>" + row[0].voucher + "</strong></p></li>";
        html += `</ul>`;

        html += addTail();
      }
      res.send(html);
    }
  );
});

// REST endpoint for getting all user data
app.get("/users", function (req, res) {});

app.listen(3000, function () {
  console.log("App listening on port 3000!");
});
