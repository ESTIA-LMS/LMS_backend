/*imports modules*/
const express = require('express')
const cors = require('cors')

/*import connexion bdd*/
let DB = require('./db.config')

/*init du server*/
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

/*import des modules et mise en place du routage*/
const router = require('./routes/index')
app.use(router)

/*test bdd*/
DB.authenticate().then(() => {
    console.log('Connection successful')
})
.catch((err) => {
    console.log('Unable to connect to database', err)
})


/*demarage du serveur*/
app.listen(process.env.SERVER_PORT,() => {
    console.log(`Le serveur tourne sur le port ${process.env.SERVER_PORT}`)
}
)
 

