const mongoose = require("mongoose")

function connectToDb() {
   mongoose.connect(process.env.MONGO_URI)
   .then(()=>{
    console.log("Server is connected to DB")
   })
   .catch(err=>{
    console.log("Error while connecting to DB :",err)
    process.exit(1)  // means is not connect to db then ham server ko ban kar denge 
   })
}

module.exports = connectToDb









//only for learning 
/*
                    mongoose.connect()
                           │
                           ▼
                        Promise
                      /         \
                     /           \
                    ▼             ▼
                 .then()        await
                    │             │
                    ▼             ▼
              async ❌        async ✅
                    │             │
                    ▼             ▼
               .catch()      try / catch


REMEMBER:
.then()  → async function ki zarurat nahi
await    → async function compulsory
*/

// await method 
/* async function connectToDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB Connected");
    } catch (err) {
        console.log(err);
    }
}
 */