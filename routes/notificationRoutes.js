const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.get('/ping', (req, res) => {
    res.send('pong');
});
router.post('/notifications', notificationController.sendNotification);
router.get('/notifications/user/:id', notificationController.getUserNotifications);

module.exports = router;
console.log("Notification routes loaded");
