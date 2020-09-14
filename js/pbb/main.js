$(document).ready(function () {
  // 설치위치 슬라이드
  $('.service-installation').slick({
    dots:false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    prevArrow: '<button class="slick-prev"><span class="sound-only">prev</span></button>',
    nextArrow: '<button class="slick-next"><span class="sound-only">next</span></button>'
  });
  
  // 서비스 운영상태 탭
  new tabEvent({
    tabBtn : $('.service-tab-items > a'),
    parentSelector : '.service-tab-items',
    firstIndex : 0,
    tabEl : $('.service-page-items'),
    // 로드 후 최초실행 함수(생략가능)
    start : function() {
      $('.service-installation-items.slick-current > a').addClass('active');
    },
    // 탭 이동 후
    callback : function(index) {
      console.log(index + ' asdf tab active');
      // 슬라이더 메뉴 재정렬
      $('.service-installation').get(index).slick.setPosition();
    },
    // 콜백 이후 실행
    // callbackAfter : function() {
    //   console.log('callback after');
    // }
  });
  
  // 방문자현황/미세먼지 측정현황 그래프 이벤트
  $('.visitor-nav-items > a').on('click', function() {
    var $this = $(this);
    var btnEl = $('.visitor-nav-items > a');
    if (!$this.hasClass('active')) {
      btnEl.removeClass('active');
      $this.addClass('active');
      // 방문자/미세먼지측정 데이터 차트 실행
    }
  });
  // 방문자 현황 / 미세먼지 측정 현황 정렬 방식 이벤트
  $('.visitor-sort-items > a').on('click', function() {
    var $this = $(this);
    var btnEl = $('.visitor-sort-items > a');
    if (!$this.hasClass('active')) {
      btnEl.removeClass('active');
      $this.addClass('active');
      // 일별 주별 월별 정렬 실행
    };
  });

  // 최다 방문 동 best 3 정렬방식 이벤트
  $('.best-visitor-items > a').on('click', function() {
    var $this = $(this);
    var btnEl = $('.best-visitor-items > a');
    if (!$this.hasClass('active')) {
      btnEl.removeClass('active');
      $this.addClass('active');
      // 일별 주별 월별 정렬 실행
    };
  });

  // 설치목록 데이터
  $('.service-installation-items > a').on('click', function() {
    var $this = $(this);
    var tabIndex = $this.parents('.service-page-items').index();
    if (!$this.hasClass('active')) {
      $('.service-page-items').eq(tabIndex).find('.service-installation-items > a').removeClass('active');
      $this.addClass('active');
    };
  });

  // 통학로 운영정보 / 휀스 연계형 팝업 열기
  $('.device-info-link').on('click', function() {
    var popEl = $('#device-pop');
    if (!popEl.hasClass('active')) {
      // 데이터 출력
  
      // 팝업열기
      popEl.addClass('active');
      popEl.stop().fadeIn();
    };
  });
  // 통학로 운영정보 / 휀스 연계형 팝업 닫기
  $('#device-pop-close').on('click', function() {
    var popEl = $('#device-pop');
    if (popEl.hasClass('active')) {
      popEl.removeClass('active');
      popEl.stop().fadeOut();
    };
  }); 
});