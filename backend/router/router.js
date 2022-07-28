const router = require("express").Router();
const userMiddleware = require("../middleware/userMiddleware");
const superAdminMiddleware = require("../middleware/userMiddleware");

const AuthController = require("../controllers/AuthController");
const CalendarController = require("../controllers/CalendarController");
const DayController = require("../controllers/DayController");
const UserController = require("../controllers/UserController");
const MessageController = require("../controllers/MessageController");

/**
 * @api {post} /auth/login Login user
 * @api {post} /auth/register Register new user
 * @api {delete} /auth/logout Logout current user
 */
router.post("/auth/login", AuthController.login);
router.post("/auth/register", AuthController.register);
router.delete("/auth/logout", AuthController.logout);

/**
 * @api {post} /calendars Create new calendar
 * @api {get} /calendars Get calendar by id
 * @api {update} /calendars/:id Update calendar
 * @api {delete} /calendars/:id Create new calendar
 */
router.post("/calendars", userMiddleware, CalendarController.create);
router.get("/calendars/:id", userMiddleware, CalendarController.get);
router.get("/calendars", userMiddleware, CalendarController.getAll);
router.put("/calendars/:id", userMiddleware, CalendarController.update);
router.delete("/calendars/:id", userMiddleware, CalendarController.delete);

/**
 * @api {get} /days Get all days
 * @api {post} /days Create new day ONLY FOR SUPER ADMIN
 * @api {update} /days/:id Update day ONLY FOR SUPER ADMIN
 */
router.get("/days", userMiddleware, DayController.getAll);
router.post(
  "/days",
  userMiddleware,
  superAdminMiddleware,
  DayController.create
);
router.put(
  "/days/:id",
  userMiddleware,
  superAdminMiddleware,
  DayController.update
);

/**
 * @api {getAll} /users Get all users
 * @api {put} /users Update Password user
 * @api {get} /users/:id Get user by id
 * @api {put} /users/:id Update user by id
 * @api {delete} /users/:id Delete user by id
 */
router.get("/users", userMiddleware, UserController.getAll);
router.put("/users", userMiddleware, UserController.changePassword);
router.get("/users/:id", userMiddleware, UserController.get);
router.put("/users/:id", userMiddleware, UserController.update);
router.delete("/users/:id", userMiddleware, UserController.delete);

/**
 * @api {get} /messages Get all messages of all user
 * @api {post} /messages Create new message
 * @api {get} /messages/:id Get message by id
 * @api {update} /messages/:id Update message
 * @api {delete} /messages/:id Delete message
 */
router.get("/messages", userMiddleware, MessageController.getAll);
router.post("/messages", userMiddleware, MessageController.create);
router.get("/messages/:id", userMiddleware, MessageController.get);
router.put("/messages/:id", userMiddleware, MessageController.update);
router.delete("/messages/:id", userMiddleware, MessageController.delete);

module.exports = router;
