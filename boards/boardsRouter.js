const Boards = require("./boardsModel");
const { SECRET } = require("../globalConstants");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

router.post('/', (req, res) => {
    // console.log(req.headers);
    const decoded = jwt.verify(req.headers.authorization, SECRET);
    // console.log(req.body);
    const newBoard = Boards.add({
        name: req.body.name,
        description: req.body.description,
        owner: decoded.subject,
        is_public: req.body.is_public || false
    })
    res.status(200).json(newBoard)
})

router.get('/', async (req, res) => {
    const owner = jwt.verify(req.headers.authorization, SECRET).subject;
    res.status(200).json(await Boards.findBy({owner}))
})

router.get('/', async (req, res) => {
    const owner = jwt.verify(req.headers.authorization, SECRET).subject;
    res.status(200).json(await Boards.findBy({owner}))
})

router.get('/:id', async (req, res) => {
    const owner = jwt.verify(req.headers.authorization, SECRET).subject;
    res.status(200).json(await Boards.findBy({owner: owner, id: req.params.id}))
})

router.get('/public', async (req, res) => {
    const owner = jwt.verify(req.headers.authorization, SECRET).subject; 
    res.status(200).json(await Boards.findBy({is_public: 'true'}))
})

router.patch('/:id', async (req, res) => {
    const owner = jwt.verify(req.headers.authorization, SECRET).subject; 
    res.status(200).json({board:await Boards.update([req.body, req.params.id]), message:'Success'})
})

router.delete('/:id', async (req, res) => {
    const owner = jwt.verify(req.headers.authorization, SECRET).subject; 
    res.status(200).json({count: await Boards.remove(req.params.id), message: 'Success'})
})

module.exports = router;