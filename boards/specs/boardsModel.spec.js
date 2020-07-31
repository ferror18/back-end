const Boards = require('../boardsModel.js')
const Accounts = require('../../accounts/accountsModel.js')
const db = require("../../data/dbConfig.js");
const { testAccounts } = require('../../accounts/accountsConstants.js');
const { testBoards } = require('../boardsConstants.js')
const { resetDB }  = require('../../globalServices.js');

describe("Boards model", () => {
    beforeAll( async () => {await resetDB()});
    afterAll(async () => {await resetDB()});
    // beforeEach(async () => {await resetDB()});
    it("New user should get a default board", async () => {
        const acc = await Accounts.add(testAccounts.user)
        await expect(await db('boards').select("name").where("owner", acc.id)[0]).toBe(testAccounts.user.name)
    });
    describe('', () => {
        let ACCOUNT;
        beforeEach( async () => {
            await resetDB();
            const [ id ] = await db('accounts').insert(testAccounts.user, "id");
            ACCOUNT =  await db('accounts').where({ id }).first();
        });
        it("User can CREATE a board", async () => {
            const board = await Boards.add({...testBoards.brd, owner: ACCOUNT.id});
            const boardsInDb = await db('boards').where({ owner: ACCOUNT.id });
            await expect(await db('boards').where("id", board.id).first()).toMatchObject(board);
            await expect(boardsInDb).toContainEqual(board);
        });
        it("User can CREATE a PUBLIC board", async () => {
            const board = await Boards.add({...testBoards.brdPub, owner: ACCOUNT.id});
            await expect(await db('boards').where("id", board.id).first()).toMatchObject(board);
        });
        it("User can PUBLISH a board", async () => {
            const oldBoard = await Boards.add({...testBoards.brd, owner: ACCOUNT.id});
            const newBoard = await Boards.update({ updates: {...oldBoard, is_public:true}, id:oldBoard.id});
            const newBoard_dblCheck = await db('boards').where('id', '=', newBoard.id); //This return array
            await expect(oldBoard.is_public).toBeFalsy();
            await expect(newBoard.is_public).toBeTruthy();
            await expect(newBoard_dblCheck[0].is_public).toBeTruthy();
        });
        it("User CAN update a Board", async () => {
            let newBoard, newBoard_dblCheck;
            const updatableBoardProperties = ['name', 'is_public', 'description']
            const oldBoard = await Boards.add({...testBoards.brd, owner: ACCOUNT.id});
            for (const iterator of updatableBoardProperties) {
                newBoard = await Boards.update({ updates: {...oldBoard, [iterator]: iterator==='is_public'?true:'asdasd'}, id:oldBoard.id});
                newBoard_dblCheck = await db('boards').where('id', '=', newBoard.id); //This return array
                // console.log(newBoard, newBoard_dblCheck);
                await expect(newBoard[iterator]).toBe(iterator==='is_public'?true:'asdasd');
                await expect(newBoard_dblCheck[0][iterator]).toBe(iterator==='is_public'?true:'asdasd');
            }
        });
        it("User can see ALL of HIS boards", async () => {
            const boardOne = await Boards.add({...testBoards.brd, owner: ACCOUNT.id});
            const boardTwo = await Boards.add({...testBoards.brdPub, owner: ACCOUNT.id});
            const boardsInDb = await db('boards').where({ owner: ACCOUNT.id });
            const boardsFromModel = await Boards.findBy({owner:ACCOUNT.id});
            // await console.log(boardsFromModel, boardsInDb);

            await expect(boardsFromModel).toEqual(expect.arrayContaining(boardsInDb));
            await expect(boardsFromModel).toHaveLength(boardsInDb.length)
        });
        it("User can see ALL of the PUBLIC boards", async () => {
            const board = await Boards.add({...testBoards.brdPub, owner: ACCOUNT.id});
            const boardsInDb = await db('boards').where({ is_public: true });
            const boardsFromModel = await Boards.findBy({is_public:true});
            // await console.log(boardsFromModel, boardsInDb);

            await expect(boardsFromModel).toEqual(expect.arrayContaining(boardsInDb));
            await expect(boardsFromModel).toHaveLength(boardsInDb.length)
            for (const iterator of boardsFromModel) {
                await expect(iterator.is_public).toBeTruthy();
            }
        });
        it("User can see ONE of HIS boards", async () => {
            const boardOne = await Boards.add({...testBoards.brd, owner: ACCOUNT.id});
            const boardsInDb = await db('boards').where({ owner: ACCOUNT.id });
            const boardFromModel = await Boards.findById(boardOne.id);

            await expect(boardsInDb).toContainEqual(boardFromModel);
        });
        it("User can see ONE of the PUBLIC boards", async () => {
            const board = await Boards.add({...testBoards.brdPub, owner: ACCOUNT.id});
            const boardsInDb = await db('boards').where({id: board.id, is_public: true });
            const boardsFromModel = await Boards.findBy({id: board.id, is_public: true });
            // await console.log(boardsFromModel, boardsInDb);
            await expect(boardsInDb).toContainEqual(board);
            for (const iterator of boardsFromModel) {
                await expect(iterator.is_public).toBeTruthy();
            }
        });
        it.todo("User can FOLLOW a public board");
        it.todo("User can FORK a public board");

    });
    
});