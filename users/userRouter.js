const express = require('express');

const db = require('./userDb')

const router = express.Router();

router.post('/', (req, res) => {

});

router.post('/:id/posts', validateUserId, (req, res) => {

});

router.get('/', (req, res) => {

});

router.get('/:id', validateUserId, (req, res) => {

});

router.get('/:id/posts', validateUserId, (req, res) => {

});

router.delete('/:id', validateUserId, (req, res) => {

});

router.put('/:id', validateUserId, (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
    const id = Number(req.params.id)
    db.getById(id)
    .then(resp => {
        // console.log(resp)
        if (resp) req.user = resp
        else res.status(400).json({message: "invalid user id"})
    })
    .catch(err => {
        // console.log(err)
        res.sendStatus(500)
    })
};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
