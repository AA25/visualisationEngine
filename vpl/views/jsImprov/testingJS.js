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

var labelArr = [];
var pdf = [];
// for ( var i = -3; i < 3.1; i += 0.1 ) {
//     if(parseFloat(i.toFixed(1)) % 1 == 0){
//         labelArr.push( parseFloat(i.toFixed(0)) );
//     }else{
//         labelArr.push("");
//     }
//
//     pdf.push(NormalDensityZx(i, 0, 1));
// }
// var barlabels = [
//     0.48,1.06,0.72,0.35,0.62,0.27,0.64,0.61,0.49,0.79,0.24,0.28,0.86,0.95,0.29,0.64,0.32,0.77,1.23,1.71,
//     0.41,0.59,0.43,0.70,0.33,0.64,0.19,0.64,1.35,0.71,1.49,0.10,0.80,0.46,0.48,0.98,0.11,0.79,0.29,0.86,
//     0.39,0.42,0.76,0.33,0.61,0.70,0.40,0.95,0.99,0.32,0.42,0.17,0.01,0.07,0.18,0.87,0.95,0.10,0.20,0.21,
//     0.48,0.66,0.42,0.25,0.48,0.80,0.25,0.46,0.76,0.41,0.97,0.26,0.12,0.03,0.03,0.13,0.08,1.35,0.46,0.99,
//     0.49,0.92,0.45,0.45,0.50,0.38,1.45,0.53,0.53,0.66,0.69,0.77,0.63,0.63,0.30,0.62,0.58,0.03,0.25,0.13,
//     0.17,0.28,0.31,0.45,0.17,0.60,0.11,0.26,0.26,0.31,0.25,0.20,0.62,0.42,1.14,0.08,0.26,0.25,0.23,0.13,
//     0.15,0.18,0.21,0.37,0.28,1.30,0.09,0.58,0.68,0.37,0.10,0.42,0.07,0.23,0.94,0.35,0.25,0.17,0.13,0.11,
//     0.62,0.23,0.60,0.04,0.18,0.13,0.03,0.22,0.21,0.39,0.15,0.11,0.98,0.36,0.19,0.41,0.10,1.44,0.30,0.49,
//     0.11,0.55,0.39,0.36,0.31,0.08,0.12,0.99,0.55,0.09,0.18,0.11,1.11,0.64,0.11,1.16,0.03,0.03,0.61,0.11,
//     0.39,0.57,0.05,0.18,0.34,0.20,0.20,0.33,0.34,0.68,0.11,0.20,0.17,0.23,0.22,0.20,0.13,0.38,0.21,0.46,
//     0.43,0.08,0.06,0.19,0.12,0.23,0.67,0.09,1.58,1.22,0.31,0.56,0.38,0.03,0.33,0.50,0.32,1.48,0.64,0.07,
//     0.30,0.06,0.51,0.07,0.36,0.50,0.67];

// var data = {
//     labels: zScoreArrPDF,
//
//     datasets: [
//         {
//             label: "",
//             fill: false,
//             lineTension: 0.1,
//             backgroundColor: "#8d322c",
//             borderColor: "#C70039",
//             borderCapStyle: 'butt',
//             borderDash: [],
//             borderDashOffset: 0.0,
//             borderJoinStyle: 'miter',
//             pointBorderColor: "#C70039",
//             pointBackgroundColor: "#fff",
//             pointBorderWidth: 1,
//             pointHoverRadius: 5,
//             pointHoverBackgroundColor: "#fff",
//             pointHoverBorderColor: "#C70039",
//             pointHoverBorderWidth: 2,
//             pointRadius: 1,
//             pointHitRadius: 10,
//             data: zScoreArrPDF,
//             spanGaps: false
//         }
//     ]
// };
////barlabels = barlabels.sort(function(a,b){return a-b});
// var dataBar = {
//     labels: [367,13,15,16,17,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,43,44,45,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,85,86,87,88,89,90,91,92,93,94,95,102,103,104,105,106,107,108,111,112,114,115,116,119,120,121,122,123,124,125,129,131,132,133,134,135,136,137,138,142,143,144,145,152,153,154,155,158,159,160,161,163,164,165,167,168,169,170,171,175,176,177,178,179,180,181,182,183,191,192,193,194,195,196,197,198,199,202,203,204,205,207,208,209,210,211,214,215,217,218,219,220,221,222,223,224,226,227,229,230,231,232,235,238,240,241,243,244,245,246,247,250,251,252,253,254,255,256,262,266,267,269,270,271,283,284,285,286,287,291,292,293,294,295,298,305,306,308,309,313,314,315,316,317,318,319,320,325,328,329,330,332,333,334,335,336,338,339,340,341,342,343,345,],
//     datasets: [
//         {
//             label: "My First dataset",
//             backgroundColor: [
//                 // 'rgba(255, 99, 132, 0.2)',
//                 // 'rgba(54, 162, 235, 0.2)',
//                 // 'rgba(255, 206, 86, 0.2)',
//                 // 'rgba(75, 192, 192, 0.2)',
//                 // 'rgba(153, 102, 255, 0.2)',
//                 // 'rgba(255, 159, 64, 0.2)'
//             ],
//             borderColor: [
//                 // 'rgba(255,99,132,1)',
//                 // 'rgba(54, 162, 235, 1)',
//                 // 'rgba(255, 206, 86, 1)',
//                 // 'rgba(75, 192, 192, 1)',
//                 // 'rgba(153, 102, 255, 1)',
//                 // 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1,
//             data: barlabels
//         }
//     ]
// };
// ctx = document.getElementById("gauDistribution").getContext("2d");
// myLineChart = new Chart(ctx,{
//     type: 'bar',
//     data: dataBar,
//     options: {}
// });

startDefaultChartOptions();
$("#displayStatus").hide();
// $("#tableLoader").hide();

(function getTotalSubs() {
    $("#studentNo").html('<i class="fa fa-cog fa-spin fa-fw"></i>').show();

    $.ajax({
        url: "./phpImprov/testingPHP.php?function=getTable",
        //url: "./phpImprov/getTime.php?function=attachTime",
        //url: "./submissionslist.php?function=getSomething",
        data: {},
        type: 'post',
        error: function(XMLHttpRequest, textStatus, errorThrown){
            alert('status:' + XMLHttpRequest.status + ', status text: ' + XMLHttpRequest.statusText);
        },
        success: function(result){
            //console.log(result);
            jsonTable = JSON.parse(result);
            for(var i = 0; i<jsonTable.data.length; i++){
                jsonTable.data[i][9] = ((((jsonTable.data[i][9].toFixed(2))/100)*60)*100).toFixed(0);
                //jsonTable.data[i][9] = ((((barlabels[i].toFixed(2))/100)*60)*100).toFixed(0);
                //console.log(jsonTable.data[i][9]);
            }
            $("#studentNo").html(jsonTable.data.length).show();
            groupGrades();
            groupTimeData(jsonTable);
            gausiannD();
        }
    });
}());

/**
 * Created by Ademola Akingbade on 11/2/2016.
 */
/**
 * Define values where to put vertical lines at
 */

/**
 * Calculate data
 */
function gausiannD() {
    var resultsTime = [
        // -0.40,-0.30,-0.20,-0.10,
        0.48, 1.06, 0.72, 0.35, 0.62, 0.27, 0.64, 0.61, 0.49, 0.79, 0.24, 0.28, 0.86, 0.95, 0.29, 0.64, 0.32, 0.77, 1.23, 1.71,
        0.41, 0.59, 0.43, 0.70, 0.33, 0.64, 0.19, 0.64, 1.35, 0.71, 1.49, 0.10, 0.80, 0.46, 0.48, 0.98, 0.11, 0.79, 0.29, 0.86,
        0.39, 0.42, 0.76, 0.33, 0.61, 0.70, 0.40, 0.95, 0.99, 0.32, 0.42, 0.17, 0.01, 0.07, 0.18, 0.87, 0.95, 0.10, 0.20, 0.21,
        0.48, 0.66, 0.42, 0.25, 0.48, 0.80, 0.25, 0.46, 0.76, 0.41, 0.97, 0.26, 0.12, 0.03, 0.03, 0.13, 0.08, 1.35, 0.46, 0.99,
        0.49, 0.92, 0.45, 0.45, 0.50, 0.38, 1.45, 0.53, 0.53, 0.66, 0.69, 0.77, 0.63, 0.63, 0.30, 0.62, 0.58, 0.03, 0.25, 0.13,
        0.17, 0.28, 0.31, 0.45, 0.17, 0.60, 0.11, 0.26, 0.26, 0.31, 0.25, 0.20, 0.62, 0.42, 1.14, 0.08, 0.26, 0.25, 0.23, 0.13,
        0.15, 0.18, 0.21, 0.37, 0.28, 1.30, 0.09, 0.58, 0.68, 0.37, 0.10, 0.42, 0.07, 0.23, 0.94, 0.35, 0.25, 0.17, 0.13, 0.11,
        0.62, 0.23, 0.60, 0.04, 0.18, 0.13, 0.03, 0.22, 0.21, 0.39, 0.15, 0.11, 0.98, 0.36, 0.19, 0.41, 0.10, 1.44, 0.30, 0.49,
        0.11, 0.55, 0.39, 0.36, 0.31, 0.08, 0.12, 0.99, 0.55, 0.09, 0.18, 0.11, 1.11, 0.64, 0.11, 1.16, 0.03, 0.03, 0.61, 0.11,
        0.39, 0.57, 0.05, 0.18, 0.34, 0.20, 0.20, 0.33, 0.34, 0.68, 0.11, 0.20, 0.17, 0.23, 0.22, 0.20, 0.13, 0.38, 0.21, 0.46,
        0.43, 0.08, 0.06, 0.19, 0.12, 0.23, 0.67, 0.09, 1.58, 1.22, 0.31, 0.56, 0.38, 0.03, 0.33, 0.50, 0.32, 1.48, 0.64, 0.07,
        0.30, 0.06, 0.51, 0.07, 0.36, 0.50, 0.67

    ];
    //resultsTime = resultsTime.sort(function(a,b){return a-b});
    var zScoreArr = [];
    var zInitLength = zScoreArr.length;
    var zScoreArrPDF = [];
    var chartData = [];
    var totalll = 0;
    for (var i = 0; i < jsonTable.data.length; i++) {
        //var zScore = (jsonTable.data[i][9] - 23.7) / 18.5;
        //zScoreArr[i + zInitLength] = parseFloat(zScore.toFixed(2));
          var zScore = jsonTable.data[i][9];
          zScoreArr[i + zInitLength] = zScore;
    }
    // zScoreArr = zScoreArr.sort(function (a, b) {
    //     return a - b
    // });
    //console.log(zScoreArr);
    var verticals = [
        113
        //-3,-2,-1,0,1,2,3
    ];
    for (var j = 0; j < zScoreArr.length; j++) {
        // zScoreArrPDF[j] = parseFloat(NormalDensityZx(zScoreArr[j], 0, 1).toFixed(4));
        // if (zScoreArr[j] < -1.30) {
        //     var dp = {
        //         category: zScoreArr[j],
        //         value: 0 //x, Mean, StdDev
        //     };
        // } else {
        //     var dp = {
        //         category: zScoreArr[j],
        //         value: NormalDensityZx(zScoreArr[j], 0, 1) //x, Mean, StdDev
        //     };
        // }
        // if ( verticals.indexOf( Math.round( j * 10 ) / 10 ) !== -1 ) {
        //     dp.vertical = dp.value;
        // }
        //zScoreArrPDF[j] = parseFloat(NormalDensityZx(zScoreArr[j], 0, 1).toFixed(4));
        //console.log(zScoreArrPDF[j]);
        //console.log(zScoreArr[j]);
        var dp = {
                    category: j,
                    value: zScoreArr[j] //x, Mean, StdDev
                };
        chartData.push(dp);
    }
    // var lastValue;
    // for ( var i = -4; i < 4.1; i += 0.01 ) {
    //     var set = false;
    //     for(var j = 0; j<zScoreArr.length; ++j){
    //         if(parseFloat(i).toFixed(2) == zScoreArr[j]){
    //             var dp = {
    //                 category: i,
    //                 value: NormalDensityZx( zScoreArr[j], 0, 1 ) //x, Mean, StdDev
    //             };
    //             set = true;
    //             break;
    //         }
    //     }
    //     if(!set){
    //         var dp = {
    //             category: i,
    //             value: 0 //x, Mean, StdDev
    //         };
    //     }
    // if(parseFloat(i).toFixed(2) == 3){
    //     // var dp = {
    //     //     category: i,
    //     //     value: NormalDensityZx( 0, 0, 1 ) //x, Mean, StdDev
    //     // };
    // }else{
    //     var dp = {
    //         category: i,
    //         value: NormalDensityZx( i, 0, 1 ) //x, Mean, StdDev
    //     };
    // }
    // if ( verticals.indexOf( Math.round( i * 10 ) / 10 ) !== -1 ) {
    //     //console.log(verticals.indexOf( Math.round( i * 10 ) / 10 ));
    //     //dp.vertical = dp.value;
    // }
    // chartData.push( dp );
    //}

    /**
     * Create a chart
     */
    var chart = AmCharts.makeChart("chartdiv", {
        "type": "serial",
        "theme": "light",
        "dataProvider": chartData,
        "precision": 2,//was 2
        "valueAxes": [{
            "gridAlpha": 0.2,
            "dashLength": 0
        }],
        "startDuration": 0,
        "graphs": [{
            "balloonText": "[[category]]: <b>[[value]]</b>",
            "lineThickness": 3,
            "valueField": "value"
        }, {
            "balloonText": "",
            "fillAlphas": 1,
            "type": "column",
            "valueField": "vertical",
            "fixedColumnWidth": 2,
            "labelText": "[[value]]",
            "labelOffset": 20
        }],
        "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false
        },
        "categoryField": "category",
        "categoryAxis": {
            "gridAlpha": 0.05,
            "startOnAxis": true,
            "tickLength": 5,
            "labelFunction": function (label, item) {
                return '' + Math.round(item.dataContext.category * 10) / 10;
            }
        }

    });
}

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

//----------------------------------------------------------------------------------------------
// Calculates a point Z(x), the Probability Density Function, on any normal curve.
// This is the height of the point ON the normal curve.
// For values on the Standard Normal Curve, call with Mean = 0, StdDev = 1.
function NormalDensityZx( x, Mean, StdDev ) {
    var a = x - Mean;
    return Math.exp( -( a * a ) / ( 2 * StdDev * StdDev ) ) / ( Math.sqrt( 2 * Math.PI ) * StdDev );
}
//----------------------------------------------------------------------------------------------
// Calculates Q(x), the right tail area under the Standard Normal Curve.
function StandardNormalQx( x ) {
    if ( x === 0 ) // no approximation necessary for 0
        return 0.50;

    var t1, t2, t3, t4, t5, qx;
    var negative = false;
    if ( x < 0 ) {
        x = -x;
        negative = true;
    }
    t1 = 1 / ( 1 + ( 0.2316419 * x ) );
    t2 = t1 * t1;
    t3 = t2 * t1;
    t4 = t3 * t1;
    t5 = t4 * t1;
    qx = NormalDensityZx( x, 0, 1 ) * ( ( 0.319381530 * t1 ) + ( -0.356563782 * t2 ) +
        ( 1.781477937 * t3 ) + ( -1.821255978 * t4 ) + ( 1.330274429 * t5 ) );
    if ( negative == true )
        qx = 1 - qx;
    return qx;
}
//----------------------------------------------------------------------------------------------
// Calculates P(x), the left tail area under the Standard Normal Curve, which is 1 - Q(x).
function StandardNormalPx( x ) {
    return 1 - StandardNormalQx( x );
}
//----------------------------------------------------------------------------------------------
// Calculates A(x), the area under the Standard Normal Curve between +x and -x.
function StandardNormalAx( x ) {
    return 1 - ( 2 * StandardNormalQx( Math.abs( x ) ) );
}
//----------------------------------------------------------------------------------------------






























//Refactored Code, I don't need to make an ajax call for the same data again.
// function swapContent(cv){
//     $("#displayTable").html('<i class="fa fa-cog fa-spin fa-3x fa-fw"></i><br/><span class="">Loading...</span>').show();
//
//     $.ajax({
//         url: "./phpImprov/testingPHP.php",
//         data: {contentVar: cv},
//         type: 'post',
//         error: function(XMLHttpRequest, textStatus, errorThrown){
//             alert('status:' + XMLHttpRequest.status + ', status text: ' + XMLHttpRequest.statusText);
//         },
//         success: function(data){
//             $("#displayTable").html(data).show();
//         }
//     });
// }

//Refactored Code, I created the function createTempArr to deal with this
// loopCounter = 0;
// if(letter !== ''){
//     for(var i = 0; i<jsonTable.data.length; i++){
//         var getSubString = $(jsonTable.data[i][5]).text();
//         var gotSubstring = getSubString.substring(0, getSubString.indexOf('/'));
//         var substringInt = parseInt(gotSubstring);
//         var firstNameChar = $(jsonTable.data[i][2]).text();
//         if((substringInt >= 80) && (firstNameChar.charAt(0).toUpperCase() == letter)){
//             tempArray[0].push(jsonTable.data[loopCounter]);
//         }
//         loopCounter++;
//     }
// }else{
//     for(var i = 0; i<jsonTable.data.length; i++){
//         var getSubString = $(jsonTable.data[i][5]).text();
//         var gotSubstring = getSubString.substring(0, getSubString.indexOf('/'));
//         var substringInt = parseInt(gotSubstring);
//         if(substringInt >= 80 ){
//             tempArray[0].push(jsonTable.data[loopCounter]);
//         }
//         loopCounter++;
//     }
//     createLetterLinks(gradeGroup,tempArray);
// }
// loopCounter = 0;
// if(letter !== '') {
//     for (var i = 0; i < jsonTable.data.length; i++) {
//         var getSubString = $(jsonTable.data[i][5]).text();
//         var gotSubstring = getSubString.substring(0, getSubString.indexOf('/'));
//         var substringInt = parseInt(gotSubstring);
//         var firstNameChar = $(jsonTable.data[i][2]).text();
//         if ((substringInt <= 79) && (substringInt >= 60) && (firstNameChar.charAt(0).toUpperCase() == letter)){
//             tempArray[0].push(jsonTable.data[loopCounter]);
//         }
//         loopCounter++;
//     }
// }else{
//     for(var i = 0; i<jsonTable.data.length; i++){
//         var getSubString = $(jsonTable.data[i][5]).text();
//         var gotSubstring = getSubString.substring(0, getSubString.indexOf('/'));
//         var substringInt = parseInt(gotSubstring);
//         if((substringInt <= 79) && (substringInt >= 60)){
//             tempArray[0].push(jsonTable.data[loopCounter]);
//         }
//         loopCounter++;
//     }
//     createLetterLinks(gradeGroup,tempArray);
// }
// loopCounter = 0;
// if(letter !== '') {
//     for (var i = 0; i < jsonTable.data.length; i++) {
//         var getSubString = $(jsonTable.data[i][5]).text();
//         var gotSubstring = getSubString.substring(0, getSubString.indexOf('/'));
//         var substringInt = parseInt(gotSubstring);
//         var firstNameChar = $(jsonTable.data[i][2]).text();
//         if ((substringInt <= 59) && (substringInt >= 40) && (firstNameChar.charAt(0).toUpperCase() == letter)) {
//             tempArray[0].push(jsonTable.data[loopCounter]);
//         }
//         loopCounter++;
//     }
// }else{
//     for(var i = 0; i<jsonTable.data.length; i++){
//         var getSubString = $(jsonTable.data[i][5]).text();
//         var gotSubstring = getSubString.substring(0, getSubString.indexOf('/'));
//         var substringInt = parseInt(gotSubstring);
//         if((substringInt <= 59) && (substringInt >= 40)){
//             tempArray[0].push(jsonTable.data[loopCounter]);
//         }
//         loopCounter++;
//     }
//     createLetterLinks(gradeGroup,tempArray);
// }
// loopCounter = 0;
// if(letter !== '') {
//     for (var i = 0; i < jsonTable.data.length; i++) {
//         var getSubString = $(jsonTable.data[i][5]).text();
//         var gotSubstring = getSubString.substring(0, getSubString.indexOf('/'));
//         var substringInt = parseInt(gotSubstring);
//         var firstNameChar = $(jsonTable.data[i][2]).text();
//         if ((substringInt <= 39) && (substringInt >= 0) && (firstNameChar.charAt(0).toUpperCase() == letter)) {
//             tempArray[0].push(jsonTable.data[loopCounter]);
//         }
//         loopCounter++;
//     }
// }else{
//     for(var i = 0; i<jsonTable.data.length; i++){
//         var getSubString = $(jsonTable.data[i][5]).text();
//         var gotSubstring = getSubString.substring(0, getSubString.indexOf('/'));
//         var substringInt = parseInt(gotSubstring);
//         if((substringInt <= 39) && (substringInt >= 0)){
//             tempArray[0].push(jsonTable.data[loopCounter]);
//         }
//         loopCounter++;
//     }
//     createLetterLinks(gradeGroup,tempArray);
// }