const Contactscreen = require("../models/Contactscreen");
const ErrorResponse = require("../utils/errorResponse");
const fs = require("fs/promises");
const crypto = require("crypto");

exports.contactscreen = async (req, res, next) => {
  try {
    let = contactscreen = await Contactscreen.findOne({ id: 777 });
    if (!contactscreen) {
      contactscreen = await new Contactscreen({ id: 777 });
      await contactscreen.save((err) => {
        if (err) {
          return next(
            new ErrorResponse("Could not create contact screen assets", 500)
          );
        }
      });
    }

    res.status(200).json({ data: contactscreen });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const files = req.files;

    const contactscreen = await Contactscreen.findById(id);

    contactscreen.screen_title = JSON.parse(body.screen_title);

    if (files?.img) {
      const newImg = files.img;
      const oldImg = contactscreen.img;
      if (oldImg !== "/uploads/contact/contact_default_img.png") {
        try {
          if (await ifFileExists(`${__basedir}/client/public${oldImg}`)) {
            fs.unlink(`${__basedir}/client/public${oldImg}`);
          }
        } catch (error) {
          return next(new ErrorResponse("internal error", 500));
        }
      }
      let ext = newImg.name.split(".");
      ext = ext[ext.length - 1];
      const file_name = `${crypto
        .randomBytes(10)
        .toString("hex")}-contactscreen-img-${new Date()
        .getTime()
        .toString()}.${ext}`;
      newImg.mv(
        `${__basedir}/client/public/uploads/contact/${file_name}`,
        (err) => {
          if (err) {
            console.error(err);
            return next(new ErrorResponse(err, 500));
          }
        }
      );
      contactscreen.img = `/uploads/contact/${file_name}`;
    }

    await contactscreen.save((err) => {
      if (err) {
        return next(new ErrorResponse("smthg went wrong"));
      }
    });

    res.status(200).json({ status: "success" });
  } catch (error) {
    next(error);
  }
};

const ifFileExists = async (path) => {
  try {
    await fs.access(path);
    return true;
  } catch (error) {
    return false;
  }
};
