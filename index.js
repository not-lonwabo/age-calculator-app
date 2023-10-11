document.querySelector(".btn").addEventListener("click", setAge);

function setAge() {
    const inputBoxes = document.querySelectorAll(".input-box");
    const errorTexts = document.querySelectorAll(".error-text");
    const labelTexts = document.querySelectorAll(".label-text");

    inputBoxes.forEach(box => {
        box.style.border = "1px solid var(--light-grey)";
    });
    errorTexts.forEach(err => {
        err.style.visibility = "hidden";
    });
    labelTexts.forEach(label => {
        label.style.color = "var(--smokey-grey)"
    });

    const dobDay = document.querySelector(".day .input-box").value;
    const dobMonth = document.querySelector(".month .input-box").value;
    const dobYear = document.querySelector(".year .input-box").value;

    if (isValidDate(dobDay, dobMonth, dobYear)) {
        const dob = new Date(dobYear, dobMonth, dobDay);
        const { years, months, days } = calculateAge(dob);

        document.querySelector('.row.result:nth-child(1) .dashes').innerHTML = years;
        document.querySelector('.row.result:nth-child(2) .dashes').innerHTML = months;
        document.querySelector('.row.result:nth-child(3) .dashes').innerHTML = days;
    } else {
        inputBoxes.forEach(box => {
            box.style.border = "1px solid var(--light-red)";
        });
        labelTexts.forEach(label => {
            label.style.color = "var(--light-red)"
        })
    }
}

function calculateAge(birthdate) {
    const birthdateObject = new Date(birthdate);
    const today = new Date();
  
    let ageYears = today.getFullYear() - birthdateObject.getFullYear();
    let ageMonths = today.getMonth() - birthdateObject.getMonth();
    let ageDays = today.getDate() - birthdateObject.getDate();
  
    if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
        ageYears--;
        ageMonths = 12 + ageMonths; // Make months positive
    }
  
    if (ageDays < 0) {
        const lastMonthDays = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        ageDays = lastMonthDays + ageDays; // Make days positive
        ageMonths--; // Adjust months accordingly
    }
  
    if (ageYears < 0) {
        ageYears = ageMonths = ageDays = 0;
    }
  
    return { years: ageYears, months: ageMonths, days: ageDays };
}

function isValidDate(day, month, year) {
    // Convert inputs to integers
    day = parseInt(day, 10);
    month = parseInt(month, 10);
    year = parseInt(year, 10);
  
    // Check if the inputs are valid numbers
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      return false;
    }

    let result = true;
  
    // Check if the year is within a reasonable range (adjust as needed)
    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear) {
        document.querySelector(".year .error-text").style.visibility = "visible";
        if (year > currentYear) document.querySelector(".year .error-text").innerHTML = "Must be in the past"
        result = false;
    }
  
    // Check if the month is valid (1 to 12)
    if (month < 1 || month > 12) {
        document.querySelector(".month .error-text").style.visibility = "visible";
        document.querySelector(".month .error-text").innerHTML = "Must be a valid month"
        result = false;
    }
  
    // Check if the day is valid for the given month and year
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > lastDayOfMonth) {
        document.querySelector(".day .error-text").style.visibility = "visible";
        document.querySelector(".day .error-text").innerHTML = "Must be a valid day"
        result = false;
    }
  
    return result;
}
