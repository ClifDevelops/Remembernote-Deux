# July
### Memory/Tags Many-to-many association and corresponding Sequelize troubles
* Yesterday I was working on getting the tags to associate with memories. It's probably more proper to say I've struggled with this longer than I'm proud of, but I ended up figuring it out with these two associations that I figured out from the a/A video on Sequelize (very sad to say that both the Sequelize docs and Google searches turned up almost nothing...): 
```bash
 Memory.associate = function(models) {
    Memory.belongsTo(models.User, { foreignKey: "userId" });

    const columnMapping = {
      through:{
        model: 'MemoryTag',
        unique: false
      },  //Join table
      otherKey: 'tagId',     //Key that points to the other entity, Tag
      foreignKey: 'memoryId' // Key that points to this entity, Memory
    }
    Memory.belongsToMany(models.Tag, columnMapping)
    
  };
```
```bash
Tag.associate = function(models) {
    
    const columnMapping = {
      through:{
        model: 'MemoryTag',
        unique: false
      },  //Join table
      otherKey: 'memoryId',  //Key that points to the other entity, Memory
      foreignKey: 'tagId'    // Key that points to this entity, Tag
    }
    Tag.belongsToMany(models.Memory, columnMapping)
  };
```

* This association works as long as I created the MemoryTag table (joins table), which points to the primary keys of each of the corresponding tables. Now when I query for all of the memories I want, I can include tags and exclude the MemoryTag model info like this:
```bash
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
```

* So adding a memory and adding a tag to the database isn't an issue, and when I query for the memories it is easy to attach an array of associated tags, but where I ran into an issue yesterday was trying to use a built-in Sequelize hook:
 ```bash 
 memoryInstance.setTags(tagInstance)
 ```