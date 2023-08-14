const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

const ConnectDB = async() =>
{
  try{
   await mongoose.connect('mongodb://localhost:27017/chatApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to the database!!!");
}
catch(error)
{

}

}
module.exports = ConnectDB