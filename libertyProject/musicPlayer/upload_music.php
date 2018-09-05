<?php
include "../function.php";
include "DB.php";
include_once "music.php";
use Music\Music as Music;
$music = new Music($DB);

if($_FILES['file']['error'] > 0) {
    echo $_FILES['file']['error'];
}else {
    //获取相关信息
    $type = $_FILES['file']['type'];
    $suffix = substr(strstr($type, '/'), 1);
    $type = strstr($type, '/', true);
    $url = $_FILES['file']['tmp_name'];

    //判断本地是否存在与上传文件相同的文件

    //存放和解析mp3 并将相关数据存入数据库
    if($type == "audio") {

        $time = date('Y_m_d');
        $unid = uniqid();
        $imgfile = "resource/". $time . "_" . $unid . ".$suffix";

        move_uploaded_file($url, $imgfile);

        // 调用方法：
        // 返回的是一个包含时分秒的数组
        $mp3 = new MP3File($imgfile);
        $a = $mp3->getDurationEstimate();
        $b = $mp3->getDuration();
        $duration = $mp3::formatTime($b);
        $duration = ($duration["hours"] * 3600) + ($duration["minutes"] * 60) + $duration["seconds"];

        //整理好数据 存至数据库
        $list = read_mp3($imgfile, "resource");
        $list["Time"] = $duration;
        $list["Path"] = $imgfile;
        $error = $DB->insert($list);
        if($error) {
            unlink($imgfile);
            unlink($list["Albumimage"]);
        }

        //response
        $img = $list["Albumimage"];
        $path = $list["Path"];
        $time = $list["Time"];
        $time = floor($time / 60).date(":s", $time);
        $music->get_music_li([$list["Name"], $list["Composer"], $list["Album"], $time], $img, $path, $DB->mysqli->insert_id, "musicPlayer/");
    }
}
