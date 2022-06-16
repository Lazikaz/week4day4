const users = []
let bcrypt = require("bcryptjs")

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username){
          let passCheck = true
          bcrypt.compare(password, users[i].password, (err, result) => {return result})
          if (passCheck === true){
            sendUser = users[i]
            sendUser.password = ""
            console.log(sendUser)
            res.status(200).send(sendUser)
          }
        } 
      }
      res.status(400).send("User not found")
    },
    register: (req, res) => {
        const salt = 10
        bcrypt.hash(req.body.password, salt, function(err, hash){
          req.body.password = hash
          users.push(req.body)
          res.status(200).send(req.body)
        })
        
    }
}