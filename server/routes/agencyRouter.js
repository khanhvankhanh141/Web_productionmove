const express = require('express');
const router = express.Router();
const agencyCtrl = require('../controllers/agencyCtrl');
const orderCtrl = require('../controllers/orderCtrl');
const guaranteeOrderCtrl = require('../controllers/guaranteeOrderCtrl');

router.post('/updateAmount', agencyCtrl.updateAmount); // done
router.get('/order/:id', orderCtrl.getOderFromIdAgency);
router.post('/createOder/', orderCtrl.createOder);
router.post('/createGuaranteeOrder/', guaranteeOrderCtrl.createGuaranteeOrder);
router.put(
    '/updateNotGuaranteeOrder/:id',
    guaranteeOrderCtrl.updateNotGuaranteeOrder
);
router.get(
    '/guaranteeOrder/:id',
    guaranteeOrderCtrl.getGuaranteeOrderByIdAgency
);
router.get('/', agencyCtrl.getAllAgencies); // done
router.get('/:id', agencyCtrl.getAgencyById); // done

module.exports = router;
