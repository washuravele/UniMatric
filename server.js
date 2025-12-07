import e from "express";
import bodyParser from "body-parser";
import PG from "pg";


const port= 3000;
const app= e();

const db = new PG.Client({
   user:"postgres",
   host:"localhost",
   database:"UniMatricDB",
   password:"washu5",
   port:5432,
});

db.connect();



app.use(e.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(e.json());

const universities = [
  {
    id: "01",
    name: "Vaal University of Technology",
    faculty: "Faculty of Applied & Computer Sciences",
    department: "DEPARTMENT OF NATURAL SCIENCES",
    courses: [
      {
        name: "Dip: Analytical Chemistry",
        duration: "3 years",
        requirements: {
          compulsory: [
            { subject: "English", minLevel: 4 },
            { subject: "Mathematics or Technical Mathematics or Engineering Mathematics (TVET N4)", minLevel: 4 },
            { subject: "Physical Science or Engineering Sciences (TVET N4)", minLevel: 4 },
            { subject: "Any other 3 subjects", minTotalLevel: 9 }
          ],
          totalAPS: [{ minScore: 21, note: "exclude LO" }]
        }
      },
      {
        name: "Dip: Biotechnology",
        duration: "3 years",
        requirements: {
          compulsory: [
            { subject: "English", minLevel: 4 },
            { subject: "Mathematics or Technical Mathematics or Engineering Mathematics (TVET N4)", minLevel: 4 },
            { subject: "Physical Science or Engineering Science (TVET N4)", minLevel: 4 },
            { subject: "Life Sciences", minLevel: 4 }
          ],
          totalAPS: [{ minScore: 23, note: "exclude LO" }]
        }
      },
      {
        name: "Dip: Agricultural Management",
        duration: "3 years",
        requirements: {
          compulsory: [
            { subject: "English", minLevel: 4 },
            { subject: "Mathematics or Technical Mathematics", minLevel: 3 },
            { subject: "Mathematics Literacy", minLevel: 4 },
            { subject: "Agriculture / Life Science", minLevel: 3 }
          ],
          totalAPS: [
            { minScore: 21, note: "Mathematics or Tech Maths, exclude LO" },
            { minScore: 22, note: "Mathematics Literacy, exclude LO" }
          ]
        }
      },
      {
        name: "Dip: Environmental Science",
        duration: "3 years",
        requirements: {
          compulsory: [
            { subject: "English", minLevel: 4 },
            { subject: "Mathematics", minLevel: 4 },
            { subject: "Physical Science", minLevel: 4 }
          ],
          totalAPS: [{ minScore: 21, note: "exclude LO" }]
        }
      },
      {
        name: "Bachelor of Health Sciences: Medical Laboratory Science",
        duration: "4 years",
        requirements: {
          compulsory: [
            { subject: "English", minLevel: 4 },
            { subject: "Mathematics", minLevel: 4 },
            { subject: "Physical Science", minLevel: 4 },
            { subject: "Life Science", minLevel: 5 }
          ],
          totalAPS: [{ minScore: 27, note: "exclude LO" }]
        }
      }
    ]
  }
  // Add more universities here
];







//login page
app.get("/",(req,res)=>{
   const displayNone = "none";
   const displayFlex = "flex";
   res.render("index.ejs",({
     display1: "block",
     display2: "block",
     display3: "block",
     display4: "none",
     feedback :""
   }));
});

//greetings
var greetings = "";

var hours = new Date().getHours();


console.log(hours);

if(hours <13){
   greetings = "Good Morning";
}else if(hours <18){
   greetings = "Good Afternoon";
}else{
  greetings = "Good Evening";
}



//login form*/
app.post("/home", async (req,res)=>{
  const {ID,password} = req.body;
  const results = await db.query("SELECT * From user_data where id_number = $1",[ID]);
  
 if(results.rows.length === 0 ){
  console.log("user not found");
  return res.render("index.ejs",({
     display1: "none",
     display2: "none",
     display3: "none",
     display4: "flex",
     feedback :"user not found , check your ID Number",
   }));
 }

 const user = results.rows[0]
 console.log(user);
 if(user.user_password === password){
  console.log("login successful");
  return res.render("home.ejs",({
    firstName : `${user.first_name.substring(0,1).toUpperCase()}${user.first_name.substring(1).toLowerCase()}`,
    lastName : `${user.last_name.substring(0,1).toUpperCase()}${user.last_name.substring(1).toLowerCase()}`,
    fIntial:`${user.first_name.substring(0,1).toUpperCase()}`,
    lIntial: `${user.last_name.substring(0,1).toUpperCase()}`,
    greetings : greetings,
    qualified: false,
    courses: ""
  }));
 }else{
  console.log("Incorrect password");
  return res.render("index.ejs",({
     display1: "none",
     display2: "none",
     display3: "none",
     display4: "flex",
     feedback :"Incorrect password check your password",
   }));
 }
});






function canonicalize(subjectName) {
  const s = subjectName.trim().toLowerCase();
  if (s.includes("english")) return "English";
  if (s.includes("mathematics literacy")) return "Mathematics Literacy";
  if (s.includes("mathematics")) return "Mathematics";
  if (s.includes("physical science")) return "Physical Science";
  if (s.includes("life science")) return "Life Sciences";
  if (s.includes("agricultural")) return "Agriculture";
  if (s.includes("life orientation")) return "Life Orientation";
  return subjectName.trim();
}

// NSC Achievement Level from percentage
function achievementLevel(percentage) {
  if (percentage >= 80) return 7;
  if (percentage >= 70) return 6;
  if (percentage >= 60) return 5;
  if (percentage >= 50) return 4;
  if (percentage >= 40) return 3;
  if (percentage >= 30) return 2;
  return 1; // < 30%
}

// Compute APS excluding Life Orientation
function computeAPS(subjects) {
  return subjects
    .filter(s => canonicalize(s.subject) !== "Life Orientation")
    .reduce((sum, s) => sum + achievementLevel(s.percentage), 0);
}

// Validate request payload shape
function validatePayload(subjects, aps) {
  if (!Array.isArray(subjects) || subjects.length === 0) {
    return { ok: false, message: "No subjects provided." };
  }
  const seen = new Set();
  for (const { subject, percentage } of subjects) {
    if (!subject || typeof subject !== "string") {
      return { ok: false, message: "Each subject must have a valid name." };
    }
    if (seen.has(subject)) {
      return { ok: false, message: `Duplicate subject: ${subject}.` };
    }
    seen.add(subject);
    if (typeof percentage !== "number" || Number.isNaN(percentage) || percentage < 0 || percentage > 100) {
      return { ok: false, message: `Invalid percentage for ${subject}. Must be 0–100.` };
    }
  }
  if (typeof aps !== "number" || Number.isNaN(aps) || aps < 0) {
    return { ok: false, message: "APS must be a non-negative number." };
  }
  return { ok: true };
}


function meetsRequirements(course, enrichedSubjects, aps) {
  const { compulsory, totalAPS } = course.requirements;

  for (const req of compulsory) {
    if (req.subject === "Any other 3 subjects") {
      const excludeSet = new Set(compulsory.map(r => r.subject).concat(["Life Orientation"]));
      const otherSubs = enrichedSubjects.filter(s => !excludeSet.has(s.canonical));
      const topThreeTotal = otherSubs
        .map(s => s.level)
        .sort((a, b) => b - a)
        .slice(0, 3)
        .reduce((sum, lvl) => sum + lvl, 0);
      if (topThreeTotal < req.minTotalLevel) return false;
    } else {
      const variants = req.subject.split(" or ");
      const found = variants.some(v => {
        const subj = enrichedSubjects.find(s => s.canonical === canonicalize(v));
        return subj && subj.level >= req.minLevel;
      });
      if (!found) return false;
    }
  }

  return totalAPS.some(threshold => aps >= threshold.minScore);
}


// ===== Route =====
app.post("/check-courses", (req, res) => {
  const { subjects = [], aps } = req.body;

  const payloadCheck = validatePayload(subjects, aps);
  if (!payloadCheck.ok) {
    return res.json({ validRequest: false, message: payloadCheck.message });
  }

  const enriched = subjects.map(s => ({
    ...s,
    canonical: canonicalize(s.subject),
    level: achievementLevel(s.percentage)
  }));

  const serverAPS = computeAPS(enriched);

  const qualifiedCourses = [];

  for (const uni of universities) {
    for (const course of uni.courses) {
      if (meetsRequirements(course, enriched, serverAPS)) {
        qualifiedCourses.push({
          university: uni.name,
          faculty: uni.faculty,
          department: uni.department,
          course: course.name,
          duration: course.duration,
          computedAPS: serverAPS
        });
      }
    }
  }

  res.json({
    validRequest: true,
    aps: serverAPS,
    qualified: qualifiedCourses.length > 0,
    courses: qualifiedCourses
  });
});
























//about us page 
app.get("/about",(req,res)=>{
  res.render("about.ejs");
});

/*create account*/
app.post("/create-new-account", async(req,res)=>{
   const {firstname , lastname , id ,email ,school,password} = req.body;

  try{
    await db.query("INSERT INTO user_data values($1,$2,$3,$4,$5,$6)", [id,firstname,lastname,email,school,password]);
    res.render("index.ejs",({
     display1: "none",
     display2: "none",
     display3: "none",
     display4: "flex",
     feedback: "Succefully create new account. Use your id and password to log in."
   }));
  } catch (err) {
     res.render("index.ejs",({
     display1: "none",
     display2: "none",
     display3: "none",
     display4: "flex",
     feedback: err.detail
   }));
  }

});

/*reset account*/
app.post("/reset-account", async(req,res)=>{
 const {IdNumber ,email, newPassword} = req.body;

 const idNumber = await db.query("select id_number from user_data where email_address = $1 and id_number = $2",[email,IdNumber]);

  if (idNumber.rows.length >= 1){
     await db.query("update user_data set user_password = $1 where id_number = $2 and email_address = $3",[newPassword,IdNumber,email]);
     res.render("index.ejs",({
     display1: "none",
     display2: "none",
     display3: "none",
     display4: "flex",
     feedback: "Succefully changed password"
   }));

  }else{
     res.render("index.ejs",({
     display1: "none",
     display2: "none",
     display3: "none",
     display4: "flex",
     feedback: "Something went wrong , check your id number and email address"
  }))
 }
   
});



app.listen(port,()=>{
  console.log(`server running on  http://localhost:${port}`);
});



