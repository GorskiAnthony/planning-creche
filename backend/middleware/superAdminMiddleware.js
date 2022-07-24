const superAdminMiddleware = (req, res, next) => {
  if (req.user.role === "SUPER_ADMIN") {
    next();
  } else {
    res.status(401).json({ validationErrors: [{ message: "Unauthorized" }] });
  }
};

module.exports = superAdminMiddleware;
