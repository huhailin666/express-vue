var Sequelize = require('sequelize')
var path = require('path')
var sequelize = new Sequelize(undefined,undefined,undefined,{
    host: 'localhost',
    dialect: 'sqlite',
    storage: path.join(__dirname,'../database/database.sqlite')
});

var Note=sequelize.define('note',{
  text: {
    type: Sequelize.STRING,
  },
  username: {
    type: Sequelize.STRING
  },
  level:{
    type: Sequelize.NUMBER
  },
  isFinish:{
    type: Sequelize.BOOLEAN
  } 
})
Note.sync().then(()=>{
  Note.create({ text: "上", username: "天" ,level:3,isFinish:false}).then(jane => {
    console.log("Jane's auto-generated ID:", jane.id);
  });
}).then(()=>{
  Note.findAll({raw:true}).then(users => {
    console.log("All users:", JSON.stringify(users, null, 4));
  });
})

// module.exports.Note=Note;