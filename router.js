//Run node of Customer
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const connection = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'final_test'
});
const app = express();
app.get('/staff', function (req, res) {
    connection.getConnection(function (err, connection) {
    connection.query('SELECT * FROM staff', function (error, results, fields) {
      if (error) throw error;
      res.send(results)
    });
  });
});

app.get('/customer', function (req, res) {
  connection.getConnection(function (err, connection) {
  connection.query('SELECT * FROM customer', function (error, results, fields) {
    if (error) throw error;
    res.send(results)
  });
});
});

app.get('/products', function (req, res) {
  connection.getConnection(function (err, connection) {
  connection.query('SELECT * FROM products', function (error, results, fields) {
    if (error) throw error;
    res.send(results)
  });
});
});

app.get('/booking', function (req, res) {
  connection.getConnection(function (err, connection) {
  connection.query('SELECT * FROM booking', function (error, results, fields) {
    if (error) throw error;
    res.send(results)
  });
});
});


app.listen(3001, () => {
 console.log('Go to http://localhost:3001/staff so you can see the data.');
});

app.listen(3002, () => {
 console.log('Go to http://localhost:3002/customer so you can see the data.');
});

app.listen(3003, () => {
  console.log('Go to http://localhost:3003/products so you can see the data.');
 });

 app.listen(3004, () => {
  console.log('Go to http://localhost:3004/booking so you can see the data.');
 });