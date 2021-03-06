// Generated by CoffeeScript 1.3.3

/*
HTML5 Time polyfill | Jonathan Stipe | https://github.com/jonstipe/time-polyfill
*/


(function() {

  (function($) {
    $.fn.inputTime = function() {
      var decrement, increment, makeTimeDisplayString, makeTimeString, readTime, stepNormalize;
      readTime = function(t_str) {
        var hourPart, matchData, millisecondPart, minutePart, secondPart, timeObj;
        if (/^\d\d:\d\d(?:\:\d\d(?:\.\d+)?)?$/.test(t_str)) {
          matchData = /^(\d+):(\d+)(?:\:(\d+)(?:\.(\d+))?)?$/.exec(t_str);
          hourPart = parseInt(matchData[1], 10);
          minutePart = parseInt(matchData[2], 10);
          secondPart = matchData[3] != null ? parseInt(matchData[3], 10) : 0;
          millisecondPart = matchData[4] != null ? matchData[4] : '0';
          while (millisecondPart.length < 3) {
            millisecondPart += '0';
          }
          if (millisecondPart.length > 3) {
            millisecondPart = millisecondPart.substring(0, 3);
          }
          millisecondPart = parseInt(millisecondPart, 10);
          timeObj = new Date();
          timeObj.setHours(hourPart);
          timeObj.setMinutes(minutePart);
          timeObj.setSeconds(secondPart);
          timeObj.setMilliseconds(millisecondPart);
          return timeObj;
        } else {
          throw "Invalid time string: " + t_str;
        }
      };
      makeTimeString = function(time_obj) {
        var t_arr;
        t_arr = new Array();
        if (time_obj.getHours() < 10) {
          t_arr.push('0');
        }
        t_arr.push(time_obj.getHours().toString());
        t_arr.push(':');
        if (time_obj.getMinutes() < 10) {
          t_arr.push('0');
        }
        t_arr.push(time_obj.getMinutes().toString());
        if (time_obj.getSeconds() > 0 || time_obj.getMilliseconds() > 0) {
          t_arr.push(':');
          if (time_obj.getSeconds() < 10) {
            t_arr.push('0');
          }
          t_arr.push(time_obj.getSeconds().toString());
          if (time_obj.getMilliseconds() > 0) {
            t_arr.push('.');
            if (time_obj.getMilliseconds() < 100) {
              t_arr.push('0');
            }
            if (time_obj.getMilliseconds() < 10) {
              t_arr.push('0');
            }
            t_arr.push(time_obj.getMilliseconds().toString());
          }
        }
        return t_arr.join('');
      };
      makeTimeDisplayString = function(time_obj) {
        var ampm, time_arr;
        time_arr = new Array();
        if (time_obj.getHours() === 0) {
          time_arr.push('12');
          ampm = 'AM';
        } else if (time_obj.getHours() > 0 && time_obj.getHours() < 10) {
          time_arr.push('0');
          time_arr.push(time_obj.getHours().toString());
          ampm = 'AM';
        } else if (time_obj.getHours() >= 10 && time_obj.getHours() < 12) {
          time_arr.push(time_obj.getHours().toString());
          ampm = 'AM';
        } else if (time_obj.getHours() === 12) {
          time_arr.push('12');
          ampm = 'PM';
        } else if (time_obj.getHours() > 12 && time_obj.getHours() < 22) {
          time_arr.push('0');
          time_arr.push((time_obj.getHours() - 12).toString());
          ampm = 'PM';
        } else if (time_obj.getHours() >= 22) {
          time_arr.push((time_obj.getHours() - 12).toString());
          ampm = 'PM';
        }
        time_arr.push(':');
        if (time_obj.getMinutes() < 10) {
          time_arr.push('0');
        }
        time_arr.push(time_obj.getMinutes().toString());
        time_arr.push(':');
        if (time_obj.getSeconds() < 10) {
          time_arr.push('0');
        }
        time_arr.push(time_obj.getSeconds().toString());
        if (time_obj.getMilliseconds() > 0) {
          time_arr.push('.');
          if (time_obj.getMilliseconds() % 100 === 0) {
            time_arr.push((time_obj.getMilliseconds() / 100).toString());
          } else if (time_obj.getMilliseconds() % 10 === 0) {
            time_arr.push('0');
            time_arr.push((time_obj.getMilliseconds() / 10).toString());
          } else {
            if (time_obj.getMilliseconds() < 100) {
              time_arr.push('0');
            }
            if (time_obj.getMilliseconds() < 10) {
              time_arr.push('0');
            }
            time_arr.push(time_obj.getMilliseconds().toString());
          }
        }
        time_arr.push(' ');
        time_arr.push(ampm);
        return time_arr.join('');
      };
      increment = function(hiddenField, timeField) {
        var $hiddenField, max, step, value;
        $hiddenField = $(hiddenField);
        value = readTime($hiddenField.val());
        step = $hiddenField.data("step");
        max = $hiddenField.data("max");
        if (!(step != null) || step === 'any') {
          value.setSeconds(value.getSeconds() + 1);
        } else {
          value.setSeconds(value.getSeconds() + step);
        }
        if ((max != null) && value > max) {
          value.setTime(max.getTime());
        }
        $hiddenField.val(makeTimeString(value)).change();
        $(timeField).val(makeTimeDisplayString(value));
        return null;
      };
      decrement = function(hiddenField, timeField) {
        var $hiddenField, min, step, value;
        $hiddenField = $(hiddenField);
        value = readTime($hiddenField.val());
        step = $hiddenField.data("step");
        min = $hiddenField.data("min");
        if (!(step != null) || step === 'any') {
          value.setSeconds(value.getSeconds() - 1);
        } else {
          value.setSeconds(value.getSeconds() - step);
        }
        if ((min != null) && value < min) {
          value.setTime(min.getTime());
        }
        $hiddenField.val(makeTimeString(value)).change();
        $(timeField).val(makeTimeDisplayString(value));
        return null;
      };
      stepNormalize = function(inTime, hiddenField) {
        var $hiddenField, kNum, max, min, minNum, raisedStep, step, stepDiff, stepDiff2;
        $hiddenField = $(hiddenField);
        step = $hiddenField.data("step");
        min = $hiddenField.data("min");
        max = $hiddenField.data("max");
        if ((step != null) && step !== 'any') {
          kNum = inTime.getTime();
          raisedStep = step * 1000;
          if (min == null) {
            min = new Date(0);
          }
          minNum = min.getTime();
          stepDiff = (kNum - minNum) % raisedStep;
          stepDiff2 = raisedStep - stepDiff;
          if (stepDiff === 0) {
            return inTime;
          } else {
            if (stepDiff > stepDiff2) {
              return new Date(inTime.getTime() + stepDiff2);
            } else {
              return new Date(inTime.getTime() - stepDiff);
            }
          }
        } else {
          return inTime;
        }
      };
      $(this).filter('input[type="time"]').each(function() {
        var $hiddenField, $this, $timeField, btnContainer, className, downBtn, halfHeight, hiddenField, max, min, step, style, timeField, upBtn, value;
        $this = $(this);
        value = $this.attr('value');
        min = $this.attr('min');
        max = $this.attr('max');
        step = $this.attr('step');
        className = $this.attr('class');
        style = $this.attr('style');
        if ((value != null) && /^\d\d:\d\d(?:\:\d\d(?:\.\d+)?)?$/.test(value)) {
          value = readTime(value);
        } else {
          value = new Date();
        }
        if (min != null) {
          min = readTime(min);
          if (value < min) {
            value.setTime(min.getTime());
          }
        }
        if (max != null) {
          max = readTime(max);
          if (value > max) {
            value.setTime(max.getTime());
          }
        }
        if ((step != null) && step !== 'any') {
          step = parseFloat(step);
        }
        hiddenField = document.createElement('input');
        $hiddenField = $(hiddenField);
        $hiddenField.attr({
          type: "hidden",
          name: $this.attr('name'),
          value: makeTimeString(value)
        });
        $hiddenField.data({
          min: min,
          max: max,
          step: step
        });
        timeField = document.createElement('input');
        $timeField = $(timeField);
        $timeField.attr({
          type: "text",
          name: $this.attr('name'),
          value: makeTimeDisplayString(value),
          size: 14
        });
        if (className != null) {
          $timeField.attr('class', className);
        }
        if (style != null) {
          $timeField.attr('style', style);
        }
        $this.replaceWith(hiddenField);
        $timeField.insertBefore(hiddenField);
        halfHeight = ($timeField.outerHeight() / 2) + 'px';
        upBtn = document.createElement('div');
        $(upBtn).addClass('time-spin-btn time-spin-btn-up').css('height', halfHeight);
        downBtn = document.createElement('div');
        $(downBtn).addClass('time-spin-btn time-spin-btn-down').css('height', halfHeight);
        btnContainer = document.createElement('div');
        btnContainer.appendChild(upBtn);
        btnContainer.appendChild(downBtn);
        $(btnContainer).addClass('time-spin-btn-container').insertAfter(timeField);
        $timeField.on({
          DOMMouseScroll: function(event) {
            if (event.originalEvent.detail < 0) {
              increment(hiddenField, timeField);
            } else {
              decrement(hiddenField, timeField);
            }
            event.preventDefault();
            return null;
          },
          mousewheel: function(event) {
            if (event.originalEvent.wheelDelta > 0) {
              increment(hiddenField, timeField);
            } else {
              decrement(hiddenField, timeField);
            }
            event.preventDefault();
            return null;
          },
          keypress: function(event) {
            var _ref, _ref1;
            if (event.keyCode === 38) {
              increment(hiddenField, timeField);
            } else if (event.keyCode === 40) {
              decrement(hiddenField, timeField);
            } else if (((_ref = event.keyCode) !== 35 && _ref !== 36 && _ref !== 37 && _ref !== 39 && _ref !== 46) && ((_ref1 = event.which) !== 8 && _ref1 !== 9 && _ref1 !== 32 && _ref1 !== 45 && _ref1 !== 46 && _ref1 !== 47 && _ref1 !== 48 && _ref1 !== 49 && _ref1 !== 50 && _ref1 !== 51 && _ref1 !== 52 && _ref1 !== 53 && _ref1 !== 54 && _ref1 !== 55 && _ref1 !== 56 && _ref1 !== 57 && _ref1 !== 58 && _ref1 !== 65 && _ref1 !== 77 && _ref1 !== 80 && _ref1 !== 97 && _ref1 !== 109 && _ref1 !== 112)) {
              event.preventDefault();
            }
            return null;
          },
          change: function(event) {
            var ampm, hours, matchData, milliseconds, minutes, seconds, timeObj;
            $this = $(this);
            if (/^((?:1[0-2])|(?:0[1-9]))\:[0-5]\d(?:\:[0-5]\d(?:\.\d+)?)?\s[AaPp][Mm]$/.test($this.val())) {
              matchData = /^(\d\d):(\d\d)(?:\:(\d\d)(?:\.(\d+))?)?\s([AaPp][Mm])$/.exec($this.val());
              hours = parseInt(matchData[1], 10);
              minutes = parseInt(matchData[2], 10);
              seconds = parseInt(matchData[3], 10) || 0;
              milliseconds = matchData[4];
              if (milliseconds == null) {
                milliseconds = 0;
              } else if (milliseconds.length > 3) {
                milliseconds = parseInt(milliseconds.substring(0, 3), 10);
              } else if (milliseconds.length < 3) {
                while (milliseconds.length < 3) {
                  milliseconds += '0';
                }
                milliseconds = parseInt(milliseconds, 10);
              } else {
                milliseconds = parseInt(milliseconds, 10);
              }
              ampm = matchData[5].toUpperCase();
              timeObj = readTime($hiddenField.val());
              if (ampm === 'AM' && hours === 12) {
                hours = 0;
              } else if (ampm === 'PM' && hours !== 12) {
                hours += 12;
              }
              timeObj.setHours(hours);
              timeObj.setMinutes(minutes);
              timeObj.setSeconds(seconds);
              timeObj.setMilliseconds(milliseconds);
              if ((min != null) && timeObj < min) {
                $hiddenField.val(makeTimeString(min)).change();
                $this.val(makeTimeDisplayString(min));
              } else if ((max != null) && timeObj > max) {
                $hiddenField.val(makeTimeString(max)).change();
                $this.val(makeTimeDisplayString(max));
              } else {
                timeObj = stepNormalize(timeObj, hiddenField);
                $hiddenField.val(makeTimeString(timeObj)).change();
                $this.val(makeTimeDisplayString(timeObj));
              }
            } else {
              $this.val(makeTimeDisplayString(readTime($hiddenField.val())));
            }
            return null;
          }
        });
        $(upBtn).on('mousedown', function(event) {
          var releaseFunc, timeoutFunc;
          increment(hiddenField, timeField);
          timeoutFunc = function(hiddenField, timeField, incFunc) {
            incFunc(hiddenField, timeField);
            $(timeField).data('timeoutID', window.setTimeout(timeoutFunc, 10, hiddenField, timeField, incFunc));
            return null;
          };
          releaseFunc = function(event) {
            window.clearTimeout($(timeField).data('timeoutID'));
            $(document).off('mouseup', releaseFunc);
            $(upBtn).off('mouseleave', releaseFunc);
            return null;
          };
          $(document).on('mouseup', releaseFunc);
          $(upBtn).on('mouseleave', releaseFunc);
          $(timeField).data('timeoutID', window.setTimeout(timeoutFunc, 700, hiddenField, timeField, increment));
          return null;
        });
        $(downBtn).on('mousedown', function(event) {
          var releaseFunc, timeoutFunc;
          decrement(hiddenField, timeField);
          timeoutFunc = function(hiddenField, timeField, decFunc) {
            decFunc(hiddenField, timeField);
            $(timeField).data('timeoutID', window.setTimeout(timeoutFunc, 10, hiddenField, timeField, decFunc));
            return null;
          };
          releaseFunc = function(event) {
            window.clearTimeout($(timeField).data('timeoutID'));
            $(document).off('mouseup', releaseFunc);
            $(downBtn).off('mouseleave', releaseFunc);
            return null;
          };
          $(document).on('mouseup', releaseFunc);
          $(downBtn).on('mouseleave', releaseFunc);
          $(timeField).data('timeoutID', window.setTimeout(timeoutFunc, 700, hiddenField, timeField, decrement));
          return null;
        });
        return null;
      });
      return this;
    };
    $(function() {
      if (!Modernizr.inputtypes.time) {
        $('input[type="time"]').inputTime();
      }
      return null;
    });
    return null;
  })(jQuery);

}).call(this);
