var dataArray = [];

function affiche(event) {
  event.preventDefault()
  var email = document.getElementById("email").value;
  var phone = document.getElementById("Phone").value;
  var date = document.getElementById("date").value;
  var msg = document.getElementById("msg").value;
  var affErrEmail = document.getElementById("sp-email");
  var affErrPhone = document.getElementById("sp-Phone");
  var affErrdate = document.getElementById("sp-date");
  var affMsg = document.getElementById("sp-msg");

  var cop = 0;
  var regxEmail = /^[A-Za-z0-9_.]+@([a-z]+\.)+[a-z]{2,3}$/;
  var regexPhone = /^\+212[0-9]{9}$/;

  // Email validation
  if (email == "") {
    affErrEmail.innerHTML = "Please fill in this field.";
    cop++;
  } else if (!regxEmail.test(email)) {
    affErrEmail.innerHTML = "Invalid email address.";
    cop++;
  } else {
    affErrEmail.innerHTML = "";
  }

  // Phone validation
  if (phone == "") {
    affErrPhone.innerHTML = "Please fill in this field.";
    cop++;
  } else if (!regexPhone.test(phone)) {
    affErrPhone.innerHTML = "Invalid phone number. It should start with '+212' and have 9 digits.";
    cop++;
  } else {
    affErrPhone.innerHTML = "";
  }

  // Date validation
  if (date == "") {
    affErrdate.innerHTML = "Date is required. Please enter a valid date.";
    cop++;
  } else {
    var selectedDate = new Date(date);
    var year = selectedDate.getFullYear();

    if (year < 2000 || year > 2024) {
      affErrdate.innerHTML = "Date should be between 2000 and 2024.";
      cop++;
    } else {
      affErrdate.innerHTML = "";
    }
  }

  // Message validation
  var regexMsg = /^[A-Za-z\s]+$/;
  if (msg == "") {
    affMsg.innerHTML = "Please fill in this field.";
    cop++;
  } else if (!regexMsg.test(msg)) {
    affMsg.innerHTML = "Message should only contain letters.";
    cop++;
  } else {
    affMsg.innerHTML = "";
  }

  // Add to the dataArray
  if (cop != 0) {
    console.log("Please fix the errors before submitting.");
  } else {
    dataArray.push({
      email: email,
      phone: phone,
      date: date,
      message: msg,
    });
   
   let local=JSON.stringify(dataArray);
   localStorage.setItem("dataArray",local);
  console.log(JSON.parse(localStorage.getItem("dataArray")));
  // Refresh the page to display the stored data
  location.reload();
    // displayData();
    // document.getElementById("myform").reset();
  }

  // Reset the form
//  document.getElementById("myform").reset();
  //  event.preventDefault()
}

var displayedDataDiv = document.getElementById("aff");

function displayData() {
  displayedDataDiv.innerHTML = ""; // Clear data
  let localData = localStorage.getItem("dataArray");

  if (localData) {
    dataArray = JSON.parse(localData);
  for (var i = 0; i < dataArray.length; i++) {
    var e = dataArray[i];
    var dataString =
      "Email: " + e.email + "<br>" +
      "Phone: " + e.phone + "<br>" +
      "Date: " + e.date + "<br>" +
      "Message: " + e.message + "<br><br>";
      displayedDataDiv.innerHTML += dataString;
  
    
  }
}
}
window.onload = function() {
  displayData(); // This is the correct function name to display the stored data.
};
function clearLocalStorage() {
  localStorage.removeItem("dataArray");
  dataArray = []; // Clear the dataArray in memory as well
  displayData(); // Update the displayedDataDiv to clear the displayed data
}


function displayData() {
  displayedDataDiv.innerHTML = ""; // Clear data
  let localData = localStorage.getItem("dataArray");

  if (localData) {
    dataArray = JSON.parse(localData);
    for (var i = 0; i < dataArray.length; i++) {
      var e = dataArray[i];
      var dataString =
        "Email: " + e.email + "<br>" +
        "Phone: " + e.phone + "<br>" +
        "Date: " + e.date + "<br>" +
        "Message: " + e.message +
        // Add a button or link to remove the entry by index
        `<br>  <button type="submit" onclick="removeData(${i});">Remove</button><br><br>`;
      displayedDataDiv.innerHTML += dataString;
    }
  }
}

function removeData(index) {
  let localData = localStorage.getItem("dataArray");

  if (localData) {
    dataArray = JSON.parse(localData);

    // Check if the index is within the valid range
    if (index >= 0 && index < dataArray.length) {
      dataArray.splice(index, 1); // Remove one element at the specified index
      localStorage.setItem("dataArray", JSON.stringify(dataArray)); // Update local storage
      displayData(); // Update the displayedDataDiv
    } 
  }
}