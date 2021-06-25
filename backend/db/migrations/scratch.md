npx sequelize model:generate --name Memory --attributes title:string,dateOfMemory:dateonly,location:string,memoryRating:integer,pictureUrl:string,body:text,userId:integer

npx sequelize model:generate --name Tag --attributes tagName:string

npx sequelize model:generate --name MemoryTag --attributes memoryId:integer,tagId:integer

npx sequelize model:generate --name UserTag --attributes userId:integer,tagId:integer