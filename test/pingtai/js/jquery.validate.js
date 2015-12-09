var happy = {
    phone: function (val) {
        return /^1[3|4|5|7|8][0-9]\d{4,8}$/.test(val);
    },

    // matches mm/dd/yyyy (requires leading 0's (which may be a bit silly, what do you think?)
    date: function (val) {
        return /^(?:0[1-9]|1[0-2])\/(?:0[1-9]|[12][0-9]|3[01])\/(?:\d{4})/.test(val);
    },

    email: function (val) {
        return /^(?:\w+\.?\+?)*\w+@(?:\w+\.)+\w+$/.test(val);
    },

    minLength: function (val, length) {
        return val.length >= length;
    },

    maxLength: function (val, length) {
        return val.length <= length;
    },

    equal: function (val1, val2) {
        return (val1 == val2);
    }
};
/*global $*/
(function happyJS($) {
    function trim(el) {
        return (''.trim) ? el.val().trim() : $.trim(el.val());
    }
    $.fn.isHappy = function isHappy(config) {
        var fields = [], item;
        var pauseMessages = false;

        function isFunction(obj) {
            return !!(obj && obj.constructor && obj.call && obj.apply);
        }
        function defaultError(error) { //Default error template
            var msgErrorClass = config.classes && config.classes.message || 'unhappyMessage';
            return $('<i id="' + error.id + '" class="' + msgErrorClass + '" role="alert">' + error.message + '</i>');
        }
        function getError(error) { //Generate error html from either config or default
            if (isFunction(config.errorTemplate)) {
                return config.errorTemplate(error);
            }
            return defaultError(error);
        }
        function handleSubmit() {
            var  i, l;
            var errors = false;
            for (i = 0, l = fields.length; i < l; i += 1) {
                if (!fields[i].testValid(true)) {
                    errors = true;
                }
            }
            if (errors) {
                if (isFunction(config.unHappy)) config.unHappy();
                return false;
            } else if (config.testMode) {
                if (isFunction(config.happy)) config.happy();
                if (window.console) console.warn('would have submitted');
                return false;
            }
            if (isFunction(config.happy)) config.happy();
        }
        function handleMouseUp() {
            pauseMessages = false;
        }
        function handleMouseDown() {
            pauseMessages = true;
            $(window).bind('mouseup', handleMouseUp);
        }
        function processField(opts, selector) {
            var field = $(selector);
            var errorInfo = {
                message: opts.message || '',
                id: selector.slice(1) + '_unhappy'
            };
            var errorEl = $(errorInfo.id).length > 0 ? $(errorInfo.id) : getError(errorInfo);
            var handleBlur = function handleBlur() {
                if (!pauseMessages) {
                    field.testValid(true);
                } else {
                    $(window).bind('mouseup', field.testValid.bind(this, true));
                }
            };

            fields.push(field);
            field.testValid = function testValid(submit) {
                var val, temp;
                var el = $(this);
                var errorTarget = (opts.errorTarget && $(opts.errorTarget)) || el;
                var error = false;
                var required = !!el.get(0).attributes.getNamedItem('required') || opts.required;
                var password = (field.attr('type') === 'password');
                var fieldErrorClass = config.classes && config.classes.field || 'unhappy';
				var validOpts = {};
				var valid = function () {
					// get the value
					var gotFunc = ((val.length > 0 || required === 'sometimes') && isFunction(opts.test));
					var arg = isFunction(opts.arg) ? opts.arg() : opts.arg;
					
					// check if we've got an error on our hands
					if (submit === true && required === true && val.length === 0) {
						error = true;
					} else if (gotFunc) {
						error = !opts.test(val, arg);
					}

					if (!error && opts.next) {
						opts.test = opts.next.test;
						opts.arg = opts.next.arg;
						errorEl.html(opts.next.message);
                        
						opts.next = opts.next.next;
						valid();
					}
				};

                // handle control groups (checkboxes, radio)
                if (el.length > 1) {
                  val = [];
                  el.each(function(i,obj) {
                    val.push($(obj).val());
                  });
                  val = val.join(',');
                } else {
                  // clean it or trim it
                  if (isFunction(opts.clean)) {
                      val = opts.clean(el.val());
                  } else if (!password && typeof opts.trim === 'undefined' || opts.trim) {
                      val = trim(el);
                  } else {
                      val = el.val();
                  }

                  // write it back to the field
				  try {
					el.val(val);
				  }
				  catch (e) {
				  }
                }

				valid();

                if (error) {
                    if (opts.errorParent) {
						errorTarget.addClass(fieldErrorClass);
						errorEl.appendTo(opts.errorParent);
					}
					else {
						errorTarget.addClass(fieldErrorClass).after(errorEl);
					}
                    return false;
                } else {
                    temp = errorEl.get(0);
                    // this is for zepto
                    if (temp.parentNode) {
                        temp.parentNode.removeChild(temp);
                    }
                    errorTarget.removeClass(fieldErrorClass);
                    return true;
                }
            };
            field.bind(opts.when || config.when || 'blur', handleBlur);
        }

        for (item in config.fields) {
            processField(config.fields[item], item);
        }

        $(config.submitButton || this).bind('mousedown', handleMouseDown);

        if (config.submitButton) {
            $(config.submitButton).click(function () {
				handleSubmit();
				return false;
			});
        } else {
            this.bind('submit', handleSubmit);
        }
        return this;
    };
})(this.jQuery || this.Zepto);
