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
   function desktop() {
      // desktop
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
               })
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
               })
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
            TweenMax.to($siteMapWrap, .3, {display:"none", opacity:0, onComplete:function () {
               $html.css({"overflow": "auto"});
            }});
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
         })
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
         })
      }
      rank();
   }
}
function main() {

}
function scrollEvent() {

}