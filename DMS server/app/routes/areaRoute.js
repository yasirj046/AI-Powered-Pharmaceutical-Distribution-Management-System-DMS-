const express = require('express');
const router = express.Router();
const areaController = require('../controllers/areaController');
const authMiddleware = require('../middleware/authMiddleware');

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Area CRUD operations
router.post('/', areaController.createArea);
router.get('/', areaController.getAllAreas);
router.get('/search', areaController.searchAreas);
router.get('/city/:city', areaController.getAreasByCity);
router.get('/:id', areaController.getAreaById);
router.put('/:id', areaController.updateArea);
router.delete('/:id', areaController.deleteArea);

module.exports = router;
