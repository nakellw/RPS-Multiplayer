$(document).ready(function(){

	// Link to Firebase & Initialize Firebase
	var config = {
		apiKey: "AIzaSyCudiY5tvRu-sKNAh9t7VI_rkq9omFtQf8",
		authDomain: "trainscheduler223.firebaseapp.com",
		databaseURL: "https://trainscheduler223.firebaseio.com",
		projectId: "trainscheduler223",
		storageBucket: "",
		messagingSenderId: "938108376915"
	  };
	  firebase.initializeApp(config);

var database=firebase.database();

	// Adding Trains
	$("#addTrainBtn").on("click", function () {
			// Preventing Duplicates
		event.preventDefault();

		// Grabs user input and assign to variables
		var trainName = $("#trainNameInput").val().trim();
		var destination = $("#destinationInput").val().trim();
		var trainTimeInput = moment($("#trainTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
		var frequencyInput = $("#frequencyInput").val().trim();

// 		var newTrain = {
// 			name: trainName,
// 			destination: destination,
// 			trainTime: trainTimeInput,
// 			frequency: frequencyInput
// 		};
// console.log(newTrain);
		// pushing  above trainInfo to Firebase 
		database.ref().push({
			name: trainName,
			destination: destination,
			trainTime: trainTimeInput,
			frequency: frequencyInput}
		);

		// clear text-boxes
		$("#trainNameInput").val("");
		$("#destinationInput").val("");
		$("#trainInput").val("");
		$("#frequencyInput").val("");
		
	});

	database.ref().on("child_added", function (childSnapshot) { console.log(childSnapshot.val());


		// assign firebase variables to snapshots.
		var fbName = childSnapshot.val().name;
		var fbDestination = childSnapshot.val().destination;
		var fbTrainInput = childSnapshot.val().trainTime;
		var fbFreq = childSnapshot.val().frequency;

		var conversion = moment().diff(moment.unix(fbTrainInput), "minutes");
		var timeRemainder = moment().diff(moment(conversion),(fbTrainInput), "minutes") % fbFreq;
		var minutes = fbFreq - timeRemainder;
		var nextTrainArrival = (moment().add(minutes, "m")).format("hh:mm");

		// Append train info to table on page
		$("#trainTable > tbody").append("<tr><td>" + fbName + "</td><td>" + fbDestination + "</td><td>" + fbFreq + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");

	});

})//end