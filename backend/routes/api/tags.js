const express = require("express");
const asyncHandler = require("express-async-handler");

const { setTokenCookie, requireAuth, getCurrentUserId } = require("../../utils/auth");
const { User, Memory, Tag, MemoryTag } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

router.get(
  "/:tagId",
  requireAuth,
  asyncHandler(async function (req, res) {
    const {tagId} =  req.params;
    const currentUserId = await getCurrentUserId(req);
    const memoryTags = await MemoryTag.findAll({
      where: {
        tagId
      }
    })
    
    let memories = []
    
    let memoryFinder = async () => {
      for (let i = 0; i < memoryTags.length; i++){
        let memoryId = memoryTags[i].dataValues.memoryId;
        let memory = await Memory.findOne({
          where: {
            id: memoryId,
            userId: currentUserId
          },
          attributes: ['id','title', 'dateOfMemory', 'pictureUrl'],
        })
        if (memory){
          memories.push(memory)
        }
      }
    }
    await memoryFinder()
    
    return res.json(memories)

  })
)


router.get(
  "/user/:userId",
  requireAuth,
  asyncHandler(async function (req, res) {
    const {userId} = req.params;
    
    const tags = await Tag.findAll({
      where: {
        userId
      }
    })
    return res.json(tags)
  })
)

// Needed to refactor this route to allow for duplicate tags across users but no duplicates
// for the same user. This was because of how I load up the tags on my get route.
router.post(
    "/",
    requireAuth,
    asyncHandler(async function (req, res) {
      const tagName = req.body.tag
      const {memoryId, userId} = req.body 
      
      // Check if the tag currently exists; no need for duplicates by the same user
      const existingTag = await Tag.findOne({
        where: {
          tagName,
          userId
        },
      })
      // If it doesn't exist, let's add an entry to the tags table 
      if (!existingTag){
        const tag = await Tag.create({
          tagName,
          userId
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
    "/delete",
    requireAuth,
    asyncHandler(async function (req, res) {
      let {tagId, memoryId} = req.body;
      memoryId = parseInt(memoryId, 10)
      
      const memoryTag = await MemoryTag.findOne({
        where: {
          memoryId,
          tagId
        }
      })
      await memoryTag.destroy()
      
      const tagCheck = await MemoryTag.findOne({
        where: {
          tagId
        }
      })
      
      if (!tagCheck){
        tag = await Tag.findByPk(tagId);
        await tag.destroy();
      }
      return res.json('Success')
    })
  )
module.exports = router;
