jQuery(function ($) {
  /******************* */
  /* ハンバーガーメニュー*/
  /******************* */
  $("#js-hamburger-menu").on("click", function () {
    $(".sp-nav").toggleClass("active");
    $(".hamburger-menu").toggleClass("hamburger-menu--open");
  });

  /******************* */
  /*  アンカーリンク     */
  /******************* */

  $(function () {
    $("body,html").stop().scrollTop(0);
    var hash = window.location.hash;
    if (hash !== void 0 && hash !== "") {
      var speed = 800; // ミリ秒
      var href = $(this).attr("href");
      var target = $(hash);
      var position = target.offset().top - 80; // ヘッダーの高さ70pxをずらす
      $("body,html").animate({ scrollTop: position }, speed, "swing");
    }
  });
  $(".sp-nav .menu__item").on("click", function () {
    $(".sp-nav").toggleClass("active");
    $(".hamburger-menu").toggleClass("hamburger-menu--open");
  });
  /******************* */
  /*  ページ内スクロール  */
  /******************* */

  $(function () {
    // #で始まるアンカーをクリックした場合に処理
    $('a[href^="#"]').click(function () {
      // スクロールの速度
      var speed = 600; // ミリ秒
      // アンカーの値取得
      var href = $(this).attr("href");
      // 移動先を取得
      var target = $(href == "#" || href == "" ? "html" : href);
      // 移動先を数値で取得
      var position = target.offset().top;
      // スムーススクロール
      $("body,html").animate({ scrollTop: position }, speed, "swing");
      return false;
    });
  });
  /******************* */
  /* header mix-blend */
  /******************* */
  $(function () {
    var fvHeight = $(".hero").outerHeight();
    var headerHeight = $(".pageheader").outerHeight();

    if ($("#top").length === 0) {
      $(window).on("scroll", function () {
        if ($(this).scrollTop() > headerHeight) {
          $(".header").addClass("active");
          $(".hamburger-menu").addClass("active");
        } else {
          $(".header").removeClass("active");
          $(".hamburger-menu").removeClass("active");
        }
      });
    } else {
      $(window).on("scroll", function () {
        if ($(this).scrollTop() > fvHeight) {
          $(".header").addClass("active");
          $(".hamburger-menu").addClass("active");
          $(".hero-sub-title").addClass("none");
        } else {
          $(".header").removeClass("active");
          $(".hamburger-menu").removeClass("active");
          $(".hero-sub-title").removeClass("none");
        }
      });
    }
  });
  /******************* */
  /* planタブ切り替え */
  /******************* */
  $(function () {
    $(".plan-tab__item").each(function (index) {
      $(this).on("click", function () {
        $(".plan-tab__item").removeClass("active");
        $(this).addClass("active");
        $(".plan-main__item").removeClass("active");
        $(".plan-main__item").eq(index).addClass("active");
      });
    });
  });
});
/******************* */
/* top 文字スクロール */
/******************* */

const track = document.querySelector(".hero-sub-title");
const itemWidth = track.offsetWidth / 2; // 2つ並んでいるので半分でOK

gsap.to(track, {
  x: -itemWidth,
  duration: 15,
  ease: "linear",
  repeat: -1,
  modifiers: {
    x: gsap.utils.unitize((x) => parseFloat(x) % itemWidth), // シームレスループ
  },
});
