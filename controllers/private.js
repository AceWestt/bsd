const ErrorResponse = require("../utils/errorResponse");

exports.getPrivateData = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: "You got access to the private data in this route",
    username: req.user.username,
  });
};

exports.uploadfile = (req, res, next) => {
  if (!req.files) {
    return next(new ErrorResponse("No files receiced", 400));
  }

  const file = req.files.file;
  file.mv(`${__basedir}/client/public/uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(err, 500));
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
};
