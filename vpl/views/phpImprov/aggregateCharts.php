<?php
/**
 * Created by PhpStorm.
 * User: Akingbade
 * Date: 12/1/2016
 * Time: 7:17 PM
 */

require_once dirname(__FILE__) . '/../../../../config.php';
require_once dirname(__FILE__).'/../locallib.php';
require_once dirname(__FILE__).'/../vpl.class.php';
require_once dirname(__FILE__).'/../vpl_submission.class.php';
//
require_login();

if($_GET['function']=='retrieveData') {
    $wholeLabData = [];

    //$wholeLabData = getDataPerLab($_SESSION['$inst1'],$wholeLabData,$_SESSION['$studSubmissions1']);

    //$testInst = new mod_vpl(154);
    //$stuSubmissions = $testInst->all_last_user_submission();
    //$wholeLabData = getDataPerLab($stuSubmissions,$wholeLabData, $testInst);

    echo json_encode($wholeLabData);
    //echo $_POST['q1'];
}else{
    $testInst = new mod_vpl(154);
    $stuSubmissions = $testInst->all_last_user_submission();
    $wholeLabData = getDataPerLab($stuSubmissions,$wholeLabData, $testInst);

//    $inst1 = new mod_vpl(154);
//    $_SESSION['$inst1'] = $inst1;
//    $_SESSION['$studSubmissions1'] = $studSubmissions1;
}

function getDataPerLab($stuSubmissions,$wholeLabData,$testInst){
    foreach ($stuSubmissions as $students){
        if(!array_key_exists($students->userid, $wholeLabData)){
            $wholeLabData[$students->userid] = ["stuAvgGrade" => [], "stuAvgTime" => []];
        }
        $gradeValue = $students->grade;
        if($gradeValue === null){
            $gradeValue = 'No Grade';
        }
        $wholeLabData[$students->userid]["stuAvgGrade"][] = $gradeValue;
        $totalTime = 0.0;
        foreach (vpl_get_working_periods_copy($testInst,$students->userid) as $times){
            $totalTime += $times;
        }
        $totalTime = round($totalTime,2);
        $wholeLabData[$students->userid]["stuAvgTime"][] = $totalTime;
    }
    return $wholeLabData;
}
//$testInst = new mod_vpl(155);
//$stuSubmissions = $testInst->all_last_user_submission();
//$wholeLabData = getDataPerLab($stuSubmissions,$wholeLabData, $testInst);
//
//$testInst = new mod_vpl(156);
//$stuSubmissions = $testInst->all_last_user_submission();
//$wholeLabData = getDataPerLab($stuSubmissions,$wholeLabData, $testInst);
//
//$testInst = new mod_vpl(157);
//$stuSubmissions = $testInst->all_last_user_submission();
//$wholeLabData = getDataPerLab($stuSubmissions,$wholeLabData, $testInst);

