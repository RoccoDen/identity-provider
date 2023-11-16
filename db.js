// db.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userID: {
    type: String,
    required: true,
  },
  // Altre informazioni se necessario
});

const OrganizationSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  userList: [UserSchema],
  // Altre informazioni se necessario
});

const ClientSchema = new Schema({
  clientID: {
    type: String,
    unique: true,
    required: true,
  },
  organizations: [OrganizationSchema],
  // Altre informazioni se necessario
});

const Client = mongoose.model('Client', ClientSchema);

mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Errore di connessione al database:'));
db.once('open', () => {
  console.log('Connesso al database MongoDB');
});

module.exports = {
  Client,
};
