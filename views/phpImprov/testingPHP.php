<?php

require_once dirname(__FILE__) . '/../../../../config.php';
//require_once dirname(__FILE__).'/../locallib.php';
//require_once dirname(__FILE__).'/../vpl.class.php';
//require_once dirname(__FILE__).'/../vpl_submission.class.php';

if($_GET['function']=='getTable') {
    //echo attachTimeData();
    //attachTime();
    //include('../submissionslist.php');
    //echo json_encode($id);
    echo json_encode($_SESSION['origTable']);
}else if($_GET['function']=='getSubs'){
    echo json_encode($_SESSION['thisSubmission']); //This might be redundant
}else{//When the initial php page is loaded. Please speed this up Ade LOL
//    include('/htmlImprov/testingHTML.html');
    $iD = required_param('id', PARAM_INT); // ID of lab question
    $counter = 0;
    foreach ($_SESSION['origTable']->data as $data){
        $intID = (int)$data[8];
        $thisCourse = new mod_vpl($iD);
        $timeSpent = vpl_get_working_periods_copy($thisCourse,$intID)[0];
        $_SESSION['origTable']->data[$counter][]=$timeSpent;
        $counter++;
    }
}
//include('../submissionslist.php');
function vpl_get_working_periods_copy($vpl,$userid){
    $submissionslist = $vpl->user_submissions($userid);
    if(count($submissionslist) == 0){
        return array();
    }
    $submissionslist=array_reverse($submissionslist);
    $workperiods=array();
    if($submissionslist){
        $last_save_time=0;
        $rest_time=20*60; //20 minutes. Rest period before next work
        $first_work=10*59; //10 minutes. Work before first save
        $intervals=-1;
        $work_start=0;
        foreach ($submissionslist as $submission) {
            /*Start new work period*/
            if($submission->datesubmitted-$last_save_time >= $rest_time){
                if($work_start>0){ //Is not the first submission
                    if($intervals>0){//First work as average
                        $first_work = (float)($last_save_time-$work_start)/$intervals;
                    }//else use the last $first_work
                    $workperiods[]=($last_save_time-$work_start+$first_work)/(3600.0);
                }
                $work_start=$submission->datesubmitted;
                $intervals=0;
            }else{//Count interval
                $intervals++;
            }
            $last_save_time=$submission->datesubmitted;
        }
        if($intervals>0){//First work as average
            $first_work = (float)($last_save_time-$work_start)/$intervals;
        }//else use the last $first_work
        $workperiods[]=($last_save_time-$work_start+$first_work)/(3600.0);
    }
    return $workperiods;
}

//$contentVar = $_POST['contentVar'];
//
//if($contentVar == '80'){
//    $loopCounter = 0;
//    $gotHundred = 0;
//    foreach ($_SESSION['origTable']->intGrade as $studentGrades) {
//        if ($studentGrades[0] >= 80){
//            $tableCon->data[] = array (
//                $_SESSION['origTable']->data[$loopCounter][0],
//                $_SESSION['origTable']->data[$loopCounter][1],
//                $_SESSION['origTable']->data[$loopCounter][2],
//                $_SESSION['origTable']->data[$loopCounter][3],
//                $_SESSION['origTable']->data[$loopCounter][4],
//                $_SESSION['origTable']->data[$loopCounter][5],
//                $_SESSION['origTable']->data[$loopCounter][6],
//                $_SESSION['origTable']->data[$loopCounter][7]);
//            $gotHundred++;
//        }
//        $loopCounter++;
//    }
//    var_dump($tableCon);
//    //var_dump($_SESSION['table100']);
//    //echo html_writer::table($tableCon);
//}else if($contentVar == '60'){
//    $loopCounter = 0;
//    $gotHundred = 0;
//    foreach ($_SESSION['origTable']->intGrade as $studentGrades) {
//        if (($studentGrades[0] <= 79) && ($studentGrades[0] >= 60)){
//            $tableCon->data[] = array (
//                $_SESSION['origTable']->data[$loopCounter][0],
//                $_SESSION['origTable']->data[$loopCounter][1],
//                $_SESSION['origTable']->data[$loopCounter][2],
//                $_SESSION['origTable']->data[$loopCounter][3],
//                $_SESSION['origTable']->data[$loopCounter][4],
//                $_SESSION['origTable']->data[$loopCounter][5],
//                $_SESSION['origTable']->data[$loopCounter][6],
//                $_SESSION['origTable']->data[$loopCounter][7]);
//            $gotHundred++;
//        }
//        $loopCounter++;
//    }
//    var_dump($tableCon);
//}else if($contentVar == '40'){
//    $loopCounter = 0;
//    $gotHundred = 0;
//    foreach ($_SESSION['origTable']->intGrade as $studentGrades) {
//        if (($studentGrades[0] <= 59) && ($studentGrades[0] >= 40)){
//            $tableCon->data[] = array (
//                $_SESSION['origTable']->data[$loopCounter][0],
//                $_SESSION['origTable']->data[$loopCounter][1],
//                $_SESSION['origTable']->data[$loopCounter][2],
//                $_SESSION['origTable']->data[$loopCounter][3],
//                $_SESSION['origTable']->data[$loopCounter][4],
//                $_SESSION['origTable']->data[$loopCounter][5],
//                $_SESSION['origTable']->data[$loopCounter][6],
//                $_SESSION['origTable']->data[$loopCounter][7]);
//            $gotHundred++;
//        }
//        $loopCounter++;
//    }
//    var_dump($tableCon);
//}else if($contentVar == '0'){
//    $loopCounter = 0;
//    $gotHundred = 0;
//    foreach ($_SESSION['origTable']->intGrade as $studentGrades) {
//        if (($studentGrades[0] <= 39) && ($studentGrades[0] >= 0)){
//            $tableCon->data[] = array (
//                $_SESSION['origTable']->data[$loopCounter][0],
//                $_SESSION['origTable']->data[$loopCounter][1],
//                $_SESSION['origTable']->data[$loopCounter][2],
//                $_SESSION['origTable']->data[$loopCounter][3],
//                $_SESSION['origTable']->data[$loopCounter][4],
//                $_SESSION['origTable']->data[$loopCounter][5],
//                $_SESSION['origTable']->data[$loopCounter][6],
//                $_SESSION['origTable']->data[$loopCounter][7]);
//            $gotHundred++;
//        }
//        $loopCounter++;
//    }
//    var_dump($tableCon);
//}

//ini_set('session.save_path','C:\wamp64\moodledata/sessions');
//session_start(); //Opening a session
//$sessionfile = ini_get('session.save_path') . '/' . 'sess_'.'gdqbci6851qocpdmeeqn356d85';
//echo 'session file: ', $sessionfile, ' ', '<br>', 'size: ', filesize($sessionfile), "\n";
//echo ini_get('session.save_path');