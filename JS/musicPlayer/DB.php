<?php
namespace DB;
class DataBase {
    public function __construct() {
        $server_name = "localhost";
        $user = "root";
        $password = "";
        $mysqli = new \mysqli($server_name, $user, $password);
        if($error = $mysqli->connect_error) {
            echo $error;
        }
        $this->mysqli = $mysqli;
        $this->DB_name = "Audio";
        $mysqli->query("USE $this->DB_name");
        if($errno = $mysqli->errno) {
            if($errno == 1049) {
                $this->mpinit();
            }
        }
    }

    /**
     * @return string
     */
    public function mpdrop()
    {
        $this->mysqli->multi_query("DROP DATABASE $this->DB_name");
    }

    /**
     * @return null
     */
    public function mpinit()
    {
        $DB_name = $this->DB_name;
        $mpinit = "
            CREATE DATABASE IF NOT EXISTS $DB_name CHARACTER SET UTF8;
            USE $DB_name;
            CREATE TABLE IF NOT EXISTS Music (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                Name VARCHAR(200) NOT NULL,
                Album VARCHAR(200) NOT NULL,
                Composer VARCHAR(200) NOT NULL,
                AlbumImage VARCHAR(200) NOT NULL,
                Path VARCHAR(200) NOT NULL,
                Time VARCHAR(200) NOT NULL
            );
        ";
        $this->mysqli->multi_query($mpinit);
    }

    /**
     * @return null
     * do insert database
     */
    public function insert($list)
    {
        $mysqli = $this->mysqli;
        $mysqli->query("USE $this->DB_name");
        $keys = join(",", array_keys($list));
        $values = array_values($list);
        foreach($values as $k => $v) {
            $values[$k] = addslashes($v);
        }
        $values = "'".join("','", $values)."'";
        $q = "INSERT INTO Music ($keys) VALUES ($values)";
        $mysqli->query($q);
        if($error = $mysqli->error) {
            echo $error."\n";
        }
        return $error;
    }

    /**
     * @return array
     */
    public function selectall($name)
    {
        $DB = $this->mysqli;
        $q = "SELECT * FROM $name";
        $list = [];
        $r = $DB->query($q);
        while($row = $r->fetch_assoc()) {
            array_push($list, $row);
        }
        return $list;
    }

    /**
     * @return string
     */
    public function selectcol($name, $cols)
    {
        $DB = $this->mysqli;
        $cols = join(",",$cols);
        $q = "SELECT $cols FROM $name";
        $list = [];
        $r = $DB->query($q);
        while($row = $r->fetch_assoc()) {
            array_push($list, $row);
        }
        return $list;
    }

    public function delete($table, $where)
    {
        $DB = $this->mysqli;
        $w = "";
        foreach($where as $key => $val) {
            $w .= "$key = $val,";
        }
        $where = substr($w, 0, -1);
        $DB->query("DELETE FROM $table WHERE $where");
    }

    public function query($query)
    {
        $DB = $this->mysqli;
        return $DB->query($query);
    }
}
$DB = new DataBase();
