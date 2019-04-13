<?php
namespace Music;
class Music {
    public function __construct($DB)
    {
        $this->music_list = $DB->selectcol("Music", ["Name", "Composer", "Album", "Time", "id", "Path", "Albumimage"]);
    }

    public function get_music() {
        $music_list = $this->music_list;
        foreach ($music_list as $item) {
            $img = array_pop($item);
            $path = array_pop($item);
            $id = array_pop($item);
            $item["Time"] = floor($item["Time"] / 60) .date(":s", $item["Time"]);
            $this->get_music_li($item, $img, $path, $id);
        }
    }
    public function get_music_li($list, $img, $path, $id) {
        $str =  "<li img=./".$img." path=./".$path."><ul>";
        foreach ($list as $item) {
            $str .= "<li><a>$item</a></li>";
        }
        $str .= "</ul>";
        $str .= "<a href='./del.php?id=$id'>删除</a></li>";
        echo $str;
    }
}

