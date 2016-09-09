/**
 *
 * Created by 30213 on 2016/9/8.
 */


function dateProgress() {
    for(var i=0;i<655;i++){
        $('#progress-line').width(i+10);
    }
}
// $('#progress-line').change(function(){
//     console.log($('#progress-line').width())
// })



function start(d0,d1){
    // 初始提示框位置：
    $('#timecode').css('left',100+10)

    getDay(d0,d1)

    /*开始按钮*/
    $('#move').click(function(){
        // $('#progress-line').width('100%')
        interval(d0,d1)
    })
    /*重置按钮*/
    $('#recover').click(function(){
        $('#progress-line').width(0)
    })
    /*停止按钮*/
    $('#stopMove').click(function(){
        var nowWidth = $('#progress-line').width()
        $('#progress-line').css({
            'width':nowWidth+'px',
            'transition':'none'
        })
    })
}


// var m=0
function addWidth(n){
    var n = 168
    var totalWidth = $('#progress-inset').width()
    var piece = totalWidth / n
    m += piece
    $('#progress-line').width(m)
}
// addWidth(7*24)


function interval(d0,d1){
    var m = 0
    // var d0 = '2016-08-22 00:00'
    // var d1 = '2016-08-29 00:00'

    var n = dateTime_diff(d0,d1)
    var date_array = dateArray(d0,d1)
    console.log(n,date_array)



    var totalWidth = $('#progress-inset').width()
    var nowWidth = $('#progress-line').width
    var piece = totalWidth / n
    console.log(piece)

    /*控制移动时间*/
    var moveTime = (totalWidth)/10
    // var moveTime = (totalWidth-nowWidth)/10

    /*红色条位置*/
    $('#progress-line').css({
        // 'transition':'width ease-in-out '+moveTime+'s',
        'transition':'width linear '+n+'s',
        'width':'100%'
    })



    /*提示框位置*/

    var tipInter = setInterval(function(){
        /*提示框位置：#progress-bar-wrapper 的 padding-left 值加上 10 */
        var align =parseInt($('#progress-line').width()/piece)
        console.log($('#progress-line').width(),align)

        if(align==n){
            clearInterval(tipInter)
        }
        // 提示框移动
        $('#timecode').css('left',$('#progress-line').width()+100+10)
        // 时间变化
        $('#timecode-box').text(date_array[align])

    },n)

    /*清楚定时器*/

    // if(window.screen.width<document.body.clientWidth){
    //     clearInterval(tipInter)
    // }

}


function tipAlign(){
    console.log($('#timecode').css('right'))
    if(window.screen.width<document.body.clientWidth){
        // clearInterval(tipInter)
    }
}



Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    return fmt;
}


Date.prototype.add = function (part, value) {
    value *= 1;
    if (isNaN(value)) {
        value = 0;
    }
    switch (part) {
        case "y":
            this.setFullYear(this.getFullYear() + value);
            break;
        case "m":
            this.setMonth(this.getMonth() + value);
            break;
        case "d":
            this.setDate(this.getDate() + value);
            break;
        case "h":
            this.setHours(this.getHours() + value);
            break;
        case "n":
            this.setMinutes(this.getMinutes() + value);
            break;
        case "s":
            this.setSeconds(this.getSeconds() + value);
            break;
        default:
    }
}

/*
 return hours at the time ...
 */
function stamp2hour(dateTime){
    var time = dateTime.split(' ')
    if (time.length == 2){
        var stamp = new Date(dateTime).getTime()
        return stamp/1000/3600
    }
}

/*
 return datetime formatter
 */
function hours2dateTime(hours){
    var stamp = hours*1000*3600
    var newdate = new Date(stamp)
    console.log()
    return newdate.Format('yyyy-MM-dd HH:mm')
}
// hours2dateTime(408928)



/*
 return hours diffrent
 */
function dateTime_diff(startDate,endDate){
    /*
     date formatter : '2015-12-12 23:59:59'
     */
    var d0 = stamp2hour(startDate)
    var d1 = stamp2hour(endDate)
    return (d1-d0)
}


/*
 return date array about hours
 */
function dateArray(dateStart,dateEnd){
    var date_array = []
    var startHour = stamp2hour(dateStart)
    var endHour = stamp2hour(dateEnd)
    for(var i=0;i<(endHour-startHour);i++){
        date_array.push(String(hours2dateTime(startHour+i)))
    }
    return date_array
}



function getDay(d0,d1){
    // var day0 = parseInt(d0.split(' ')[0].split('-')[2])
    // var day1 = parseInt(d1.split(' ')[0].split('-')[2])
    var day0 = new Date(d0)
    var day1 = new Date(d1)
    var day_diff = (day1.getTime()-day0.getTime())/1000/3600/24

    var date_array = dateArray(d0,d1)


    for (var j=0;j<day_diff;j++){
        var n = 24 *j;
        /*星期几*/
        var weekDay = new Date(date_array[n]).getDay()
        /*多少号*/
        var Day = new Date(date_array[n]).getDate()
        // console.log(Day)
        weekDay == 0 ? weekDay=7 : weekDay
        $('#calendar').append('<div style="width:'+ 1/(day_diff+1)*100 +'%">'+'周'+weekDay+' '+Day+'号</div>')
    }
}



