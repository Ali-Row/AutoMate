$(document).ready();

let currentMileage = 0;
let oilChangeDue = 0;
// let transOilDue = 0;
// let coolantDue = 0;
// let pwrSteeringDue = 0;
// let fuelFilterDue = 0;
// let cabinFilterDue = 0;

// function to work out next service interval
function nextServiceDue (currentMileage, oilChangeDue) {
    return currentMileage + oilChangeDue;
}

console.log(nextServiceDue(70000, 3000));