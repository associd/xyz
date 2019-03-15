<style>
    div{
        width: 100px;
        height: 100px;
        background-color: #ff00ff88;
    }

</style>


<?php

$i = 1;

while($i <= 100) {
    echo "<div></div>";
    $i = $i + 1;
}

echo $i;