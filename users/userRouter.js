const express = require('express');

const userDb = require('./userDb')
const postDb = require('../posts/postDb')

const router = express.Router();

router.post('/', validateUser, (req, res) => {
    const name = req.body.name
    
    userDb.insert({name})
    .then(resp => {
        // console.log(resp)
        res.status(201).json(resp)
    })
    .catch(err => {
        // console.log(err)
        res.sendStatus(500)
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
    const text = req.body.text
    const user_id = req.user.id
    
    postDb.insert({text, user_id})
    .then(resp => {
        // console.log(resp)
        res.status(201).json(resp)
    })
    .catch(err => {
        // console.log(err)
        res.sendStatus(500)
    })
});

router.get('/', (req, res) => {
    userDb.get()
    .then(resp => {
        // console.log(resp)
        res.json(resp)
    })
    .catch(err => {
        // console.log(err)
        res.sendStatus(500)
    })
});

router.get('/:id', validateUserId, (req, res) => {
    res.json(req.user)
});

router.get('/:id/posts', validateUserId, (req, res) => {

});

router.delete('/:id', validateUserId, (req, res) => {

});

router.put('/:id', validateUserId, validateUser, (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
    const id = Number(req.params.id)
    userDb.getById(id)
    .then(resp => {
        // console.log(resp)
        if (resp) {
            req.user = resp
            next()
        }
        else res.status(400).json({message: "invalid user id"})
    })
    .catch(err => {
        // console.log(err)
        res.sendStatus(500)
    })
};

function validateUser(req, res, next) {
    if (!req.body) {
        res.status(400).json({message: "missing user data"})
        return
    }
    if (!req.body.name) {
        res.status(400).json({message: "missing required name field"})
        return
    }
    next()
};

function validatePost(req, res, next) {
    if (!req.body) {
        res.status(400).json({message: "missing post data"})
        return
    }
    if (!req.body.text) {
        res.status(400).json({message: "missing required text field"})
        return
    }
    next()
};

module.exports = router;
