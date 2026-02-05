require('dotenv').config();
let app =require("./src/app.js");

const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`Server start on port ${PORT}`);
});