const Boards = require("./boardsModel");
const { SECRET } = require("../globalConstants");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
router.get('/public', async (req, res) => {
    const owner = jwt.verify(req.headers.authorization, SECRET).subject; 
    res.status(200).json(await Boards.findBy({"is_public": true}))
})
router.get('/public/:id', async (req, res) => {
    const owner = jwt.verify(req.headers.authorization, SECRET).subject; 
    res.status(200).json(await Boards.findBy({"is_public": true, id: req.params.id}))
})
router.post('/', async (req, res) => {
    // console.log(req.headers);
    const decoded = jwt.verify(req.headers.authorization, SECRET);
    // console.log(req.body);
    const newBoard = await Boards.add({
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



router.patch('/:id', async (req, res) => {
    const owner = jwt.verify(req.headers.authorization, SECRET).subject; 
    res.status(200).json({message:'Success board has changed'})
})

router.delete('/:id', async (req, res) => {
    const owner = jwt.verify(req.headers.authorization, SECRET).subject;
    const record = await Boards.findById(req.params.id); 
    res.status(200).json({ message: `Board "${record.name}" deleted`, count: await Boards.remove(req.params.id)})
})

module.exports = router;