const mongoose = require("mongoose");

const NavigationSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    select: false,
  },
  tel_number: {
    type: String,
    required: [true, "Введите номер телефона!"],
    default: "+71 236-33-33",
  },
  address: {
    ru: {
      type: String,
      required: [true, "Введите адрес для мобильного нав. блока (ru)"],
      default: "г. Ташкент, ул.Юнусабад, б-ц. Юнусабад",
    },
    en: {
      type: String,
      required: [true, "Введите адрес для мобильного нав. блока (en)"],
      default: "Tashkent c., Yunusabad st, 6-ts Yunusabad",
    },
  },
});

const Navigation = mongoose.model("Navigation", NavigationSchema);

module.exports = Navigation;
