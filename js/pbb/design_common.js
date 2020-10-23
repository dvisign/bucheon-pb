"use strict";
var winW;
var winH;
var esStep = "Expo.ease";
var $window = $(window);
var winSc;
var $html = $("html");
$window.on("load", function () {
    winW = $(this).width();
    winH = $(this).height();
    winSc = $(this).scrollTop();
    $(this).on("resize", function () {
        winW = $(this).width();
        winH = $(this).height();
    });
    $(this).trigger("resize");

    main();
    layout();
    scrollEvent();
    subpageEvenet();



});
// tab event
function tabkey(event, callBack) {
    var _keyCode = event.keyCode || event.which;
    if(_keyCode === 9 && !event.shiftKey){
        console.log("Tabkey");
        if(callBack){
            callBack();
        }
    }

}
// shift tab
function shiftTabkey(event, callBack) {
    var _keyCode = event.keyCode || event.which;
    if (_keyCode === 9 && event.shiftKey) {
        console.log("shiftTabkey");
        if (callBack) {
            callBack();
        }
    }
}
function userAgentChk(callDesktop, callMobile ) {
    var userAgent = navigator.userAgent;
    if (userAgent.match(/iPhone|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|LG|nokia|SonyEricsson/i) != null || userAgent.match(/LG|SAMSUNG|Samsung/) != null){
        // mobile
        if(callMobile){
            callMobile()
            console.log("mobile");
        }
    }else{
        // desktop
        if(callDesktop){
            callDesktop();
            console.log("desktop");
        }
    }
}

   
function layout() {
    var $windowH = $(window).height();
    var $globalHeader = $("#globalHeader");

    userAgentChk(desktop, mobile);
    // desktop event
    function desktop() {
        // gnb in / out
        var $gnbDepth1 = $globalHeader.find(".gnb_wrap>li>a");
        var $headerWrap = $globalHeader.find(".header_wrap");
        var $depthLast = $globalHeader.find(".depth_list");
        var depthLastH = [];

        for(var i = 0, j = $globalHeader.find(".depth_wrap").length ; i < j ; i++){
            depthLastH.push($globalHeader.find(".depth_wrap").eq(i).height());
            $globalHeader.find(".depth_wrap").eq(i).height(0)
        }

        function gnbOpenControl(gnbDepth1){
            var _depthWrap = gnbDepth1.parent().find(".depth_wrap");
            var _sibling_depthWrap = gnbDepth1.parent().siblings().find(".depth_wrap");
            var _depthWrapIndex = _depthWrap.parent().index();
            gnbDepth1.parent().siblings().find("a").removeClass("open");
            if(!gnbDepth1.hasClass("open")){
                _depthWrap.css({zIndex:1});
                _sibling_depthWrap.css({zIndex:0});
                _sibling_depthWrap.find(".depth_list").css({opacity:0});
                _depthWrap.find(".depth_list").css({opacity:1});
                TweenMax.to([_depthWrap, _sibling_depthWrap], .3, {height:depthLastH[_depthWrapIndex]});
            }
            gnbDepth1.addClass("open");
        }

        function gnbCloseControl(headerWrap){
             headerWrap.find(".gnb_wrap>li>a").removeClass("open");
             TweenMax.to(headerWrap.find(".depth_wrap"), .3, {height:0});
        }

        $gnbDepth1.mouseenter(function () {
             var _this = $(this);
             gnbOpenControl(_this);
        });

        $headerWrap.mouseleave(function () {
             var _this = $(this);
             gnbCloseControl(_this);
        });

        $headerWrap.find("h1 a").on("keydown", function (event) {
            var _keyCode = event.keyCode || event.which;
            if(_keyCode === 9 && !event.shiftKey){
            //tabkey
            gnbOpenControl($gnbDepth1.eq(0));
        }
        });

        $headerWrap.find(".gnb_utility li").eq(0).on("keydown", function (event) {
            var _keyCode = event.keyCode || event.which;
            if (_keyCode === 9 && event.shiftKey) {
                //shiftKey
                gnbOpenControl($gnbDepth1.eq(-1))
            }
        });

        $gnbDepth1.on("keydown ", function (event) {
            var _this = $(this);
            var _keyCode = event.keyCode || event.which;
            if (_keyCode === 9 && event.shiftKey) {
                //shiftKey
                gnbCloseControl(_this.parents(".header_wrap"));
                gnbOpenControl(_this.parent().prev().children("a"));
            }
        });

      //gnb last list event
        for(var n = 0, m = $depthLast.length; n < m ; n++){
            $depthLast.eq(n).find(".depth2").eq(-1).find("a").eq(-1).on("keydown",function (event) {
            var _this = $(this);
            var _keyCode = event.keyCode || event.which;
                if(_keyCode === 9 && !event.shiftKey){
                    // tabKey
                    gnbCloseControl(_this.parents(".header_wrap"));
                    gnbOpenControl(_this.parents(".depth_wrap").parent().next().children("a"));
                }
            });
        }

      // breadcrumb tap event
        function breadcrumbTap() {
            var $breadcrumbList = $(".breadcrumb_wrap .crumb_depth");
            $breadcrumbList.mouseleave(function () {
               $(this).removeClass("active");
            })
            for(var i = 0, j=$breadcrumbList.length; i < j ; i++ ){
                // tab
                $breadcrumbList.eq(i).find("a").eq(-1).on("keydown", function (event) {
                    var _this = $(this);
                    tabkey(event, function () {
                        _this.parents(".crumb_depth").removeClass("active");
                        _this.parents(".crumb_depth").next().addClass("active");
                    });
                });
                // back tab
                $breadcrumbList.eq(i).find("a").eq(-1).focus(function (event) {
                    var _this = $(this);
                    _this.parents(".crumb_depth").addClass("active");
                });
                $breadcrumbList.eq(i).find("strong").eq(-1).on("keydown", function (event) {
                    var _this = $(this);
                    shiftTabkey(event, function () {
                        _this.parents(".crumb_depth").removeClass("active");
                    });
                });
            }

            $(".breadcrumb_wrap>div>a").on("keydown" ,function (event) {
                tabkey(event, function () {
                   $breadcrumbList.eq(0).addClass("active");
                })
            })

        }
        breadcrumbTap();

      // site map
        function siteMap() {
            var $siteMapWrap = $globalHeader.find(".site_map_wrap");
            var $mapListWrap = $(".map_list_wrap>ul");
            var $mapListWrapLast = $mapListWrap.children("li").eq(-1);
            var $mapHeader = $globalHeader.find(".map_header");
            var $mapListPosTop = [];

            $globalHeader.find(".map_header").find("li").on("click", function(){
                var _index = $(this).index();
                TweenMax.to($siteMapWrap, .3, {scrollTop:$mapListPosTop[_index]});
            });

            // map open
            $globalHeader.find(".site_map_open").on("click", function() {
                $html.css({"overflow": "hidden"});
                $siteMapWrap.css({"overflow": "auto"});
                TweenMax.to($siteMapWrap, .3, {display:"block", opacity:1, onComplete:function () {
                    $mapListWrap.css({"padding-bottom" : $windowH - $mapListWrapLast.height() - 140 - $mapHeader.height()+"px"});
                    for(var i = 0 , j = $mapListWrap.children("li").length; i < j ; i ++){
                        $mapListPosTop.push($mapListWrap.children("li").eq(i).offset().top - $mapHeader.height());
                    }
                    $siteMapWrap.scroll(function () {
                        var _scrollT = $(this).scrollTop();
                        for(var n = 0, m = $mapListPosTop.length; n < m; n++){
                            if(_scrollT > $mapListPosTop[n]-20){
                                $globalHeader.find(".map_header").find("li").eq(n).siblings().removeClass("active");
                                $globalHeader.find(".map_header").find("li").eq(n).addClass("active");
                            }
                        }
                    });
                }});
            });

            // map close
            $mapHeader.find(".close_btn").on("click", function() {
                $html.css({"overflow": "auto"});
                $mapHeader.css({"overflow": "hidden"});
                TweenMax.to($siteMapWrap, .3, {display:"none", opacity:0});
            });
        }
        siteMap();

        //  rank
        function rank() {
             var $userRankWrap = $globalHeader.find(".user_rank_wrap");
             var $userRankOpen = $globalHeader.find(".user_rank_open").find("button");
             $userRankWrap.find(".close_btn").on("click", function () {
                TweenMax.to($userRankWrap, .3, {right:-500});
             });
             $userRankOpen.on("click", function () {
                TweenMax.to($userRankWrap, .3, {right:0});
             })
        }
        rank();


    }
    // mobile Event
    function mobile() {
        // gnb
        function gnbEvent() {
            var $gnbDepth1 = $globalHeader.find(".gnb_wrap>li>a");
            $globalHeader.find("nav").find(".close_btn").on("click", function () {
                TweenMax.to($globalHeader.find("nav"), .3, {display:"none", opacity:0});
            });

            $globalHeader.find(".site_map_open").on("click", function () {
                TweenMax.to($globalHeader.find("nav"), .3, {display:"block", opacity:1});
            });
            $gnbDepth1.on("click", function () {
                var _this = $(this);
                $gnbDepth1.removeClass("open");
                $gnbDepth1.next().css({display:"none", opacity:0});
                _this.addClass("open");
                TweenMax.to(_this.next(), .3, {display:"block", opacity:1});
                 return false;
            });
        }
        gnbEvent();

        // footer
        function footerEvent() {
            var $footer = $("#footer_wrap");
            $footer.children("ul").find("li").eq(0).on("click", function () {
                var _this = $(this);
                if(!_this.parent().hasClass("active")){
                    _this.parent().addClass("active");
                }else{
                    _this.parent().removeClass("active");
                }
            });
        }
        footerEvent();

        //  rank
        function rank() {
            var $userRankWrap = $globalHeader.find(".user_rank_wrap");
            var $userRankOpen = $globalHeader.find(".user_rank_open").find("button");
            $userRankWrap.find(".close_btn").on("click", function () {
                TweenMax.to($userRankWrap, .3, {right:-100+"%"});
            });
            $userRankOpen.on("click", function () {
                TweenMax.to($userRankWrap, .3, {right:0});
            });
        }
        rank();
    }



    //date_picker
    $(document).ready(function() {
        $('.date_picker').each(function(i) {
            var $this = $(this);
            $this.datepicker({
                changeMonth: true,
                changeYear: true,
                minDate: '-100y',
                nextText: '다음 달',
                prevText: '이전 달',
                numberOfMonths: [1,1],
                stepMonths: 3,
                yearRange: 'c-100:c+10',
                showButtonPanel: true,
                currentText: '오늘 날짜',
                closeText: '닫기',
                dateFormat: "yy-mm-dd",
                showMonthAfterYear: true ,
                dayNamesMin: ['월', '화', '수', '목', '금', '토', '일'],
                monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
            });
        });
    })

}
function main() {
    var $mainWrap = $(".main_wrap");
    userAgentChk(desktop, mobile);
    // desktop event
    function desktop() {
        function visualEvent() {
            var $mainWrapList = $mainWrap.find(".visual_lnb").children("li");
            var $mainIndicater = $mainWrap.find(".visual_lnb_indicater").find("li");
            var $visualImgMap = $mainWrap.find(".img_map").find("li");
            var mainWrapListLength =$mainWrapList.length - 1;
            var rollingFn = null;
            var count = 0;
            var interavlTime = 5000;
            for(var i = 0 , j = $mainWrapList.length; i < j ; i ++){
                for(var n = 0, m = $mainWrapList.eq(i).find("li").length; n < m ; n++){
                    $mainWrapList.eq(i).find("li").eq(n).prepend("<span>"+(n+1)+"</span>");
                }
            }
            function intervalEenvt(){
                if(count < mainWrapListLength){
                    count++;
                }else{
                    count = 0;
                }
                $mainWrapList.removeClass("active");
                $mainWrapList.eq(count).addClass("active");
                $mainIndicater.removeClass("active");
                $mainIndicater.eq(count).addClass("active");
                $visualImgMap.removeClass("active");
                $visualImgMap.eq(count).addClass("active");

                // console.log(count);
            }

            rollingFn = setInterval(intervalEenvt, interavlTime);

            $mainWrap.find(".visual_lnb_indicater").mouseenter(function () {
                clearInterval(rollingFn);
            });
            $mainWrap.find(".visual_lnb_indicater").mouseleave(function () {
                rollingFn = setInterval(intervalEenvt, interavlTime);
            });
            //
            $mainWrap.find(".visual_lnb").find("a").mouseenter(function () {
                clearInterval(rollingFn);
            });
            $mainWrap.find(".visual_lnb").find("a").mouseleave(function () {
                rollingFn = setInterval(intervalEenvt, interavlTime);
            });
            $mainWrap.find(".visual_lnb_indicater").children("button").on("click", function () {
                var _this = $(this)
                if(_this.hasClass("btn_next")){
                    if(count < mainWrapListLength){
                        count++
                    }else{
                        count = 0;
                    }
                }else{
                    if(count > 0){
                        count--
                    }else{
                        count = mainWrapListLength;
                    }
                }
                $mainWrapList.removeClass("active");
                $mainWrapList.eq(count).addClass("active");
                $mainIndicater.removeClass("active");
                $mainIndicater.eq(count).addClass("active");
                $visualImgMap.removeClass("active");
                $visualImgMap.eq(count).addClass("active");
            })

        }
        visualEvent();
        
        function lifeEvent() {
            var $lifeIndex = $(".life_index");
            var $lifeIndexList = $lifeIndex.find(".life_index_list").children("li");

            $lifeIndexList.find("button").on("click",function () {
                var _listActive = $(this).parent();
                _listActive.siblings().removeClass("active");
                _listActive.addClass("active");
                TweenMax.to(_listActive.siblings().children(".condition_wrap"), .3, {display:"none", opacity:0});
                TweenMax.to(_listActive.children(".condition_wrap"), .3, {display:"block", opacity:1});


            })
        }
        lifeEvent();

        function dulleEvent() {
            var $dulleSlickWrap = $(".dulle_slick_wrap");
            var $dulleSlick = $(".dulle_slick");
            var $dulleSlickLength = $dulleSlick.find(".dulle_list").length;
            var $indexArea = $dulleSlickWrap.find(".dulle_index");
            var $indexLengthArea = $dulleSlickWrap.find(".dulle_length");
            var $indexBar = $dulleSlickWrap.find(".dulle_indicater div");
            var indicaterwidth = $indexBar.width();
            $indexLengthArea.html("0"+$dulleSlickLength);
            $dulleSlick.slick({
                slidesToShow:3,
                prevArrow: $('.dulle_slick_ui .slick_prev'),
                nextArrow: $('.dulle_slick_ui .slick_next')
            });
            $dulleSlick.on("beforeChange", function (event, slick, currentSlide, nextSlide) {
                $indexArea.html("0"+(nextSlide+1));
                TweenMax.to($indexBar, .3, {left:(nextSlide)*indicaterwidth});
            });
        }
        dulleEvent();

        function festivalEvent() {
            var $festivalSlickWrap = $(".bucheon_festival");
            var $festivalSlick = $(".festival_slick");
            var $festivalList = $festivalSlick.find(".festival_list");
            var $festivalSlickLength = $festivalList.length;
            var $indexArea = $festivalSlickWrap.find(".festival_index");
            var $indexLengthArea = $festivalSlickWrap.find(".festival_length");
            var $indexBar = $festivalSlickWrap.find(".festival_indicater div");
            var indicaterwidth = $indexBar.width();
            var cssList = [".bifan", ".biaf", ".bicof", ".bbic"];

            $indexLengthArea.html("0"+$festivalSlickLength);
            $festivalSlick.slick({
                slidesToShow:1,
                prevArrow: $('.festival_slick_ui .slick_prev'),
                nextArrow: $('.festival_slick_ui .slick_next'),
                speed:1000,
                swipe:false
            });
            // 인디케이터 이벤트
            $festivalSlick.on("beforeChange", function (event, slick, currentSlide, nextSlide) {
                var _$indexList = $festivalSlick.find(cssList[nextSlide]);
                $indexArea.html("0"+(nextSlide+1));
                TweenMax.to($indexBar, .3, {left:(nextSlide)*indicaterwidth});
                TweenMax.set(_$indexList.find(".festival_visual_img"), {scale:"1.1"});
                TweenMax.set(_$indexList.find("p"), {left:"-300px", opacity:0});
                TweenMax.set(_$indexList.find("strong"), {left:"-200px", opacity:0});
                TweenMax.set(_$indexList.find("a"), {opacity:0});
                TweenMax.set(_$indexList.find(".festival_logo"), {left:"-100px", opacity:0});
            });
            // afterChange 모션 이벤트
            $festivalSlick.on("afterChange", function (event, slick, currentSlide) {
                var _$indexList = $festivalSlick.find(cssList[currentSlide]);
                TweenMax.to(_$indexList.find(".festival_visual_img"), 1, {scale:"1", ease:Sine.easeOut});
                TweenMax.to(_$indexList.find("p"), .8, {left:0, opacity:1, delay:.2});
                TweenMax.to(_$indexList.find("strong"), .8, {left:0, opacity:1, delay:.4});
                TweenMax.to(_$indexList.find("a"), .8, {opacity:1, delay:.5});
                TweenMax.to(_$indexList.find(".festival_logo"), .8, {left:0, opacity:1, delay:.6});
            });

        }
        festivalEvent();

        function estateEvent() {
            var $estateSlick = $(".estate_slick");
            var estateSlickLength = $estateSlick.find(".estate_list").length;
            var $estateSlickUi =$(".estate_slick_ui")
            var $indexArea = $estateSlickUi.find(".estatee_index");
            var $indexLengthArea = $estateSlickUi.find(".estate_length");
            var $indexBar = $estateSlickUi.find(".estate_indicater div");
            var indicaterwidth = $indexBar.width();

            $indexLengthArea.html("0"+estateSlickLength);
            $estateSlick.slick({
                slidesToShow:4,
                prevArrow: $('.estate_info .slick_prev'),
                nextArrow: $('.estate_info .slick_next')
            });
            $estateSlick.on("beforeChange", function (event, slick, currentSlide, nextSlide) {
                $indexArea.html("0"+(nextSlide+1));
                TweenMax.to($indexBar, .3, {left:(nextSlide)*indicaterwidth});
            });
        }
        estateEvent();

        function reductEvent() {
            var $reductSlick = $(".reduct_slick");
            $reductSlick.slick({
                slidesToShow:1,
                fade: true,
                dots: true
            });
        }
        reductEvent();

    }
    // mobile Event
    function mobile() {

        function lifeEvent() {
            var $lifeIndex = $(".life_index");
            var $lifeIndexListWrap = $lifeIndex.find(".life_index_list");
            var $lifeIndexList = $lifeIndexListWrap.children("li");

            $lifeIndexList.find("button").on("click",function () {
                var _listActive = $(this).parent();
                var _conditionWrap = _listActive.children(".condition_wrap");
                var _conH = _conditionWrap.height();

                _listActive.siblings().removeClass("active");
                _listActive.addClass("active");


                TweenMax.to(_listActive.siblings().children(".condition_wrap"), .3, {display:"none", opacity:0});
                TweenMax.to(_listActive.children(".condition_wrap"), .3, {display:"block", opacity:1, onComplete:function () {
                        if(_conditionWrap.eq(0).hasClass("temp_condition")){
                            var _depthConH =_conditionWrap.find(".condition_wrap").height();
                            $lifeIndexListWrap.css({"padding-bottom":"calc(12rem + "+ (_depthConH + 100) + "px)"});
                        }else{
                            if(_listActive.parents(".condition_wrap").hasClass("temp_condition")){
                                var _depthConH2 =_listActive.find(".condition_wrap").height();
                                $lifeIndexListWrap.css({"padding-bottom":"calc(12rem + "+ (_depthConH2 + 100) + "px)"});
                                _listActive.parents(".condition_wrap").find(".condition_table")
                            }else{
                                $lifeIndexListWrap.css({"padding-bottom": _conH+100 + "px"});
                            }
                        }
                    }});
            });
        }
        lifeEvent();

        function dulleEvent() {
            var $dulleSlickWrap = $(".dulle_slick_wrap");
            var $dulleSlick = $(".dulle_slick");
            var $dulleSlickLength = $dulleSlick.find(".dulle_list").length;
            var $indexArea = $dulleSlickWrap.find(".dulle_index");
            var $indexLengthArea = $dulleSlickWrap.find(".dulle_length");
            var $indexBar = $dulleSlickWrap.find(".dulle_indicater div");
            var indicaterwidth = $indexBar.width();
            $indexLengthArea.html("0"+$dulleSlickLength);
            $dulleSlick.slick({
                slidesToShow:1,
                centerMode: true,
                prevArrow: $('.dulle_slick_ui .slick_prev'),
                nextArrow: $('.dulle_slick_ui .slick_next')
            });
            $dulleSlick.on("beforeChange", function (event, slick, currentSlide, nextSlide) {
                $indexArea.html("0"+(nextSlide+1));
                TweenMax.to($indexBar, .3, {left:(nextSlide)*indicaterwidth});
            });
        }
        dulleEvent();

        function festivalEvent() {
            var $festivalSlickWrap = $(".bucheon_festival");
            var $festivalSlick = $(".festival_slick");
            var $festivalList = $festivalSlick.find(".festival_list");
            var $festivalSlickLength = $festivalList.length;
            var $indexArea = $festivalSlickWrap.find(".festival_index");
            var $indexLengthArea = $festivalSlickWrap.find(".festival_length");
            var $indexBar = $festivalSlickWrap.find(".festival_indicater div");
            var indicaterwidth = $indexBar.width();
            var cssList = [".bifan", ".biaf", ".bicof", ".bbic"];

            $indexLengthArea.html("0"+$festivalSlickLength);
            $festivalSlick.slick({
                slidesToShow:1,
                prevArrow: $('.festival_slick_ui .slick_prev'),
                nextArrow: $('.festival_slick_ui .slick_next'),
                speed:1000,
            });
            // 인디케이터 이벤트
            $festivalSlick.on("beforeChange", function (event, slick, currentSlide, nextSlide) {
                // var _$indexList = $festivalSlick.find(cssList[nextSlide]);
                $indexArea.html("0"+(nextSlide+1));
                TweenMax.to($indexBar, .3, {left:(nextSlide)*indicaterwidth});
                // TweenMax.set(_$indexList.find("p"), {left:"-300px", opacity:0});
                // TweenMax.set(_$indexList.find("strong"), {left:"-200px", opacity:0});
                // TweenMax.set(_$indexList.find("a"), {opacity:0});
                // TweenMax.set(_$indexList.find(".festival_logo"), {left:"-100px", opacity:0});
            });
            // afterChange 모션 이벤트
            // $festivalSlick.on("afterChange", function (event, slick, currentSlide) {
            //     var _$indexList = $festivalSlick.find(cssList[currentSlide]);
            //     TweenMax.to(_$indexList.find("p"), .8, {left:0, opacity:1});
            //     TweenMax.to(_$indexList.find("strong"), .8, {left:0, opacity:1, delay:.2});
            //     TweenMax.to(_$indexList.find("a"), .8, {opacity:1, delay:.3});
            //     TweenMax.to(_$indexList.find(".festival_logo"), .8, {left:0, opacity:1, delay:.4});
            // });

        }
        festivalEvent();

        function estateEvent() {
            var $estateSlick = $(".estate_slick");
            var estateSlickLength = $estateSlick.find(".estate_list").length;
            var $estateSlickUi =$(".estate_slick_ui")
            var $indexArea = $estateSlickUi.find(".estatee_index");
            var $indexLengthArea = $estateSlickUi.find(".estate_length");
            var $indexBar = $estateSlickUi.find(".estate_indicater div");
            var indicaterwidth = $indexBar.width();

            $indexLengthArea.html("0"+estateSlickLength);
            $estateSlick.slick({
                slidesToShow:1,
                centerMode: true
            });
            $estateSlick.on("beforeChange", function (event, slick, currentSlide, nextSlide) {
                $indexArea.html("0"+(nextSlide+1));
                TweenMax.to($indexBar, .3, {left:(nextSlide)*indicaterwidth});
            });
        }
        estateEvent();

        function reductEvent() {
            var $reductSlick = $(".reduct_slick");
            $reductSlick.slick({
                slidesToShow:1,
                fade: true,
                dots: true
            });
        }
        reductEvent();

        function communicateEvent() {
            var $communicateSlick = $(".bucheon_communicate_slick");
            var communicateSlickLength = $communicateSlick.find(".communi_list").length;
            var $communicateSlickUi =$(".communicate_slick_ui")
            var $indexArea = $communicateSlickUi.find(".communicate_index");
            var $indexLengthArea = $communicateSlickUi.find(".communicate_length");
            var $indexBar = $communicateSlickUi.find(".communicate_indicater div");
            var indicaterwidth = $indexBar.width();

            $indexLengthArea.html("0"+communicateSlickLength);
            $communicateSlick.slick({
                slidesToShow:1,
                centerMode: true
            });
            $communicateSlick.on("beforeChange", function (event, slick, currentSlide, nextSlide) {
                $indexArea.html("0"+(nextSlide+1));
                TweenMax.to($indexBar, .3, {left:(nextSlide)*indicaterwidth});
            });
        }
        communicateEvent();
    }


}
function scrollEvent() {
    userAgentChk(desktop);
    //desktop event

    function desktop() {
        var $questionWrap = $("#questionWrap");
        var htmlEndPos = $html.height() - ($window.height() + $("#footer_wrap").height());
        // main 행사 영역 문의하기 아이콘 색생 변경 변수
        var $festivalWrap = $(".bucheon_festival");
        if($festivalWrap.offset() !== undefined){
            var $festivalOffsetTop = $festivalWrap.offset().top + 160;
            var $festivalTopLine = $festivalOffsetTop - $window.height() + 100;
        }
        $window.scroll(function () {
            var _scrollTop = $(this).scrollTop();
            // main 행사 영역 문의하기 아이콘 색생 변경 조건
            if(_scrollTop > $festivalTopLine && _scrollTop < $festivalOffsetTop){
                $questionWrap.addClass("type_w");
            }else{
                $questionWrap.removeClass("type_w");
            }
            // 스크롤 끝일때 문의하기 위치 변경
            if(_scrollTop > htmlEndPos){
                TweenMax.to($questionWrap, .2, {bottom:200});
            }else{
                TweenMax.to($questionWrap, .2, {bottom:100});
            }
        });
    }
}
function subpageEvenet() {
    // 개인맞춤서비스 제공
    var $Personalized =  $(".Personalized");
    var $listInfo = $Personalized.find(".cont_list_info_wrap");
    var $listInfoOpen = $listInfo.find(".info_more_btn");
    var $listInfoClose = $listInfo.find(".info_more").find("button");
    console.log($listInfoClose);
    $listInfoOpen.on("click" , function () {
        var _$infoMore = $(this).parent().find(".info_more");
        TweenMax.to(_$infoMore, .3, {display:"block", opacity:1});
    });
    $listInfoClose.on("click" ,function () {
        TweenMax.to($(this).parent(), .3, {display:"none", opacity:0});
    })
    // //개인맞춤서비스 제공
}