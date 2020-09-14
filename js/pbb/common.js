// 탭 이벤트
var tabEvent = function(obj) {
  var eventSuccess = false;
  var tabBtn = obj.tabBtn;
  var parentSelector = obj.parentSelector;
  var firstIndex = obj.firstIndex;
  var tabEl = obj.tabEl;
  var callback = obj.callback;
  var callbackAfter = obj.callbackAfter;
  var start = obj.start;
  var tabMoveEvent = function(index) {
    tabBtn.removeClass('active');
    tabEl.removeClass('active');
    tabBtn.eq(index).addClass('active');
    tabEl.eq(index).addClass('active');
    eventSuccess = true;
  };
  var init = function() {
    tabBtn.eq(firstIndex).addClass('active');
    tabEl.eq(firstIndex).addClass('active');
    if (start) {
      start();
    }
    tabBtn.on('click', function() {
      var $this = $(this);
      var thisParentsIndex = $this.parents(parentSelector).index();
      if (!$this.hasClass('active')) {
        tabMoveEvent(thisParentsIndex);
        if (eventSuccess == true) {
          if(callback) {
            callback(thisParentsIndex);
          }
          if (callbackAfter) {
            callbackAfter();
          }
          eventSuccess == false;
        }
      }
    });
  };
  return init();
};


$(document).ready(function() {
  // 네비게이션 마우스 오버
  var subNavEl = $('.sub-nav-list');
  var subNavBg = $('#sub-nav-bg');
  $('.nav-items').mouseover(function() {
    subNavBg.stop().slideDown();
    subNavEl.stop().slideDown();
  });
  $('#headers, .nav-items').mouseleave(function() {
    subNavEl.stop().slideUp();
    subNavBg.stop().slideUp();
  });
  $('.nav-items > a').on('focus', function() {
    subNavBg.stop().slideDown();
    subNavEl.stop().slideDown();
  });
});