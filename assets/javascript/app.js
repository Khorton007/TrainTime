var config = {
    apiKey: "AIzaSyCR7qdF7fUIJ8aNTvlupTwGTKzJizqeZLk",
    authDomain: "train-time-f5a05.firebaseapp.com",
    databaseURL: "https://train-time-f5a05.firebaseio.com",
    projectId: "train-time-f5a05",
    storageBucket: "train-time-f5a05.appspot.com",
    messagingSenderId: "428420184207"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

$("#addDestinationButton").on("click", function(event) {
  event.preventDefault();
  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var firstTrainTime = moment($("#firstTrainInput").val().trim(), "HH:mm").format("X");
  var frequency = $("#frequencyInput").val().trim();
  
  console.log(trainName);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequency);

  var newDestinationComplete = {
    trainNameBase: trainName,
    destinationBase: destination,
    firstTrainTimeBase: firstTrainTime,
    frequencyBase: frequency
  };

  database.ref().push(newDestinationComplete);

  console.log(newDestinationComplete.trainNameBase);
  console.log(newDestinationComplete.destinationBase);
  console.log(newDestinationComplete.firstTrainTimeBase);
  console.log(newDestinationComplete.frequencyBase);

  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#firstTrainInput").val("");
  $("#frequencyInput").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().trainNameBase;
  var destination = childSnapshot.val().destinationBase;
  var firstTrainTime = childSnapshot.val().firstTrainTimeBase;
  var frequency = childSnapshot.val().frequencyBase;

  // var formatFirstTrainTime = moment.unix(firstTrainTime).format("HH:mm");
  // console.log(formatFirstTrainTime);

//   var unformatNextArrival = moment().diff(moment.unix(firstTrainTime, "X"), "minutes");
//   console.log(unformatNextArrival);
//   console.log(moment.unix(unformatNextArrival).format("HH:mm"));

//   var formatTimeLeft
  // var timeSinceFirst = moment().subtract(firstTrainTime, "minutes").format("HH:mm");
  // console.log("Next Arrival: "+timeSinceFirst);
  var minusYearFirstTrainTime = moment.unix(firstTrainTime, "hh:mm").subtract(1, "years");
  var timeNow = moment();
  var timeDifference = moment().diff(moment(minusYearFirstTrainTime), "minutes");
  console.log("First Arrival: " +minusYearFirstTrainTime);
  console.log("Time Now: " +timeNow);
  console.log("difference: " + timeDifference)
  var timeRemainder = timeDifference % frequency;
  var minutesTillTrain = frequency - timeRemainder;
  var nextTrainTime = moment().add(minutesTillTrain, "minutes");
  var formatNextTrainTime = moment(nextTrainTime).format("hh:mm");
  var formatFirstTrainTime = moment(firstTrainTime).format("hh:mm");
  console.log(minutesTillTrain);
  console.log(formatNextTrainTime);
  console.log(formatFirstTrainTime);
  $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + formatNextTrainTime + "</td><td>" + minutesTillTrain + "</td></tr>")
});
