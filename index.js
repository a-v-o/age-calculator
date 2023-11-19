const allInputs = document.getElementsByTagName("input")
const userDate = document.getElementById("date")
const userMonth = document.getElementById("month")
const userYear = document.getElementById("year")
const calculate = document.getElementById("calculate")
const errorDate = document.getElementById("error-date")
const errorMonth = document.getElementById("error-month")
const errorYear = document.getElementById("error-year")
const dayNumber = document.getElementById("day-number")
const monthNumber = document.getElementById("month-number")
const yearNumber = document.getElementById("year-number")
const date = new Date()
const birthYear = userYear.value
const february = ((birthYear % 4 === 0 && !birthYear % 100 === 0) || birthYear % 400 === 0) ? 29 : 28
const daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

function validate() {
    checkEmpty()
    validateDate()
    if (!checkEmpty() && validateDate() && validateDay() && validateMonth() && validateYear()) {
        calculateYear()
    }
}

function calculateYear () {
    const presentDate = new Date()
    
    let years = presentDate.getFullYear() - userYear.value
    let months = presentDate.getMonth() + 1 - userMonth.value
    if (months < 0) {
        years--
        months += 12
    }

    let days = presentDate.getDate() - userDate.value
    if (days < 0) {
        if (months > 0) {
            months--
        } else {
            years--
            months = 11
        }
        days += daysInMonth[userMonth.value - 1]
    }

    dayNumber.innerHTML = days
    monthNumber.innerHTML = months
    yearNumber.innerHTML = years
}

function checkEmpty() {
    let bool;
    for (let i = 0; i < allInputs.length; i++) {
            bool = allInputs[i].value == "" ? true : false
    }

    if (bool) {
        errorDate.innerHTML = "Must not be empty";
        errorMonth.innerHTML = "Must not be empty";
        errorYear.innerHTML = "Must not be empty";        
        userDate.classList.add("red")
        userMonth.classList.add("red")
        userYear.classList.add("red")
    }
    return bool
}

function validateDay() { 
    if (userDate.value > 0 && userDate.value <= 31) {
        errorDate.innerHTML = ""
        userDate.classList.remove("red")
        return true
    } else {
        errorDate.innerHTML = "Must be a valid day";
        userDate.classList.add("red")
        return false;
    }  
}
function validateDate() {
    if (userDate.value > 0 && userDate.value <= daysInMonth[userMonth.value - 1]) {
        errorDate.innerHTML = ""
        userDate.classList.remove("red")
        return true
    } else {
        errorDate.innerHTML = "Must be a valid date";
        userDate.classList.add("red")
        return false;
    }
}

function validateMonth() {
    if (userMonth.value > 0 && userMonth.value <= 12) {
        errorMonth.innerHTML = ""
        userMonth.classList.remove("red")
        return true;
    } else {
        errorMonth.innerHTML = "Must be a valid month";
        userMonth.classList.add("red")
        return false;
    }
}

function validateYear() {
    if (userYear.value > 1000 && userYear.value < date.getFullYear()) {
        errorYear.innerHTML = ""
        userYear.classList.remove("red")
        return true;
    } else if (userYear.value >= date.getFullYear()) {
        errorYear.innerHTML = "Must be in the past"
        userYear.classList.add("red")
        return false
    } else {
        errorYear.innerHTML = "Must be a valid year";
        userYear.classList.add("red")
        return false
    }
}