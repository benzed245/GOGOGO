module.exports.config = {
	name: "work",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "CatalizCS",
	description: "Có làm thì mới có ăn!",
	commandCategory: "Economy",
	usages: "work",
    cooldowns: 5,
    envConfig: {
        cooldownTime: 1200000
    }
};

module.exports.run = async ({ event, api, Currencies, global }) => {
    const { threadID, messageID } = event;
    const cooldown = global.work.cooldownTime;
    const data = (await Currencies.getData(event.senderID)).workTime;
    if (typeof data !== "undefined" && cooldown - (Date.now() - data) > 0) {
        var time = cooldown - (Date.now() - data),
            minutes = Math.floor(time / 60000),
            seconds = ((time % 60000) / 1000).toFixed(0);
        
		return api.sendMessage(`Bạn đang trong thời gian chờ\nVui lòng thử lại sau: ${minutes} phút ${(seconds < 10 ? "0" : "")}${seconds} giây!`, event.threadID, event.messageID);
    }
    else {
        const job = [
            "đi bán sắt vụn ",
            "đi làm trai bao",
            "làm nhân viên sửa cống nước ",
            "đi hack facebook, bị bắt nhưng lại nhặt được cục tiền",
            "làm thợ sửa ống nước ( ͡° ͜ʖ ͡°)",
            "làm đầu bếp phố hàng đồng",
            "làm thợ hồ nước trong veo",
            "giả mạo tổng thống",
            "đi đấu kiếm người khác",
            "đi bắn thứ màu trắng nhớt nhớt lên người",
            "đi làm đa cấp online",
            "làm nội trợ với sang",
            "đi chịch chết cụ mấy thằng sao đỏ, giun vàng",
            "đi làm gái bán hoa",
            "tìm jav/hentai code cho Sang bắn",
            "đi chơi gái và thoát ế"
        ];
        const amount = Math.floor(Math.random() * 1000);
        return api.sendMessage(`Bạn ${job[Math.floor(Math.random() * job.length)]} và đã nhận được số tiền là: ${amount} coins`, threadID, async () => {
             await Currencies.increaseMoney(event.senderID, parseInt(amount));
             await Currencies.setData(event.senderID, { workTime: Date.now() });
        }, messageID);
    }
       
}