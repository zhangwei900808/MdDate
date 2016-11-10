var MdDate = function (date) {
  this.date = new Date(date.replace(/-/g, '/')),
    this.year = this.date.getFullYear(),
    this.month = this.date.getMonth() + 1,
    this.day = this.date.getDate(),
    this.hour = this.date.getHours(),
    this.minute = this.date.getMinutes()
}

MdDate.prototype = {
  format: function (formatStr) {
    var week = ['日', '一', '二', '三', '四', '五', '六'];
    return formatStr.replace(/yyyy|YYYY/, this.date.getFullYear())
      .replace(/yy|YY/, (this.date.getYear() % 100) > 9 ? (this.date.getYear() % 100).toString() : '0' + (this.date.getYear() % 100))
      .replace(/MM/, (this.date.getMonth() + 1) > 9 ? (this.date.getMonth() + 1).toString() : '0' + (this.date.getMonth() + 1)).replace(/M/g, (this.date.getMonth() + 1))
      .replace(/w|W/g, week[this.date.getDay()])
      .replace(/dd|DD/, this.date.getDate() > 9 ? this.date.getDate().toString() : '0' + this.date.getDate()).replace(/d|D/g, this.date.getDate())
      .replace(/HH|hh/g, this.date.getHours() > 9 ? this.date.getHours().toString() : '0' + this.date.getHours()).replace(/H|h/g, this.date.getHours())
      .replace(/mm/g, this.date.getMinutes() > 9 ? this.date.getMinutes().toString() : '0' + this.date.getMinutes()).replace(/m/g, this.date.getMinutes())
      .replace(/ss/g, this.date.getSeconds() > 9 ? this.date.getSeconds().toString() : '0' + this.date.getSeconds()).replace(/S|s/g, this.date.getSeconds());
  },
  //根据当前时间判断剩余多长时间，格式 剩余多少天多少小时多少分钟
  timeleft: function (default_day, callback) {
    var needCallback = callback;
    if (arguments.length == 1) {
      if(typeof(default_day) === "function"){
        needCallback = default_day;
      }
    }
    default_day = default_day || 7;
    var that = this
    var inv = setInterval(function () {
      var start_dt = new Date();

      var end_dt = new Date(that.year, that.month - 1, that.day + default_day, that.hour, that.minute);
      var diff_second = (end_dt.getTime() - start_dt.getTime()) / 1000;

      // 剩余天数
      var diff_day = Math.floor(diff_second / (24 * 3600));
      // 计算完剩余天数后剩余的秒数
      var diff_milsecond = diff_second % (24 * 3600);
      // 剩余小时数
      var diff_hour = Math.floor(diff_milsecond / 3600);
      // 计算完剩余小时数后剩余的秒数
      diff_milsecond = diff_milsecond % 3600;
      // 剩余分钟数
      var diff_minute = Math.floor(diff_milsecond / 60);
      // alert('剩余：' + diff_day + '天,' + diff_hour + '小时,' + diff_minute +
      // '分钟,')
      if (diff_day > 0 || diff_hour > 0) {
        // if (diff_day == 0) {
        //   $("#hour").text(diff_hour + '小时');
        // } else {
        //   $("#day").text(diff_day + "天");
        //   $("#hour").text(diff_hour + "小时");
        // }

      }
      if (diff_day == 0 && diff_hour == 0 && diff_minute > 0) {
        // $(".tip-done").addClass('hide');
        // $(".tip-done2").removeClass('hide');
        // $("#minute").text(diff_minute);
      }
      if (diff_day == 0 && diff_hour == 0 && diff_minute == 0) {
        clearInterval(inv);
        needCallback();
      }
    }, 1000)
  },
  whichDay: function () {
    var now = new Date();
    //今天
    if (now.getDate() == this.day) {
      return '今天';
    }
    //昨天
    else if (now.getDate() - 1 == this.day) {
      return '昨天';
    }
    else {
      return this.getWeekStr();
    }
  },
  whichDays: function () {
    var now = new Date();
    //今天
    if (now.getDate() == this.day) {
      return this.getHourMinuteStr();
    }
    //昨天
    else if (now.getDate() - 1 == this.day) {
      return this.getHourMinuteStr();
    }
    else {
      return this.getFullMonthStr() + '-' + this.getFullDayStr();
    }
  },
  getFullMonthStr: function () {
    if (this.month < 10) {
      return '0' + this.month;
    }
    else {
      return this.month;
    }
  },
  getFullDayStr: function () {
    if (this.day < 10) {
      return '0' + this.day;
    }
    else {
      return this.day;
    }
  },
  //传入的date格式是:年月日 时分
  getWeekStr: function () {
    var week = this.date.getDay();
    var str = "";
    if (week == 0) {
      str = "周日";
    } else if (week == 1) {
      str = "周一";
    } else if (week == 2) {
      str = "周二";
    } else if (week == 3) {
      str = "周三";
    } else if (week == 4) {
      str = "周四";
    } else if (week == 5) {
      str = "周五";
    } else if (week == 6) {
      str = "周六";
    }
    return str;
  },
  getHourMinuteStr: function () {
    var hourstr = this.hour,
      minutestr = this.minute;
    if (this.hour < 10) {
      hourstr = "0" + this.hour;
    }
    if (this.minute < 10) {
      minutestr = "0" + this.minute;
    }
    return hourstr + ':' + minutestr;
  }
}
