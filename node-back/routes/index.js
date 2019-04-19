var router = require('express').Router()
var userData = require('../tables/userData')
var path = require('path')
var userData = require('../tables/userData')
var Op = require('sequelize').Op


router.get('/', (req,res)=>{
    res.render('index')
})

router.post('/addUser', (req,res)=>{
    console.log(req.body);

    res.send()
})

router.post('/find', (req,res)=>{
    data = req.body
    userData.findAll({
        where: {
            email: {
                [Op.like] : data.email
            }
        }
    })
})

module.exports = router