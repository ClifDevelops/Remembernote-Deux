const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');
const memoriesRouter = require('./memories')
const tagsRouter = require('./tags')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use("/memories", memoriesRouter);
router.use('/tags', tagsRouter)




module.exports = router;