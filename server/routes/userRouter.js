const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userCtrl');

router.post('/login', userCtrl.login); //done
router.post('/register', userCtrl.register); //done
router.post('/delete', userCtrl.delete); //done
router.post('/update', userCtrl.update); //done
router.get('/userAdmin', userCtrl.getUserAdmin); //done
router.get('/userAgency', userCtrl.getUserAgency); //done
router.get('/userGuarantee', userCtrl.getUserGuarantee); //done
router.get('/userFactory', userCtrl.getUserFactory); //done

module.exports = router;
