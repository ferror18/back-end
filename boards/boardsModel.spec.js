const Boards = require('./boardsModel.js');
const Accounts = require('../accounts/accountsModel.js');
const { testAccounts } = require('../accounts/accountsConstants.js');
const db = require("../data/dbConfig.js");
const { kcOptions, resetDB } = require('../globalConstants.js');
const knexCleaner = require('knex-cleaner');



describe("Boards model", () => {
    afterAll(async () => {
        await resetDB();
     });
    it("New user should get a default board", async () => {
        await resetDB();
        await Accounts.add(testAccounts.user);
        console.log(await Boards.findAll());

    });
    it.skip("User can CREATE a board", () => {});
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