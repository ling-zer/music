//控制音频播放
(function($, root){
//play pause getAudioSrc 
    function AudioManager(){
        //创建一个audio对象
        this.audio = new Audio();
        // this.src = src;
        //audio默认状态
        this.status = 'pause';
    }
    AudioManager.prototype = {
        play: function(){
            this.audio.play();
            this.status = 'play';
        },
        pause: function(){
            this.audio.pause();
            this.status = 'pause';
        },
        setAudioSrc: function(src){
            this.audio.src = src;
            this.audio.load();//加载
          
        }
    }
    root.audioManager = new AudioManager();//暴露出去


})(window.Zepto, window.player || (window.player = {}))