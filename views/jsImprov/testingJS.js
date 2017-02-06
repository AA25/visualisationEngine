var jsonTable,
    dataV2,
    ctxV2,
    optionsV2 = {},
    myPieChartV2,
    ctxTime,
    myTimeChart,
    dataTime,
    optionTime = {},
    ctxTimeGrade,
    myTimeGradeChart,
    optionTimeGrade,
    dataTimeGrade;

var timeAarr = [], timeBarr = [], timeCarr = [], timeDarr = [], timeEarr = [];
timeAarr.data = [], timeBarr.data = [], timeCarr.data = [], timeDarr.data = [], timeEarr.data = [];

var gradeAarr = [], gradeBarr = [], gradeCarr = [], gradeFarr = [];
gradeAarr.data = [], gradeBarr.data = [], gradeCarr.data = [], gradeFarr.data = [];

startDefaultChartOptions();
$("#displayStatus").hide();
// $("#tableLoader").hide();

getTotalSubs();

function getTotalSubs() {
    $("#studentNo").html('<i class="fa fa-cog fa-spin fa-fw"></i>').show();

    $.ajax({
        url: "./phpImprov/testingPHP.php?function=getTable",
        data: {},
        type: 'post',
        error: function(XMLHttpRequest, textStatus, errorThrown){
            alert('status:' + XMLHttpRequest.status + ', status text: ' + XMLHttpRequest.statusText);
        },
        success: function(result){
            jsonTable = JSON.parse(result);
            //console.log(jsonTable);
            for(var i = 0; i<jsonTable.data.length; i++){
                jsonTable.data[i][9] = ((((jsonTable.data[i][9].toFixed(2))/100)*60)*100).toFixed(0);
            }
            $("#studentNo").html(jsonTable.data.length).show();
            groupGrades();
            groupTimeData(jsonTable);
        }
    });
};

function groupTimeData(table){
    table = removeNoGrades(table);
    timeAarr.data = [], timeBarr.data = [], timeCarr.data = [], timeDarr.data = [], timeEarr.data = [];

    var timeA = 0, timeB = 0, timeC = 0, timeD = 0, timeE = 0;
    for(var i = 0; i<table.data.length; i++){
        if((table.data[i][9] >= 0) && (table.data[i][9] <= 19)){
            timeA++; timeAarr.data.push(table.data[i]);
        }else if((table.data[i][9] >= 20) && (table.data[i][9] <= 39)){
            timeB++; timeBarr.data.push(table.data[i]);
        }else if((table.data[i][9] >= 40) && (table.data[i][9] <= 59)){
            timeC++; timeCarr.data.push(table.data[i]);
        }else if((table.data[i][9] >= 60) && (table.data[i][9] <= 89)){
            timeD++; timeDarr.data.push(table.data[i]);
        }else{
            timeE++; timeEarr.data.push(table.data[i]);
        }
    }
    assignTimeData(timeA, timeB, timeC, timeD, timeE);
}

function assignTimeData(timeA, timeB, timeC, timeD, timeE){
    dataTime = {
        labels: [
            "Time between 0-20 minutes",
            "Time between 21-40 minutes",
            "Time between 41-60 minutes",
            "Time between 1hr-1hr30min",
            "Time over 2hrs"
        ],
        datasets: [
            {
                data: [timeA, timeB, timeC, timeD, timeE],
                backgroundColor: ["#32CD32", "#FFCE56", "#FF8C00", "#B22222", "#C0C0C0"],
                hoverBackgroundColor: ["#32CD32", "#FFCE56", "#FF8C00", "#B22222", "#C0C0C0"]
            }
        ]
    };
    $('#timeChart').remove(); // this is my <canvas> element
    $('#timeGradeCont').append('<canvas id="timeChart"><canvas>');
    ctxTime = document.getElementById("timeChart").getContext("2d");
    ctxTime.canvas.width = 300;
    ctxTime.canvas.height = 300;

    myTimeChart = new Chart(ctxTime,{
        type: 'pie',
        data: dataTime,
        options: optionTime
    });

    document.getElementById("timeChart").onclick = function(evt) {
        var activePoints = myTimeChart.getElementsAtEvent(evt);
        var label = activePoints[0]._model.label;
        if(activePoints.length !== 0) {
            if (label == "Time between 0-20 minutes") {
                assignTimeGradeData('L20');
            } else if (label == "Time between 21-40 minutes") {
                assignTimeGradeData('L40');
            } else if (label == "Time between 41-60 minutes") {
                assignTimeGradeData('L60');
            } else if (label == "Time between 1hr-1hr30min") {
                assignTimeGradeData('L90');
            } else if (label == "Time over 2hrs") {
                assignTimeGradeData('L120');
            }
        }
    };
}

function assignTimeGradeData(group){
    var thisArray = [], gradeF = 0, gradeP = 0, gradeE = 0;
    if(group == "L20"){
        thisArray = timeAarr;
    }else if(group == "L40"){
        thisArray = timeBarr;
    }else if(group == "L60"){
        thisArray = timeCarr;
    }else if(group == "L90"){
        thisArray = timeDarr;
    }else if(group == "L120"){
        thisArray = timeEarr;
    }
    for(var i = 0; i < thisArray.data.length; i++){
        var getSubString = $(thisArray.data[i][5]).text(),
            gotSubstring = getSubString.substring(0, getSubString.indexOf('/')),
            substringInt = parseInt(gotSubstring);
        if((substringInt <= 39) && (substringInt >= 0) ){
            gradeF++;
        }else if((substringInt <= 59) && (substringInt >= 40) ){
            gradeP++;
        }else if((substringInt <= 100) && (substringInt >= 60) ){
            gradeE++;
        }else{
            //Incase of people with no grade,
            //this should never happen
        }
    }
    optionTimeGrade = {
        legend: {
            display: false
        }
    };
    dataTimeGrade = {
        labels: [
            "Students over 60",
            "Students between 59-40",
            "Students under 40"
        ],
        datasets: [
            {
                label: "",
                data: [gradeE, gradeP, gradeF],
                backgroundColor: ["#32CD32", "#FFCE56", "#B22222"],
                borderColor: ["#32CD32", "#FFCE56", "#B22222"],
                borderWidth: 1
            }
        ]
    };

    $('#timeGradeChart').remove(); // this is my <canvas> element
    $('#timeGradeChartCont').append('<canvas id="timeGradeChart"><canvas>');
    ctxTimeGrade = document.getElementById("timeGradeChart").getContext("2d");
    ctxTimeGrade.canvas.width = 300;
    ctxTimeGrade.canvas.height = 300;

    myTimeGradeChart = new Chart(ctxTimeGrade,{
        type: 'bar',
        data: dataTimeGrade,
        options: optionTimeGrade
    });

    $('#timeGradeChart').click(function(evt) {
        var activePoints = myTimeGradeChart.getElementsAtEvent(evt);
        if(activePoints.length !== 0){
            var label = activePoints[0]._model.label;
            constructTableContent(label,'',thisArray);
        }
    });
}

function removeNoGrades(thatArray){
    var thisArray = [];
    thisArray.data = [];
    for(var i = 0; i < thatArray.data.length; i++){
        var getSubString = $(thatArray.data[i][5]).text(),
            gotSubstring = getSubString.substring(0, getSubString.indexOf('/')),
            substringInt = parseInt(gotSubstring);
        if((substringInt <= 100) && (substringInt >= 0) ){
            thisArray.data.push(thatArray.data[i]);
        }
    }
    return thisArray;
}

function groupGrades(){
    var aGrade = 0, bGrade = 0, cGrade = 0, fGrade = 0, noGrade = 0, errorChecker = 0;

    for(var i = 0; i<jsonTable.data.length; i++){
        //The follow line is dependant on the grade system used returns X / X, a false case should be introduced incase this grade system is not used
        var getSubString = $(jsonTable.data[i][5]).text();
        if(getSubString == "No grade"){
            noGrade++;
        }else{
            var gotSubstring = getSubString.substring(0, getSubString.indexOf('/')),
                substringInt = parseInt(gotSubstring);
            if (substringInt >= 80){
                aGrade++;
                gradeAarr.data.push(jsonTable.data[i]);
            }else if((substringInt <= 79) && (substringInt >= 60) ){
                bGrade++;
                gradeBarr.data.push(jsonTable.data[i]);
            }else if((substringInt <= 59) && (substringInt >= 40) ){
                cGrade++;
                gradeCarr.data.push(jsonTable.data[i]);
            }else if((substringInt <= 39) && (substringInt >= 0) ){
                fGrade++;
                gradeFarr.data.push(jsonTable.data[i]);
            }else{
                errorChecker++;
            }
        }
    }
    assignChartData(aGrade,bGrade,cGrade,fGrade,noGrade,errorChecker);
}

function assignChartData(totalAs,totalBs,totalCs,totalFs,totalNoGrade, totalAnomalies){
    dataV2 = {
        labels: [
            "Students with over 80",
            "Students between 79-60",
            "Students between 59-40",
            "Students between 40-0",
            "Students yet to be graded",
            "Possible Anomalies with grade"
        ],
        datasets: [
            {
                data: [totalAs, totalBs, totalCs, totalFs, totalNoGrade, totalAnomalies],
                backgroundColor: ["#32CD32", "#FFCE56", "#FF8C00", "#B22222", "#C0C0C0", "#00FFFF"],
                hoverBackgroundColor: ["#32CD32", "#FFCE56", "#FF8C00", "#B22222", "#C0C0C0", "#00FFFF"
                ]
            }
        ]
    };

    ctxV2 = document.getElementById("myCChart").getContext("2d");
    myPieChartV2 = new Chart(ctxV2,{
        type: 'doughnut',
        data: dataV2,
        options: optionsV2
    });

}

document.getElementById("myCChart").onclick = function(evt) {
    var activePoints = myPieChartV2.getElementsAtEvent(evt);
    if(activePoints.length !== 0){
        var label = activePoints[0]._model.label;
        if(label == "Students with over 80"){
            constructTableContent(80,'',null);
            groupTimeData(gradeAarr);
        }else if(label == "Students between 79-60"){
            constructTableContent(60,'',null);
            timeBarr = gradeBarr;
            groupTimeData(gradeBarr);
        }else if(label == "Students between 59-40"){
            constructTableContent(40,'',null);
            timeCarr = gradeCarr;
            groupTimeData(gradeCarr);
        }else if(label == "Students between 40-0"){
            constructTableContent(0,'',null);
            timeDarr = gradeFarr;
            groupTimeData(gradeFarr);
        }else if(label == "Students yet to be graded"){
            constructTableContent(-1,'',null);
        }else if(label == "Possible Anomalies with grade"){
            constructTableContent(-99,'',null);
        }
    }
};

function constructTableContent(gradeGroup,letter,array){
    var thisTable = array ;
    if (thisTable === undefined || thisTable === null) {
        thisTable = jsonTable;
    }
    var loopCounter = 0,
        tempArray = [[]];

    if(gradeGroup == 80){
        tempArray = createTempArrWithLetter(80,100,letter,gradeGroup,thisTable);
    }else if(gradeGroup == 60){
        tempArray = createTempArrWithLetter(60,79,letter,gradeGroup,thisTable);
    }else if(gradeGroup == 40){
        tempArray = createTempArrWithLetter(40,59,letter,gradeGroup,thisTable);
    }else if(gradeGroup == 0){
        tempArray = createTempArrWithLetter(0,39,letter,gradeGroup,thisTable);
    }else if(gradeGroup == -1){
        loopCounter = 0;
        if(letter !== '') {
            for (var i = 0; i < thisTable.data.length; i++) {
                var getSubString = $(thisTable.data[i][5]).text(),
                    firstNameChar = $(thisTable.data[i][2]).text();
                if ((getSubString == "No grade") && (firstNameChar.charAt(0).toUpperCase() == letter)) {
                    tempArray[0].push(thisTable.data[loopCounter]);
                }
                loopCounter++;
            }
        }else{
            for(var i = 0; i<thisTable.data.length; i++){
                var getSubString = $(thisTable.data[i][5]).text();
                if (getSubString == "No grade") {
                    tempArray[0].push(thisTable.data[loopCounter]);
                }
                loopCounter++;
            }
            createLetterLinks(gradeGroup,tempArray);
        }
    }else if(gradeGroup == -99){
        //This is in the case of possible anomalie. My guess is that the grading system used is not 'X / X' e.g. 20 / 100
        //Not sure what I should do here yet.
    }else if(gradeGroup == "Students over 60"){//This is when the bar chart box is calling this function
        tempArray = createTempArrWithLetter(60,100,letter,gradeGroup,thisTable)
    }else if(gradeGroup == "Students between 59-40"){
        tempArray = createTempArrWithLetter(40,59,letter,gradeGroup, thisTable)
    }else if(gradeGroup == "Students under 40"){
        tempArray = createTempArrWithLetter(0,39,letter,gradeGroup, thisTable)
    }

    displayTable(tempArray);
}

function createTempArrWithLetter(min, max, letter, gradeGroup, table){
    var thisTable = table ;
    if (thisTable == undefined || thisTable == null) {
        thisTable = jsonTable;
    }
    var loopCounter = 0;
    var tempArray = [[]];

    if(typeof gradeGroup == "string"){ //This is when a part of the timed grade chart is clicked with empty string
        for(var i = 0; i<thisTable.data.length; i++){
            var getSubString = $(thisTable.data[i][5]).text(),
                gotSubstring = getSubString.substring(0, getSubString.indexOf('/')),
                substringInt = parseInt(gotSubstring);
            if((substringInt >= min) && (substringInt <= max)){
                tempArray[0].push(thisTable.data[loopCounter]);
            }
            loopCounter++;
        }
        createLetterLinks(gradeGroup,null);
    }else if(letter !== '') { //This is when a letter was clicked
        for (var i = 0; i < thisTable.data.length; i++) {
            var getSubString = $(thisTable.data[i][5]).text(),
                gotSubstring = getSubString.substring(0, getSubString.indexOf('/')),
                substringInt = parseInt(gotSubstring),
                //
                firstNameChar = $(thisTable.data[i][2]).text();
            if ((substringInt >= min) && (substringInt <= max) && (firstNameChar.charAt(0).toUpperCase() == letter)) {
                tempArray[0].push(thisTable.data[loopCounter]);
            }
            loopCounter++;
        }
    }else{ //This is when a part of the grade chart is clicked
        for(var i = 0; i<thisTable.data.length; i++){
            var getSubString = $(thisTable.data[i][5]).text(),
                gotSubstring = getSubString.substring(0, getSubString.indexOf('/')),
                substringInt = parseInt(gotSubstring);
                //
            if((substringInt >= min) && (substringInt <= max)){
                tempArray[0].push(thisTable.data[loopCounter]);
            }
            loopCounter++;
        }
        createLetterLinks(gradeGroup,tempArray);
    }
    return tempArray;
}

function displayTable(tableContent){
    $("#outputTable tbody").empty();
    var inArray = 2;
    for(var eachArray = 0; eachArray < tableContent[0].length; eachArray++){
            var name = tableContent[0][eachArray][inArray];
                name =  $(name).text();
            var subDate = tableContent[0][eachArray][inArray+1],
                subAmt = tableContent[0][eachArray][inArray+2],
                gradeO = tableContent[0][eachArray][inArray+3];
            gradeO =  $(gradeO).text();
            var eval = tableContent[0][eachArray][inArray+4],
                evalDate = tableContent[0][eachArray][inArray+5];
            var sumTime = tableContent[0][eachArray][inArray+7];
            var newRowContent = "<tr><th scope='row'></th><td>"+name+"</td><td>"+subDate+"</td><td>"+subAmt+"</td><td>"+sumTime+"min"+"</td><td class='colorGreen'>"+gradeO+"</td></td><td class='displayNone'>"+eval+"</td><td class='displayNone'>"+evalDate+"</td></tr>";
        $("#outputTable tbody").append(newRowContent);
    }
    // $("#tableLoader").hide();
    $("#displayStatus").show();
}


function createLetterLinks(gradeGroup,groupedArray) {
    $("#letterLinksContainer").empty();
    var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
        alphaIndex = new Array(alphabet.length);
    try {
        if (groupedArray[0].length >= 0) {
            $("#letterLinksContainer").append("<h4>Bring up students whose names begin with 1 of the following...</h4>");
            for (var i = 0; i < groupedArray[0].length; i++) {
                if (isArrayFull(alphaIndex) == true) {
                    break;
                }
                for (var ali = 0; ali < alphabet.length; ali++) {
                    if (alphaIndex[ali] == 1) {
                        //In this case we know the character with index ali has already been found. Just do nothing, and go up in the loop
                    } else if (($(groupedArray[0][i][2]).text()).charAt(0).toUpperCase() == alphabet[ali].toUpperCase()) {
                        alphaIndex[ali] = 1;
                        var letterLinkAttr = '<button class=\'letterButtons\' onclick=\'constructTableContent(' + gradeGroup + ',\"' + alphabet[ali].toUpperCase() + '\", null)\'>' + alphabet[ali].toUpperCase() + '</button>';
                        $("#letterLinksContainer").append(letterLinkAttr);
                        break;
                    }
                }
            }
        }
    }catch(err){
        //Nothing
    }
}

function isArrayFull(checkArr){
    for(var i = 0; i < checkArr.length; i++){
        if(checkArr[i] !== 1) {
            return false;
        }
    }
    return true;
}

function startDefaultChartOptions(){
    Chart.defaults.global.maintainAspectRatio = false;
    Chart.defaults.global.tooltips.backgroundColor = '#8d322c';
    Chart.defaults.global.tooltips.bodyFontSize = 14;
    Chart.defaults.global.tooltips.bodyFontColor = "#fff";
    Chart.defaults.global.tooltips.xPadding = 10;
    Chart.defaults.global.tooltips.yPadding = 10;
    Chart.defaults.global.tooltips.caretSize = 7;
    Chart.defaults.global.elements.arc.backgroundColor = "#8d322c";
}