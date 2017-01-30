/**
 * Created by Akingbade on 11/14/2016.
 */
var submissionsArr,
    myLineChart,
    ctx;
(function getSubsData(){


    $.ajax({
        url: "./phpImprov/testingPHP.php?function=getSubs",
        data: {},
        type: 'post',
        error: function(XMLHttpRequest, textStatus, errorThrown){
            alert('status:' + XMLHttpRequest.status + ', status text: ' + XMLHttpRequest.statusText);
        },
        success: function(result){
            submissionsArr = JSON.parse(result);
            console.log(submissionsArr);
            fillChartData();
        }
    });
}());

function fillChartData(){
    var labelStringArr = ["Sub 0"];
    for(var i = 1; i <= submissionsArr.length; i++){
        labelStringArr.push("Sub " + i.toString());
    }
    var data = {
        labels: labelStringArr,
        datasets: [
            {
                label: "Byte size of",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "#8d322c",
                borderColor: "#C70039",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "#C70039",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "#C70039",
                pointHoverBorderWidth: 2,
                pointRadius: 3,
                pointHitRadius: 10,
                data: [0, 538, 530, 550, 500],
                spanGaps: false
            }
        ]
    };

    ctx = document.getElementById("sizeTable").getContext("2d");
    myLineChart = new Chart(ctx,{
        type: 'line',
        data: data,
        options: {}
    });
}

document.getElementById("sizeTable").onclick = function(evt) {
    var activePoints = myLineChart.getElementsAtEvent(evt);
    if(activePoints.length !== 0) {
        console.log(activePoints);
    }
    // if(activePoints.length !== 0){
    //     var label = activePoints[0]._model.label;
    //     if(label == "Students with over 80"){
    //         constructTableContent(80,'');
    //     }else if(label == "Students between 79-60"){
    //         constructTableContent(60,'');
    //     }else if(label == "Students between 59-40"){
    //         constructTableContent(40,'');
    //     }else if(label == "Students between 40-0"){
    //         constructTableContent(0,'');
    //     }else if(label == "Students yet to be graded"){
    //         constructTableContent(-1,'');
    //     }else if(label == "Possible Anomalies with grade"){
    //         constructTableContent(-99,'');
    //     }
    // }
};
