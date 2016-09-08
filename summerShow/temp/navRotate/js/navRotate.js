$(function() {
  var toggle = $('#ss_toggle');
  var menu = $('#ss_menu');
  var rot;
  $('#ss_toggle').on('click', function(ev) {
    rot = parseInt($(this).data('rot')) - 180;
    menu.css('transform', 'rotate(' + rot + 'deg)');
    menu.css('webkitTransform', 'rotate(' + rot + 'deg)');
    if (rot / 180 % 2 == 0) {
      toggle.parent().addClass('ss_active');
      toggle.addClass('close');
    } else {
      toggle.parent().removeClass('ss_active');
      toggle.removeClass('close');
    }
    $(this).data('rot', rot);
  });
  menu.on('transitionend webkitTransitionEnd', function() {
    if (rot / 180 % 2 == 0) {
      $('#ss_menu div i').addClass('ss_animate');
    } else {
      $('#ss_menu div i').removeClass('ss_animate');
    }
  });
});