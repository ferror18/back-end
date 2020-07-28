/*
testing the insert manually.

- make sure the data is not on the table (clean tables before each test)
- insert the data
- check that the data is in the table

*/
const db = require("../data/dbConfig.js");
const Accounts = require("./accountsModel.js");
const { testAccounts } = require("./accountsConstants.js");
const { kcOptions, resetDB } = require('../globalConstants.js');
const knexCleaner = require('knex-cleaner');





describe("Accounts model", function () {
    afterAll(async () => {
        await resetDB();
    });
    describe("add()", function () {
        beforeEach( async () => {
            await resetDB();
            await Accounts.add(testAccounts.user);
            await Accounts.add(testAccounts.user2);
        });
        it("should correctly insert user", async () => {
            // table was cleared by the beforeEach() function
            const Accounts = await db("accounts");
            expect(Accounts).toHaveLength(2);
        });
        it("Should add the correct data", async () => {
            const myAccounts = await db("accounts");
            expect(myAccounts[0].username).toBe(testAccounts.user.username);
            expect(myAccounts[0].password).toBe(testAccounts.user.password);
            expect(myAccounts[1].username).toBe(testAccounts.user2.username);
            expect(myAccounts[1].password).toBe(testAccounts.user2.password);
        })

    });
    describe("findAll()", () => {
        it("should get same number of entries", async () => {
            await resetDB();
            await Object.values(testAccounts).forEach(async element => {
            await Accounts.add(element);
            });
            const myAccounts = await db("accounts");
            const findAllAccounts = await Accounts.findAll();

            expect(myAccounts.length).toBe(findAllAccounts.length)
        })
    });
    describe("findBy(id)", () => {
        it("should use id to grab one correct user", async () => {
            await resetDB();
            await Object.values(testAccounts).forEach(async element => {
            await Accounts.add(element);
            });
            const userFromDb = await db("accounts").where({ username: 'sam' }.first());
            const userFromModel = await Accounts.findById(userFromDb.id);
            console.log(userFromDb, userFromModel);
            expect(userFromDb.length).toBe(userFromModel.length);
            expect(userFromModel.id).toBe(userFromModel.id);
            expect(userFromModel.username).toBe(userFromModel.username);
            expect(userFromModel.password).toBe(userFromModel.password);
        })
    });
    describe("findBy(filter)", () => {
        it("should find by filter username", async () => {
            await resetDB();
            await Object.values(testAccounts).forEach(async element => {
            await Accounts.add(element);
            });
            const userFromDb = await db("accounts").where({username: 'flammingPuddle'}).orderBy("id");
            const userFromModel = await Accounts.findBy({username: 'flammingPuddle'});
            expect(userFromDb.length).toBe(userFromModel.length);
            expect(userFromModel.id).toBe(userFromModel.id);
            expect(userFromModel.username).toBe(userFromModel.username);
            expect(userFromModel.password).toBe(userFromModel.password);
        })
    })

});
