 const supertest = require("supertest");
const server = require("../../index.js");
const { testAccounts } = require("../accountsConstants.js");
const { resetDB } = require("../../globalServices.js");
const Accounts = require("../accountsModel.js")
// server.use(require('express').json());        
describe("Accounts router '/'",() => {
    it("should respond with 200 OK", function () {
        return supertest(server).get("/").expect(200)});




        
    describe("POST /register", () => {
        beforeAll(async () => {resetDB()});
        beforeEach(async () => {resetDB()});
        afterAll(async () => {resetDB()})
        it('It is reachable ', () => {
            return supertest(server)
            .get("/register")
            .then(res => {
                expect(res).toBeTruthy();
            });
        });
        it('Should return correct status', async done => {
            await supertest(server)
            .post("/register")
            .send(testAccounts.user)
            .expect( res => {
                expect(res.status).toBe(201)
                done()
            })
        });
        it('Response should contain the correct info', async done => {
            await supertest(server)
            .post("/register")
            .send(testAccounts.user)
            .expect( res => {
                expect(res.body).toMatchObject({message:"Account created succesfully"});
                done()
            })
        });
        describe('Should handle error', () => {
            it('Invalid format', async done => {
                await supertest(server)
                .post("/register")
                .send({...testAccounts.user, password: 416555464})
                .expect( res => {
                    expect(res.body).toMatchObject({message:"Invalid format"});
                    done()
                })
            });
            it('Missing password', async done => {
                await supertest(server)
                .post("/register")
                .send({username: 'asdasd'})
                .expect( res => {
                    expect(res.body.message).toBe('Please provide a password');
                    done()
                })
            });
            it('Missing username', async done => {
                await supertest(server)
                .post("/register")
                .send({password: 'asdasd'})
                .expect( res => {
                    expect(res.body.message).toBe('Please provide a username');
                    done()
                })
            });
            it('Username already exists', async done => {
                await supertest(server)
                .post("/register")
                .send(testAccounts.user5)
                .expect(201);

                await supertest(server)
                .post("/register")
                .send(testAccounts.user5)
                .expect( res => {
                    expect(res.body.message).toBe('Username has already been taken');
                    done();
                })
            });
        });
    });










    describe("POST /login", () => {
        // let ACCOUNT, ACCOUNT2, ACCOUNT3;
            // ACCOUNT = await Accounts.add(testAccounts.user);
            // ACCOUNT2 = await Accounts.add(testAccounts.user2);
            // ACCOUNT3 = await Accounts.add(testAccounts.user3);

        it.todo('It is reachable ')
        it.todo('Status status is correct');
        it.todo('Response should contain the correct info');
        describe('Should handle error', () => {
            it.todo('Invalid format');
            it.todo('Missing password');
            it.todo('Missing username');
            it.todo('Invalid credentials');
        });
    });
})