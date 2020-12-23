'use strict';
var fadeInOutEvent = function(obj) {
  var layer = obj.layer;
  var openBtn = obj.openBtn;
  var closeBtn = obj.closeBtn;
  var delay = obj.delay;
  var initPrev = obj.initPrev;
  var outCallBack = obj.outCallBack;
  var inCallBack = obj.inCallBack;
  var addEvent = obj.addEvent;
  var init = function() {
    initPrev()
    $(openBtn).on("click", function() {
      $(layer).stop().fadeIn(delay);
      if (inCallBack) {
        inCallBack();
      }
    })
    $(closeBtn).on("click", function() {
      $(layer).stop().fadeOut(delay);
      if (outCallBack) {
        outCallBack();
      }
    });
    addEvent();
  };
  return init();
};
function siteMapScrollEvent(pos) {
  var sections = $(".siteMapCateSections");
  var sectionPosArr = new Array();
  sections.each(function(i) {
    
  });
}
$(document).ready(function() {
  // 전역 변수
  var siteMap = $('#siteMaps');
  var _body = $("body");
  // 서브 내비게이션 마우스오버 슬라이드 이벤트
  $('.navItems').hover(function() {

  }, function() {
    
  });
  new fadeInOutEvent({
    layer : "#siteMaps",
    openBtn : ".sideBtn",
    closeBtn : "#siteMapClose",
    delay : 300,
    initPrev : function() {
      var siteMapDisplay = siteMap.css("display");
      if (siteMapDisplay === "block") {
        _body.css({
          "height":"100vh",
          "overflow" : "hidden"
        });
      } else {
        _body.css({
          "height":"auto",
          "overflow" : "auto"
        });
      }
    },
    outCallBack : function() {
      _body.css({
        "height":"auto",
        "overflow" : "auto"
      });
    },
    inCallBack : function() {
      _body.css({
        "height":"100vh",
        "overflow" : "hidden"
      });
    },
    addEvent : function() {
      var scrollArea = $("#siteMapArea");
      siteMapScrollEvent(scrollArea.scrollTop());
      $("#siteMapArea").scroll(function() {
        var _this = $(this);
        var _scrollTop = _this.scrollTop();
        siteMapScrollEvent(_scrollTop);
      })
    }
  });
});