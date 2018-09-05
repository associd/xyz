<?php
include_once 'function.php';

$name = 'musicPlayer';
$js_array = get_file(['.js'], $name.'/js');
$css_array = get_file(['.css'], $name.'/css');

include_once "./$name/index.php";
