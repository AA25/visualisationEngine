/**
 * Created by Akingbade on 12/1/2016.
 */
//var labNames = [];

function labInputs(){
    var labInputs = $("#labEntries").val();
    var labInputsArr = labInputs.split(",");
    if (verifyLabInputs(labInputsArr)){
        retrieveData(labInputsArr);
        console.log("its valid");
    }else{
        console.log("not valid");
    }
}

function retrieveData(postData){
   $("#loader").show();
   $.ajax({
      url: "aggregateChartsHTML.php?function=getWholeData",
      data: {serverData : postData},
      type: 'post',
      error: function(XMLHttpRequest, textStatus, errorThrown){
          $("#loader").hide();
         alert('status:' + XMLHttpRequest.status + ', status text: ' + XMLHttpRequest.statusText);
      },
      success: function(result){
          $("#loader").hide();
          var resultCont = JSON.parse(result);
          var jsonLabData = resultCont[0];
          jsonLabData = cleanUpTable(jsonLabData);
          var labNames = resultCont[1];
          //console.log(jsonLabData);
          //boxPlotGrades(jsonLabData, labNames);
          boxPlotTimes(jsonLabData, labNames);
          groupByGrades(jsonLabData);
          groupByTime(jsonLabData);
      }
   });
}

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
            "Students with an average over 80",
            "Students with an average between 79-60",
            "Students with an average between 59-40",
            "Students with an average below 39",
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
    var avgGradePieChart = new Chart(ctxGrade,{
        type: 'pie',
        data: dataChart,
        options: {}
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

    Plotly.newPlot('boxPlotGrade2', data, layout);
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
        title: 'Box plots for each lab retrieved',
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

    Plotly.newPlot('boxPlotGrade2', data, layout);
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