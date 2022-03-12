const mongoose = require("mongoose");

const { multiLangString } = require("../utils/tools");

const ServicesscreenSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: multiLangString("Введите заголовок блока", "Услуги", "Services"),
  description: multiLangString(
    "Введите описание блока",
    `За последние 5 лет ассортимент, производимой нами продукции, многократно увеличился. Мы рады предложить Вам более 70 видов брусчатки и тротуарной плитки. А цветовая гамма поразит Ваше воображение.`,
    `For the last 5 years the variety of products we manufacture has raised multiple times. We are glad to offer you more than 70 sorts of paving stone and slabs. And the color spectrum amazes your imagination.`
  ),
  services: {
    type: [],
    default: [
      {
        id: 1,
        text: {
          ru: "Вибролитьевая и вибропрессованная продукция",
          en: "Vibrocast and vibropressed products",
        },
        img: "/uploads/services/service_1_default_img.png",
      },
      {
        id: 2,
        text: {
          ru: "Железобетонных изделия",
          en: "Reinforced concrete products",
        },
        img: "/uploads/services/service_2_default_img.png",
      },
      {
        id: 3,
        text: {
          ru: "Готовый бетон всех марок от М 100 до М 400",
          en: "Ready concrete all brands from M 100 to M 400",
        },
        img: "/uploads/services/service_3_default_img.png",
      },
    ],
  },
  catalog: {
    type: String,
    required: [true, "Загрузите каталог!"],
    default: "/uploads/services/catalog_default.pdf",
  },
  footer_right_img: {
    type: String,
    required: [true, "Загрузите картинку!"],
    default: "/uploads/services/footer_default_img.png",
  },
});

const Servicesscreen = mongoose.model("Servicesscreen", ServicesscreenSchema);

module.exports = Servicesscreen;
