/**
 * Created by Akingbade on 12/1/2016.
 */
//Suggestion: Make private object of the data
var avgGradePieChart;
var globjsonLabData;

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover({container: "body"});
});

function checkBox(locator){
    if(!($(locator).find(":checkbox").is(':checked'))){
        $(locator).find(":checkbox").prop("checked",true);
    }else{
        $(locator).find(":checkbox").prop("checked",false);
    }

}

function labInputs(){
    var labInputs = $("#labEntries").val();
    var labInputsArr = labInputs.split(",");
    if (verifyLabInputs(labInputsArr)){
        retrieveData(labInputsArr);
        //console.log("its valid");
        $("#labEntries").css('border-color','#32CD32');
    }else{
        $("#labEntries").css('border-color','#800000');
        //console.log("not valid");
    }
}

function retrieveData(postData){
    $("#loader").show();
    $("#retrieveID").removeClass('btn-primary');
    $("#retrieveID").removeClass('btn-danger');
    $("#retrieveID").addClass('btn-primary');
    $.ajax({
      url: "aggregateChartsHTML.php?function=getWholeData",
      data: {serverData : postData},
      type: 'post',
      error: function(XMLHttpRequest, textStatus, errorThrown){
          $("#loader").hide();
          $("#labEntries").css('border-color','#800000');
          $("#retrieveID").removeClass('btn-primary');
          $("#retrieveID").addClass('btn-danger');
          //alert('status:' + XMLHttpRequest.status + ', status text: ' + XMLHttpRequest.statusText);
      },
      success: function(result){
          console.log(result);
          succCall(result);
      }
    });
}

function succCall (result){
    var resultCont = JSON.parse(result);
    var jsonLabData = resultCont[0];
    jsonLabData = cleanUpTable(jsonLabData);
    var labNames = resultCont[1];
    globjsonLabData = jsonLabData;
    boxPlotTimes(jsonLabData, labNames);
    // boxPlotGrades(jsonLabData, labNames);
    groupByGrades(jsonLabData);
    groupByTime(jsonLabData);
    $("#loader").hide();
    $('#aggPieCharts').removeClass('disp-none');
    $("#aggFooter").show();
    $("#retrieveID").removeClass('btn-primary');
    $("#retrieveID").removeClass('btn-danger');
    $("#retrieveID").addClass('btn-success');
};

function cleanUpTable(jsonLabData){
    //fullName//question//stuAvgTime//stuAvgGrade//stuTimes//stuGrades
    for(var key in jsonLabData){
        if(jsonLabData.hasOwnProperty(key)){
            var tempStuAvgGrade = 0;
            var tempStuAvgTime = 0;
            var divBy = 0;
            for(var i=0; i<jsonLabData[key]["stuGrades"].length; i++){
                divBy = i+1;
                if(isNaN(parseInt(jsonLabData[key]["stuGrades"][i]))){
                    tempStuAvgGrade = tempStuAvgGrade + 0; //No Grade will be deemed as zero
                    jsonLabData[key]["stuGrades"][i] = 0;
                }else{
                    jsonLabData[key]["stuGrades"][i] = parseInt(jsonLabData[key]["stuGrades"][i]);
                    tempStuAvgGrade = tempStuAvgGrade + jsonLabData[key]["stuGrades"][i];
                }
                tempStuAvgTime = tempStuAvgTime + jsonLabData[key]["stuTimes"][i];
                //console.log(key + " -> " + jsonLabData[key]["stuTimes"][i]);
            }
            tempStuAvgTime = (tempStuAvgTime/divBy).toFixed(0);
            tempStuAvgGrade = (tempStuAvgGrade/divBy).toFixed(0);
            jsonLabData[key]["stuAvgGrade"][0] = parseInt(tempStuAvgGrade);
            jsonLabData[key]["stuAvgTime"][0] = parseInt(tempStuAvgTime);
        }
    }
    return jsonLabData;
}

function groupByGrades(jsonLabData){
    var aGrade = 0, bGrade = 0, cGrade = 0, fGrade = 0;
    for(var key in jsonLabData){
        if(jsonLabData.hasOwnProperty(key)){
            if(jsonLabData[key]["stuAvgGrade"][0] >= 80){
                aGrade++;
            }else if((jsonLabData[key]["stuAvgGrade"][0] >= 60) && (jsonLabData[key]["stuAvgGrade"][0] <= 79)){
                bGrade++;
            }else if((jsonLabData[key]["stuAvgGrade"][0] >= 40) && (jsonLabData[key]["stuAvgGrade"][0] <= 59)){
                cGrade++;
            }else{
                fGrade++;
            }
        }
    }
    assignGraphData(aGrade,bGrade,cGrade,fGrade);
}

function assignGraphData(totalAs,totalBs,totalCs,totalFs){
    var dataChart = {
        labels: [
            "Average grade over 80",
            "Average grade between 79-60",
            "Average grade between 59-40",
            "Average grade below 39"
        ],
        datasets: [{
            data: [totalAs, totalBs, totalCs, totalFs],
            backgroundColor: ["#32CD32", "#FFCE56", "#FF8C00","#B22222"],
            hoverBackgroundColour: ["#32CD32", "#FFCE56", "#FF8C00","#B22222"]
        }]
    };

    $('#avgGradeChart').remove();
    $('#gradeChartContainer').append('<canvas id="avgGradeChart"><canvas>');
    var ctxGrade = document.getElementById("avgGradeChart").getContext("2d");
    ctxGrade.canvas.width = 300;
    ctxGrade.canvas.height = 300;
    avgGradePieChart = new Chart(ctxGrade,{
        type: 'pie',
        data: dataChart,
        options: {}
    });

    $('#avgGradeChart').click(function(evt) {
        var activePoints = avgGradePieChart.getElementsAtEvent(evt);
        if(activePoints.length !== 0){
            var label = activePoints[0]._model.label;
            if(label == "Average grade over 80"){
                constructTableContent(80,'',null);
                // groupTimeData(gradeAarr);
            }else if(label == "Average grade between 79-60"){
                constructTableContent(60,'',null);
                // timeBarr = gradeBarr;
                // groupTimeData(gradeBarr);
            }else if(label == "Average grade between 59-40"){
                constructTableContent(40,'',null);
                // timeCarr = gradeCarr;
                // groupTimeData(gradeCarr);
            }else if(label == "Average grade below 39"){
                constructTableContent(0,'',null);
                // timeDarr = gradeFarr;
                // groupTimeData(gradeFarr);
            }
        }
    });
}

function verifyLabInputs(labInputsArr){
    var valid = true;
    for(var i = 0; i < labInputsArr.length; i++){
        if((labInputsArr[i] === '') || (typeof (parseInt(labInputsArr[i])) !== 'number') || (isNaN(parseInt(labInputsArr[i])))){
            valid = false;
            break;
        }
    }
    return valid;
}

function groupByTime(jsonLabData){
    var timeA = 0, timeB = 0, timeC = 0, timeD = 0, timeE = 0;
    for(var key in jsonLabData){
        if(jsonLabData.hasOwnProperty(key)){
            if((jsonLabData[key]["stuAvgTime"][0] >= 0) && (jsonLabData[key]["stuAvgTime"][0] <= 19)){
                timeA++;
            }else if((jsonLabData[key]["stuAvgTime"][0] >= 20) && (jsonLabData[key]["stuAvgTime"][0] <= 39)){
                timeB++;
            }else if((jsonLabData[key]["stuAvgTime"][0] >= 40) && (jsonLabData[key]["stuAvgTime"][0] <= 59)){
                timeC++;
            }else if((jsonLabData[key]["stuAvgTime"][0] >= 60) && (jsonLabData[key]["stuAvgTime"][0] <= 89)){
                timeD++;
            }else{
                timeE++;
            }
        }
    }
    assignTimeData(timeA, timeB, timeC, timeD, timeE);
}

function assignTimeData(timeA, timeB, timeC, timeD, timeE){
    var dataTime = {
        labels: [
            "Average time between 0-20 minutes",
            "Average time between 21-40 minutes",
            "Average time between 41-60 minutes",
            "Average time between 1hr-1hr30min",
            "Average time over 2hrs"
        ],
        datasets: [
            {
                data: [timeA, timeB, timeC, timeD, timeE],
                backgroundColor: ["#32CD32", "#FFCE56", "#FF8C00", "#B22222", "#C0C0C0"],
                hoverBackgroundColor: ["#32CD32", "#FFCE56", "#FF8C00", "#B22222", "#C0C0C0"]
            }
        ]
    };

    $('#avgTimeChart').remove();
    $('#timeChartContainer').append('<canvas id="avgTimeChart"><canvas>');
    var ctxTime = document.getElementById("avgTimeChart").getContext("2d");
    ctxTime.canvas.width = 300;
    ctxTime.canvas.height = 300;

    var avgTimeChart = new Chart(ctxTime,{
        type: 'pie',
        data: dataTime,
        options: {}
    });

}

function constructTableContent(gradeGroup,letter,array){
    if(gradeGroup == 80){
        array = assignTableContent(80,100);
    }else if(gradeGroup == 60){
        array = assignTableContent(60,79);
    }else if(gradeGroup == 40){
        array = assignTableContent(40,59);
    }else if(gradeGroup == 0){
        array = assignTableContent(0,39);
    }
    displayTable(array);
}

function assignTableContent(lBound,uBound){
    var tempArray = [];
    for(var key in globjsonLabData){
        if(globjsonLabData.hasOwnProperty(key)){
            if(globjsonLabData[key]["stuAvgGrade"][0] >= lBound && globjsonLabData[key]["stuAvgGrade"][0] <= uBound){
                tempArray.push(globjsonLabData[key]);
            }
        }
    }
    return tempArray;
}

function displayTable(tableContent){
    var hash = "#";
    $("#outputTable tbody").empty();
    for(var eachArray = 0; eachArray < tableContent.length; eachArray++){
        var name = tableContent[eachArray].fullName[0];
        var avgGrade = tableContent[eachArray].stuAvgGrade[0];
        var avgTime = tableContent[eachArray].stuAvgTime[0];
        var moreInfo = "'"+"switchLink"+eachArray+"'";
        var newRowContent = "<tr><td scope='row'></td><td>"+name+"</td><td class='colorGreen'>"+avgGrade+"</td><td>"+avgTime+"</td>" +
            "<td><label class='switch mb-0 mt-5'><input type='checkbox'><div id="+moreInfo+" class='slider round' type='button' data-html='true' data-toggle='popover' data-placement='left' data-content='This section will be filled with data about the user. Such as the grade for each individual lab. Maybe have a graph...'></div></label></td></tr>";

        $("#outputTable tbody").append(newRowContent);
    }
    $('[data-toggle="popover"]').popover({container: "body"});
    $("#displayStatus").show();
}

function boxPlotTimes(jsonLabData, labNames){
    var xData = [], yData = [];
    for(var i =0; i<labNames.length; i++){
        xData.push(labNames[i]);
    }

    for(var counter = 0; counter<xData.length; counter++) {
        var tempArray = [];
        for (var key in jsonLabData) {
            if (jsonLabData.hasOwnProperty(key)) {
                for (var j = 0; j < jsonLabData[key]["questions"].length; j++) {
                    if (jsonLabData[key]["questions"][j] == xData[counter]) {
                        //Push the grade the student got at this particular Q into the tempArray
                        tempArray.push(jsonLabData[key]["stuTimes"][j])
                    }
                }
            }
        }
        yData.push(tempArray);
    }
    var data = [];

    for ( var i = 0; i < xData.length; i ++ ) {
        var result = {
            type: 'box',
            y: yData[i],
            name: xData[i],
            boxpoints: 'all',
            jitter: 0.5,
            whiskerwidth: 0.2,
            fillcolor: 'cls',
            marker: {
                size: 2
            },
            boxmean: 'sd',
            line: {
                width: 1
            }
        };
        data.push(result);
    };
    //console.log(data);
    //
    layout = {
        title: 'Box Plot for student times spent per lab (Including mean & standard deviation)',
        yaxis: {
            autorange: true,
            showgrid: true,
            zeroline: true,
            dtick: 5,
            gridcolor: 'rgb(255, 255, 255)',
            gridwidth: 1,
            zerolinecolor: 'rgb(255, 255, 255)',
            zerolinewidth: 2
        },
        margin: {
            l: 40,
            r: 30,
            b: 80,
            t: 100
        },
        paper_bgcolor: 'rgb(243, 243, 243)',
        plot_bgcolor: 'rgb(243, 243, 243)',
        showlegend: false
    };

    Plotly.newPlot('boxPlotTime', data, layout);
}

function boxPlotGrades(jsonLabData, labNames){
    var xData = [], yData = [];
    for(var i =0; i<labNames.length; i++){
        xData.push(labNames[i]);
    }
    //console.log(xData);
    for(var counter = 0; counter<xData.length; counter++) {
        var tempArray = [];
        for (var key in jsonLabData) {
            if (jsonLabData.hasOwnProperty(key)) {
                for (var j = 0; j < jsonLabData[key]["questions"].length; j++) {
                    if (jsonLabData[key]["questions"][j] == xData[counter]) {
                        //Push the grade the student got at this particular Q into the tempArray
                        tempArray.push(jsonLabData[key]["stuGrades"][j])
                    }
                }
            }
        }
        yData.push(tempArray);
        //console.log(tempArray);
    }
    //console.log(yData);

    var data = [];

    for ( var i = 0; i < xData.length; i ++ ) {
        var result = {
            type: 'box',
            y: yData[i],
            name: xData[i],
            boxpoints: 'all',
            jitter: 0.5,
            whiskerwidth: 0.2,
            fillcolor: 'cls',
            marker: {
                size: 2
            },
            line: {
                width: 1
            },
        };
        data.push(result);
    };
    //console.log(data);
    //
    layout = {
        title: 'Box Plot for student grade per lab',
        yaxis: {
            autorange: true,
            showgrid: true,
            zeroline: true,
            dtick: 5,
            gridcolor: 'rgb(255, 255, 255)',
            gridwidth: 1,
            zerolinecolor: 'rgb(255, 255, 255)',
            zerolinewidth: 2
        },
        margin: {
            l: 40,
            r: 30,
            b: 80,
            t: 100
        },
        paper_bgcolor: 'rgb(243, 243, 243)',
        plot_bgcolor: 'rgb(243, 243, 243)',
        showlegend: false
    };

    Plotly.newPlot('boxPlotGrade', data, layout);
}

// var xData = ['KB input w/ Strings 1', 'KB input w/ ints2',
//     'KB input w/ Strings 3', 'KB input w/ Strings 4'];
//
// var yData = [
//     [10,10,10,10,10,10,10,10,10,5],
//     [2,3,5,6,7,4,3,2,4,5],
//     [2,3,5,6,7,4,4,5],
//     [2,3,5,6,7,4,3,2,4,5]
// ];
//
// // console.log(yData);
// var colors = ['rgba(93, 164, 214, 0.5)', 'rgba(255, 144, 14, 0.5)',
//     'rgba(44, 160, 101, 0.5)', 'rgba(225, 65, 54, 0.5)'];
//
// var data = [];
//
// for ( var i = 0; i < xData.length; i ++ ) {
//     var result = {
//         type: 'box',
//         y: yData[i],
//         name: xData[i],
//         boxpoints: 'all',
//         jitter: 0.5,
//         whiskerwidth: 0.2,
//         fillcolor: 'cls',
//         marker: {
//             size: 2
//         },
//         line: {
//             width: 1
//         }
//     };
//     data.push(result);
// };
// //console.log(data);
// layout = {
//     title: 'Points Scored by the Top 9 Scoring NBA Players in 2012',
//     yaxis: {
//         autorange: true,
//         showgrid: true,
//         zeroline: true,
//         dtick: 5,
//         gridcolor: 'rgb(255, 255, 255)',
//         gridwidth: 1,
//         zerolinecolor: 'rgb(255, 255, 255)',
//         zerolinewidth: 2
//     },
//     margin: {
//         l: 40,
//         r: 30,
//         b: 80,
//         t: 100
//     },
//     paper_bgcolor: 'rgb(243, 243, 243)',
//     plot_bgcolor: 'rgb(243, 243, 243)',
//     showlegend: false
// };
//
// Plotly.newPlot('boxPlotGrade', data, layout);