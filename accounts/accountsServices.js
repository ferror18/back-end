module.exports = {
  isValidReg,
  isValidLog
  };
 const Accounts = require('./accountsModel.js')
function isValidReg(credentials, userMatch) {
    if (!credentials.password) {
      return [ 400, 'Please provide a password']
    } if (!credentials.username) {
      return [ 400, 'Please provide a username']
    } if (credentials === null || credentials === undefined) {
      return [ 400, "please provide username and password and the password shoud be alphanumeric" ]
    }if (typeof credentials.password  !== 'string' || typeof credentials.username  !== 'string') {
      return [ 400, "Invalid format" ]
    }else {
      return [ 201, credentials];
    }
  }

  function isValidLog(credentials) {
    if (!credentials.password) {
      return [ 400, 'Please provide a password']
    } if (!credentials.username) {
      return [ 400, 'Please provide a username']
    } if (credentials === null || credentials === undefined) {
      return [ 400, "please provide username and password and the password shoud be alphanumeric" ]
    }if (typeof credentials.password  !== 'string' || typeof credentials.username  !== 'string') {
      return [ 400, "Invalid format" ]
    } else {
      return [ 200, credentials];
    }
  }
// function hashedPassword(params) {
  
// }
//   const hashedPassword = await new Promise((resolve, reject) => {
//     bcrypt.hash(password, saltRounds, function(err, hash) {
//       if (err) reject(err)
//       resolve(hash)
//     });
//   })

//   return hashedPassword
// }