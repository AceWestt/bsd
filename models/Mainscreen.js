const mongoose = require("mongoose");

const MainscreenSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    select: false,
  },
  title_top: {
    ru: {
      type: String,
      required: [true, "Введите вверхний заголовок (ru)!"],
      default: "15 лет",
    },
    en: {
      type: String,
      required: [true, "Введите вверхний заголовок (en)!"],
      default: "15 years",
    },
  },
  title_bottom: {
    ru: {
      type: String,
      required: [true, "Введите нижний заголовок! (ru)"],
      default: "на рынке Узбекистана",
    },
    en: {
      type: String,
      required: [true, "Введите нижний заголовок! (en)"],
      default: "in Uzbekistan market",
    },
  },
  subtitle: {
    ru: {
      type: String,
      required: [true, "Введите подзаголовок! (ru)"],
      default: "Производитель железо-бетонных изделий",
    },
    en: {
      type: String,
      required: [true, "Введите подзаголовок! (en)"],
      default: "Reinforced concrete product manufacturer",
    },
  },
  morebtn_text: {
    ru: {
      type: String,
      required: [true, "Введите текст на кнопке <<подробнее>>! (ru)"],
      default: "Подробнее",
    },
    en: {
      type: String,
      required: [true, "Введите текст на кнопке <<подробнее>>! (en)"],
      default: "More",
    },
  },
  social_links: {
    label: {
      ru: {
        type: String,
        required: [true, "Введите текст блока соц.сетей! (ru)"],
        default: "Мы в социалных сетях:",
      },
      en: {
        type: String,
        required: [true, "Введите текст блока соц.сетей! (en)"],
        default: "We in social networks:",
      },
    },
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
});

const Mainscreen = mongoose.model("Mainscreen", MainscreenSchema);

module.exports = Mainscreen;
