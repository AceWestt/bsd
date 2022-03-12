const Mainscreen = require("../models/Mainscreen");
const ErrorResponse = require("../utils/errorResponse");
const fs = require("fs/promises");
const crypto = require("crypto");

exports.mainscreen = async (req, res, next) => {
  try {
    let mainscreen = await Mainscreen.findOne({ id: 777 });
    if (!mainscreen) {
      mainscreen = await new Mainscreen({ id: 777 });
      await mainscreen.save((err) => {
        if (err)
          return next(
            new ErrorResponse("Could not create mainscreen assets", 500)
          );
      });
    }
    res.status(200).json({ data: mainscreen });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const files = req.files;
    const mainscreen = await Mainscreen.findById(id);
    mainscreen.title_top = JSON.parse(body.title_top);
    mainscreen.title_bottom = JSON.parse(body.title_bottom);
    mainscreen.subtitle = JSON.parse(body.subtitle);
    mainscreen.morebtn_text = JSON.parse(body.morebtn_text);
    mainscreen.social_links.label = JSON.parse(body.social_links_label);
    mainscreen.social_links.facebook.link = body.facebook_link;
    mainscreen.social_links.instagram.link = body.instagram_link;

    if (files) {
      const facebook_icon = files.facebook_icon;
      const instagram_icon = files.instagram_icon;
      if (facebook_icon) {
        const old_facebook_icon = mainscreen.social_links.facebook.icon_url;
        if (old_facebook_icon !== "/uploads/main/facebook-default-icn.svg") {
          try {
            if (
              await ifFileExists(
                `${__basedir}/client/public/${old_facebook_icon}`
              )
            ) {
              fs.unlink(`${__basedir}/client/public/${old_facebook_icon}`);
            }
          } catch (error) {
            return next(new ErrorResponse(error, 500));
          }
        }
        let ext = facebook_icon.name.split(".");
        ext = ext[ext.length - 1];
        const file_name = `${crypto
          .randomBytes(10)
          .toString("hex")}-facebook_icn-${new Date()
          .getTime()
          .toString()}.${ext}`;
        facebook_icon.mv(
          `${__basedir}/client/public/uploads/main/${file_name}`,
          (err) => {
            if (err) {
              console.error(err);
              return next(new ErrorResponse(err, 500));
            }
          }
        );
        mainscreen.social_links.facebook.icon_url = `/uploads/main/${file_name}`;
      }
      if (instagram_icon) {
        const old_instagram_icon = mainscreen.social_links.instagram.icon_url;
        if (old_instagram_icon !== "/uploads/main/instagram-default-icn.svg") {
          try {
            if (
              await ifFileExists(
                `${__basedir}/client/public/${old_instagram_icon}`
              )
            ) {
              fs.unlink(`${__basedir}/client/public/${old_instagram_icon}`);
            }
          } catch (error) {
            return next(new ErrorResponse(error, 500));
          }
        }
        let ext = instagram_icon.name.split(".");
        ext = ext[ext.length - 1];
        const file_name = `${crypto
          .randomBytes(10)
          .toString("hex")}-instagram_icn-${new Date()
          .getTime()
          .toString()}.${ext}`;
        instagram_icon.mv(
          `${__basedir}/client/public/uploads/main/${file_name}`,
          (err) => {
            if (err) {
              console.error(err);
              return next(new ErrorResponse(err, 500));
            }
          }
        );
        mainscreen.social_links.instagram.icon_url = `/uploads/main/${file_name}`;
      }
    }

    await mainscreen.save((err) => {
      if (err) {
        return next(new ErrorResponse("something went wrong on save"));
      }
    });

    res.status(200).json({
      status: "success",
    });
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
