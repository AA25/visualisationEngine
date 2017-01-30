<?php
/**
 * Created by PhpStorm.
 * User: Akingbade
 * Date: 12/9/2016
 * Time: 5:03 PM
 */
require_once dirname(__FILE__) . '/../../../../config.php';

if($_GET['function']=='attachTime') {
    echo 'hello';
    attachTime();
    //echo json_encode($_SESSION['origTable']);
}

function attachTime(){
    $thisID = required_param('id', PARAM_INT);
//    $thisArray = $_SESSION['origTable'];
//    $counter = 0;
//    foreach ($thisArray->data as $data){
//        $intID = (int)$data[8];
//        $thisCourse = new mod_vpl($thisID);
//        $timeSpent = vpl_get_working_periods_copy($thisCourse,$intID)[0];
//        $thisArray->data[$counter][]=$timeSpent;
//        $counter++;
//    }
    //return $thisID;
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