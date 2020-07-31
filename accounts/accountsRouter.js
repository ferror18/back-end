const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken')

const router = require("express").Router();

const Accounts = require("./accountsModel.js");
const { isValidReg } = require("./accountsServices.js");
const { SECRET, ROUNDS } = require("../globalConstants.js");

router.post("/register", async (req, res) => {
    try {
    const userMatch = await Accounts.findBy({username: req.body.username});
    const [ statusCode, payload ] = await isValidReg(req.body, userMatch);
    if ( statusCode === 201) {
      payload.password = bcryptjs.hashSync(payload.password, ROUNDS);
      const newAccount = await Accounts.add(payload);
      if (newAccount.name === "error") {
        // console.log(newAccount);
        res.status(200).json({message: 'Username has already been taken'})
      } else {
        await res.status(statusCode).json({message:"Account created succesfully"})
      }
    } else {
      await res.status(statusCode).json({message: payload})


    // console.log(await Accounts.findBy({username: credentials.username}));
    }
    } catch (error) {
      console.log(error);
    }
});


router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (isValid(req.body)) {
    Accounts.findBy({ username: username })
      .then(([user]) => {
        // compare the password the hash stored in the database
        if (user && bcryptjs.compareSync(password, user.password)) {
            const token = makeJwt(user)
          res.status(200).json({ message: `Welcome Back ${user.username}`, username:user.username, token});
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: "please provide username and password and the password shoud be alphanumeric",
    });
  }
});

function makeJwt(user) {
    const payload = {
        subject: user.id
    }
    const options = {
        expiresIn: '24h'
    }
    return jwt.sign(payload, SECRET, options)
}
module.exports = router;