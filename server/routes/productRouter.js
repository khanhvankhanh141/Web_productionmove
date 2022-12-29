const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/productCtrl');

router.get('/allProducts', productCtrl.getAllProducts); // done
router.get('/allProductsFactory/:id', productCtrl.getAllProductsFactory);
router.post('/create', productCtrl.create); // done
router.post('/update', productCtrl.update); // done
router.post('/delete', productCtrl.delete); // done

module.exports = router;
