const router = require("express").Router();
const userMiddleware = require("../middleware/userMiddleware");

const AuthController = require("../controllers/AuthController");
const CalendarController = require("../controllers/CalendarController");
const DayController = require("../controllers/DayController");
const UserController = require("../controllers/UserController");

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
 * @api {post} /days/days Create new day
 * @api {get} /days/:id Get day by id
 * @api {update} /days/:id Update day
 */
router.post("/days", userMiddleware, DayController.create);
router.get("/days/:id", userMiddleware, DayController.get);
router.put("/days/:id", userMiddleware, DayController.update);

/**
 * @api {getAll} /users Get all users
 * @api {get} /users/:id Get user by id
 */
router.get("/users", userMiddleware, UserController.getAll);
router.get("/users/:id", userMiddleware, UserController.get);

module.exports = router;
