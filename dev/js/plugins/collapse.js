/* 折叠菜单 */ 
;
+function($) {
  'use strict';
  $(function() {
    var openBtn = '.um-collapse-btn';
    var collapse = function(e) {
      var openList;
      var targetName = $(this).data("target");
      openList = targetName ? $("#" + targetName) : $(this).siblings(".um-collapse-content");
      if (openList.is(":visible")) {
        openList.slideUp("fast");
        openList.parent().removeClass("um-open");
      } else {
        openList.slideDown("fast");
        openList.parent().addClass("um-open");
      }
      e.preventDefault();
    };
    $(document).on("click", openBtn, collapse);
  })
}(jQuery);