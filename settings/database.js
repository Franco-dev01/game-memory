const mongoose = require('mongoose');

const connection = async () =>{
    try{
        await mongoose.connect('mongodb://51.77.197.177:27017/memory',{
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
           
        });
        console.log('connected to mongodb');
    }catch(e){
        console.log("err"+e);
    }
};

module.exports = connection;