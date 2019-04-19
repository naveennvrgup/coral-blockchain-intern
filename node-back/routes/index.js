router = require('express').Router()
userData = require('../tables/userData')
path = require('path')

router.get('', (req,res)=>{
    res.render('index')
})

module.exports = router