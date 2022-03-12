const mongoose = require("mongoose");

const AboutscreenSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    select: false,
  },
  screen_title: {
    ru: {
      type: String,
      required: [true, "Введите заголовок блока (ru)!"],
      default: "О нас",
    },
    en: {
      type: String,
      required: [true, "Введите заголовок блока (en)!"],
      default: "About",
    },
  },
  points: {
    type: [],
    default: [
      {
        id: 1,
        icon: "/uploads/about/point_1_default_icn.svg",
        title: {
          ru: "15 лет опыта в производстве железо-бетонных изделий",
          en: "15 years of experience in reinforced concret products manufacture",
        },
        text: {
          ru: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
      },
      {
        id: 2,
        icon: "/uploads/about/point_2_default_icn.svg",
        title: {
          ru: "Команда профессионалов",
          en: "A team of proffessionals",
        },
        text: {
          ru: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
      },
      {
        id: 3,
        icon: "/uploads/about/point_3_default_icn.svg",
        title: {
          ru: "Широкий ассортимен",
          en: "A wide variety",
        },
        text: {
          ru: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
      },
      {
        id: 4,
        icon: "/uploads/about/point_4_default_icn.svg",
        title: {
          ru: "Высокое качество",
          en: "High quality",
        },
        text: {
          ru: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
      },
    ],
  },
  slogan: {
    title: {
      ru: {
        type: String,
        required: [true, "Введите заголовок слогана (ru)!"],
        default: "Beton Stroy Detal",
      },
      en: {
        type: String,
        required: [true, "Введите заголовок слогана (en)!"],
        default: "Beton Stroy Detal",
      },
    },
    text: {
      ru: {
        type: String,
        required: [true, "Введите текст слогана (ru)!"],
        default:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua RURURURU.",
      },
      en: {
        type: String,
        required: [true, "Введите текст слогана (en)!"],
        default:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
    },
  },
  person: {
    img: {
      type: String,
      required: [true, "Загрузите фото руководителя!"],
      default: "/uploads/about/manager_default_img.png",
    },
    name: {
      ru: {
        type: String,
        required: [true, "Введите имя рудководителя (ru)!"],
        default: "Имя Фамилия",
      },
      en: {
        type: String,
        required: [true, "Введите имя рудководителя (en)!"],
        default: "Name Surname",
      },
    },
    job_title: {
      ru: {
        type: String,
        required: [true, "Введите должность рудководителя (ru)!"],
        default: "Руководитель Beton Stroy Detal",
      },
      en: {
        type: String,
        required: [true, "Введите должность рудководителя (en)!"],
        default: "Head of Beton Stroy Detal",
      },
    },
  },
});

const Aboutscreen = mongoose.model("Aboutscreen", AboutscreenSchema);

module.exports = Aboutscreen;
