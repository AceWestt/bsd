const Aboutscreen = require("../models/Aboutscreen");
const ErrorResponse = require("../utils/errorResponse");
const fs = require("fs/promises");
const crypto = require("crypto");

exports.aboutscreen = async (req, res, next) => {
  try {
    let aboutscreen = await Aboutscreen.findOne({ id: 777 });
    if (!aboutscreen) {
      aboutscreen = await new Aboutscreen({ id: 777 });
      await aboutscreen.save((err) => {
        if (err) {
          return next(
            new ErrorResponse("Could not create about screen assets", 500)
          );
        }
      });
    }
    res.status(200).json({ data: aboutscreen });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const files = req.files;

    const aboutscreen = await Aboutscreen.findById(id);
    aboutscreen.screen_title = JSON.parse(body.screen_title);
    aboutscreen.slogan.title = JSON.parse(body.slogan_title);
    aboutscreen.slogan.text = JSON.parse(body.slogan_text);
    aboutscreen.person.name = JSON.parse(body.person_name);
    aboutscreen.person.job_title = JSON.parse(body.person_title);

    if (files?.person_img) {
      const new_img = files.person_img;
      const old_img = aboutscreen.person.img;
      if (old_img !== "/uploads/about/manager_default_img.png") {
        try {
          if (await ifFileExists(`${__basedir}/client/public${old_img}`)) {
            fs.unlink(`${__basedir}/client/public${old_img}`);
          }
        } catch (error) {
          return next(new ErrorResponse("internal error", 500));
        }
      }
      let ext = new_img.name.split(".");
      ext = ext[ext.length - 1];
      const file_name = `${crypto
        .randomBytes(10)
        .toString("hex")}-person_img-${new Date().getTime().toString()}.${ext}`;
      new_img.mv(
        `${__basedir}/client/public/uploads/about/${file_name}`,
        (err) => {
          if (err) {
            console.error(err);
            return next(new ErrorResponse(err, 500));
          }
        }
      );
      aboutscreen.person.img = `/uploads/about/${file_name}`;
    }

    let points = JSON.parse(body.points);

    await points.map((p) => {
      let newPoint = p;

      if (files?.[`point_${newPoint.id}_icn`]) {
        const new_icn = files?.[`point_${newPoint.id}_icn`];
        const old_icn = newPoint.icon;

        const deleteOld = async () => {
          if (
            old_icn !== `/uploads/about/point_${newPoint.id}_default_icn.svg`
          ) {
            try {
              if (await ifFileExists(`${__basedir}/client/public${old_icn}`)) {
                fs.unlink(`${__basedir}/client/public${old_icn}`);
              }
            } catch (error) {
              return next(new ErrorResponse(error, 500));
            }
          }
        };

        deleteOld();

        let ext = new_icn.name.split(".");
        ext = ext[ext.length - 1];
        const file_name = `${crypto.randomBytes(10).toString("hex")}-point_${
          newPoint.id
        }-${new Date().getTime().toString()}.${ext}`;
        new_icn.mv(
          `${__basedir}/client/public/uploads/about/${file_name}`,
          (err) => {
            if (err) {
              console.error(err);
              return next(new ErrorResponse(err, 500));
            }
          }
        );
        newPoint.icon = `/uploads/about/${file_name}`;
      }
      return newPoint;
    });

    aboutscreen.points = points;

    await aboutscreen.save((err) => {
      if (err) {
        return next(new ErrorResponse("something went wrong on save"));
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
