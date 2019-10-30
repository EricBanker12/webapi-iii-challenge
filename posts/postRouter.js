const express = require('express');

const postDb = require('./postDb')

const router = express.Router();

router.get('/', (req, res) => {
    
});

router.get('/:id', validatePostId, (req, res) => {
    res.json(req.post)
});

router.delete('/:id', validatePostId, (req, res) => {

});

router.put('/:id', validatePostId, (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {
    const id = Number(req.params.id)

    postDb.getById(id)
    .then(resp => {
        // console.log(resp)
        if (resp) {
            req.post = resp
            next()
        }
        else res.status(400).json({message: "invalid post id"})
    })
    .catch(err => {
        // console.log(err)
        res.sendStatus(500)
    })
};

module.exports = router;