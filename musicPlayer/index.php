<?php
include_once 'function.php';

$name = 'musicPlayer';
$js_array = get_file(['.js'], './js');
$css_array = get_file(['.css'], './css');

include_once "DB.php";
include_once "music.php";
include_once "musicPlayer.php";
