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
            id: memoryId
          },
          attributes: ['id','title', 'dateOfMemory'],
        })
        // console.log(memory)
        memories.push(memory)
        // console.log('here are the memories inside the loop', memories)
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





router.post(
    "/",
    requireAuth,
    asyncHandler(async function (req, res) {
      const tagName = req.body.tag
      const {memoryId, userId} = req.body
      // const memory = await Memory.findByPk(memoryId)
      
      // Check if the tag currently exists; no need for duplicates.
      const existingTag = await Tag.findOne({
        where: {tagName: tagName}
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
      await res.json('Success')
    })
  )
module.exports = router;





module.exports = router;