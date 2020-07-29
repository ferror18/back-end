const router = require("express").Router();
const Articles = require("./articlesModel");
const { SECRET } = require("../globalConstants");
const jwt = require("jsonwebtoken");
const { makeArticleFrom } = require('./articlesServices.js')

router.post('/', async (req, res) => {
    const newArticle = await Articles.add(makeArticleFrom(req.body))
    res.status(200).json(newArticle)
})

router.get('/',  (req, res) => {
    // const newArticle = await Articles.add(makeArticleFrom(req.body))
    Articles.findAll(req.params.board_id)
    .then(response => {
        const owner = jwt.verify(req.headers.authorization, SECRET).subject;
        console.log(response);
        res.status(200).json(response)
    })
    .catch(error => res.send(error))
})

router.get('/:id', async (req, res) => {
    const owner = jwt.verify(req.headers.authorization, SECRET).subject;
    const article = await Articles.findById(req.params.id)
    res.status(200).json(await article)
})

router.patch('/:id', async (req, res) => {
    const owner = jwt.verify(req.headers.authorization, SECRET).subject; 
    res.status(200).json({message:'Success article has changed'})
})

router.delete('/:id', async (req, res) => {
    const owner = jwt.verify(req.headers.authorization, SECRET).subject;
    const record = await Articles.findById(req.params.id); 
    res.status(200).json({ message: `Article '${await record.title}' deleted`, count: await Articles.remove(req.params.id)})
})
module.exports = router;