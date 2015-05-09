/*!
 * jQuery ClassyCountdown
 * www.class.pm
 *
 * Written by Marius Stanciu - Sergiu <marius@class.pm>
 * Licensed under the MIT license www.class.pm/LICENSE-MIT
 * Version 1.0.0
 *
 */

(function($) {
    $.fn.ClassyCountdown = function(options, callback) {
        var element = $(this);
        var DaysLeft, HoursLeft, MinutesLeft, SecondsLeft;
        var secondsLeft;
        var isFired = false;
		var timeArr = element.attr('data-time').split('-');
        var settings = {
            end: (new Date(Number(timeArr[0]), Number(timeArr[1]) - 1, Number(timeArr[2]))).getTime(),
            now: $.now(),
            labels: true,
            labelsOptions: {
                lang: {
                    days: 'Days',
                    hours: 'Hours',
                    minutes: 'Minutes',
                    seconds: 'Seconds'
                }
            },
            style: {
                element: '',
                labels: false,
                textResponsive: 0.5,
                days: {
                    gauge: {
                        thickness: 0.02,
                        bgColor: 'rgba(0, 0, 0, 0)',
                        fgColor: 'rgba(0, 0, 0, 1)',
                        lineCap: 'butt'
                    },
                    textCSS: ''
                },
                hours: {
					gauge: {
						thickness: .08,
						bgColor: "rgba(210,210,210,1)",
						fgColor: "#3A9473"
					}
				},
				minutes: {
					gauge: {
						thickness: .08,
						bgColor: "rgba(210,210,210,1)",
						fgColor: "#3A9473"
					}
				},
				seconds: {
					gauge: {
						thickness: .08,
						bgColor: "rgba(210,210,210,1)",
						fgColor: "#3A9473"
					}
				}
            },
            onEndCallback: function() {
                element.parent().addClass('time-end');
            }
        };
       
        settings = $.extend(true, settings, options);
        prepare();
        doTick();
        setInterval(doTick, 1000);
        doResponsive();
        
        function prepare() {
            element.append('<div class="ClassyCountdown-wrapper">' +
                    '<div class="ClassyCountdown-hours">' +
                        '<input type="text" />' +
                        '<span class="ClassyCountdown-value"><div></div><span></span></span>' +
                    '</div>' +
                    '<div class="ClassyCountdown-minutes">' +
                        '<input type="text" />' +
                        '<span class="ClassyCountdown-value"><div></div><span></span></span>' +
                    '</div>' +
                    '<div class="ClassyCountdown-seconds">' +
                        '<input type="text" />' +
                        '<span class="ClassyCountdown-value"><div></div><span></span></span>' +
                    '</div>' +
                '</div>');
			if (document.createElement('canvas').getContext) {
				element.find('.ClassyCountdown-days input').knob($.extend({
					width: '100%',
					displayInput: false,
					readOnly: true,
					max: 365
				}, settings.style.days.gauge));
				element.find('.ClassyCountdown-hours input').knob($.extend({
					width: '100%',
					displayInput: false,
					readOnly: true,
					max: 24
				}, settings.style.hours.gauge));
				element.find('.ClassyCountdown-minutes input').knob($.extend({
					width: '100%',
					displayInput: false,
					readOnly: true,
					max: 60
				}, settings.style.minutes.gauge));
				element.find('.ClassyCountdown-seconds input').knob($.extend({
					width: '100%',
					displayInput: false,
					readOnly: true,
					max: 60
				}, settings.style.seconds.gauge));
			}
            element.find('.ClassyCountdown-wrapper > div').attr("style", settings.style.element);
            element.find('.ClassyCountdown-days .ClassyCountdown-value').attr('style', settings.style.days.textCSS);
            element.find('.ClassyCountdown-hours .ClassyCountdown-value').attr('style', settings.style.hours.textCSS);
            element.find('.ClassyCountdown-minutes .ClassyCountdown-value').attr('style', settings.style.minutes.textCSS);
            element.find('.ClassyCountdown-seconds .ClassyCountdown-value').attr('style', settings.style.seconds.textCSS);
            if (settings.labels) {
                element.find(".ClassyCountdown-days .ClassyCountdown-value > span").html(settings.labelsOptions.lang.days);
                element.find(".ClassyCountdown-hours .ClassyCountdown-value > span").html(settings.labelsOptions.lang.hours);
                element.find(".ClassyCountdown-minutes .ClassyCountdown-value > span").html(settings.labelsOptions.lang.minutes);
                element.find(".ClassyCountdown-seconds .ClassyCountdown-value > span").html(settings.labelsOptions.lang.seconds);
                element.find(".ClassyCountdown-value > span").attr("style", settings.labelsOptions.style);
            }
            secondsLeft = (settings.end - settings.now) / 1000;
            secondsToDHMS();
        }
        
        function secondsToDHMS() {
            DaysLeft = Math.floor(secondsLeft / 86400);
            HoursLeft = Math.floor((secondsLeft % 86400) / 3600);
            MinutesLeft = Math.floor(((secondsLeft % 86400) % 3600) / 60);
            SecondsLeft = Math.floor((((secondsLeft % 86400) % 3600) % 60) % 60);
        }

        function doTick() {
            secondsLeft--;
            secondsToDHMS();
            if (secondsLeft <= 0) {
                if (!isFired) {
                    isFired = true;
                    settings.onEndCallback();
                }
                DaysLeft = 0;
                HoursLeft = 0;
                MinutesLeft = 0;
                SecondsLeft = 0;
            }
            element.find('.ClassyCountdown-days input').val(DaysLeft).trigger('change');
            element.find('.ClassyCountdown-hours input').val(HoursLeft).trigger('change');
            element.find('.ClassyCountdown-minutes input').val(MinutesLeft).trigger('change');
            element.find('.ClassyCountdown-seconds input').val(SecondsLeft).trigger('change');
            element.parent().find('.coutdownDay').html(DaysLeft);
            element.find('.ClassyCountdown-hours .ClassyCountdown-value > div').html(HoursLeft);
            element.find('.ClassyCountdown-minutes .ClassyCountdown-value > div').html(MinutesLeft);
            element.find('.ClassyCountdown-seconds .ClassyCountdown-value > div').html(SecondsLeft);

        }
        
        function doResponsive() {
            element.find('.ClassyCountdown-wrapper > div').each(function() {
                $(this).css('height', $(this).width() + 'px');
            });
            $(window).trigger('resize');
            $(window).resize($.throttle(50, onResize));
        }

        function onResize() {
            element.find('.ClassyCountdown-wrapper > div').each(function() {
                $(this).css('height', $(this).width() + 'px');
            });
            element.find('.ClassyCountdown-days input').trigger('change');
            element.find('.ClassyCountdown-hours input').trigger('change');
            element.find('.ClassyCountdown-minutes input').trigger('change');
            element.find('.ClassyCountdown-seconds input').trigger('change');
        }
        
        function getPreset(theme) {
            switch (theme) {
                case 'flat-colors':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            hours: {
                                gauge: {
                                    thickness: 0.01,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#2980b9"
                                }
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.01,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#8e44ad"
                                }
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.01,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#f39c12"
                                }
                            }
                        }
                    };
                case 'flat-colors-wide':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.03,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#1abc9c"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.03,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#2980b9"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.03,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#8e44ad"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.03,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#f39c12"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            }
                        }
                    };
                case 'flat-colors-very-wide':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.12,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#1abc9c"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.12,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#2980b9"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.12,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#8e44ad"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.12,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#f39c12"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            }
                        }
                    };
                case 'flat-colors-black':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.25,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#1abc9c",
                                    lineCap: 'round'
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.25,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#2980b9",
                                    lineCap: 'round'
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.25,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#8e44ad", lineCap: 'round'
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.25,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#f39c12",
                                    lineCap: 'round'
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            }
                        }
                    };
                case 'black':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.01,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.01,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.01,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.01,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            }
                        }
                    };
                case 'black-wide':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.03,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.03,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.03,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.03,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            }
                        }
                    };
                case 'black-very-wide':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.17,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.17,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.17,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.17,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            }
                        }
                    };
                case 'black-black':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.25,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222",
                                    lineCap: 'round'
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.25,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222",
                                    lineCap: 'round'
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.25,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222",
                                    lineCap: 'round'
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.25,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222",
                                    lineCap: 'round'
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            }
                        }
                    };
                case 'white-wide':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.06,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.06,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.06,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.06,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            }
                        }
                    };
                case 'white-very-wide':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.16,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.16,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.16,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.16,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            }
                        }
                    };
                case 'white-black':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.25,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff",
                                    lineCap: 'round'
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.25,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff",
                                    lineCap: 'round'
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.25,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff",
                                    lineCap: 'round'
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.25,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff",
                                    lineCap: 'round'
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            }
                        }
                    };
            }
        }
    };

})(jQuery);