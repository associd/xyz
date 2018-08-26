<?php
header("Content-Type: text/html; charset=UTF-8");
$suf = ['.mp3', ".MP3"];
$list = scandir('./sound');
$path = [];
foreach($list as $p) {
    foreach($suf as $v) {
        if(strpos($p, $v)) {
            array_push($path, iconv('gbk', 'utf-8', $p));
            break;
        }
    }
}
include 'v.html';
