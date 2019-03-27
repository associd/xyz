<?php

$DB = new Mysqli("localhost", "root", "");

$res = $DB->multi_query("
   CREATE DATABASE IF NOT EXISTS MusicPlayer CHARACTER SET UTF8;
   USE MusicPlayer;
   CREATE TABLE IF NOT EXISTS Music (
      id int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name varchar(200),
      image varchar(200),
      author varchar(200)
   );
");

echo $DB->error;
