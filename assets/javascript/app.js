// Key issues to solve
// Grab user input
// store it in variables and in local storage
// run functions when needed to work out next service

// User stories
// Be able to add the current mileage and have it automatically tell you when maintenance is due (Based on the interval you add yourself)
// Store this info in local storage so I can view it at a later time
// Be able to add you own service interval







$(document).ready();

// let currentMileage = 0;
// let oilChangeDue = 0;
// let transOilDue = 0;
// let coolantDue = 0;
// let pwrSteeringDue = 0;
// let fuelFilterDue = 0;
// let cabinFilterDue = 0;

// This function renders the data that is stored in Local Storage
function showServiceResults(data) {
    $('#serviceResults').empty();

    for (let i = 0; i < data.length; i++) {

        let serviceData = $('<p>');
        serviceData.text(`Current mileage: ${data[i]} Miles`);

        let deleteServiceData = $('<button class="btn btn-secondary delete">');
        deleteServiceData.attr('service', i);
        deleteServiceData.text('X');
        serviceData = serviceData.prepend(deleteServiceData);
        $('#serviceResults').append(serviceData);
    }
}

$('#submit').on('click', function(event){
    // event.preventDefault();
    let addCarData = $('#addCurrentMileage').val().trim();
    if (!addCarData) {
        alert('Please fill out all the fields!')
    } else {
        data.push(addCarData);
        localStorage.setItem('current-mileage-data', JSON.stringify(data));
        $('#addCurrentMileage').val();
    }
});

// When the delete button is clicked
$(document).on('click', '.delete', function(){

    document.location.reload();
    let carNumber = $(this).attr('service');
    data.splice(carNumber, 1);
    localStorage.setItem('current-mileage-data', JSON.stringify(data));
});

let data = JSON.parse(localStorage.getItem('current-mileage-data'));
console.log(data);
if (!Array.isArray(data)) {
    data = [];
}
showServiceResults(data);





















// function to work out next service interval
// function nextServiceDue(currentMileage, oilChangeDue) {
//     let oilAlert = currentMileage + oilChangeDue;
//     alert(`Your next oil change is due at: ${oilAlert} miles.`)
// }
