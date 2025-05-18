const app = require('./app');

const { connectQueue, consumeQueue } = require("./services/queueService");
const emailService = require("./services/emailService");
const smsService = require("./services/smsService");
const inAppService = require("./services/inAppService");
const Notification = require("./models/Notification");
const User = require("./models/User");

const PORT = process.env.PORT || 3000;

app.listen(PORT, async() => {
    await connectQueue();
    console.log(`Server running on port ${PORT}`);

    consumeQueue(async(notification) => {
        const user = await User.findById(notification.userId);
        try {
            if (notification.type === "email") {
                await emailService.sendEmail(user.email, notification.message);
            } else if (notification.type === "sms") {
                await smsService.sendSMS(user.phone, notification.message);
            } else {
                await inAppService.sendInApp(user._id, notification.message);
            }

            await Notification.findByIdAndUpdate(notification._id, { status: "sent" });
        } catch (err) {
            await Notification.findByIdAndUpdate(notification._id, { status: "failed" });
        }
    });
});