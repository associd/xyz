<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link type="favicon" rel="shortcut icon" href="favicon.ico" />
    <?php load_js($js_array); ?>
    <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.js"></script>
    <?php load_css($css_array); ?>
    <title>Document</title>
</head>
<body>
    <header>
      <div class="frequncy-control fixed-right" id="frequency-setting">
         <ul class="f-menu">
            <li></li>
         </ul>
      </div>
      <div class="canvas-wraper" id="canvas-wraper">
         <canvas class="audio-canvas" id="audio-canvas" height="220"></canvas>
      </div>
      <div class="html-bg hide" id="active-albumimg">
         <canvas class="imgData" width="300" height="300"></canvas>
      </div>
      <div class="flex">
            <div class="imgwraper m10 albumimg">
                <img class="music-img" src="" alt="">
            </div>
            <div class="mt20 f0 ovfe music-info">
                <div class="music-name big ovfe mb10"></div>
                <div class="music-album mid ovfe mb10"></div>
                <div class="music-composer mid ovfe "></div>
            </div>
        </div>
      <div class="slide-box">
            <div class="btn down" id="slide"></div>
        </div>
    </header>
    <main class="scroll-box bg-remind-box">
         <ul class="music-title flex">
            <li class="col f4">标题</li>
            <li class="col f2o5">作者</li>
            <li class="col f2o5">专辑</li>
            <li class="col f1">时间</li>
            <li class="">操作</li>
         </ul>
        <ul class="music-list scroll-inner">
            <?php   use Music\Music;
                    $music = new Music($DB);
                    $music->get_music();
            ?>
        </ul>
        <div class="bg-reminding">
           拖拽mp3文件至此上传
        </div>
    </main>
    <footer class="control flex">
        <div class="audiobox flex">
            <div class="play-control flex">
               <div class="imgwraper l" id="audio-last">
                  <div title="上一首" alt=""></div>
               </div>
               <div class="imgwraper c" id="audio-pause">
                  <div id="play" title="播放" class="dpib"></div>
                  <div id="pause" title="暂停" class=""></div>
               </div>
               <div class="imgwraper r" id="audio-next">
                  <div title="下一首"></div>
               </div>
            </div>
            <div class="time flex f1">
               <span class="current">2:44</span>
               <div class="progress">
                  <div class="curprogress"></div>
                  <div class="cur drag" id="audio-current-time"></div>
               </div>
               <span class="end">5:35</span>
            </div>
        </div>
        <div class="vol f1 flex">
            <div class="imgwraper volicon">
                <img src="img/v.png" alt="">
            </div>
            <div class="progress" id="audio-volume">
                <div class="curprogress"></div>
                <div class="cur drag"></div>
            </div>
        </div>
        <div class="other">
            随机
        </div>
        <div class="userConfirm" id="userConfirm">
          <div class="">
             将要播放音频
          </div>
          <div class="t-center">
             <input id="confirm" type="button" name="" value="确定">
          </div>
        </div>
    </footer>
</body>
</html>
