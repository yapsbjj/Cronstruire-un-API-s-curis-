const mongoose = require('mongoose');
const User = require('./models/userModel');

const url = process.env.MONGODB_URI || 'mongodb+srv://adminbg:admin123@cluster0.igwnn3z.mongodb.net/locator';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie'))
  .catch(err => console.error('Erreur de connexion à MongoDB :', err));

const createUser = async () => {
  const admin = new User({ username: 'adminbg' });
  await User.register(admin, 'admin123');
  console.log('Utilisateur admin créé');
  mongoose.connection.close();
};

createUser();
