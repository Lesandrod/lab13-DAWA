//Rutas producto
const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdfController');


router.get('/', pdfController.generarPDf);

module.exports = router;