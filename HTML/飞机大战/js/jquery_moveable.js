/**
 * JQuery extend: move element
 * Developed by ws04
 */
$.fn.extend({
    /**
     * Move element
     * @param playingFn: animation function
     * @param spaceFn: when the user push space bar
     * @returns jquery(this)
     */
    moveable (playingFn, spaceFn) {
        let self = $(this)[0];
        self.actions = {
            l: false,
            r: false,
            t: false,
            b: false,
            s: true,
            playing : true
        }

        $(document).on('keydown', function (e) {
            switch(e.keyCode){
                case 37: this.actions.l=true; break;
                case 39: this.actions.r=true; break;
                case 38: this.actions.t=true; break;
                case 40: this.actions.b=true; break;
                case 32:
                    if(this.actions.playing && this.actions.s){
                        this.actions.s = false;
                        spaceFn && spaceFn.bind(this)();
                    }
                break;
            }
        }.bind(self));

        $(document).on('keyup', function (e) {
            switch(e.keyCode){
                case 37: this.actions.l=false; break;
                case 39: this.actions.r=false; break;
                case 38: this.actions.t=false; break;
                case 40: this.actions.b=false; break;
                case 32: this.actions.s=true; break;
            }
        }.bind(self));

        (function () {
            if(this.actions.playing){
                let eleTop = $(this).position().top;
                let eleLeft = $(this).position().left;
                let maxTop = $(this).parent().height() - $(this).height() - 10;
                let maxLeft = $(this).parent().width() - $(this).width() - 10;
                this.actions.l && eleLeft>10 && $(this).css('left', '-=8px');
                this.actions.r && eleLeft<maxLeft && $(this).css('left', '+=8px');
                this.actions.t && eleTop>10 && $(this).css('top', '-=8px');
                this.actions.b && eleTop<maxTop && $(this).css('top', '+=8px');
                playingFn && playingFn.bind(this)();
            }
            requestAnimationFrame(arguments.callee.bind(this));
        }.bind(self))();

        return this;
    }
});