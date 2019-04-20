var router = require('express').Router()
var userData = require('../tables/userData')
var path = require('path')
var userData = require('../tables/userData')
var Op = require('sequelize').Op


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/../../react-front/build/index.html'));
})

router.post('/addUser', (req, res) => {
    userData.update(req.body, {
        where: {
            emailId: req.body.emailId
        }
    }).then(noUpdated => {
        if (noUpdated > 0) {
            res.send({ msg: `updated the user ${req.body.emailId}` })
            return
        }
        userData.create(req.body).then((obj) => {
            res.send({ msg: `created the user ${req.body.emailId}` })
        })
    }).catch(e => console.error(e))

})

router.post('/findUser', (req, res) => {
    data = req.body

    userData.findAll({
        where: {
            emailId: {
                [Op.substring]: data.email
            }
        }
    })
        .then(obj => {
            res.send(obj)
        }).catch(e => console.error(e))

})

router.delete('/deleteUser/:email/', (req, res) => {
    // res.send('hi')

    userData.destroy({
        where: {
            emailId: req.params.email
        }
    }).then(noDeleted => {
        res.send({ noDeleted })
    }).catch(err => console.error(err))
})

module.exports = router