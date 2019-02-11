<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/2/9/0009
 * Time: 下午 5:01
 */
 $list = scandir("../libertyProject");
 $res = array();
 foreach ($list as $key => $val) {
     if(preg_match("/[.]+/", $val)) {
         continue;
     }else{
        array_push($res, $val);
     }
 }
 echo JSON_encode($res);