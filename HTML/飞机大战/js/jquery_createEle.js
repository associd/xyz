/**
 * JQuery extend: Create element
 * Developed by ws04
 */
$.fn.extend({
    /**
     * Create element function
     * @param name: class name of the element
     * @param css: css style
     * @param attr: attribute
     * @returns jquery(new element)
     */
    createEle (name, css, attr) {
        let ele = $(`<div class="${name}"></div>`).appendTo(this);
        css.top=='rand' && (css.top = Math.random()*($(this).height() - ele.height() - 80) + 80);
        css.left=='rand' && (css.left = Math.random()*($(this).width() - ele.width()));
        ele.css(css).attr(attr).css('animation-play-state', 'running').on('webkitAnimationEnd', function () {
            $(this).remove();
        });
        return ele;
    }
})