var TelegramBot = require('node-telegram-bot-api');

// Устанавливаем токен, который выдавал нам бот
var token = '819668719:AAFrNbEZs0fnpjfloPXmDS-D7IEC_hTyZto';
// Включить опрос сервера. Бот должен обращаться к серверу Telegram, чтобы получать актуальную информацию
// Подробнее: https://core.telegram.org/bots/api#getupdates
var bot = new TelegramBot(token, { polling: true });

var infotext = "Тестовый текст!";
var infocontact = "Тестовый текст!";

var editt = false;
var editc = false;

bot.onText(/\/start/, function (msg, match) {
    var fromId = msg.from.id; // Получаем ID отправителя
    var resp = "/info - Вывести информацию о товарах \n/contact - Вывести контактные данные"; // Получаем текст после /echo
    bot.sendMessage(fromId, resp);
});

bot.onText(/\/info/, function (msg, match) {
    var fromId = msg.from.id; // Получаем ID отправителя
    var resp = infotext; // Получаем текст после /echo
    bot.sendMessage(fromId, resp);
});

bot.onText(/\/contact/, function (msg, match) {
    var fromId = msg.from.id; // Получаем ID отправителя
    var resp = infocontact; // Получаем текст после /echo
    bot.sendMessage(fromId, resp);
});

bot.onText(/\/setinfo56897/, function (msg, match) {
    var fromId = msg.from.id; // Получаем ID отправителя
	editt = true;
    bot.sendMessage(fromId, "Введите сообщение с иноформацией. Введите слово stop для отмены ввода.");
});

bot.onText(/\/setcontact56897/, function (msg, match) {
    var fromId = msg.from.id; // Получаем ID отправителя
	editc = true;
    bot.sendMessage(fromId, "Введите сообщение с контактом. Введите слово stop для отмены ввода.");
});

bot.on('message', function (msg) {
	var fromId = msg.from.id;

    if (msg.text == "stop") {
		editt = false;
		editc = false;
		bot.sendMessage(fromId, "Редактирование отменено!");
	} else if (editt) {
		infotext = msg.text;
		editt = false;
		bot.sendMessage(fromId, "Инфо установлено!");
	} else if (editc) {
		infocontact = msg.text;
		editc = false;
		bot.sendMessage(fromId, "Контакт установлен!");
	}
});
