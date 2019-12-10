$(document).ready();

/* Features to add:

Add amount of quart's each car takes (Maybe include unit conversion such as litres or oz etc)
Add ability to update certain fields without re-writing each card
Implement modal for more service info and include trans oil changes, coolant service etc
Add momentJS to work out when the next inspection will be due and alert or email once the inspection is close to/is due

clean up UI and make it more user friendly/simple
*/

let carArray = [];
let transFluid = 50000;
let coolant = 50000;

    // This function adds a new car to local storage
    $('#submit').on('click', function(e){ 

        // e.preventDefault();
        let carMake = $('#addCarMake');
        let mileage = $("#addCurrentMileage");
        let interval = $("#addOilChangeInterval");
        let capacity = $("#addOilAmount");
      
            dataObj = {
                'Make'     : carMake.val().trim(),
                'Mileage'  : mileage.val().trim(),
                'Interval' : interval.val().trim(),
                'Capacity' : capacity.val().trim()
            };

            if (!dataObj.Make || !dataObj.Mileage || !dataObj.Interval || !dataObj.Capacity){
                alert('Fill out all fields!');
            } else{

            carArray.push(dataObj);
            localStorage.setItem('carArray', JSON.stringify(carArray));

            if(vehicle == null) vehicle = [];
            localStorage.setItem('dataObj', JSON.stringify(dataObj));
            vehicle.push(dataObj);
            localStorage.setItem('carArray', JSON.stringify(vehicle));
        }
    });

    let vehicle = JSON.parse(localStorage.getItem('carArray'));

    /* Renders vehicle data to the page via Bootstrap cards 
    (If there is an object in local storage it gets rendered to the DOM immediately) */
    function renderCards(){

        $('#carInfo').empty();
        for (let i = 0; i < vehicle.length; i++){   
            $('#carInfo').append(`
                <div class='col-xs-4 p-2 mt-3 mx-auto'>
                    <div class="card rounded-0" style="width: 18rem;">
                            <div class="card-body">
                            <button type="submit" class="btn btn-secondary rounded-0 float-right mt-2 p-2" value="${i}" id="delete">X</button>
                            <h5 class="card-title mt-3">${vehicle[i].Make}</h5>
                            </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"></li>
                            <li class="list-group-item text-left update${i}"><h6>Mileage:</h6>${vehicle[i].Mileage} miles <button type="submit" class="btn rounded-0 edit mb-1" value="${i}" id="edit${i}">Edit</button> </li> 
                            <li class="list-group-item text-left"><h6>Oil Change Interval:</h6>${vehicle[i].Interval} miles</li>
                            <li class="list-group-item text-left"><h6>Oil Change Due:</h6>${nextServiceDue(vehicle[i].Mileage, vehicle[i].Interval)} miles</li>
                            <li class="list-group-item text-left"><h6>Oil Capacity:</h6>${vehicle[i].Capacity} quarts</li>
                        </ul>
                        <div class="card-body">
                            <a href="#" class="card-link">Help</a>
                            <a href="#" class="card-link">More Service Info</a>
                        </div>
                    </div>
                </div>
            `);  
            
           updateMileage(i);

        }         
    }

    // Callback function to update mileage to a new amount
    function updateMileage(i){
        // When the edit button is clicked 
        $(document).one('click', `#edit${i}`, function(){

            editMiles = $(this).val();

            $(`.update${i}`).append(`
            <form class="mx-auto">
            <div class="form-group">
                <label for="updateMileage">Update Mileage</label>
                <input type="text" onkeypress="if (isNaN(this.value + String.fromCharCode(event.keyCode))) return false;"
                class="form-control rounded-0 updateMilesForm" id="updateMileage${i}" placeholder="eg. 55,000">
            </div>
            <button type="submit" class="btn btn-secondary rounded-0 updateMileage" id="update${i}">Update</button>
            </form>
            `)

            // When the update button is clicked it updates the object in local storage
            $(document).on('click', `#update${i}`, function(){

                newMiles = $(`#updateMileage${i}`).val().trim();
                vehicle[editMiles].Mileage = newMiles;
                localStorage.setItem('carArray', JSON.stringify(vehicle));
                document.location.reload();   
            });

        });
    }

    // Delete function to remove car card from local storage
    $(document).on('click', '#delete', function(){

        let carNumber = $(this).val();
        vehicle.splice(carNumber, 1);
        localStorage.setItem('carArray', JSON.stringify(vehicle));   
        document.location.reload(); 
    });

    // This function works out the next service interval
    function nextServiceDue(currentMileage, nextInterval){
        return parseInt(currentMileage) + parseInt(nextInterval);
    }

    function inspectionDate(){
      
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date+' '+time;    
        console.log(dateTime);
    };

renderCards();
// inspectionDate();