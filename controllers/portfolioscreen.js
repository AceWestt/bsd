const PortfolioScreen = require("../models/Portfolioscreen");
const ErrorResponse = require("../utils/errorResponse");
const fs = require("fs/promises");
const crypto = require("crypto");

exports.portfolioscreen = async (req, res, next) => {
  try {
    let portfolioscreen = await PortfolioScreen.findOne({ id: 777 });
    if (!portfolioscreen) {
      portfolioscreen = await new PortfolioScreen({ id: 777 });
      await portfolioscreen.save((err) => {
        if (err) {
          return next(
            new ErrorResponse(
              "could not create assets for portfolio screen",
              500
            )
          );
        }
      });
    }
    res.status(200).json({ data: portfolioscreen });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const title = req.body.title;

    const portfolioscreen = await PortfolioScreen.findById(id);
    portfolioscreen.title = title;
    await portfolioscreen.save((err) => {
      if (err) {
        return next(new ErrorResponse("save error"));
      }
    });
    res.status(200).json({ status: "success" });
  } catch (error) {
    next(error);
  }
};

exports.addwork = async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const editing_work_id = req.params.workid;
    const files = req.files;

    const oldImg = req.body.oldImg;

    let workImg = null;

    if (files && files.img) {
      if (oldImg && oldImg !== "/uploads/portfolio/portfolio_default_img.png") {
        try {
          if (await ifFileExists(`${__basedir}/client/public${oldImg}`)) {
            fs.unlink(`${__basedir}/client/public${oldImg}`);
          }
        } catch (error) {
          return next(new ErrorResponse("internal error", 500));
        }
      }

      const img = files.img;
      let ext = img.name.split(".");
      ext = ext[ext.length - 1];
      const file_name = `${crypto
        .randomBytes(10)
        .toString("hex")}-work-img-${new Date().getTime().toString()}.${ext}`;
      img.mv(
        `${__basedir}/client/public/uploads/portfolio/${file_name}`,
        (err) => {
          if (err) {
            console.error(err);
            return next(new ErrorResponse(err, 500));
          }
        }
      );
      workImg = `/uploads/portfolio/${file_name}`;
    }

    if (editing_work_id && editing_work_id !== "null") {
      if (!workImg) {
        workImg = oldImg;
      }
      await PortfolioScreen.findOneAndUpdate(
        { _id: id, works: { $elemMatch: { _id: editing_work_id } } },
        {
          $set: {
            "works.$.work_title": JSON.parse(body.work_title),
            "works.$.year": body.year,
            "works.$.img": workImg,
          },
        },
        { new: true, safe: true, upsert: true }
      );
    } else {
      const portfolioscreen = await PortfolioScreen.findById(id);

      let newWork = {};
      newWork.work_title = JSON.parse(body.work_title);
      newWork.year = body.year;
      if (workImg) {
        newWork.img = workImg;
      }
      await portfolioscreen.works.push(newWork);
      await portfolioscreen.save((err) => {
        if (err) {
          return next(new ErrorResponse("Something went wrong!"));
        }
      });
    }

    res.status(200).json({ status: "success" });
  } catch (error) {
    next(error);
  }
};

exports.deletework = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletingworkId = req.params.workid;
    const portfolioscreen = await PortfolioScreen.findById(id);
    const work = portfolioscreen.works.id(deletingworkId);
    if (
      work.img &&
      work.img !== "/uploads/portfolio/portfolio_default_img.png"
    ) {
      try {
        if (await ifFileExists(`${__basedir}/client/public${work.img}`)) {
          fs.unlink(`${__basedir}/client/public${work.img}`);
        }
      } catch (error) {
        return next(new ErrorResponse("internal error", 500));
      }
    }
    portfolioscreen.works.pull(deletingworkId);
    await portfolioscreen.save();
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
