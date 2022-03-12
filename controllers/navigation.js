const Navigation = require("../models/Navigation");
const ErrorResponse = require("../utils/errorResponse");

exports.navigation = async (req, res, next) => {
  try {
    let navigation = await Navigation.findOne({ id: 777 });
    if (!navigation) {
      navigation = await new Navigation({ id: 777 });
      await navigation.save((err) => {
        if (err)
          return next(
            new ErrorResponse("Could not create navigation assets", 500)
          );
      });
    }
    res.status(200).json({ data: navigation });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const nav_id = req.params.id;
    const body = req.body;
    const nav = await Navigation.findById(nav_id);
    nav.tel_number = body.tel;
    nav.address = body.address;
    await nav.save((err) => {
      if (err) {
        return next(new ErrorResponse("Could not save changes", 500));
      }
    });
    res.status(200).json({ status: "success" });
  } catch (error) {
    next(error);
  }
};
