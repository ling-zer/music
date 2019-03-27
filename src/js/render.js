//信息 + 图片 渲染到页面上 img + btn + info + time
//注意封闭作用域
(function($,root){

    function renderImg(src){
       var img = new Image();
       img.src = src;
       img.onload = function(){
           $('.img-box img').attr('src', src);
           root.blurImg(img, $('body'));
       }
    }
    function renderInfo(info){
        var str = ' <div class="song-name">' + info.song + '</div>\
        <div class="singer-naem">' + info.singer + '</div>\
        <div class="album-name">' + info.album + '</div>';

        $('.song-info').html(str);
    }
    function renderIsLike(like){
        if(like){
            $('.like').addClass('liking');
        }else{
            $('.like').removeClass('liking');
        }
    }

    function renderList(dataList){
        var str = '';
        for (var i = 0; i < dataList.length; i++) {
            str += '<li>' + dataList[i].song + '</li>';
        }
        $('.sliderList ul').html(str);
    }
    function renderTime(time){
        var minutes = Math.floor(time / 60); 
        var seconds = time - minutes * 60;
        if(minutes < 10){
            minutes = '0' + minutes;
        }
        var all = minutes + ':' + seconds;
        $('.all-time').text(all);
    }
    root.render = function(data){
        renderImg(data.image);
        renderInfo(data);
        renderIsLike(data.isLike); 
        renderTime(data.duration);
    }
    root.renderList = function(data){
        renderList(data);
    }

    //root.render = render;//暴露出来
})(window.Zepto, window.player || (window.player = {}));
