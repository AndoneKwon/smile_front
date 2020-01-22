var express = require('express');
var mysql = require('mysql');

var router = express.Router();

var connection = mysql.createConnection({
  host : 'localhost',
  user: 'root',
  password: 'YOUR PASSWORD',
  database: 'YOUR DATABASE'
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/map', function (req, res, next) {
  res.render('map', {title: '맵'});
});

router.post('/api/login', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  sql = "SELECT * FROM user WHERE username = ?";
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
