const mongoose = require("mongoose");

const { multiLangString } = require("../utils/tools");

const ContactsscreenSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  screen_title: multiLangString(
    "Введите заголовок блока!",
    "Контакты",
    "Contact"
  ),
  social_links: {
    facebook: {
      link: {
        type: String,
        required: [true, "Введите ссылку на страницу в facebook!"],
        default: "https://www.facebook.com/",
      },
      icon_url: {
        type: String,
        required: [true, "Загрузите иконку"],
        default: "/uploads/main/facebook-default-icn.svg",
      },
    },
    instagram: {
      link: {
        type: String,
        required: [true, "Введите ссылку на страницу в instagram!"],
        default: "https://www.instagram.com/",
      },
      icon_url: {
        type: String,
        required: [true, "Загрузите иконку"],
        default: "/uploads/main/instagram-default-icn.svg",
      },
    },
  },
  phones: {
    type: [String],
    default: ["+ 90 300 - 00 - 00", "+ 90 100 - 00 - 00"],
  },
  address: multiLangString(
    "Введите адрес",
    "г. Ташкент, ул. Юнусабад, б-ц. Юнусабад",
    "6-C, Yunusabad st., Yunusabad dc., Tashkent c."
  ),
  img: {
    type: String,
    require: [true, "Загрузите картинку!"],
    default: "/uploads/contact/contact_default_img.png",
  },
});

const Contactscreen = mongoose.model("Contactscreen", ContactsscreenSchema);

module.exports = Contactscreen;
