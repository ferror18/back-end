const Boards = require('../../boards/boardsModel.js');
const Accounts = require('../../accounts/accountsModel.js');
const Articles = require('..//articlesModel.js')
const db = require("../../data/dbConfig.js");
const { testAccounts } = require('../../accounts/accountsConstants.js');
const { testBoards } = require('../../boards/boardsConstants.js')
const { testArticles } = require('../articlesConstants.js')
const { resetDB }  = require('../../globalServices.js');

describe("Articles model", () => {
    beforeAll( async () => {await resetDB()});
    afterAll(async () => {await resetDB()});
    let ACCOUNT, BOARD;
    beforeEach( async () => {
        await resetDB();
        const [ id ] = await db('accounts').insert(testAccounts.user, "id");
        ACCOUNT =  await db('accounts').where({ id }).first();
        BOARD = await Boards.add({...testBoards.brd, owner: ACCOUNT.id});
    });
    it("User can CREATE an Article", async () => {
        const article = await Articles.add({...testArticles.article1, board_id: BOARD.id});
        const articlesInDb = await db('articles').where({ board_id: BOARD.id });
        // console.log(article, articlesInDb);
        await expect(await db('articles').where("id", article.id).first()).toMatchObject(article);
        await expect(articlesInDb).toContainEqual(article);
    });
    it("User CAN update an Article", async () => {
        let newArticle, newArticle_dblCheck;
        const BOARD2 = await Boards.add({...testBoards.brdPub, owner: ACCOUNT.id});
        const updatableArticleProperties = ["board_id","url","title","author","host"]
        const oldArticle = await Articles.add({...testArticles.article1, board_id: BOARD.id});
        for (const iterator of updatableArticleProperties) {
            newArticle = await Articles.update({ updates: {...oldArticle, [iterator]: iterator==='board_id'?BOARD2.id:'asdasd'}, id:oldArticle.id});
            newArticle_dblCheck = await db('articles').where('id', '=', newArticle.id); //This return array
            // console.log(newArticle, newArticle_dblCheck);
            await expect(newArticle[iterator]).toBe(iterator==='board_id'?BOARD2.id:'asdasd');
            await expect(newArticle_dblCheck[0][iterator]).toBe(iterator==='board_id'?BOARD2.id:'asdasd');
        }
    });
    it("User can see ALL articles in one board", async () => {
        const articleOne = await Articles.add({...testArticles.article, board_id: BOARD.id});
        const articleTwo = await Articles.add({...testArticles.article1, board_id: BOARD.id});
        const articlesInDb = await db('articles').where({ board_id: BOARD.id });
        const articlesFromModel = await Articles.findBy({ board_id: BOARD.id });
        // await console.log(articlesFromModel, articlesInDb);

        await expect(articlesFromModel).toEqual(expect.arrayContaining(articlesInDb));
        await expect(articlesFromModel).toHaveLength(articlesInDb.length)
    });
    it("User can see ONE article", async () => {
        const articleOne = await Articles.add({...testArticles.article, board_id: BOARD.id});
        const articlesInDb = await db('articles').where({ board_id: BOARD.id });
        const articlFromModel = await Articles.findById(articleOne.id);

        await expect(articlesInDb).toContainEqual(articlFromModel);
    });
});