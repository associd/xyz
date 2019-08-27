/**
 * JQuery extend: audio controller
 * Developed by ws04
 */
$.fn.extend({
    /**
     * Create an audio to element
     * @param name: audio name
     * @param volume: volume of the audio
     * @param loop: play loop or once
     * @returns jquery(this)
     */
    createAudio (name, volume, loop) {
        $(`<audio src="sound/${name}.mp3" autoplay ${loop ? 'loop' : ''}></audio>`).appendTo(this).on('ended', function () {
            $(this).remove();
        })[0].volume = volume;
        return this;
    },

    /**
     * change volume of audios
     * @param flag: audio volume (0-1)
     */
    openAudio (flag) {
        $(this).find('audio').each(function () {
            this.volume = flag;
        });
    },

    /**
     * control audios
     * @param flag: true for play audio, false for pause audio
     */
    playAudio (flag) {
        $(this).find('audio').each(function () {
            flag ? this.play() : this.pause();
        });
    }
});