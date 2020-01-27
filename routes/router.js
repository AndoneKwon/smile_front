var express = require('express');
var JSON = require('JSON');

var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/map', function (req, res, next) {
  res.render('map', {title: '맵'});
});

module.exports = router;
