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
        }
      }
    });
  };
  return init();
};