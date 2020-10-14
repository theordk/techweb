
const db = require('./db') //import de notre module db. db est un objet contenat différentes propriétés implémentées dans le module
const express = require('express') //import de express
const app = express() //lancement de express

app.use(require('body-parser').json()) //cette bibliothèque nous permet de parser le body de la requête sous le format JSON. N'oubliez pas d'effectuer des requetes avec le header Content-Type avec comme valeur application/json
//Implémentation d'une route / par défaut
app.get('/', (req, res) => {
  res.send([
    '<h1>ECE DevOps Chat</h1>'
  ].join(''))
})

//Lister tous les channels
app.get('/channels', async (req, res) => {
  const channels = await db.channels.list() //On appel la fonction list de notre module "db" qui va nous retourner tous les channels stockés en base de données
  res.json(channels) //On renvoie du json en sortie
})

//Créer un channel
app.post('/channels', async (req, res) => {
  const channel = await db.channels.create(req.body)
  res.status(201).json(channel) //petite spécificité ici, on précise le status code 201. Pour apprendre plus sur les status code : https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP
})

//Syntaxe async/await : https://blog.engineering.publicissapient.fr/2017/11/14/asyncawait-une-meilleure-facon-de-faire-de-lasynchronisme-en-javascript/

//Voir un channel
app.get('/channels/:id', (req, res) => {
  const channel = db.channels.get(req.body)
  res.json(channel)
})

//Modifier un channel
app.put('/channels/:id', (req, res) => {
  const channel = db.channels.update(req.body)
  res.json(channel)
})

//Add missing routes here...

//Users
app.get('/users', async (req, res) => {
  const users = await db.users.list()
  res.json(users)
})

app.post('/users', async (req, res) => {
  const user = await db.users.create(req.body)
  res.status(201).json(user)
})

/* app.get('/users/:id', (req, res) => {
  const user = db.users.get(req.body)
  res.json(user)
})

app.put('/users/:id', (req, res) => {
  const user = db.users.update(req.body)
  res.json(user)
}) */

//Messages
app.get('/channels/:id/messages', async(req, res) => {
  const messages = await db.channels.listMessages(req.params.id)
  res.json(messages)
})

app.post('/channels/:id/messages', async(req, res) => {
  const message = await db.channels.createMessage(req.params.id, req.body)
  res.status(201).json(message)
})

module.exports = app
