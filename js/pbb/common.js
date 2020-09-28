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
  var navEl = $('.nav-items > a');
  var subEl = $('.sub-nav-wrapper');
  navEl.mouseover(function() {
    var $this = $(this);
    var thisSubEl = $this.next('.sub-nav-wrapper'); 
    subEl.removeClass('active');
    thisSubEl.addClass('active');
    subEl.stop().slideUp();
    thisSubEl.stop().slideDown();
  });
  $('#headers').mouseleave(function() {
    subEl.removeClass('active');
    subEl.stop().slideUp();
  });
  // sub nav
  $('.sub-nav-depths').on('click', function() {
    var $this = $(this);
    if (!$this.hasClass('active')) {
      $this.addClass('active');
      $this.next('.sub-nav-selector').stop().slideDown();
    } else {
      $this.removeClass('active');
      $this.next('.sub-nav-selector').stop().slideUp();
    }
  });
});