const express = require("express");
const asyncHandler = require("express-async-handler");

const { setTokenCookie, requireAuth, getCurrentUserId } = require("../../utils/auth");
const { User, Memory, Tag, MemoryTag } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { singlePublicFileUpload, SingleMulterUpload, singleMulterUpload} = require('../../awsS3')

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


router.get("/:id",
requireAuth,
asyncHandler(async function (req, res) {
  // Here we are going to get the user's id and find all of the memories on the memories table
  // that are attached to that user's id.
  // const currentUserId = await getCurrentUserId(req);
  const id = parseInt(req.params.id, 10)
  console.log(id)
  const memory = await Memory.findOne({
    where: {
      id: id
    },
    include: [{
      model: Tag,
      through: {attributes:[]}
    }],
  })
  // console.log(memory)
  // Send those memories to be set to the Redux store.
  // return
  return res.json(memory);
}))

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
        attributes: ['id','title', 'dateOfMemory', 'pictureUrl'],
        order:[["dateOfMemory", "desc"]],
        include: [{
          model: Tag,
          through: {attributes:[]}
        }]
      });
      // console.log(memories)
      // Send those memories to be set to the Redux store.
      // return
      return res.json(memories);
    }))



router.post(
    "/",
    singleMulterUpload('image'),
    requireAuth,
    validateMemory,
    asyncHandler(async function (req, res) {
      const {title, dateOfMemory, location, memoryRating, body, userId} = req.body;
      //Picture isn't required, so there is a conditional to deal with if it does exist, otherwise post without picture.
      if (req.file){
        const pictureUrl =  await singlePublicFileUpload(req.file);
        const memory = await Memory.create({
          title,
          dateOfMemory,
          location,
          memoryRating,
          pictureUrl,
          body,
          userId
        });
       return res.json(memory);
        
      } else {
        const memory = await Memory.create({
          title,
          dateOfMemory,
          location,
          memoryRating,
          body,
          userId
        });
        return res.json(memory);

      }

       

  
    })
  )

  router.post(
    "/edit",
    singleMulterUpload('image'),
    requireAuth,
    validateMemory,
    asyncHandler(async function (req, res) {
      const {title, dateOfMemory, location, memoryRating, body, userId, memoryId} = req.body;
      const parsedId = parseInt(memoryId, 10);

      if (req.file){
        const pictureUrl =  await singlePublicFileUpload(req.file);
        const memoryToUpdate = await Memory.findByPk(parsedId);
        await memoryToUpdate.update({
          title,
          dateOfMemory,
          location,
          memoryRating,
          pictureUrl,
          body,
          userId
        });
        res.json(memoryToUpdate);
      }

      
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

  
module.exports = router;