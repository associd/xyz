<?php
include_once "DB.php";
include_once "../function.php";
$id = $_GET['id'];
$q = "SELECT Path,AlbumImage FROM Music WHERE id = $id";
$re = $DB->query($q);
$r = $re->fetch_assoc();
foreach ($r as $item) {
    unlink($item);
}
$DB->delete("Music", $_GET);
header("Location: ../index.php");
