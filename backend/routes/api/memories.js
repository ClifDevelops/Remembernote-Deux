const express = require("express");
const asyncHandler = require("express-async-handler");

const { setTokenCookie, requireAuth, getCurrentUserId } = require("../../utils/auth");
const { User, Memory, Tag, MemoryTag } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateMemory = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a title for your memory.")
    .isLength({ min: 1, max: 100 })
    .withMessage("Please provide a valid email or username."),
  check("dateOfMemory")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid date in the format YYYY-MM-DD")
    .isLength({ min: 10, max: 10 })
    .withMessage("Please provide a valid date in the format YYYY-MM-DD"),
  check("location")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a location.")
    .isLength({ min: 1, max: 100 }),
  check("memoryRating")
    .exists({ checkFalsy: true })
    .withMessage("Please select a memory rating."),
  check("body")
    .exists({ checkFalsy: true })
    .withMessage("Please record even a snippet of a memory.")
    .isLength({ min: 1 })
    .withMessage("Please record even a snippet of a memory."),
  handleValidationErrors,
];


router.get("/",
    requireAuth,
    asyncHandler(async function (req, res) {
      const currentUserId = await getCurrentUserId(req);
      console.log(currentUserId)
      const memories = await Memory.findAll({
        where: {
          userId: currentUserId,
        },
        order:[["dateOfMemory", "desc"]]
      });
      return res.json(memories);
    }))



router.post(
    "/",
    requireAuth,
    validateMemory,
    asyncHandler(async function (req, res) {
      // console.log(req.cookies.user);
      // const userId = parseInt(req.cookies.user, 10);
      const {title, dateOfMemory, location, memoryRating, body, userId} = req.body;
      const memory = await Memory.create({
        title,
        dateOfMemory,
        location,
        memoryRating,
        body,
        userId
      });
      res.json(memory);
  
    })
  )


module.exports = router;