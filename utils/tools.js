exports.multiLangString = (reqText, ruDefaultText, enDefaultText) => {
  return {
    ru: {
      type: String,
      requried: [true, `${reqText}! (ru)`],
      default: ruDefaultText,
    },
    en: {
      type: String,
      requried: [true, `${reqText}! (en)`],
      default: enDefaultText,
    },
  };
};
