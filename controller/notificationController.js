const Notification = require("../models/Notification");
const User = require("../models/User");
const { sendToQueue } = require("../services/queueService");

exports.sendNotification = async(req, res) => {
    try {
        const { userEmail, type, message } = req.body;

        // Find user by email
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Create notification with ObjectId user._id
        const notification = await Notification.create({
            userId: user._id,
            type,
            message,
        });

        // Enqueue notification for processing (email/sms/in-app)
        sendToQueue(notification);

        res.status(202).json({ message: "Notification queued" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserNotifications = async(req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.params.id });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
