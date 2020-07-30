const Boards = require('../boardsModel.js')
const Accounts = require('../../accounts/accountsModel.js')
const db = require("../../data/dbConfig.js");
const { testAccounts } = require('../../accounts/accountsConstants.js');
const { testBoards } = require('../boardsConstants.js')
const { resetDB }  = require('../../globalServices.js');

describe("Boards model", () => {
    beforeAll( async () => {await resetDB()});
    afterAll(async () => {await resetDB()});
    // afterEach(async () => {await resetDB()});
    beforeEach(async () => {await resetDB()});
    it("New user should get a default board", async () => {
        const acc = await Accounts.add(testAccounts.user)
        await expect(await db('boards').select("name").where("owner", acc.id)[0]).toBe(testAccounts.user.name)
    });
    it("User can CREATE a board", async () => {
        const [id] = await db('accounts').insert(testAccounts.user2, "id");
        const board = await Boards.add({...testBoards.brd, owner: id});
        await expect(await db('boards').select('id').where("id", board.id));
    });
    it.skip("User can CREATE a PUBLIC board", () => {});
    it.skip("User can PUBLISH a board", () => {});
    it.skip("User can see ALL of HIS boards", () => {});
    it.skip("User can see ONE of HIS boards", () => {});
    it.skip("User can see ALL of the PUBLIC boards", () => {});
    it.skip("User can see ONE of the PUBLIC boards", () => {});
    it.skip("User CAN update one of his boards", () => {});
    it.skip("User CANNOT update a PUBLIC board", () => {});
    it.skip("User can update ONE individual field on his board", () => {});
    it.skip("User can FOLLOW a public board", () => {});
    it.skip("User can FORK a public board", () => {});
    
});