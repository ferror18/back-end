const db = require("../data/dbConfig.js");
const Accounts = require("./accountsModel.js");
const { testAccounts } = require("./accountsConstants.js");
const { resetDB } = require('../globalConstants.js');

describe("Accounts model", function () {
    // afterAll(async () => {
    //     await resetDB();
    // });
    describe("add()", function () {
        beforeEach( async () => {
            await resetDB();
            await Accounts.add(testAccounts.user);
            await Accounts.add(testAccounts.user2);
        });
        it("should correctly insert user", async () => {
            // table was cleared by the beforeEach() function
            const Accounts = await db("accounts");
            await expect(Accounts).toHaveLength(2);
        });
        it("Should add the correct data", async () => {
            const myAccounts = await db("accounts");
            await expect(myAccounts[0].username).toBe(testAccounts.user.username);
            await expect(myAccounts[0].password).toBe(testAccounts.user.password);
            await expect(myAccounts[1].username).toBe(testAccounts.user2.username);
            await expect(myAccounts[1].password).toBe(testAccounts.user2.password);
        })

    });
    describe("findAll()", () => {
        it("should get same number of entries", async () => {
            await resetDB();
            for (const iterator of Object.values(testAccounts)) {await Accounts.add(iterator)}
            const myAccounts = await db("accounts");
            const findAllAccounts =  await Accounts.findAll();
            // await console.log('Expected ==>',myAccounts, 'received ==>',findAllAccounts);
            await  expect(myAccounts.length).toBe(findAllAccounts.length)
        })
    });
    describe("findBy(id)", () => {
        beforeEach( async () => {
            await resetDB();
            for (const iterator of Object.values(testAccounts)) {await Accounts.add(iterator)}
        });
        it("should use id to grab one correct user", async () => {
            const userFromDb = await db("accounts").where({ username: 'sam' }).first();
            const userFromModel = await Accounts.findById(userFromDb.id);
            // await console.log(userFromDb, userFromModel);
            await  expect(userFromDb.length).toBe(userFromModel.length);
            await  expect(userFromModel.id).toBe(userFromModel.id);
            await  expect(userFromModel.username).toBe(userFromModel.username);
            await  expect(userFromModel.password).toBe(userFromModel.password);
        })
    });
    describe("findBy(filter)", () => {
        it("should find by filter username", async () => {
            beforeEach( async () => {
                await resetDB();
                for (const iterator of Object.values(testAccounts)) {await Accounts.add(iterator)}
            });
            const userFromDb = await db("accounts").where({username: 'flammingPuddle'}).orderBy("id");
            const userFromModel = await Accounts.findBy({username: 'flammingPuddle'});
            await  expect(userFromDb.length).toBe(userFromModel.length);
            await  expect(userFromModel.id).toBe(userFromModel.id);
            await  expect(userFromModel.username).toBe(userFromModel.username);
            await  expect(userFromModel.password).toBe(userFromModel.password);
        })
    })

});
