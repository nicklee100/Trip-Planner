const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const chalk = require('chalk');
const nunjucks = require('nunjucks');

const {
  db,
  Place,
  Hotel,
  Restaurant,
  Activity,
} = require('./db')


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

nunjucks.configure('views', { noCache: true });
app.engine('html', nunjucks.render);
app.set('view engine', 'html');

app.use(express.static('public'));

app.use(express.static('./bower_components'));

// root path
app.get('/', function(req, res, next) {

    const placePending =  Place.findAll();
    const hotelPending = Hotel.findAll();
    const restaurantPending = Restaurant.findAll();
    const activityPending = Activity.findAll()

    Promise.all([placePending,hotelPending,restaurantPending,activityPending])
        .then( values => {
            //console.log(values[0])
            let places = values[0];
            let hotels = values[1];
            let restaurants = values[2];
            let activities = values[3];
            console.log(restaurants)
            res.render('index',{hotels, places, restaurants, activities})
        }, error => {
            //res.render('index',)
            console.log('error! ', error)
        });
});

// error handling
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
    .render('error', {message: 'oh no :-('});
});

db.sync()
  .then(() => {
    console.log(chalk.cyan('DB SYNCED!'));
    app.listen(3000, () => {
      console.log(chalk.green('Planning on port 3000'));
    });
  })
  .catch(err => {
    console.log(chalk.red('DB SYNC WENT WRONG...'));
  });
