/**
  Author: Kale Chao | FakeCityMan
  Blog: http://kalechao87.github.io/
**/
(function($) {
    $(document).ready(function() {
        console.log('Ready');
        $('body').bind('touchmove', function (e) {
            e.preventDefault();
        }); // 禁止页面滚动
        // music-control------------------
        var musicCtrl = new TimelineMax({repeat: -1, paused:true });
        var musicRotation = new TimelineMax({repeat: -1, paused:true});
        musicCtrl.to($(".music-control-icon"), 2, {rotation: 360, ease: Power0.easeNone});
        musicRotation.to($(".music-control-icon:nth(1)"), 0.5, {x: "-=20",y: "-=20", autoAlpha:0, ease: Power0.easeNone})
               .to($(".music-control-icon:nth(2)"), 0.5, {x: "+=20", y: "-=20", autoAlpha:0, ease: Power0.easeNone})
               .to($(".music-control-icon:nth(3)"), 0.5, {x: "-=20", y: "+=20", autoAlpha:0, ease: Power0.easeNone})
               .to($(".music-control-icon:nth(4)"), 0.5, {x: "+=20", y: "+=20", autoAlpha:0, ease: Power0.easeNone})
        // 音乐初始化
        var bgAud = $("#bg-music")[0];
        bgAud.play();
        function initAud(){
            if (bgAud.currentTime){
                console.log("背景音乐开始播放");
                musicCtrl.play();
                musicRotation.play();
                bgAud.removeEventListener("timeupdate", initAud, false); //只执行一次，防止控制按钮动画无法暂停
            }
        }

        bgAud.addEventListener("timeupdate", initAud, false);

        function playBM() {
            bgAud.play();
            musicCtrl.play();
            musicRotation.play();
        }

        function pauseBM() {
            bgAud.pause();
            musicCtrl.pause();
            musicRotation.pause();
        }

        // 音乐控制
        $("#music-control").click(function(){
            if(bgAud.paused){
                playBM();
            }else{
                pauseBM();
            }
        })
        // music-control End--------------------------

        // 滑动指示箭头动画
        var upGuide = new TimelineMax({yoyo: true, repeat: -1, paused: true});
        upGuide.to($('#arrow-up'), 0.8, {y: '-=30', ease: Power0.easeNone})

        function showArrow() {
            TweenMax.fromTo($('#arrow-up'), 0.5, {autoAlpha: 0}, {autoAlpha: 1, ease: Power1.easeIn, onComplete: function () {
            upGuide.play();
            }});
        } // 显示上滑箭头并播放箭头动画

        function hideArrow() {
            TweenMax.to($('#arrow-up'), 0.5, {autoAlpha: 0, onComplete: function () {
                upGuide.pause(0);
            }});
        } // 隐藏上滑箭头并停止箭头动画

        //cover AN start=====================================================
        var coverShow = new TimelineMax({
            // paused: true,
            onComplete: function () {
                showArrow();
                // 上滑
                touch.on($("#cover"), 'swipeup', function(ev){
                    console.log(ev.type + ' cover');
                    hideArrow();
                    coverVanish.play(0);
                });
            }
        });

        coverShow.set("#cover", {autoAlpha: 1})
                .set(["#all-container", "#cover"], {perspective: 500})
                .set("#logo-group", {scale: 1, top: "44px", left: "106px", autoAlpha: 1})
                .staggerFromTo(["#slogan","#logo"], 1, {autoAlpha: 0, scale: 0}, {autoAlpha: 1, scale: 1}, 0.3)
                .fromTo("#cover-border", 0.8, {autoAlpha: 0, z: 50}, {autoAlpha: 1, z: 0})
                .staggerFromTo(".cover-content", 0.8, {autoAlpha: 0, scale: 0}, {autoAlpha: 1, scale: 1}, 0.3)
                // .fromTo("#cover-content1", 0.6, {autoAlpha: 0, scale: 0}, {autoAlpha: 1, scale: 1})
                // .fromTo("#cover-content2", 1, {autoAlpha: 0, scale: 0}, {autoAlpha: 1, scale: 1})
                // .fromTo("#cover-content3", 1, {autoAlpha: 0, scale: 0}, {autoAlpha: 1, scale: 1}, "-=0.3")
                // .fromTo("#cover-content4", 0.8, {autoAlpha: 0, scale: 0}, {autoAlpha: 1, scale: 1})
                // .fromTo("#cover-content5", 1, {autoAlpha: 0, scale: 0}, {autoAlpha: 1, scale: 1})
                // .fromTo("#cover-content6", 1, {autoAlpha: 0, scale: 0}, {autoAlpha: 1, scale: 1})
                // .fromTo("#cover-content7", 1, {autoAlpha: 0, scale: 0}, {autoAlpha: 1, scale: 1}, "-=0.8")

        var coverVanish = new TimelineMax({
            paused: true,
            onComplete: function () {
                page1Show.play(0);
            }
        });

        coverVanish.to("#cover", 0.6, {autoAlpha: 0})
                    .fromTo("#logo-group", 0.6, {scale: 1, top: "44px", left: "106px"}, {scale: 0.3, top: "-148px", left: "322px"})
        // page1 start=========================================================
        var page1Show = new TimelineMax({
            paused: true,
            onComplete: function () {
                showArrow();
                // 上滑
                touch.on($("#page1"), 'swipeup', function(ev){
                    console.log(ev.type + ' page1');
                    hideArrow();
                    page1Vanish.play(0);
                });

                // 上滑
                touch.on($("#page1"), 'swipedown', function(ev){
                    console.log(ev.type + ' page1');
                    hideArrow();
                    TweenMax.to(["#page1", "#logo-group"], 0.6, {autoAlpha: 0, onComplete: function () {
                        TweenMax.set("#logo-group", {scale: 1, top: "44px", left: "106px"});
                        TweenMax.set(["#all-container", "#cover"], {perspective: 500});
                        coverShow.play(0);
                    }});
                });
            }
        });

        page1Show.set("#page1", {autoAlpha: 1})
                .fromTo("#page1-title", 0.8, {autoAlpha: 0, y: "+=50"}, {autoAlpha: 1, y: 0})
                .fromTo("#page1-content", 0.8, {autoAlpha: 0, x: "-=640"}, {autoAlpha: 1, x: 0}, "-=0.4")
                .fromTo("#page1-bottom", 0.8, {autoAlpha: 0}, {autoAlpha: 1, ease: Power1.easeIn})
                .fromTo("#scan", 1.6, {x: -660}, {x: -0}, "+=0.2")
                .fromTo("#page1-top", 0.8, {autoAlpha: 0}, {autoAlpha: 1}, "-=0.8")
                .fromTo("#page1-des", 0.8, {autoAlpha: 0, y: "+=50"}, {autoAlpha: 1, y: 0}, "-=0.3")

        var page1Vanish = new TimelineMax({
            paused: true,
            onComplete: function () {
                page2Show.play(0);
            }
        });

        page1Vanish.to("#page1", 0.6, {autoAlpha: 0});
        // page1 end===========================================================

        // page2 start=========================================================
        var page2Show = new TimelineMax({
            paused: true,
            onComplete: function () {
                showArrow();
                // 上滑
                touch.on($("#page2"), 'swipeup', function(ev){
                    console.log(ev.type + ' page2');
                    hideArrow();
                    page2Vanish.play(0);
                });

                // 下滑
                touch.on($("#page2"), 'swipedown', function(ev){
                    console.log(ev.type + ' page2');
                    hideArrow();
                    TweenMax.to("#page2", 0.6, {autoAlpha: 0, onComplete: function () {
                        page1Show.play(0);
                    }});
                });
            }
        });

        page2Show.set("#page2", {autoAlpha: 1})
                .fromTo("#page2-title", 0.8, {autoAlpha: 0, y: "+=50"}, {autoAlpha: 1, y: 0})
                .fromTo("#page2-content", 0.8, {autoAlpha: 0, x: "-=640"}, {autoAlpha: 1, x: 0}, "-=0.4")
                .fromTo("#page2-bottom", 0.8, {autoAlpha: 0}, {autoAlpha: 1, ease: Power1.easeIn})
                .fromTo("#scan", 1.6, {x: 0}, {x: -660}, "+=0.2")
                .fromTo("#page2-top", 0.8, {autoAlpha: 0}, {autoAlpha: 1}, "-=0.8")
                .fromTo("#page2-des", 0.8, {autoAlpha: 0, y: "+=50"}, {autoAlpha: 1, y: 0}, "-=0.3")

        var page2Vanish = new TimelineMax({
            paused: true,
            onComplete: function () {
                page3Show.play(0);
            }
        });

        page2Vanish.to("#page2", 0.6, {autoAlpha: 0});
        // page2 end===========================================================

        // page3 start=========================================================
        var page3Show = new TimelineMax({
            paused: true,
            onComplete: function () {
                showArrow();
                // 上滑
                touch.on($("#page3"), 'swipeup', function(ev){
                    console.log(ev.type + ' page3');
                    hideArrow();
                    page3Vanish.play(0);
                });

                // 下滑
                touch.on($("#page3"), 'swipedown', function(ev){
                    console.log(ev.type + ' page3');
                    hideArrow();
                    TweenMax.to("#page3", 0.6, {autoAlpha: 0, onComplete: function () {
                        page2Show.play(0);
                    }});
                });
            }
        });

        page3Show.set("#page3", {autoAlpha: 1})
                .fromTo("#page3-title", 0.8, {autoAlpha: 0, y: "+=50"}, {autoAlpha: 1, y: 0})
                .fromTo("#page3-content", 0.8, {autoAlpha: 0, x: "-=640"}, {autoAlpha: 1, x: 0}, "-=0.4")
                .fromTo("#page3-bottom", 0.8, {autoAlpha: 0}, {autoAlpha: 1, ease: Power1.easeIn})
                .fromTo("#scan", 1.6, {x: 0}, {x: -660}, "+=0.2")
                .fromTo("#page3-top", 0.8, {autoAlpha: 0}, {autoAlpha: 1}, "-=0.8")
                .fromTo("#page3-des", 0.8, {autoAlpha: 0, y: "+=50"}, {autoAlpha: 1, y: 0}, "-=0.3")

        var page3Vanish = new TimelineMax({
            paused: true,
            onComplete: function () {
                page4Show.play(0);
            }
        });

        page3Vanish.to("#page3", 0.6, {autoAlpha: 0});
        // page3 end===========================================================

        // page4 start=========================================================
        var page4Show = new TimelineMax({
            paused: true,
            onComplete: function () {
                // 下滑
                touch.on($("#page4"), 'swipedown', function(ev){
                    console.log(ev.type + ' page3');
                    TweenMax.to("#page4", 0.6, {autoAlpha: 0, onComplete: function () {
                        page3Show.play(0);
                    }});
                });
            }
        });

        page4Show.set("#page4", {autoAlpha: 1, perspective: 500})
                .fromTo("#page4-content", 0.8, {autoAlpha: 0, x: "-=640"}, {autoAlpha: 1, x: 0})
                .fromTo("#page4-bg", 0.8, {autoAlpha: 0}, {autoAlpha: 1, ease: Power1.easeIn})
                .fromTo("#form-dec", 0.8, {autoAlpha: 0, z: -300}, {autoAlpha: 1, z: 0}, "-=0.6")
                .fromTo("#form-container", 0.8, {autoAlpha: 0, y: "+=50"}, {autoAlpha: 1, y: 0})
                .fromTo("#apply-btn", 0.6, {autoAlpha: 0, y: "+=50"}, {autoAlpha: 1, y: 0}, "-=0.6")

        var page4Vanish = new TimelineMax({
            paused: true,
            onComplete: function () {
                page5Show.play(0);
            }
        });

        page4Vanish.to(["#page4", "#logo-group"], 0.6, {autoAlpha: 0});



        $('#apply-btn').bind("click", function () {
            // 先校验填写信息，然后page4消失
            page4Vanish.play(0);
        });
        // page4 end===========================================================

        // page5 start========================================================
        var page5Show = new TimelineMax({
            paused: true,
            onComplete: function () {
                // 下滑
                touch.on($("#page5"), 'swipedown', function(ev){
                    console.log(ev.type + ' page5');
                    TweenMax.to("#page5", 0.6, {autoAlpha: 0, onComplete: function () {
                        TweenMax.to("#logo-group", 0.4, {autoAlpha: 1});
                        page4Show.play(0);
                    }});
                });
            }
        });

        page5Show.set("#page5", {autoAlpha: 1, perspective: 500})

                .fromTo("#thanks", 0.6, {autoAlpha: 0, z: 100}, {autoAlpha: 1, z: 0})
                .fromTo("#page5-title", 0.8, {autoAlpha: 0, z: -200}, {autoAlpha: 1, z: 0})
                .fromTo("#page5-content", 0.8, {autoAlpha: 0, y: "+=50"}, {autoAlpha: 1, y: 0})
                // .to("#logo-group", 0.8, {scale: 0.52, top: "450px", left: "104px"})
                .fromTo("#page5-logo", 1, {autoAlpha: 0, z: -200}, {autoAlpha: 1, z: 0})
                .fromTo("#page5-des", 0.8, {autoAlpha: 0, y: "+=50"}, {autoAlpha: 1, y: 0}, "-=0.4")
        // page5 end==========================================================







    });  //Document ready
})(jQuery);
