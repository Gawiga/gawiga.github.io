(function( $, window, undefined ) {
  var currentScript = document.currentScript;
  var searchScriptUrl = currentScript && currentScript.getAttribute('data-search-src');

  // Menu
  $("a#slide").click(function(){
    $("#sidebar,a#slide,#fade").addClass("slide");
    $("#open").hide();
    $("#search").hide();
    $("#close").show();
  });

  $("#fade").click(function(){
    $("#sidebar,a#slide,#fade").removeClass("slide");
    $("#open").show();
    $("#search").show();
    $("#close").hide();
  });

  // Search
  var bs = {
    close: $(".icon-remove-sign"),
    searchform: $(".search-form"),
    canvas: $("body"),
    dothis: $('.dosearch'),
    initialized: false,
    loading: false
  };

  bs.dothis.on('click', function() {
    $('.search-wrapper').toggleClass('active');
    bs.searchform.toggleClass('active');
    bs.searchform.find('input').focus();
    bs.canvas.toggleClass('search-overlay');

    loadSearch();
  });

  function loadSearch() {
    if (bs.initialized || bs.loading) {
      return;
    }

    bs.loading = true;
    var script = document.createElement('script');
    script.src = searchScriptUrl || '/assets/js/search.js';
    script.onload = function() {
      bs.initialized = true;
      bs.loading = false;
      $('.search-field').simpleJekyllSearch();
    };
    script.onerror = function() {
      bs.loading = false;
    };
    document.head.appendChild(script);
  }

  bs.close.on('click', function() {
    $('.search-wrapper').toggleClass('active');
    bs.searchform.toggleClass('active');
    bs.canvas.removeClass('search-overlay');
  });

  // Scroll
  smoothScroll.init({
    updateURL: false
  })
})( Zepto, window );
