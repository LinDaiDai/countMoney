/**
 * Created by Administrator on 2017/9/15.
 */

$(function () {

    let loadingImgs = ["img/activity_rule.png", "img/bg.jpg", "img/bg2.png", "img/close.png", "img/p1_btns_wrap.png", "img/p1_first.png", "img/p1_from.png", "img/p1_second.png", "img/p1_sub.png", "img/p1_third.png", "img/p2_kuang.png", "img/p2_qian.jpg", "img/p2_scoring.png", "img/p2_shou.png", "img/p2_txt1.png", "img/p2_txt2.png", "img/p2_txt3.png", "img/p2_zhuan.png", "img/p3_acquire.png", "img/p3_again.png", "img/p3_bg.jpg", "img/p3_share.png", "img/p3_share_btn.png", "img/prize.png", "img/qian.png", "img/ranking.png", "img/ranking_bg.png", "img/shiyong.png", "img/shizhong.png", "img/shou.png", "img/start_game.png", "img/tiaozhan.png", "img/yinqu.png"];

    let loadingNum = 0;

    for(let i = 0;i<loadingImgs.length;i++){
        let imgObj = new Image();
        imgObj.src = loadingImgs[i];
        imgObj.onload = function () {
            loadingNum++;
            let scale = parseInt(loadingNum/loadingImgs.length*100);
            $('#loading').html(scale+"%");
            if(loadingNum>=loadingImgs.length-2){
                $('.loading_wrap').hide();
                init();
            }
        }
    }

    function init() {

        $('.wrap').show();

        //数钱榜
        touch.on('.ranking', "tap", function (e) {
            $("#ranking").show();
        });

        //活动规则
        touch.on('.activity_rule', 'tap', function (e) {
            $('#activity_rule').show();
        });

        //活动奖品
        touch.on('.prize', 'tap', function (e) {
            $('#prize').show();
        });

        //奖券
        touch.on('.shiyong', 'tap', function (e) {
            $("#shiyong").show();
        });

        //开始游戏
        touch.on('.start-btn', 'tap', function (e) {
            $('#user_data').show();
        });

        //给所有关闭按钮添加关闭事件
        $('.close').on('touchstart', function () {
            $(this).parent().hide()
        });

        //提交并开始游戏
        touch.on('.sub', 'tap', function (e) {
            $('#p1').hide(300);
            $('#user_data').hide(300);
            prompt();
            $('#p2').show(300);
            lunbo();
        });

        //获取输入的用户名并显示
        function prompt() {
            let userName = $('.userData_name').val();
            if (userName == '') {
                userName = "无名侠客"
            }
            $('#prompt').html(userName + "你要加油哟");
        }

        //游戏界面轮播
        function lunbo() {
            let i = 1;
            setTimeout(function step() {
                $('.p2_txt').attr({src: 'img/p2_txt' + i + '.png'});
                i += 1;
                if (i >= 4) {
                    i = 1;
                }
                setTimeout(step, 1000)
            }, 0)
        }

        //游戏界面计时器
        let sum = 60;
        let allowCount = false;

        function count() {
            setTimeout(function step() {
                if (sum <= 0) {
                    gameOver();
                    return;
                }
                $('.clock').html(sum);
                sum--;
                setTimeout(step, 1000)
            }, 0)
        }


        let newImg = document.createElement('img');
        newImg.src = 'img/p2_qian.jpg';
        newImg.className = 'qian_move';

        //显示分数
        let score_unit = 1;
        let score_decade = 1;
        let score_hundred = 1;
        let score = 0;


        function showScore() {
            if (score_unit == 10) {
                score_unit = 0;
                if (score_decade == 10) {
                    $('.time_num:nth-child(1)').html(score_hundred);
                    score_hundred++;
                    score_decade = 0;
                }
                $('.time_num:nth-child(2)').html(score_decade);
                score_decade++;
            }
            $('.time_num:nth-child(3)').html(score_unit);
            score_unit++;
        }

        /**
         * JS动画版本
         */
        //滑钱开始游戏
        // touch.on('.qian_wrap','touchstart',function (e) {
        //     e.preventDefault();
        //     if($('.qian_wrap').children().length<=7){
        //         //产生新的钱
        //         create_qian();
        //     }
        // });
        // touch.on('.qian_wrap','swipeup',function (e) {
        //     //计时器开始
        //     if(allowCount==false){
        //         count();
        //         allowCount = true;
        //     }
        //     score++;
        //     showScore();
        //     //钱移动并消失
        //     remove_qian();
        // });
        // //产生钱
        // function create_qian(){
        //     for(let i = 0 ; i<3;i++){
        //         $('<img id="qian_swiper" class="p2_qian" src="img/p2_qian.jpg">').appendTo('.qian_wrap');
        //     }
        // }
        // // 钱移动并消失
        //
        // function remove_qian(){
        //     $('.qian_wrap').children('.p2_qian:last-child').animate({
        //         width:0,
        //         height:0,
        //         opacity:0,
        //         top:-500,
        //         left:100
        //     },600,'linear',function(){
        //         $(this).remove()
        //     })
        // }
        /**
         * harmmer配合CSS动画版
         * @type {Element}
         */
        let qian_wrap = document.querySelector('.qian_wrap');
        let img = document.querySelector('.p2_qian');
        let isMove = true;

        let hammer1 = new Hammer(img);
        hammer1.get('pan').set({direction: Hammer.DIRECTION_ALL});

        hammer1.on('panup', function () {
            if (!isMove) {
                return;
            }
            if (allowCount == false) {
                count();
                allowCount = true;
            }

            let newImg = document.createElement('img');
            newImg.src = 'img/p2_qian.jpg';
            newImg.className = 'qian_move';

            newImg.addEventListener('animationend', function (e) {
                score++;
                showScore();
                qian_wrap.removeChild(newImg);
            });
            qian_wrap.appendChild(newImg);

            isMove = false;
        });

        hammer1.on('panend', function (e) {
            isMove = true;
        });

        //touch配合css动画版
        // touch.on('.p2_qian','swipeup',function (e) {
        //     console.log('a');
        //     if(!isMove){
        //         return;
        //     }
        //     if(allowCount == false){
        //         count();
        //         allowCount = true;
        //     }
        //     let newImg = document.createElement('img');
        //     newImg.src = 'img/p2_qian.jpg/';
        //     newImg.className = 'qian_move';
        //
        //     newImg.addEventListener('animationend',function (e) {
        //         score++;
        //         showScore();
        //         qian_wrap.removeChild(newImg);
        //     });
        //     qian_wrap.appendChild(newImg);
        //
        //     isMove = false;
        // });
        //
        // touch.on('.p2_qian','touchend',function () {
        //    isMove = true;
        // });


        //游戏结束
        function gameOver() {
            $('#p2').hide();
            $('#p3').show();
            endShowScore();
        }

        //游戏结束显示分数
        function endShowScore() {
            $('#result_score').html(score * 100 + "￥");
        }

        //分享按钮
        touch.on('#p3_share_btn', 'tap', function (e) {
            $('#share').show();
        });

        //分享界面隐藏
        touch.on('#share', 'tap', function (e) {
            $(this).hide();
        });

        touch.on('#p3_again', 'tap', function (e) {
            location.reload();
        });


    }
});
