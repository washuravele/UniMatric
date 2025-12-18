let count = 1;
const maxSubjects = 7;

// Subject groups
const homeLanguageGroup = [
  "English Home Language",
  "Afrikaans Huistaal",
  "Sesotho Home Language",
  "Siswati Home Language",
  "Setswana Home Language",
  "isiZulu Home Language",
  "isiXhosa Home Language",
  "isiNdebele Home Language",
  "Sepedi Home Language",
  "Xitsonga Home Language",
  "Tshivenda Home Language"
];

const firstAdditionalLanguageGroup = [
  "English First Additional Language",
  "Afrikaans Eerste Additionele Taal"
];

const compulsoryGroup = [
  "Mathematics",
  "Mathematical Literacy",
  "Technical Mathematics",
  "Life Orientation"
];

const electiveGroup = [
  "Economics",
  "Physical Sciences",
  "Life Sciences",
  "Agricultural Sciences",
  "Business Studies",
  "Accounting",
  "History",
  "Geography",
  "Religion Studies",
  "Civil Technology",
  "EGD",
  "CAT"
];

// Helper to build <option> list
function buildOptions(subjects) {
  return subjects.map(subj => `<option value="${subj}">${subj}</option>`).join("");
}

function addSubject() {
  if (count >= maxSubjects) {
    alert("You can only add up to 7 subjects");
    return;
  }

  count++;
  $("#matricSubjects").prepend(`
    <div class="subjectsInput" id="subject${count}">
      <div class="dot"></div>
      <label class="montserrat">Subject:</label>
      <select class="subjectSelect">
        <option value="">-- Select Subject --</option>
        <optgroup label="Home Language">
          ${buildOptions(homeLanguageGroup)}
        </optgroup>
        <optgroup label="Additional Language">
             ${buildOptions(firstAdditionalLanguageGroup)}
        </optgroup>
        <optgroup label="Compulsory">
          ${buildOptions(compulsoryGroup)}
        </optgroup>
        <optgroup label="Electives">
          ${buildOptions(electiveGroup)}
        </optgroup>
      </select>
      <label class="montserrat">Percentage:</label>
      <input type="number" min="0" max="100" style="text-align: center;" class="montserrat subjectInput"> 
    </div>
  `);

  $("#countSubj").text(count);
}

$("#addBtn").on("click", addSubject);


// Convert percentage → APS points
function getAPSPoints(percentage) {
  if (percentage >= 80) return 7;
  if (percentage >= 70) return 6;
  if (percentage >= 60) return 5;
  if (percentage >= 50) return 4;
  if (percentage >= 40) return 3;
  if (percentage >= 30) return 2;
  if (percentage >= 0)  return 1;
  return 0;
}

function calculateScores() {
  let total = 0;
  let apsTotal = 0;
  let subjects = $(".subjectInput");

  subjects.each(function () {
    let val = parseInt($(this).val());
    if (!isNaN(val)) {
      total += val;
      apsTotal += getAPSPoints(val);
    }
  });
 
   

 dotChange();

   //console.log($(".subjectSelect").length);

  // Average relative to 7 subjects (max 700 total)
  let avgScore = (total / 700) * 100;

  $("#avd").text(`${avgScore.toFixed(2)}%`);
  $("#aps").text(`${apsTotal}`);
}

// Attach one event listener for all inputs
$(document).on("input", ".subjectInput", calculateScores);



function dotChange(){
   if($("#subject1 > .subjectInput").val() !== "" && $("#subject1 > select").val() !== ""){
      $("#subject1 > .dot").css({
       "background-color": "#000000",
      })
   }else{
     $("#subject1 > .dot").css({
      "background-color":"#f1eaea"
     });
   }


   if($("#subject2 > .subjectInput").val() !== "" && $("#subject2 > select").val() !== ""){
      $("#subject2 > .dot").css({
       "background-color": "#000000",
      })
   }else{
     $("#subject2 > .dot").css({
      "background-color":"#f1eaea"
     });
   }



   if($("#subject3 > .subjectInput").val() !== ""  && $("#subject3 > select").val() !== ""){
      $("#subject3 > .dot").css({
       "background-color": "#000000",
      })
   }else{
     $("#subject3 > .dot").css({
      "background-color":"#f1eaea"
     });
   }



     if($("#subject4 > .subjectInput").val() !== "" && $("#subject4 > select").val() !== ""){
      $("#subject4 > .dot").css({
       "background-color": "#000000",
      })
   }else{
     $("#subject4 > .dot").css({
      "background-color":"#f1eaea"
     });
   }


     if($("#subject5 > .subjectInput").val() !== "" && $("#subject5 > select").val() !== ""){
      $("#subject5 > .dot").css({
       "background-color": "#000000",
      })
   }else{
     $("#subject5 > .dot").css({
      "background-color":"#f1eaea"
     });
   }


     if($("#subject6 > .subjectInput").val() !== "" && $("#subject6 > select").val() !== ""){
      $("#subject6 > .dot").css({
       "background-color": "#000000",
      })
   }else{
     $("#subject6 > .dot").css({
      "background-color":"#f1eaea"
     });
   }

     if($("#subject7 > .subjectInput").val() !== "" && $("#subject7 > select").val() !== "" ){
      $("#subject7 > .dot").css({
       "background-color": "#000000",
      })
   }else{
     $("#subject7 > .dot").css({
      "background-color":"#f1eaea"
     });
   }

   if($(".subjectSelect").length === 7){
      $("#avgScore > .dot").css({
       "background-color": "#000000",
      })
   }else{
     $("#avgScore > .dot").css({
       "background-color": "#f1eaea",
      })
   }
 
   if($(".subjectSelect").length === 7){
      $("#apsScore > .dot").css({
       "background-color": "#000000",
      })
   }else{
     $("#apsScore > .dot").css({
       "background-color": "#f1eaea",
      })
   }
}

//home page

$("#homePage").click("click",()=>{
    $("#home").css({
       display:"block",
   });
   $("#uni").css({
    display:"none",
   });

    $("#about-us-page").css({
    display:"none",
   });



     $("#UniPage").css({
      border: "none",
   });
   
     $("#homePage").css({
       border:"dotted 2px ",
     });

      $("#aboutUS").css({
       border:"none",
     });

});


//univasity page
$("#UniPage").click("click",()=>{
   $("#home").css({
       display:"none",
   });
   $("#uni").css({
    display:"block",
   });
    $("#about-us-page").css({
    display:"none",
   });

    $("#UniPage").css({
      border: "dotted 2px",
   });
   
     $("#homePage").css({
       border:"none",
     });

      $("#aboutUS").css({
       border:"none",
     });

});

//about page

$("#aboutUS").click("click",()=>{

   $("#home").css({
       display:"none",
   });
   $("#uni").css({
    display:"none",
   });

     $("#about-us-page").css({
    display:"block",
   });



    $("#UniPage").css({
      border: "none",
   });
   
     $("#homePage").css({
       border:"none",
     });

      $("#aboutUS").css({
       border:"dotted 2px",
     });

});


//sign out */
function showOverlay() {
  document.getElementById("sign-out").style.display = "block";
}

function hideOverlay() {
  document.getElementById("sign-out").style.display = "none";
}

 function goToSignIn() {
        // Replace with your actual sign-in page URL
        window.location.href = "/";
    }










function validateSubjectSelection(subjects) {
  const selected = subjects.map(s => s.subject);

  // Home Language: must choose exactly 1
  const homeLangCount = selected.filter(s => homeLanguageGroup.includes(s)).length;
  if (homeLangCount !== 1) {
    throw new Error("You must choose exactly ONE Home Language subject.");
  }

  // First Additional Language: must choose exactly 1
  const addLangCount = selected.filter(s => firstAdditionalLanguageGroup.includes(s)).length;
  if (addLangCount !== 1) {
    throw new Error("You must choose exactly ONE First Additional Language subject.");
  }

  // Compulsory: must choose 2, and Life Orientation must always be included
  const compulsoryCount = selected.filter(s => compulsoryGroup.includes(s)).length;
  if (compulsoryCount < 2) {
    throw new Error("You must choose TWO compulsory subjects (Life Orientation + one of Mathematics/Math Lit/Technical Math).");
  }
  if (!selected.includes("Life Orientation")) {
    throw new Error("Life Orientation is compulsory and must be included.");
  }

  // Electives: must choose exactly 3
  const electiveCount = selected.filter(s => electiveGroup.includes(s)).length;
  if (electiveCount !== 3) {
    throw new Error("You must choose exactly THREE elective subjects.");
  }

  // Total subjects must equal 7
  if (selected.length !== 7) {
    throw new Error("You must select exactly 7 subjects in total.");
  }

  return true; // passes validation
}




function getSelectedSubjects() {
    const subjects = [];
    const seen = new Set();
    const subjectInputs = document.querySelectorAll(".subjectsInput");

    subjectInputs.forEach(div => {
      const subject = div.querySelector(".subjectSelect").value.trim();
      const percentageValue = div.querySelector(".subjectInput").value;
      const percentage = Number(percentageValue);

      if (!subject) return; // skip empty rows

      // basic client validation
      if (seen.has(subject)) {
        throw new Error(`Duplicate subject selected: ${subject}`);
      }
      if (Number.isNaN(percentage) || percentage < 0 || percentage > 100) {
        throw new Error(`Invalid percentage for ${subject}. Enter 0–100.`);
      }

      seen.add(subject);
      subjects.push({ subject, percentage });
    });

    return subjects;
  }


function renderRequirements(course) {
  const { compulsory = [], additionalSubjects, apsOptions = [] } = course.requirements;

  return `
    <p class="montserrat"><strong>APS Requirements</strong></p>
    <ul>
      ${apsOptions.map(a =>
        `<li class="montserrat">APS ≥ ${a.minScore} (${a.note || ""})</li>`
      ).join("")}
    </ul>

    <p class="montserrat"><strong>Compulsory Subjects</strong></p>
    <ul>
      ${compulsory.map(c =>
        `<li class="montserrat">${c.subject} – Level ${c.minLevel}+</li>`
      ).join("")}
    </ul>

    ${additionalSubjects ? `
      <p class="montserrat"><strong>Additional Subjects</strong></p>
      <p class="montserrat">
        Any ${additionalSubjects.count} subjects , 
        <em>${additionalSubjects.note || ""}</em>
      </p>
    ` : ""}

    <p class="montserrat" style="color:green;">
      ✔ You qualify because your subjects and APS meet these requirements
    </p>
  `;
}

function showLoading() {
  const resultsDiv = document.getElementById("results");
  const courseList = document.getElementById("courseList");

  resultsDiv.style.display = "block";

  courseList.innerHTML = `
    <div class="cardC" style="display:flex; justify-content:center; align-items:center; height:180px;">
      <div class="loadingBox">
        <div class="spinner"></div>
        <p class="montserrat" style="margin-top:10px; text-align:center;">
          Checking courses…<br>
          <small>Server waking up ⏳</small>
        </p>
      </div>
    </div>
  `;
}

  


document.querySelector("#checkCourses input[type='button']").addEventListener("click", async () => {
  try {
    const subjects = getSelectedSubjects();
    const aps = Number(document.getElementById("aps").textContent);

    if (!subjects.length) {
      alert("Please select at least one subject and enter percentages.");
      return;
    }

    validateSubjectSelection(subjects);

    // 👉 SHOW LOADING
    showLoading();

    const res = await fetch("/check-courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subjects, aps })
    });

    const data = await res.json();

    const courseList = document.getElementById("courseList");

    // ❌ validation failed
    if (!data.validRequest) {
      courseList.innerHTML = `
        <p style="color:red; text-align:center;">
          ${data.message}
        </p>
      `;
      return;
    }

    // ❌ no courses
    if (!data.qualified || data.courses.length === 0) {
      courseList.innerHTML = `
        <p style="color:red; text-align:center; text-decoration: underline dotted;">
          You do not qualify for any courses.
        </p>
      `;
      return;
    }

    // ✅ clear loading
    courseList.innerHTML = "";

    // ✅ render courses
    data.courses.forEach(c => {
      courseList.innerHTML += `
        <div class="cardC">
          <div class="cardImg">
            <img src="/imgs/logo/${c.acronym}-logo.png">
          </div>

          <div class="courseInfor" style="font-size: 12px;">
            <div class="basicInfo">
              <p class="montserrat" style="text-align:center; text-decoration: underline;">
                <strong>${c.university}</strong>
              </p>
              <p class="montserrat" style="text-align:center;">
                <strong>${c.course}</strong>
              </p>
              <p class="montserrat"><strong>Duration:</strong> ${c.duration}</p>
              <p class="montserrat"><strong>Faculty:</strong> ${c.faculty}</p>
              <p class="montserrat"><strong>Department:</strong> ${c.department}</p>
              <p class="montserrat"><strong>Your APS:</strong> ${c.computedAPS}</p>
            </div>

            <div class="requirements" style="display:none; margin-top:8px; font-size:10px;">
              ${renderRequirements(c)}
            </div>
          </div>
        </div>
      `;
    });

  } catch (err) {
    const courseList = document.getElementById("courseList");
    courseList.innerHTML = `
      <p style="color:red; text-align:center;">
        Server is waking up. Please try again in a moment.
      </p>
    `;
  }
});



document.addEventListener("click", (e) => {
  const imgWrapper = e.target.closest(".cardImg");
  if (!imgWrapper) return;

  const img = imgWrapper.querySelector("img"); 
  const card = imgWrapper.closest(".cardC");
  const basicInfo = card.querySelector(".basicInfo");
  const requirements = card.querySelector(".requirements");

  const showingBasic = basicInfo.style.display !== "none";

  if (showingBasic) {
    // hide course info → show requirements
    basicInfo.style.display = "none";
    requirements.style.display = "block";

    // style ONLY this image
    img.style.border = "2px solid";
    img.style.opacity = "0.5";

  } else {
    // hide requirements → show course info
    requirements.style.display = "none";
    basicInfo.style.display = "block";

    img.style.border = "2px dotted";
    img.style.opacity = "1";
  }
});






$(".uniInforCard").on("click", async function () {

  $("#introImg").css("display","none");
  $("#aboutVasity").css("display","block");
  

  const uniIDName = $(this).attr("id"); // get the ID of the clicked card
  const uniID = [uniIDName]; // store it directly as a string in the array
  
  try {
    const res = await fetch("/vasity-infor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uniID, uniIDName })
   });


      const vasityInfor = document.getElementById("aboutVasity");

      const data = await res.json();
      


        $(".uniInforCard").css({
                 "opacity": "1",
                   "border":"none"
        });

         $(`#${uniIDName}`).css({
               "opacity": "0.5",
                "border": "dotted 2px"
         });

    
  



      vasityInfor.innerHTML = `
  <!--vasity name-->
  <div id="vasityName">
    <p class="roboto">${data.name}</p>
  </div>

  <!--address, campus and ranking-->
  <div id="vasityInfor1">

    <div id="vasityAddress">
      <h4 class="roboto">Physical Address</h4>
      <div style="margin-left: 20px;" class="montserrat">
        ${data.address.map(addr => `
          <li class="montserrat">${addr.campus}: ${addr.physicalAddress}</li>
        `).join("")}
      </div>
    </div>

    <!--campus and vasity ranking-->
    <div id="vasity-campus-ranking">
      <h4 class="roboto">Campus</h4>
      <div style="margin-left: 20px;" class="montserrat">
        ${data.address.map(addr => `<li>${addr.campus}</li>`).join("")}
      </div>

      <h4 class="roboto">Ranking</h4>
      <div style="margin-left: 20px;" class="montserrat">
        <li>National ranking: ${data.localRanking.southAfrica}</li>
        <li>Continental ranking: ${data.localRanking.africa}</li>
      </div>
    </div>
  </div>

  <!--vasity courses-->
  <div id="vasityInfor2">
    <!--application dates-->
    <div id="vasity-application-dates">
      <h4 class="roboto">Application Dates</h4>
      <div style="margin-left: 20px;" class="montserrat">
        ${data.applicationDates.map(date => `
          <li>Opening Date: ${date.openingDate || date.openingLateDate}</li>
          <li>Closing Date: ${date.closingDate}</li>
        `).join("")}
        <li>Application Website: <a href="${data.applicationWebsite}">${data.applicationWebsite}</a></li>
      </div>
    </div>

    <!--official vasity websites-->
    <div id="vasityWebsites">
      <h4 class="roboto">Varsity Official Website</h4>
      <div style="margin-left: 20px;" class="montserrat">
        <li>Self Check: <a href="${data.varsityOfficialSite.selfCheck}">${data.varsityOfficialSite.selfCheck}</a></li>
        <li>ITS: <a href="${data.varsityOfficialSite.ITS}">${data.varsityOfficialSite.ITS}</a> </li>
        <li>Site:<a href="${data.varsityOfficialSite.site}">${data.varsityOfficialSite.site}</a> </li>
      </div>
    </div>
  </div>

  <!--vasity pros-->
  <div id="vasityInfor3">
    <a href="/imgs/logo/nwu-logo.png" download="washu.png">
      <button  class="montserrat" id="prospectors">${data.acronym.toUpperCase()} Prospectors</button>
    </a>
    <button class="montserrat" id="vasityClose">Close</button>
  </div>
`;

 


  } catch (err) {
    console.error("Fetch error:", err);
  }

});



$(document).on("click", "#vasityClose", ()=>{
     $("#introImg").css("display","block");
     $("#aboutVasity").css("display","none");
});
