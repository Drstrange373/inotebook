const mongoose = require('mongoose')
const mongoURI = 'mongodb+srv://sanjay:connect@cluster0.zpnittb.mongodb.net/inotebook?retryWrites=true&w=majority'

const connectToMongo = ()=>{
    mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Your code here
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB ', err);
  });

}
connectToMongo()
module.exports = connectToMongo