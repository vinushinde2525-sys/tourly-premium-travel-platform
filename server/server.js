// Tourly Express API Server


process.on("uncaughtException", (err)=>{
    console.error(
        "CRASH uncaughtException:",
        err.stack
    );
});


process.on("unhandledRejection",(err)=>{
    console.error(
        "CRASH unhandledRejection:",
        err
    );
});



const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const fs = require("fs");



const app = express();


// Railway / Render gives PORT automatically
const PORT = process.env.PORT || 8000;





// ============================
// Middleware
// ============================


app.use(
    helmet()
);



app.use(
    cors({

        origin:[

            "http://localhost:5173",

            // replace after Netlify deployment
            "https://your-netlify-url.netlify.app"

        ],

        credentials:true

    })
);



app.use(
    express.json()
);



app.use(
    express.urlencoded({
        extended:true
    })
);





// ============================
// Load JSON Data
// ============================


const DATA_PATH = path.join(
    __dirname,
    "data"
);



const loadJSON = (file)=>{

    return JSON.parse(

        fs.readFileSync(

            path.join(
                DATA_PATH,
                file
            ),

            "utf-8"

        )

    );

};




let destinationsData = [];
let packagesData = [];
let testimonialsData = [];



try{


destinationsData =
loadJSON("destinations.json");


packagesData =
loadJSON("packages.json");


testimonialsData =
loadJSON("testimonials.json");



console.log(
`
✅ Tourly Data Loaded

Destinations:
${destinationsData.length}

Packages:
${packagesData.length}

Testimonials:
${testimonialsData.length}

`
);


}

catch(error){


console.error(
"❌ Data loading failed:",
error.message
);


}






// ============================
// Error Handler Wrapper
// ============================


const asyncHandler =
(fn)=>{

return (req,res,next)=>{


Promise
.resolve(
fn(req,res,next)
)

.catch(error=>{


console.error(
"Route Error:",
error.message
);



res.status(500).json({

success:false,

message:
"Internal Server Error"

});


});


};


};








// ============================
// Health Check
// ============================


app.get(
"/api/health",
(req,res)=>{


res.json({

success:true,

message:
"Tourly API Running"

});


});








// ============================
// Destinations
// ============================



app.get(
"/api/destinations",

asyncHandler(

(req,res)=>{


const {

region,

tag,

featured,

search


}=req.query;



let result =
[
...destinationsData
];





if(region && region!=="All")

result =
result.filter(
d=>d.region===region
);





if(tag && tag!=="All")

result =
result.filter(
d=>
d.tags &&
d.tags.includes(tag)
);





if(featured==="true")

result =
result.filter(
d=>d.featured===true
);





if(search){


const q =
search.toLowerCase();


result =
result.filter(

d=>

d.name
.toLowerCase()
.includes(q)

||

d.country
.toLowerCase()
.includes(q)

);


}




res.json({

success:true,

count:
result.length,

data:
result

});



}

)

);







app.get(
"/api/destinations/:id",

asyncHandler(

(req,res)=>{


const destination =

destinationsData.find(

d=>

d.id ===
Number(req.params.id)

);



if(!destination)

return res.status(404)
.json({

success:false,

message:
"Destination not found"

});



res.json({

success:true,

data:destination

});


}

)

);









// ============================
// Packages
// ============================


app.get(

"/api/packages",

asyncHandler(

(req,res)=>{


const {

category,

maxPrice

}=req.query;



let result =
[
...packagesData
];





if(
category &&
category!=="all"
)

result =
result.filter(
p=>
p.category===category
);





if(maxPrice)

result =
result.filter(
p=>
p.price <= Number(maxPrice)
);





res.json({

success:true,

count:
result.length,

data:
result

});


}

)

);







app.get(

"/api/packages/:id",

asyncHandler(

(req,res)=>{


const pkg =

packagesData.find(

p=>

p.id ===
Number(req.params.id)

);



if(!pkg)

return res.status(404)
.json({

success:false,

message:
"Package not found"

});



res.json({

success:true,

data:pkg

});


}

)

);








// ============================
// Testimonials
// ============================


app.get(

"/api/testimonials",

asyncHandler(

(req,res)=>{


res.json({

success:true,

data:
testimonialsData

});


}

)

);








// ============================
// Search
// ============================


app.post(

"/api/search",

asyncHandler(

(req,res)=>{


const {

destination,

checkin,

checkout,

people

}=req.body;



const results =

destinationsData.filter(

d=>

d.name
.toLowerCase()
.includes(

(destination || "")
.toLowerCase()

)

||

d.country
.toLowerCase()
.includes(

(destination || "")
.toLowerCase()

)

);



res.json({

success:true,

query:{

destination,

checkin,

checkout,

people

},

results


});


}

)

);








// ============================
// Newsletter
// ============================


const subscribers=[];



app.post(

"/api/newsletter",

asyncHandler(

(req,res)=>{


const {email}=req.body;



if(!email)

return res.status(400)
.json({

success:false,

message:
"Email required"

});





if(
subscribers.includes(email)
)

return res.json({

success:false,

message:
"Already subscribed"

});




subscribers.push(email);



res.json({

success:true,

message:
"Successfully subscribed"

});


}

)

);








// ============================
// Contact
// ============================


app.post(

"/api/contact",

asyncHandler(

(req,res)=>{


const {

name,

email,

message

}=req.body;



if(
!name ||
!email ||
!message
)

return res.status(400)
.json({

success:false,

message:
"All fields required"

});



console.log(
"Contact:",
{
name,
email,
message
}
);



res.json({

success:true,

message:
"Message received"

});


}

)

);








// ============================
// 404
// ============================


app.use(

(req,res)=>{


res.status(404)
.json({

success:false,

message:
"Route not found"

});


}

);







// ============================
// Start Server
// ============================



app.listen(

PORT,

"0.0.0.0",

()=>{


console.log(

`
✈️ Tourly API Running

PORT:
${PORT}

Health:
http://localhost:${PORT}/api/health

`

);


}

);