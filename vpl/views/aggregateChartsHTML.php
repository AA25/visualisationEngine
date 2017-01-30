<?php
/**
 * Created by PhpStorm.
 * User: Akingbade
 * Date: 12/9/2016
 * Time: 8:34 PM
 */

require_once dirname(__FILE__).'/../../../config.php';
require_once $CFG->dirroot.'/mod/vpl/locallib.php';
require_once $CFG->dirroot.'/mod/vpl/vpl.class.php';
require_once $CFG->dirroot.'/mod/vpl/vpl_submission_CE.class.php';
require_login();

if($_GET['function']=='getWholeData'){
    $wholeLabData = [];
    $labQuestions = [];
    $queryReport = "Data was successfully retrieved";

    for($i = 0; $i < sizeof($_REQUEST['serverData']); $i++){
        $testInst = new mod_vpl((int)$_REQUEST['serverData'][$i]);
        $question = $testInst->get_course_module()->name;
        $labQuestions[] = $question;
        $stuSubmissions = $testInst->all_last_user_submission();
        $wholeLabData = getDataPerLab($stuSubmissions,$wholeLabData, $testInst, $question, $DB);
    }
    $responsedWith = array(
        $wholeLabData, $labQuestions
    );
    echo json_encode($responsedWith);
    //echo json_encode($wholeLabData);
}else{
    include('/htmlImprov/aggregateCharts.html');
}

function getUserName($testInst, $userID, $DB){
   $userDetails = $DB->get_record('user',array('id' => $userID));
   $userFullName = $testInst->fullname($userDetails, false);
   return $userFullName;
}

function getDataPerLab($stuSubmissions,$wholeLabData,$testInst,$question,$DB){
    foreach ($stuSubmissions as $students){
        if(!array_key_exists($students->userid, $wholeLabData)){
            $wholeLabData[$students->userid] = [ "userID" => [], "fullName" => [], "stuGrades" => [], "stuTimes" => [], "questions" => [], "stuAvgGrade" => [], "stuAvgTime" => []];
            $wholeLabData[$students->userid]["stuAvgGrade"][0] = 0;
            $wholeLabData[$students->userid]["stuAvgTime"][0] = 0;
        }
        $wholeLabData[$students->userid]["userID"][0] = $students->userid;
        $userName = $wholeLabData[$students->userid]["fullName"][0];
        if($userName == null){
            $userFullName = getUserName($testInst,$students->userid,$DB);
            $wholeLabData[$students->userid]["fullName"][0] = $userFullName;
        }
        $wholeLabData[$students->userid]["questions"][] = $question;
        $gradeValue = $students->grade;
        if($gradeValue === null){
            $gradeValue = 'No Grade';
        }
        $wholeLabData[$students->userid]["stuGrades"][] = $gradeValue;
        $totalTime = 0.0;
        foreach (vpl_get_working_periods_copy($testInst,$students->userid) as $times){
            $totalTime += $times;
        }
        $totalTime = (round(((round($totalTime,2)/100)*60)*100,0));
        $wholeLabData[$students->userid]["stuTimes"][] = $totalTime;
    }
    return $wholeLabData;
}

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



