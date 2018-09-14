<?php
include "../function.php";
include "DB.php";
include_once "music.php";
use Music\Music as Music;


//分片传输
if($_POST["token"] != "end") {
   //文件错误
   if($_FILES['file']['error'] > 0) {
      echo $_FILES['file']['error'];die;
   }
   $file = $_FILES["file"];
   $fileName = $file["name"];
   file_put_contents("resource/$fileName", file_get_contents($file["tmp_name"]), FILE_APPEND);
}else {
    //获取相关信息
    $name = $_POST["fileName"];
    $type = substr($name, strrpos($name, ".") + 1);
    $url = $name;

    //判断本地是否存在与上传文件相同的文件

    //存放和解析mp3 并将相关数据存入数据库
    if($type == "mp3") {

        $time = date('Y_m_d');
        $unid = uniqid();
        $path = "resource/". $time . "_" . $unid . ".$type";

        rename("resource/$url", $path);

        // 调用方法：
        // 返回的是一个包含时分秒的数组
        $mp3 = new MP3File($path);
        $a = $mp3->getDurationEstimate();
        $b = $mp3->getDuration();
        $duration = $mp3::formatTime($b);
        $duration = ($duration["hours"] * 3600) + ($duration["minutes"] * 60) + $duration["seconds"];

        //整理好数据 存至数据库
        $list = read_mp3($path, "resource");
        $list["Time"] = $duration;
        $list["Path"] = $path;
        $error = $DB->insert($list);
        if($error) {
            unlink($path);
            unlink($list["Albumimage"]);
        }

        //response
        $img = $list["Albumimage"];
        $time = $list["Time"];
        $time = floor($time / 60).date(":s", $time);

        $music = new Music($DB);
        $music->get_music_li([$list["Name"], $list["Composer"], $list["Album"], $time], $img, $path, $DB->mysqli->insert_id, "musicPlayer/");
    }
}
