const form = document.getElementById("registration");
const error = document.getElementById("errormsg");
form.addEventListener("submit", (e)=>{
    e.preventDefault();
    if(ageValidation()){
        setData();
        form.reset();
    }
    
});
//age validation
const ageValidation = ()=>{
    const dobElement = document.getElementById("dob");
    var dob = new Date(dobElement.value);  
    var month_diff = Date.now() - dob.getTime();  
    var age_dt = new Date(month_diff);   
    var year = age_dt.getUTCFullYear();  
    var age = Math.abs(year - 1970);
    if(age < 18 || age > 55){
        error.innerHTML = "Age should be between 18 and 55";
        dobElement.focus();
        return false;
    }
    error.innerHTML="";
    return true;
}
// form data set to localStorage
const setData= ()=>{
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const dob = document.getElementById("dob");
    const terms = document.getElementById("terms");
    const data = {
        name:name.value,
        email:email.value,
        password:password.value,
        dob:dob.value,
        terms:terms.checked
    }
    const fdata = JSON.parse(localStorage.getItem("data")) ? JSON.parse(localStorage.getItem("data")) : [];
    fdata.push(data);
    localStorage.setItem("data",JSON.stringify(fdata));
    tableDisplay(fdata);
}
// display on table 
const tableDisplay = (data)=>{
    const tableData = data.map((res)=>{
        return `<tr><td>${res.name}</td><td>${res.email}</td><td>${res.password}</td><td>${res.dob}</td><td>${res.terms}</td></tr>`
    })
    document.getElementById("data").innerHTML = tableData.join("");
}
tableDisplay(JSON.parse(localStorage.getItem("data")) ? JSON.parse(localStorage.getItem("data")) : [] );