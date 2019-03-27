(function($, root){
    function Control(len){
        this.index = 0; 
        this.len = len;
    }
    Control.prototype = {
        prev: function(){
            return this.getIndex(-1);
        },
        next: function(){
            return this.getIndex(1);
        },
        //计算改变后的索引
        getIndex: function(val){
            var index = this.index; //当前索引
            var len = this.len;
            var curIndex = (index + val + len) % len;
            this.index = curIndex; //更新当前索引
            return curIndex;  //改变后的索引
        },
        setIndex: function(index){
            this.index = index;
        }
    }
    root.controlIndex = Control;
})(window.Zepto, window.player || (window.player = {}));
