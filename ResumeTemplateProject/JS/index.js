/* 
    DOMContentLoaded EventListner Added 
    For i) Without Login Can't Access ResumePage.html
       ii) Save the User Credentials in Local Storage on login.html load
*/
const path=String(window.location.pathname.split("/").pop());
const sessionAuth=sessionStorage.getItem('sessionAuth');
const resumeData=JSON.parse(data).resume;
const sizeOfData=resumeData.length;
let currentIndex=0;
let currentSizeArray=0;
let currentArray=[];
document.addEventListener("DOMContentLoaded", () =>{
    if(path == 'resumepage.html'){
        if(sessionAuth == null){
            alert('Access Denied, Please Login Before Access. Thank You !');
            window.location.replace('file://'+window.location.pathname.replace("resumepage.html","login.html"));           
        }else{
            currentIndex=0;
            currentSizeArray=sizeOfData;
            currentArray=resumeData;
            showResumeData(currentIndex,currentSizeArray,currentArray);
        }
    }else{
        var userDetails={
            "user":"admin",
            "password":btoa("admin123")
        };
        // Setting User Credential in Local Storage
        localStorage.setItem("auth",JSON.stringify(userDetails));
    }
});
// On BackButton Detects on Resumepage :: User Can't leave the page without logout

// Login Function
function login(){
    var user= document.getElementById('user').value;
    var password= document.getElementById('password').value;
    var auth=JSON.parse(localStorage.getItem('auth'));
    var loginform=document.getElementById('login-form');
    
    if(user == auth.user && password == String(atob(auth.password))){
        loginform.action='file://'+window.location.pathname.replace("login.html","resumepage.html");
        sessionStorage.setItem('sessionAuth',localStorage.getItem('auth'));
    }else{
        alert('LOGIN FAILED !!!! ');
    }
}
// Logout Function
function logout(){
    if(sessionAuth != null){
        window.location.href='file://'+window.location.pathname.replace("resumepage.html","login.html");
        sessionStorage.clear();
    }else{
        alert('LOGOUT FAILED !!!! ');
    }
}
// ------------------------- FOR RESUME
function showResumeData(currentIndex,currentSizeArray,currentArray){
    const previousButton=document.getElementsByClassName('btn-previous')[0].style;
    const nextButton=document.getElementsByClassName('btn-next')[0].style;
    for(let i=0;i<6;i++){
        document.querySelectorAll('#sidebar, #footer1, #projects, #education, #internships, #workarea')[i].style.display='block';
    }
    // Next & Previous Button Visibility
    if((currentIndex==0) && (currentIndex+1)==currentSizeArray){
        previousButton.display='none';
        nextButton.display='none';
        document.getElementById('searchbar').style.height='8vh';
    }else if(currentIndex == 0){
        previousButton.display='none';
        nextButton.display='inline-block';
     }else if(currentIndex == (currentSizeArray-1)){
        previousButton.display='inline-block';
        nextButton.display='none';
     }
     else{
         previousButton.display='inline-block';
         nextButton.display='inline-block';
     }
     const user=String(JSON.parse(localStorage.getItem('auth')).user).toUpperCase();
     //Name & Role
     document.getElementsByClassName('candidate-name')[0].style.color='black';
     document.getElementsByClassName('candidate-name')[0].innerText=currentArray[currentIndex].basics.name;
     document.getElementsByClassName('candidate-role')[0].innerText=currentArray[currentIndex].basics.AppliedFor;
     document.getElementsByClassName('page')[0].innerText=`User: ${user} | Showing: ${currentIndex+1}/${currentSizeArray}`;
     //Personal Info
     document.getElementsByClassName('phone')[0].innerText=currentArray[currentIndex].basics.phone;
     document.getElementsByClassName('email')[0].innerText=currentArray[currentIndex].basics.email;
     document.getElementsByClassName('network')[0].innerText=currentArray[currentIndex].basics.profiles.network;
     document.getElementsByClassName('network')[0].href=currentArray[currentIndex].basics.profiles.url;
     //Skills
     let skills=currentArray[currentIndex].skills.keywords;
     let count=0;
     skills.forEach(element => {
        document.getElementsByClassName(`ts${++count}`)[0].innerText=element;
     });
     //Hobbies
     let hobbies=currentArray[currentIndex].interests.hobbies;
     count=0;
     hobbies.forEach(element => {
        document.getElementsByClassName(`hb${++count}`)[0].innerText=element;
     });
     // Work Experience
     document.getElementsByClassName('company-name')[0].innerText=currentArray[currentIndex].work.CompanyName;
     document.getElementsByClassName('position')[0].innerText=currentArray[currentIndex].work.Position;
     document.getElementsByClassName('start-date')[0].innerText=currentArray[currentIndex].work.StartDate;
     document.getElementsByClassName('end-date')[0].innerText=currentArray[currentIndex].work.EndDate;
     document.getElementsByClassName('summary')[0].innerText=currentArray[currentIndex].work.Summary;
     //Projects
     document.getElementsByClassName('project-name')[0].innerText=currentArray[currentIndex].projects.name;
     document.getElementsByClassName('project-description')[0].innerText=currentArray[currentIndex].projects.description;
     //Education
     let education=currentArray[currentIndex].education;
     document.getElementsByClassName('inst-name')[0].innerText=`${education.UG.institute}, 
      ${education.UG.course} , ( ${education.UG.StartDate} - ${education.UG.EndDate} ) ,  ${education.UG.cgpa}`;
     document.getElementsByClassName('inst-ss')[0].innerText=`${education.SeniorSecondary.institute} , ${education.SeniorSecondary.cgpa}`;
     document.getElementsByClassName('inst-hs')[0].innerText=`${education.HighSchool.institute} , ${education.HighSchool.cgpa}`;
     //Internships
     document.getElementsByClassName('company-name')[1].innerText=currentArray[currentIndex].Internship.CompanyName;
     document.getElementsByClassName('position')[1].innerText=currentArray[currentIndex].Internship.Position;
     document.getElementsByClassName('start-date')[1].innerText=currentArray[currentIndex].Internship.StartDate;
     document.getElementsByClassName('end-date')[1].innerText=currentArray[currentIndex].Internship.EndDate;
     document.getElementsByClassName('summary')[1].innerText=currentArray[currentIndex].Internship.Summary;
     // Achievements
     document.getElementsByClassName('achievements')[0].innerText=currentArray[currentIndex].achievements.Summary;
}

function onNext(){
    showResumeData(++currentIndex,currentSizeArray,currentArray);
}
function onPrevoius(){
    showResumeData(--currentIndex,currentSizeArray,currentArray);
}

// Seacrch Bar
const searchBar=document.getElementById('searchbar');
searchBar.addEventListener('change',(event)=>{
    let searchedKeyword=event.target.value.toLowerCase();
    let newCurrentArray=[];
    let newarrayIndex=0;

    if(searchedKeyword == ''){
        currentIndex=0;
        currentSizeArray=sizeOfData;
        currentArray=resumeData;
        showResumeData(currentIndex,currentSizeArray,currentArray);
    }else{
        resumeData.forEach((element,index) => {
            let serachedDataWith=resumeData[index].basics.AppliedFor.toLowerCase();
            if(serachedDataWith.includes(searchedKeyword)){
                newCurrentArray[newarrayIndex++]=resumeData[index];
            }
        });
        
        currentIndex=0;
        currentSizeArray=newCurrentArray.length;
        currentArray=newCurrentArray;
        let inavlidSearchText=`Invalid Search or No Applications For this Job - '${event.target.value}' !!`;
        
        if(currentSizeArray>0){
            showResumeData(currentIndex,currentSizeArray,currentArray);
        }else{
            for(let i=0;i<6;i++){
                document.querySelectorAll('#sidebar, #footer1, #projects, #education, #internships, #workarea')[i].style.display='none';
            }
            const user=String(JSON.parse(localStorage.getItem('auth')).user).toUpperCase();
            document.getElementsByClassName('page')[0].innerText=`User: ${user} | Showing: 0`;
            document.getElementsByClassName('candidate-name')[0].innerText=inavlidSearchText;
            document.getElementsByClassName('candidate-name')[0].style.color='red';
            document.getElementsByClassName('candidate-role')[0].innerText='';
        }
    }  
});