export const validateIcons = (file) => {
  if (!file) {
    return { valid: false };
  }
  const { name, size } = file;

  let ext = name.split(".");
  ext = ext[ext.length - 1];
  if (ext !== "svg" && ext !== "png") {
    return {
      valid: false,
      msg: 'Неверный формат! Используйте только "png" или "svg"!',
    };
  }

  if (size > 1048576) {
    return { valid: false, msg: "Размер не должен превышать 1мб!" };
  }
  return { valid: true };
};

export const validateImgs = (file) => {
  if (!file) {
    return { valid: false };
  }
  const { name, size } = file;

  let ext = name.split(".");
  ext = ext[ext.length - 1];
  if (ext !== "jpeg" && ext !== "jpg" && ext !== "png") {
    return {
      valid: false,
      msg: 'Неверный формат! Используйте только "jpg", "jpeg" или "png"!',
    };
  }

  if (size > 2097152) {
    return { valid: false, msg: "Размер не должен превышать 2мб!" };
  }
  return { valid: true };
};

export const validatePdf = (file) => {
  if (!file) {
    return { valid: false };
  }
  const { name } = file;

  let ext = name.split(".");
  ext = ext[ext.length - 1];
  if (ext !== "pdf") {
    return {
      valid: false,
      msg: 'Неверный формат! Используйте только "pdf"!',
    };
  }
  return { valid: true };
};
