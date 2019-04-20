var sequelize = require('../mysql')
var Sequelize = require('sequelize')

var userData = sequelize.define('userData', {
    userName: {
        type: Sequelize.STRING(25),
        allowNull: false
    },
    emailId: {
        type: Sequelize.STRING(50),
        primaryKey: true,
        allowNull: false
    },
    phoneNo: {
        type: Sequelize.STRING(10),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    dateTime: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
},{
    timestamps: false
});
 
userData.sync().then(() => {
    console.log('table userData created/exists');
});

module.exports = userData