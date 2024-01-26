const express = require('express');

const rocketsRoute = require('./routes/rockets');
const usersRoute = require('./routes/users');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());

app.use(express.json());
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("MongoDB'ye bağlanıldı.");
  }).catch(err => {
    console.error("MongoDB bağlantı hatası:", err);
  });

app.use('/users', usersRoute);
app.use('/rockets', rocketsRoute);



const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor...`);
});



