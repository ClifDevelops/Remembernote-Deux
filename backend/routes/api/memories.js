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
      // Here we are going to get the user's id and find all of the memories on the memories table
      // that are attached to that user's id.
      const currentUserId = await getCurrentUserId(req);
      const memories = await Memory.findAll({
        where: {
          userId: currentUserId,
        },
        order:[["dateOfMemory", "desc"]],
        include: [{
          model: Tag,
          through: {attributes:[]}
        }]
      });
      
      // Send those memories to be set to the Redux store.
      return res.json(memories);
    }))



router.post(
    "/",
    requireAuth,
    validateMemory,
    asyncHandler(async function (req, res) {
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

  router.post(
    "/edit",
    requireAuth,
    validateMemory,
    asyncHandler(async function (req, res) {
      const {title, dateOfMemory, location, memoryRating, body, userId, memoryId} = req.body;
      const parsedId = parseInt(memoryId, 10);
      const memoryToUpdate = await Memory.findByPk(parsedId);
      await memoryToUpdate.update({
        title,
        dateOfMemory,
        location,
        memoryRating,
        body,
        userId
      });
      res.json(memoryToUpdate);
  
    })
  )

  router.post(
    "/tag",
    requireAuth,
    asyncHandler(async function (req, res) {
      const tagName = req.body.tag
      const {memoryId} = req.body
      const memory = await Memory.findByPk(memoryId)
      
      // Check if the tag currently exists; no need for duplicates.
      const existingTag = await Tag.findOne({
        where: {tagName: tagName}
      })
      // If it doesn't exist, let's add an entry to the tags table 
      if (!existingTag){
        const tag = await Tag.create({
          tagName
        })
        const tagId = tag.dataValues.id
        // On the next line we use a sequelize shortcut to attach the tag to the memory.
        await MemoryTag.create({
          memoryId,
          tagId
        })
        // Send back the new tag to be added to the Redux store.
        res.json(tag)
      } else {
        // If we did find that the tag already existed, attach it to the memory
        // and send the tag back to the Redux store
        const tagId = existingTag.dataValues.id
        await MemoryTag.create({
          memoryId,
          tagId
        })
        res.json(existingTag)
        }
    })
  )

router.post(
    "/tag/delete",
    requireAuth,
    asyncHandler(async function (req, res) {
      let {tagId, memoryId} = req.body;
      memoryId = parseInt(memoryId, 10)
      console.log(tagId, memoryId)
      const memoryTag = await MemoryTag.findOne({
        where: {
          memoryId,
          tagId
        }
      })
      await memoryTag.destroy()
      await res.json('Success')
    })
  )
module.exports = router;