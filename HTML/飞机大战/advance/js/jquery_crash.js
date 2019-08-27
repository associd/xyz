/**
 * JQuery extend: check crash between two elements
 * Developed by ws04
 */
$.fn.extend({
    /**
     * Check crash function
     * @param ele2: the element that need to checked
     * @param cbFn: callback function, when the two elements crashed
     * @returns jquery(this)
     */
    crash (ele2, cbFn) {
        this.each(function (x, e1) {
            $(ele2).each(function (y, e2) {
                let e1T = $(e1).offset().top;
                let e1B = e1T + $(e1).height();
                let e2T = $(e2).offset().top;
                let e2B = e2T + $(e2).height();
                if(e1T<e2B && e2T<e1B){
                    let e1L = $(e1).offset().left;
                    let e1R = e1L + $(e1).width();
                    let e2L = $(e2).offset().left;
                    let e2R = e2L + $(e2).width();
                    if(e1L<e2R && e2L<e1R){
                        cbFn(e1, e2);
                        return false;
                    }
                }
            });
        });
        return this;
    }
})