var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var connection = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password: 'root',
    database: 'mysql',
    port: '3306',
    connectTimeout: 60000  
  });
connection.connect();

router.post('/login', function (req, res, next) {
    console.log("connect");
    var username = req.body.username;
    var password = req.body.password;
  
    sql = "SELECT * FROM testuser WHERE id = ?";
    params = [username];
  
    connection.query(sql, params, function (error, rows) {
      if (error) {
        console.log(error);
        return;
      } else if (rows.length == 0) {
        console.log("아이디 없음");
        return;
      } else if (rows[0].password != password) {
        console.log("패스워드 틀림");
        return;
      } else {
        console.log("로그인 성공");
        // JWT 발급
        res.redirect("/"); // 메인으로 이동
      }
    });
  });

  module.exports = router;