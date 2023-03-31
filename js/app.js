const form = document.getElementById("calculator-form");
const resultsSection = document.getElementById("results");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const entryDate = new Date(document.getElementById("entryDate").value);
    const departureDate = new Date(document.getElementById("departureDate").value);

    if(isEntryDateGreaterThanOrEqualsToDepartureDate(entryDate, departureDate))
        return;

    var monthsSpentWorking = getMonthsSpentWorking(entryDate, departureDate);
    if (monthsSpentWorking < 3)
        return alert("You don't qualify.");

    const salary = document.getElementById("monthlySalary").value;
    if(salary <= 0){
        alert("Salary must be greater than 0.");
        return;
    }
        

    const dailySalary = getDailySalary(salary);

    const hasTakenVacations = document.getElementById("hasTakenVacations").checked;
    const hasBeenPrewarned = document.getElementById("hasBeenPrewarned").checked;

    const vacations = calculateVacations(dailySalary, monthsSpentWorking, hasTakenVacations);
    const christmasBonus = calculateChristmasBonus(salary, departureDate);
    const noticePay = getNoticePay(dailySalary, monthsSpentWorking, hasBeenPrewarned);
    const severancePay = getSeverancePay(dailySalary, monthsSpentWorking);

    const total = vacations + christmasBonus + noticePay + severancePay;

    const currencyFormatter = new Intl.NumberFormat("ja-DO", {style:"currency", currency: "DOP"});

    document.getElementById("vacations").innerHTML = currencyFormatter.format(vacations);
    document.getElementById("christmas-bonus").innerHTML = currencyFormatter.format(christmasBonus);
    document.getElementById("notice-pay").innerHTML = currencyFormatter.format(noticePay);
    document.getElementById("severance-pay").innerHTML = currencyFormatter.format(severancePay);
    document.getElementById("total").innerHTML = currencyFormatter.format(total);
});

function getDailySalary(salary){
    const workingDays = 23.83;

    return Number.parseFloat(salary) / workingDays;
}

function isEntryDateGreaterThanOrEqualsToDepartureDate(entryDate, departureDate){
   if (entryDate.getTime() >= departureDate.getTime())
   {
    alert("Entry date cannot be more recent or equal to the departure date.")
    return true;
   }
}

function getMonthsSpentWorking(entryDate, departureDate) {
    let months;

    months = (departureDate.getFullYear() - entryDate.getFullYear()) * 12;
    months -= entryDate.getMonth();
    months += departureDate.getMonth();

    return months <= 0 ? 0 : months;
}

function calculateVacations(dailySalary, months, hasTakenVacation){
    if(hasTakenVacation)
        return 0;

    // if months are greater than 5 years.
    if(months > 5 * 12)
        return dailySalary * 18;
    else
        return dailySalary * 14;
}

function calculateChristmasBonus(salary, monthsOnDepartureDateYear){
    return (salary / 12) * (monthsOnDepartureDateYear.getMonth() + 1);
}

function getNoticePay(dailySalary, monthsSpentWorking, hasBeenPrewarned){
    if (hasBeenPrewarned)
        return 0;

        if(monthsSpentWorking >= 3 && monthsSpentWorking < 6)
            return dailySalary * 7;
        else if(monthsSpentWorking >= 6 && monthsSpentWorking <= 12)
            return dailySalary * 14;
        else if(monthsSpentWorking > 12)
            return dailySalary * 28;

    return 0;
}

function getSeverancePay(dailySalary, monthsSpentWorking){

        if(monthsSpentWorking >= 3 && monthsSpentWorking < 6)
            return severancePay = dailySalary * 6;
        else if(monthsSpentWorking >= 6 && monthsSpentWorking < 12)
            return severancePay = dailySalary * 13;
        else if(monthsSpentWorking >= 12 && monthsSpentWorking < 5*12)
            return severancePay = (dailySalary * 21) * (monthsSpentWorking / 12);
        else if(monthsSpentWorking > 5*12)
            return severancePay = (dailySalary) * 23 * (monthsSpentWorking / 12);

    return 0;
}