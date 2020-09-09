$(document).ready(function () {
  // 설치위치 슬라이드
  $('.service-installation').slick({
    dots:false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    prevArrow: '<button class="slick-prev">prev</button>',
    nextArrow: '<button class="slick-next">next</button>'
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
      $('.service-installation').get(index).slick.setPosition();
    },
    // 콜백 이후 실행
    // callbackAfter : function() {
    //   console.log('callback after');
    // }
  });
  
  // 방문자 현황/시민 미세먼지 측정현황 탭 이벤트
  new tabEvent({
    tabBtn : $('.visitor-nav-items > a'),
    parentSelector : '.visitor-nav-items',
    firstIndex : 0,
    tabEl : $('.tab-cont-items'),
    // 로드 후 최초실행 함수(생략가능)
    start : function() {
      var html = '';
      html = '<div style="position:relative;width:100%;height:100%;border:20px solid #ffcccc;">';
      html += '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%, -50%)">차트영역</div>';
      html += '</div>';
      document.getElementById('visitor-charts').innerHTML = html;
    },
    // 탭 이동 후
    callback : function(index) {
      console.log(index + ' tab active');
      if (index == 0) {
        
      }
    },
    // 콜백 이후 실행
    // callbackAfter : function() {
    //   console.log('callback after');
    // }
  });
  
  // 방문자 현황 정렬 방식 이벤트
  $('.visitor-sort-items > a').on('click', function() {
    var $this = $(this);
    var btnEl = $('.visitor-sort-items > a');
    if (!$this.hasClass('active')) {
      btnEl.removeClass('active');
      $this.addClass('active');
      // 일별 주별 월별 정렬 실행
    }
  });

  // 최다 방문 동 best 3 정렬방식 이벤트
  $('.best-visitor-items > a').on('click', function() {
    var $this = $(this);
    var btnEl = $('.best-visitor-items > a');
    if (!$this.hasClass('active')) {
      btnEl.removeClass('active');
      $this.addClass('active');
      // 일별 주별 월별 정렬 실행
    }
  });

  // 설치목록 데이터
  $('.service-installation-items > a').on('click', function() {
    var $this = $(this);
    var tabIndex = $this.parents('.service-page-items').index();
    if (!$this.hasClass('active')) {
      $('.service-page-items').eq(tabIndex).find('.service-installation-items > a').removeClass('active');
      $this.addClass('active');
    }
  });
});