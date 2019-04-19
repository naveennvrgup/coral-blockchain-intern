const Sequelize = require('sequelize');

// var sequelize = new Sequelize('db_intern', 'dummyUser', 'dummyUser01', {
//   host: 'db-intern.ciupl0p5utwk.us-east-1.rds.amazonaws.com',
//   port: 3306,
//   dialect: 'mysql'
// });

var sequelize = new Sequelize('test', 'newuser', 'password', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

// check the db connection
sequelize
  .authenticate()
  .then(() => {
    console.log('connection to database is successfull.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize