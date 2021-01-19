'use strict';
var accordionEvent = function(obj) {
  this.obj = obj;
  var el = obj.el;
  var contents = obj.contents;
  var opens = obj.opens;
  var openIndex = obj.openIndex;
  var customEvent = obj.customEvent;
  var overlap = obj.overlap;
  var onClick = obj.onClick;
  var slideDownEvent = function(target) {
    target.addClass('active');
    target.find(contents).stop().slideDown();
    if (!overlap) {
      target.siblings().removeClass('active');
      target.siblings().find(contents).stop().slideUp();
    }
  }
  var slideUpEvent = function(target) {
    target.removeClass('active');
    target.find(contents).stop().slideUp();
    if (!overlap) {
      target.siblings().removeClass('active');
      target.siblings().find(contents).stop().slideUp();
    }
  }
  var init = function() {
    var _target = $(el);
    if (opens) {
      _target.each(function(i) {
        var _this = $(this);
        var _parents = _this.parent();
        if (i === openIndex) {
          slideDownEvent(_parents);
        }
      })
    }
    _target.on('click', function() {
      var _this = $(this);
      var _parents = _this.parent();
      if (_parents.hasClass('active')) {
        slideUpEvent(_parents)
      } else {
        slideDownEvent(_parents)
      }
      if (onClick) {
        onClick(_this);
      }
    });
    if (customEvent) {
      customEvent();
    }
  };
  return init();
}
var fadeInOutEvent = function(obj) {
  var layer = obj.layer;
  var openBtn = obj.openBtn;
  var closeBtn = obj.closeBtn;
  var delay = obj.delay;
  var initPrev = obj.initPrev;
  var inCallBack = obj.inCallBack;
  var outBefore = obj.outBefore;
  var outCallBack = obj.outCallBack;
  var addEvent = obj.addEvent;
  var init = function() {
    initPrev();
    $(openBtn).on("click", function() {
      $(layer).stop().fadeIn(delay, function() {
        if (inCallBack) {
          inCallBack();
        }
        addEvent();
      });
    })
    $(closeBtn).on("click", function() {
      if (outBefore) {
        outBefore();
      }
      $(layer).stop().fadeOut(delay, function() {
        if (outCallBack) {
          outCallBack();
        }
      });
    });
  };
  return init();
};
var callKaKaoMaps = function(obj) {
  var el = document.getElementById(obj.el);
  var option = {
    center : new kakao.maps.LatLng(obj.center.lat, obj.center.lng),
    level : obj.level
  };
  var zoomCtr = obj.zoomCtr;
  var mapCtr = obj.mapCtr;
  var customZoomCtr = obj.customZoomCtr;
  var zoomAble = obj.zoomAble;
  var customMapTypes = obj.customMapTypes;
  var addEvent = obj.addEvent;
  var map = new kakao.maps.Map(el, option);
  var init = function() {
    if (zoomCtr.init) {
      var zoomCtrInit = new kakao.maps.ZoomControl();
      map.addControl(zoomCtrInit, kakao.maps.ControlPosition[zoomCtr.position]);
      if (zoomCtr.custom) {
        zoomCtr.custom(zoomCtrInit, map)
      }
    }
    if (customZoomCtr) {
      customZoomCtr.in.addEventListener('click', function() {
        var level = map.getLevel();
        map.setLevel(level - 1);
      })
      customZoomCtr.out.addEventListener('click', function() {
        var level = map.getLevel();
        map.setLevel(level + 1);
      })
    }
    if (mapCtr.init) {
      var mapCtrInit = new kakao.maps.MapTypeControl();
      map.addControl(mapCtrInit, kakao.maps.ControlPosition[mapCtr.position])
      if (mapCtr.custom) {
        mapCtr.custom(mapCtrInit, map)
      }
    }
    if (customMapTypes) {
      // ROADMAP
      // SKYVIEW
      // HYBRID
      // ROADVIEW
      // OVERLAY
      // TRAFFIC
      // TERRAIN
      // BICYCLE
      // BICYCLE_HYBRID
      // USE_DISTRICT
      customMapTypes(map);
    }
    map.setZoomable(zoomAble);
    addEvent(map);
  };
  return {
    init : init,
    obj : obj,
    map : map
  };
};
var dropDownSet = function(obj) {
  var wrapper = $(obj.wrapper);
  var link = wrapper.find(obj.link);
  var list = wrapper.find(obj.list);
  var items = wrapper.find(obj.items);
  var useSub = obj.useSub;
  var customLinkEvent = obj.customLinkEvent;
  var customItemEvent = obj.customItemEvent;
  var open = obj.open;
  var type = obj.type;
  var listWidth = wrapper.width();
  var itemWidth = items.width();
  var dropEvent = function() {
    switch(type) {
      case "HOVER" : 
        wrapper.hover(function() {
          var _this = $(this).children(obj.link);
          var active = _this.hasClass('active');
          if (!active) {
            list.stop().slideDown();
            _this.addClass('active');
          }
        }, function() {
          var _this = $(this).children(obj.link);
          var active = _this.hasClass('active');
          if (active) {
            list.stop().slideUp();
            _this.removeClass('active');
          }
        });
        break;
      case "CLICK" :
        link.on('click', function() {
          var _this = $(this);
          var active = _this.hasClass('active');
          if (active) {
            list.stop().slideUp();
            _this.removeClass('active');
          } else {
            list.stop().slideDown();
            _this.addClass('active');
          }
        });
      break;
      default : 
        link.on('click', function() {
          var _this = $(this);
          var active = _this.hasClass('active');
          if (active) {
            list.stop().slideUp();
            _this.removeClass('active');
          } else {
            list.stop().slideDown();
            _this.addClass('active');
          }
        });
      break;
    }
  };
  var size = function() {
    wrapper.css('width', 'auto');
    items.css('width', 'auto');
    if (listWidth < itemWidth) {
      wrapper.css('width', itemWidth + "px");
    } else {
      items.css('width', listWidth + "px");
    };
  }
  var init = function() {
    $(window).resize(function() {
      size();
    })
    size();
    if (!open) {
      list.css('display', 'none');
    };
    if (open) {
      list.css('display', 'block');
      link.addClass('active');
    }
    if (customLinkEvent) {
      link.on('click', function() {
        var _this = $(this);
        customLinkEvent(_this)
      });
    };
    if (customItemEvent) {
      items.on('click', function() {
        var _this = $(this);
        customItemEvent(_this);
      })
    };
    if (useSub) {
      dropEvent();
    }
  };
  return {
    init : init
  };
};
function siteMapScrollEvent(nowPos, sectionArr) {
  for (var i = 0; i < sectionArr.length; i++) {
    if (nowPos > sectionArr[i]-20) {
      $(".siteMapNavItems").removeClass('active');
      $(".siteMapNavItems").eq(i).addClass('active');
    }
  }
}
function setMapTypes(map, types) {
  $('[data-type="'+types+'"]').addClass("active");
  map.setMapTypeId(kakao.maps.MapTypeId[types])
}
function getDevice() {
  var _window = $(window);
  var _width = _window.width();
  if (_width >= 1280) {
    return 'PC';
  }
  if (_width <= 1280 && _width >= 720) {
    return 'TABLET';
  }
  if (_width < 720) {
    return 'MOBILE';
  }
};
window.onload = function() {
  // 전역 변수
  var siteMap = $('#siteMaps');
  var _body = $("body");
  // 서브 내비게이션 마우스오버 슬라이드 이벤트
  $('.navItems').hover(function() {
    $(this).addClass('active');
    $(this).find('.subNavs').stop().slideDown();
  }, function() {
    $(this).removeClass('active');
    $(this).find('.subNavs').stop().slideUp();
  });
  // 모달닫기
  $('.modalBg, .closeBtn').on('click',  function() {
    $('.modals').stop().fadeOut();
  });
  // jquery ui datepicker
  $('.dateForm').each(function(i) {
    var $this = $(this);
    $this.datepicker({
      changeMonth: true,
      changeYear: true, 
      minDate: '-100y', 
      maxDate: new Date(),
      nextText: '다음 달',
      prevText: '이전 달',
      numberOfMonths: [1,1],
      stepMonths: 1,
      yearRange: 'c-100:c+10',
      showButtonPanel: true,  
      currentText: '오늘 날짜',
      closeText: '닫기', 
      dateFormat: "yy-mm-dd",
      showMonthAfterYear: true ,
      dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
      monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
    });
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
    inCallBack : function() {
      _body.css({
        "height":"100vh",
        "overflow" : "hidden"
      });
    },
    outBefore : function() {
      $("#siteMapArea").scrollTop(0);
    },
    outCallBack : function() {
      _body.css({
        "height":"auto",
        "overflow" : "auto"
      });
    },
    addEvent : function() {
      var scrollArea = $("#siteMapArea");
      var sections = $(".siteMapCateSections");
      var sectionPosArr = new Array();
      sections.each(function(i) {
        var _this = $(this);
        sectionPosArr[i] = _this.position().top - ($("#siteMapHeader").height() + 1);
      });
      siteMapScrollEvent(scrollArea.scrollTop(), sectionPosArr);
      scrollArea.scroll(function() {
        var _this = $(this);
        var _scrollTop = _this.scrollTop();
        siteMapScrollEvent(_scrollTop, sectionPosArr);
      });
      $(".siteMapNavItems a").on("click", function() {
        var _this = $(this);
        var _index = _this.parents('.siteMapNavItems').index();
        scrollArea.stop().animate({
          "scrollTop":sectionPosArr[_index] + "px"
        });
      });
    }
  });
  var dropwdownDepth2 = new dropDownSet({
    wrapper : "#depth3",
    useSub : true,
    link : ".depthLink",
    list : "#depth3LinkList",
    items : ".depthLinkItems",
    open : false,
    type : "HOVER",
    customLinkEvent : function(thisEl) {

    },
    customItemEvent : function(thisEl) {
      
    }
  });
  dropwdownDepth2.init();
};