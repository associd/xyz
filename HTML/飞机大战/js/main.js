/**
 * 'Star Battle' game logic
 * Developed by ws04
 */
window.onload = function () {
    /**
     * game initial: hidden others board, move logo and instructions with animations
     */

    $('.form-board, .ranking-board').fadeOut(0);
    $('.logo').addClass('instructions').on('webkitTransitionEnd', function () {
        $('.instructions-board>*, .planet-box').each(function (i) {
            $(this).css('animation', `general 0.3s ${i / 10}s forwards`);
        });
    });

    /**
     * After click 'Start Game' button
     * Hidden instructions board and move logo
     */
    $('.btn-start').one('click', function () {
        $('.instructions-board').fadeOut();
        $('.logo').addClass('gaming');
        $('.planet-box').css({'left': '+=120px', 'z-index': 'auto'});
        $('.planet-item, .container, .fuel-counter, .player').css('animation-play-state', 'running');
        /**
         * Game started: start timer, bind event to these elements, background music start and player moveable
         */
        $('.player').on('webkitAnimationEnd', function () {
            game.timer();
            $(document).on('keydown', function (e) {
                e.keyCode == 80 && $('.setting-play').click()
            });
            $('.setting-play').on('click', setting.play);
            $('.setting-audio').on('click', setting.audio);
            $('.setting-font-plus').on('click', setting.fontPlus);
            $('.setting-font-minus').on('click', setting.fontMinus);
            $('.container').createAudio('background', game.audio, 'loop');
            $('.player').moveable(player.playingFn, player.shot);
        });
    });


    /**
     * Player related informations
     */
    let player = {
        /**
         * The function that always play with animation
         */
        playingFn() {
            // Enemy shot
            $('.enemy.collision[shot]').each(function () {
                if ($(this).position().left < 700) {
                    $(this).removeAttr('shot');
                    $(game.container).createEle('enemy-bullet collision', {
                        top: $(this).position().top + 37,
                        left: $(this).position().left,
                        animationDuration: game.getRandTime() / 2 + 's'
                    }, {
                        score: 0,
                        fuel: -150
                    });
                }
            });

            // Player crash with others element
            $('.player').crash($('.collision:not(.bullet)'), function (e1, e2) {
                $(e2).css('visibility', 'hidden').removeClass('collision');
                let fuel = $(e2).attr('fuel') / 1;
                game.fuel += fuel;
                game.fuel > 300 && (game.fuel = 300);
                game.score += $(e2).attr('score') / 1;
                if ($(e2).attr('destroy')) {
                    $(game.container).createAudio('destroyed', game.audio);
                }
                if (fuel < 0) {
                    $(game.container).createEle('layer-red', {}, {});
                }
            });

            // Player shot with others element
            $('.bullet.collision').crash($('.collision:not(.bullet, .fuel, .enemy-bullet)'), function (e1, e2) {
                $(e1).css('visibility', 'hidden').removeClass('collision');

                let life = $(e2).attr('life') - 1;
                $(e2).attr('life', life);
                if (life <= 0) {
                    let score = $(e2).attr('score') / 1;
                    game.score += score;
                    score != 0 && $(game.container).createEle(`score-counter score-${score > 0 ? 'plus' : 'minus'}`, {
                        top: $(game.player).position().top,
                        left: $(game.player).position().left
                    }, {}).text(score);
                    $(e2).css('visibility', 'hidden').removeClass('collision');
                    if ($(e2).attr('destroy')) {
                        $(game.container).createAudio('destroyed', game.audio);
                    }
                }
            });

            // Game over when the fuel less than 0
            game.fuel < 0 && game.over();

            // Render game informations to the game
            $('.time-info').text(Math.round(game.time / 10));
            $('.score-info').text(game.score);
            $('.fuel-info').text(Math.round(game.fuel / 10));
            $('.fuel-counter').css('width', game.fuel / 3 + '%');
        },

        /**
         * Player shot: create shot element, create audio
         */
        shot() {
            $(game.container).createAudio('shoot', game.audio).createEle('bullet collision', {
                top: $(game.player).position().top + 17,
                left: $(game.player).position().left + 100
            }, {});
        }
    }


    /**
     * Game relate informations
     * Game elements: game board and player
     * Game informations: name, score, time, fuel
     * Game setting: audio, font size
     */
    let game = {
        container: $('.container')[0],
        player: $('.player')[0],

        name: '',
        score: 0,
        time: 0,
        fuel: 150,

        audio: 1,
        font: 16,

        /**
         * Game timer: count time, fuel, create elements in times
         */
        timer() {
            setInterval(function () {
                if (game.player.actions.playing) {
                    game.time++;
                    game.fuel--;

                    if (!(game.time % 40)) {
                        $(game.container).createEle('friend collision', {
                            top: 'rand',
                            animationDuration: game.getRandTime() + 's, 0.4s'
                        }, {
                            score: -10,
                            fuel: -150,
                            life: 1,
                            destroy: true
                        });
                    }

                    if (!(game.time % 35)) {
                        $(game.container).createEle('enemy collision', {
                            top: 'rand',
                            animationDuration: game.getRandTime() + 's, 0.4s'
                        }, {
                            score: 5,
                            fuel: -150,
                            life: 1,
                            shot: true,
                            destroy: true
                        });
                    }

                    if (!(game.time % 30)) {
                        $(game.container).createEle(`aestroid aestroid-${~~(Math.random() * 4) + 1} collision`, {
                            top: 'rand',
                            animationDuration: game.getRandTime() + 's'
                        }, {
                            score: 10,
                            fuel: -150,
                            life: 2,
                            destroy: true
                        });
                    }

                    if (!(game.time % 25)) {
                        $(game.container).createEle('fuel collision', {
                            left: 'rand',
                            animationDuration: game.getRandTime() + 's'
                        }, {
                            score: 0,
                            fuel: 150
                        });
                    }
                }
            }, 100);
        },

        /**
         * Create a rand time of the game
         * @returns rand time
         */
        getRandTime() {
            return Math.random() * 2 + 6;
        },

        /**
         * When the game over
         */
        over() {
            $('.setting-play').click();
            $('.form-board').fadeIn();
            $('.logo').addClass('form');
            $('.layer-red').css('animation-play-state', 'running');
            $('.input-name').on('input', function () {
                game.name = $(this).val();
                game.name ? $(this).next().removeClass('disabled') : $(this).next().addClass('disabled');
            });
        }
    }


    /**
     * Settings of the game
     */
    let setting = {
        /**
         * Change game play state
         */
        play() {
            game.player.actions.playing = !game.player.actions.playing;
            $(this).attr('src', `imgs/setting-${game.player.actions.playing ? 'pause' : 'play'}.png`);
            $('[style*=animation]').css('animation-play-state', game.player.actions.playing ? 'running' : 'paused');
            $(game.container).playAudio(game.player.actions.playing);
            game.player.actions.playing ? $('.setting-item').addClass('controllable') : $('.setting-item').removeClass('controllable');
        },

        /**
         * Change audio volume
         */
        audio() {
            if (game.player.actions.playing) {
                game.audio = game.audio ? 0 : 1;
                $(this).attr('src', `imgs/setting-audio-${game.audio ? 'on' : 'off'}.png`);
                $(game.container).openAudio(game.audio);
            }
        },

        /**
         * Plus font size
         */
        fontPlus() {
            if (game.player.actions.playing && game.font < 24) {
                game.font += 2;
                $('.score-info, .time-info').css('font-size', '+=2px');
            }
        },

        /**
         * Minus font size
         */
        fontMinus() {
            if (game.player.actions.playing && game.font > 12) {
                game.font -= 2;
                $('.score-info, .time-info').css('font-size', '-=2px');
            }
        }
    }


    /**
     * After click continue button
     */
    $('.btn-continue').on('click', function () {
        if (game.name) {
            $('.logo').addClass('ranking');

            // get result data
            let result = {
                name: game.name,
                score: game.score,
                time: ~~(game.time / 10)
            };

            // store to the localStorage and sort data
            let data = localStorage.ws04_ranking ? JSON.parse(localStorage.ws04_ranking) : [];
            data.push(result);
            localStorage.ws04_ranking = JSON.stringify(data);
            data.sort(function (a, b) {
                if (a.score === b.score) {
                    return b.time - a.time;
                }
                return b.score - a.score;
            });
            let index = data.findIndex(function (arr) {
                return (arr['name'] == result['name'] && arr['score'] == result['score'] && arr['time'] == result['time']);
            });
            for (let i in data) {
                data[i]['rank'] = i / 1 + 1;
                if (i != 0 && data[i]['score'] == data[i - 1]['score'] && data[i]['time'] == data[i - 1]['time']) {
                    data[i]['rank'] = data[i - 1]['rank'];
                }
                if (i < 10 || i == index) {
                    $('.ranking-board tr:last-child').before(`<tr class="${i == index ? 'player-score' : ''}">
                    <td>${data[i]['rank']}</td>
                    <td>${data[i]['name']}</td>
                    <td>${data[i]['score']}</td>
                    <td>${data[i]['time']}</td>
                </tr>`);
                }
            }

            // render ranking to the game
            for (let i = 0; i < 10 - data.length; i++) {
                $('.ranking-board tr:last-child').before(`<tr style="visibility:hidden;"><td>-</td><td></td><td></td><td></td></tr>`);
            }
            $('.ranking-board').fadeIn();
            $('.ranking-table tr').each(function (i) {
                $(this).css('animation', `general 0.3s ${i / 10}s forwards`);
            });
        }
    });


    /**
     * Restart game button in the ranking board: click will restart the game
     */
    $('.btn-restart').on('click', function () {
        location.href = location.href;
    });
}
