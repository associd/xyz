<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/2/9/0009
 * Time: 下午 5:01
 */
$path = $_POST["path"];
$res = array();

if(is_file($path)) {
   echo "isFile";
}else {
   $list = scandir($path);
   foreach ($list as $key => $val) {
      if(preg_match("/^[.]+/", $val)) {
         continue;
      }else{
         array_push($res, "/" . $val);
      }
   }
   array_unshift($res, "../");
   echo JSON_encode($res);
}
