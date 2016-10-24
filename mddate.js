"use strict";
var MdDate = function (date){
  this.date = new Date(date),

  this.year= this.date.getFullYear(),
  this.month = this.date.getMonth() + 1,
  this.day = this.date.getDate(),
  this.hour = this.date.getHours(),
  this.minute = this.date.getMinutes()
}

MdDate.prototype = {
  whichDay: function(){
    var now = new Date();
    //今天
    if(now.getDate() == this.day){
      return '今天';
    }
    //昨天
    else if( now.getDate()-1 == this.day ){
      return '昨天';
    }
    else{
      return this.getWeekStr();
    }
  },
  whichDays : function(){
    var now = new Date();
    //今天
    if(now.getDate() == this.day){
      return this.getHourMinuteStr();
    }
    //昨天
    else if( now.getDate()-1 == this.day ){
      return this.getHourMinuteStr();
    }
    else{
      return this.getFullMonthStr() + '-' + this.getFullDayStr();
    }
  },
  getFullMonthStr:function(){
    if(this.month<10)
    {
      return '0'+this.month;
    }
    else{
      return this.month;
    }
  },
  getFullDayStr:function(){
    if(this.day<10)
    {
      return '0'+this.day;
    }
    else{
      return this.day;
    }
  },
  //传入的date格式是:年月日 时分
  getWeekStr : function(date){
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
  getHourMinuteStr : function(){
    var hourstr = this.hour,
        minutestr = this.minute;
    if(this.hour < 10 ){
      hourstr = "0" + this.hour;
    }
    if(this.minute < 10 ){
      minutestr = "0" + this.minute;
    }
    return hourstr + ':' + minutestr;
  }
}
