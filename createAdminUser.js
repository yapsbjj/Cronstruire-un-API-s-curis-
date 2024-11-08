const mongoose = require('mongoose');
const User = require('./models/userModel');

const url = process.env.MONGODB_URI || 'mongodb+srv://adminbg:admin123@cluster0.igwnn3z.mongodb.net/locator';

mongoose.connect(url)
  .then(() => console.log('Connexion à MongoDB réussie'))
  .catch(err => console.error('Erreur de connexion à MongoDB :', err));

const createUser = async (username, password) => {
  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log(`L'utilisateur ${username} existe déjà.`);
      return; // Ne pas essayer de créer un utilisateur existant
    }

    const user = new User({ username });
    await User.register(user, password);
    console.log(`Utilisateur ${username} créé avec succès`);
  } catch (error) {
    console.error(`Erreur lors de la création de l'utilisateur ${username} :`, error);
  }
};

const main = async () => {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error('Veuillez fournir un nom d\'utilisateur et un mot de passe.');
    process.exit(1);
  }

  const [username, password] = args;
  await createUser(username, password);
  mongoose.connection.close();
};

main();
