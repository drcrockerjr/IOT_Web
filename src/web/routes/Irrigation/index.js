const { Router } = require('express');
const fs = require('fs');
const path = require('path');
const router = Router();


router.get('/', (req, res) => {

  res.sendFile(path.join(__dirname, '/index.html'));

})

module.exports = router
