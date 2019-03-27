//1,获取数据
var root = window.player;
var nowIndex = 0; //当前第几首
var dataList; //记录取到的数据
var len;
var audio = root.audioManager;
var control;
var timer;
function getData(url) {
    $.ajax({
        type: 'GET',
        url: url,
        success: function (data) {
            dataList = data;
            len = data.length;
            control = new root.controlIndex(len);
            root.render(data[0]);
            root.renderList(data);
            audio.setAudioSrc(data[0].audio);
            bindEvent();
            $('.sliderList').hide();
        },
        error: function () {
            console.log('error');
        }
    })
}

//绑定事件
function bindEvent() {
    $('body').on('play:change', function (e, index) { //自定义事件

        control.setIndex(index);
        root.render(dataList[index]);
        audio.setAudioSrc(dataList[index].audio);
        if (audio.status == 'play') {
            audio.play();
            rotated(0);
        }
        $('.img-box').attr('data-deg', 0);
        $('.img-box').css({
            'transform': 'rotateZ(0deg)',
            'transition': 'none'
        });
        $('.pro-wrap svg .over').css({
            strokeDashoffset: '80'
        });
        $('.pro-wrap svg circle').css({
            transform: 'translateX(' + 0 + 'px)'
        });

    });
    
    $('.like').on('click', function () {
        $('.like').toggleClass('liking');
    });
    $('.prev').on('click', function () {
        nowIndex = control.prev();
        $('body').trigger('play:change', nowIndex);
    });
    $('.next').on('click', function () {
        nowIndex = control.next();
        $('body').trigger('play:change', nowIndex);
    });
    $('.play').on('click', function () {
        if (audio.status == 'pause') {
            audio.play();
            var deg = $('.img-box').attr('data-deg');
            rotated(deg);
        } else {
            audio.pause();
            clearInterval(timer);
        }
        $('.play').toggleClass('playing');

    });

    $('.list').on('click', function (e) {

        if(e.stopPropagation){ //取消事件冒泡
            e.stopPropagation();
        }else if(e.cancelBubble){//ie
            e.cancelBubble = true;
        }

        $('.sliderList').show(2000);
        $('.sliderList ul li').removeClass('living');
        $('.sliderList ul li').eq(nowIndex).addClass('living');
    
        $('.wrapper').on('click', function(e){
            
            $('.sliderList').hide();
        });
    });

    $('.sliderList ul').on('click', 'li', function (e) {
        var songName = $(e.target).text();//当前点击的歌曲
        for (var i = 0; i < len; i++) {
            if (dataList[i].song == songName) {
                nowIndex = i;
                break;
            }
        }
        $('body').trigger('play:change', nowIndex);
        $('.sliderList').hide();
    });

    $('.pro-wrap svg').on('click', function (e) {
        var totalWidth = $('.pro-wrap svg line').width(); //进度条长度
        var leftWidth = $('.pro-wrap svg line').offset().left; //圆点离左侧的距离
        var disX = e.clientX; //点击处离左侧距离
        var moveWidth = (disX - leftWidth) / totalWidth * 80; //要移动的距离
        audio.audio.currentTime = (disX - leftWidth) / totalWidth * dataList[nowIndex].duration; //设置音频当前播放时刻
        timeUpdate();
    });

}

function rotated(deg) {
    clearInterval(timer);
    deg = +deg;
    timer = setTimeout(increase, 500);
    function increase() {
        $('.img-box').attr('data-deg', deg);
        $('.img-box').css({
            'transform': 'rotateZ(' + deg + 'deg)',
            'transition': 'all 1s linear'
        });
        deg += 2;
        timer = setTimeout(increase, 500);
        timeUpdate();
    }
}
//更新时间,进度
function timeUpdate() {
    var curTime = Math.floor(audio.audio.currentTime);
    var min = Math.floor(curTime / 60);
    var sec = curTime - min * 60;
    if (min < 1) {
        min = '00';
    } else if (min < 10) {
        min = '0' + min;
    }
    if (sec < 10) {
        sec = '0' + sec;
    }
    $('.cur-time').text(min + ':' + sec);
    var percent = curTime / dataList[nowIndex].duration;
    var move = 80 * percent;
    var moveLen = 80 - move;
    $('.pro-wrap svg .over').css({
        strokeDashoffset: moveLen + ''
    });
    $('.pro-wrap svg circle').css({
        transform: 'translateX(' + move + 'px)'
    })
}


getData('/mock/data.json');
//bindEvent();
//信息 + 图片 渲染到页面上 render
//点击按钮  操作   音频播放，暂停，切歌，
//进度条运动与拖拽，图片旋转，列表切歌


