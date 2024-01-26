const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();



// Kullanıcı kaydı
router.post('/register', async (req, res) => {
    try {
      const { username, name, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10); // Şifreyi hash'leme
  
      const newUser = new User({
        username,
        name,
        password: hashedPassword,
      });
  
      await newUser.save(); // Kullanıcıyı veritabanına kaydetme
      res.status(201).send('Kullanıcı başarıyla oluşturuldu.');
    } catch (error) {
      res.status(500).send('Kullanıcı oluşturma sırasında hata oluştu.');
    }
  });
  

// Kullanıcı girişi
router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(401).send('Kullanıcı bulunamadı.');
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).send('Hatalı şifre.');
      }
  
      // JWT Token
      const token = jwt.sign({ userId: user._id }, 'gizliAnahtar', { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).send('Sunucu hatası.');
    }
  });


module.exports = router;