const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const memoriesRouter = require("./memories")

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use("/memories", memoriesRouter);




module.exports = router;