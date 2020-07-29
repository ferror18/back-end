const router = require("express").Router();
const Articles = require("./articlesModel");
const { SECRET } = require("../globalConstants");
const jwt = require("jsonwebtoken");
const { makeArticleFrom } = require('./articlesServices.js')

router.post('/', async (req, res) => {
    const newArticle = await Articles.add(makeArticleFrom(req.body))
    res.status(200).json(newArticle)
})

router.get('/:board_id',  async (req, res) => {
   try {
    const owner = jwt.verify(req.headers.authorization, SECRET).subject;
    return await Articles.findAll( req.params.board_id );
   } catch (error) {
       res.send(error);
   };
});

router.get('/:board_id/:id', async (req, res) => {
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