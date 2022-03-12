const mongoose = require("mongoose");

const { multiLangString } = require("../utils/tools");

const WorksSchema = mongoose.Schema({
  year: {
    type: String,
    required: [true, "Введите год проекта!"],
    default: "2019",
  },
  img: {
    type: String,
    required: [true, "Загрузите картинку проекта!"],
    default: "/uploads/portfolio/portfolio_default_img.png",
  },
  work_title: multiLangString(
    "Введите название проекта!",
    "Tashkent City",
    "Tashkent City"
  ),
});

const PortfolioscreenSchema = mongoose.Schema({
  id: { type: Number, required: true, unique: true, select: false },
  title: multiLangString("Введите заголовок блока", "Портфолио", "Portfolio"),
  works: {
    type: [WorksSchema],
    default: [{}],
  },
});

const Portfolioscreen = mongoose.model(
  "Portfolioscreen",
  PortfolioscreenSchema
);

module.exports = Portfolioscreen;
