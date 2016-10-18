;
(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ?
            factory(global, true) :
            function(w) {
                if (!w.document) {
                    throw new Error("requires a window with a document");
                }
                return factory(w);
            };
    } else if (typeof define === "function" && define.amd) {
        define(["jquery", "UM"],function() {
            return factory(global);
        });
    } else {
        factory(global);
    }

}(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
  function _UModal(type, options) {
    if (options && (options.constructor === String)) {
      this.settings = $.extend({}, this.defaults, {
        title: options,
        text: ""
      });
    } else {
      this.settings = $.extend({}, this.defaults, options);
    }
    this.type = type;
    this._init();
  }
  _UModal.prototype = {
    constructor: _UModal,

    overlay: $('<div class="um-overlay"></div>'),

    defaults: {
      title: window.location.host || "",
      text: "",
      btnText: ["取消", "确定"],
      overlay: true,
      cancle: function() {},
      ok: function(data) {}
    },

    done: function(fn) {
      if (typeof fn === "function" && this._complete) {
        fn.call(this);
      }
    },

    _generateHTML: function() {

      var settings = this.settings,
          type = this.type,
          html;

      html = '<div class="um-modal"><div class="um-modal-content um-border-bottom">';

      if (settings.title) {
        html += '<div class="um-modal-title">' + settings.title + '</div>';
      }
      if (settings.text) {
        html += '<div class="um-modal-text">';
        //if(type === "tips") html += '<span class="um-ani-rotate"></span>';
        html += settings.text + '</div>';
      }
      if (type === "prompt") {
        html += '<div class="um-modal-input"><input type="text" class="form-control"></div>';
      }

      if (type === "login") {
        html += '<div class="um-modal-input"><input type="text" class="form-control" placeholder="请输入账号"><input type="password" class="form-control" placeholder="请输入密码"></div>';
      }

      type === "toast" ? html += '</div>' : html += '</div><div class="um-modal-btns">';

      if (type === "confirm" || type === "login" || type === "prompt") {
        html += '<a href="#" class="btn cancle">' + settings.btnText[0] + '</a>';
      }

      if (type === "toast") {
        html += '</div>';
        var that=this;
        var duration=settings.duration? settings.duration:2000;
        setTimeout(function(){
          that.destory(that.modal);
        },duration)
      } else {
        html += '<a href="#" class="btn ok">' + settings.btnText[1] +
            '</a></div></div>';
      }

      if (type === "loading") {
        var text=settings.text? settings.text:'正在加载';
        var icons=settings.icons ? settings.icons:'ti-reload';
        html = '<div class="um-modal" style="background-color: rgba(0, 0, 0, 0.2);width: 150px;margin-left: -75px;padding: 20px;border-radius: 12px;"><div style="color: #ffffff;">'+text+'</div><span class="um-ani-rotate '+icons+'"></span></div>';
      }
      this.html = html;
    },
    _showModal: function() {

      this.settings.overlay && this.overlay.appendTo($('body')).fadeIn(300);

      var modal = $(this.html).appendTo($('body')),

          modalH = modal.outerHeight(),
          wh = window.innerHeight;
      console.log(modal);
      modal.css('top', (wh - modalH - 20) / 2);

      setTimeout(function() {
        modal.addClass('um-modal-in');
      }, 100);

      this.modal = modal;
      this._attachEvent();
    },
    _attachEvent: function() {
      var that = this;
      that.modal.on("click", '.btn', function(e) {
        e.preventDefault();
        if ($(this).hasClass('cancle')) {
          setTimeout(function() {
            that.settings.cancle(data)
          }, 100);
        }
        if ($(this).hasClass('ok')) {
          var input = that.modal.find('.form-control'),
              inputLen = input.length,
              data;
          if (inputLen) {
            if (inputLen == 1) data = that.modal.find('.form-control').val();
            else {
              data = [];
              $.each(input, function() {
                data.push(this.value);
              });
            }
          }
          setTimeout(function() {
            that.settings.ok(data)
          }, 100);
        }
        that.destory(that.modal);
      });
    },
    destory: function() {
      var that = this;
      this.modal.removeClass('um-modal-in').addClass('um-modal-out').on('webkitTransitionEnd', function() {
        that.modal.off('webkitTransitionEnd');
        that.modal.removeClass('um-modal-out');
        that.modal.remove();
      });
      // 避免遮罩闪烁
      this.settings.overlay && this.overlay.remove();
    },
    _init: function() {

      this._generateHTML();
      this._showModal();

      if (this.type === 'tips' || this.type === 'loading') {
        this._complete = 1;
      }
    }
  }
  var loadingModal=null;/*用来接收loading对象*/
  var api={
    alert: function (options) {
      var $alert='alert';
      return new _UModal($alert,options);
    },
    confirm: function (options) {
      var $confirm='confirm';
      return new _UModal($confirm,options);
    },
    prompt: function (options) {
      var $prompt='prompt';
      return new _UModal($prompt,options);
    },
    login: function (options) {
      var $login='login';
      return new _UModal($login,options);
    },
    toast: function (options) {
      var $toast='toast';
      return new _UModal($toast,options);
    },
    showLoadingBar: function (options) {
      var $loading='loading';
      loadingModal = new _UModal($loading,options);
      //eturn loadingModal;
    },
    hideLoadingBar: function () {
      console.log(loadingModal);
      loadingModal.destroy();
    }
  };
  $.extend(UM,api);
  UM.modal = function(type, options) {
    return new _UModal(type, options);
  }
  return UM.modal;
}))
