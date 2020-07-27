//dependencies
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

//routers
const usersRouter = require('./users/usersRouter.js');
const boardsRouter = require('./boards/boardsRouter.js');
const articlesRouter = require('./articles/articlesRouter.js');

//middleware
 
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use(usersRouter);
server.use('/boards', boardsRouter);
server.use('/articles', articlesRouter);
server.get('/', (req, res) => res.send('Server Running'))
//network
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});