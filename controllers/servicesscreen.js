const Servicesscreen = require("../models/Servicesscreen");
const ErrorResponse = require("../utils/errorResponse");
const fs = require("fs/promises");
const crypto = require("crypto");

exports.servicesscreen = async (req, res, next) => {
  try {
    let servicesscreen = await Servicesscreen.findOne({ id: 777 });
    if (!servicesscreen) {
      servicesscreen = await new Servicesscreen({ id: 777 });
      await servicesscreen.save((err) => {
        if (err) {
          return next(
            new ErrorResponse("Could not create services screen assets", 500)
          );
        }
      });
    }
    res.status(200).json({ data: servicesscreen });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const files = req.files;

    const servicescreen = await Servicesscreen.findById(id);
    servicescreen.title = JSON.parse(body.title);
    servicescreen.description = JSON.parse(body.description);

    let services = JSON.parse(body.services);

    await services.map((s) => {
      let newService = s;
      if (files?.[`service_${s.id}_img`]) {
        const newImg = files?.[`service_${s.id}_img`];
        const oldImg = newService.img;

        const deleteOld = async () => {
          if (
            oldImg !==
            `/uploads/services/service_${newService.id}_default_img.png`
          ) {
            try {
              if (await ifFileExists(`${__basedir}/client/public${oldImg}`)) {
                fs.unlink(`${__basedir}/client/public${oldImg}`);
              }
            } catch (error) {
              return next(new ErrorResponse(error, 500));
            }
          }
        };

        deleteOld();

        let ext = newImg.name.split(".");
        ext = ext[ext.length - 1];
        const file_name = `${crypto.randomBytes(10).toString("hex")}-service_${
          newService.id
        }-${new Date().getTime().toString()}.${ext}`;
        newImg.mv(
          `${__basedir}/client/public/uploads/services/${file_name}`,
          (err) => {
            if (err) {
              console.error(err);
              return next(new ErrorResponse(err, 500));
            }
          }
        );
        newService.img = `/uploads/services/${file_name}`;
      }
      return newService;
    });

    servicescreen.services = services;

    if (files?.catalog) {
      const new_catalog = files.catalog;
      const old_catalog = servicescreen.catalog;
      if (old_catalog !== "/uploads/services/catalog_default.pdf") {
        try {
          if (await ifFileExists(`${__basedir}/client/public${old_catalog}`)) {
            fs.unlink(`${__basedir}/client/public${old_catalog}`);
          }
        } catch (error) {
          return next(new ErrorResponse("internal error", 500));
        }
      }
      let ext = new_catalog.name.split(".");
      ext = ext[ext.length - 1];
      const file_name = `${crypto
        .randomBytes(10)
        .toString("hex")}-catalog-${new Date().getTime().toString()}.${ext}`;
      new_catalog.mv(
        `${__basedir}/client/public/uploads/services/${file_name}`,
        (err) => {
          if (err) {
            console.error(err);
            return next(new ErrorResponse(err, 500));
          }
        }
      );
      servicescreen.catalog = `/uploads/services/${file_name}`;
    }

    if (files?.footer_right_img) {
      const new_footer_right_img = files.footer_right_img;
      const old_footer_right_img = servicescreen.footer_right_img;
      if (old_footer_right_img !== "/uploads/services/footer_default_img.png") {
        try {
          if (
            await ifFileExists(
              `${__basedir}/client/public${old_footer_right_img}`
            )
          ) {
            fs.unlink(`${__basedir}/client/public${old_footer_right_img}`);
          }
        } catch (error) {
          return next(new ErrorResponse("internal error", 500));
        }
      }
      let ext = new_footer_right_img.name.split(".");
      ext = ext[ext.length - 1];
      const file_name = `${crypto
        .randomBytes(10)
        .toString("hex")}-footer_right_img-${new Date()
        .getTime()
        .toString()}.${ext}`;
      new_footer_right_img.mv(
        `${__basedir}/client/public/uploads/services/${file_name}`,
        (err) => {
          if (err) {
            console.error(err);
            return next(new ErrorResponse(err, 500));
          }
        }
      );
      servicescreen.footer_right_img = `/uploads/services/${file_name}`;
    }

    await servicescreen.save((err) => {
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
