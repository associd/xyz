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
         if(is_file($path . "/" . $val)) {
            array_push($res, ["file" => $val, "type" => "file"]);
         }else if(is_dir($path . "/" . $val)) {
            array_push($res, ["dir" => $val, "type" => "dir"]);
         }
      }
   }
   array_unshift($res, ["dir" => "../", "type" => "dir"]);
   echo JSON_encode($res);
}
