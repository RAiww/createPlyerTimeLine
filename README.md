撥放器時間軸
=======


> 文件： 影片時間軸 jPlyerTimeLine<br />
> 作者： RAiww <ra@iww.twbbs.org> (http://ra.iww.twbbs.org/)<br />
> 版本： v0.0.0<br />
> 授權： MIT @license: [ra.iww.twbbs.org/ffish/MIT_License](http://ra.iww.twbbs.org/ffish/MIT_License)



## 簡介

撥放器時間軸模組。



## 目錄


  * lib
    * [影片時間軸](lib/jPlyerTimeLine.js)
    * [JzTree 補充包](lib/jzTree_additional.js)
  * README.md



## 使用方法


> 改變的狀態分為兩種： 「顯示畫面改變」、「影片時間改變」。



### 基本 HTML （建議）


HTML：

```html
<div id="LxPlyerTimeLine">
  <div class="LxPlyerTimeLine_floatShow">00:00</div>
  <div class="LxPlyerTimeLine_buffer"></div>
  <div class="LxPlyerTimeLine_play"></div>
</div>
```


CSS Style：

```css
#LxPlyerTimeLine {
  height: 6px;
  margin: 0 32px;
  position: relative;
  background-color: rgba(255, 255, 255, 0.3);
}
#LxPlyerTimeLine .LxPlyerTimeLine_floatShow {
  width: 64px;
  height: 16px;
  margin-left: -32px;
  display: none;
  position: absolute;
  top: -26px;
  left: 0;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
}
#LxPlyerTimeLine.esFloat .LxPlyerTimeLine_floatShow,
#LxPlyerTimeLine.esDrag .LxPlyerTimeLine_floatShow {
  display: block;
}
#LxPlyerTimeLine .LxPlyerTimeLine_buffer {
  width: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.3);
}
#LxPlyerTimeLine.esLive .LxPlyerTimeLine_buffer {
  width: 0 !important;
}
#LxPlyerTimeLine .LxPlyerTimeLine_play {
  width: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: #f12b24;
}
#LxPlyerTimeLine.esLive .LxPlyerTimeLine_buffer {
  width: 100%;
}
```



### 事件狀態


```html
<div id="LxPlyerTimeLine" class="esEvtState"></div>
```

  - esNoReady： 未完成準備
  - esLive： 直播
  - 執行中：
    - esFloat： 懸浮
    - esDrag： 拖拉



### new jPlyerTimeLine 參數


標籤物件：

```
var HElem_progress = document.querySelector('#LxPlyerTimeLine'),
    jPlyerCtrl_timeLine = new jPlyerTimeLine({
        //時間軸外框
        HElem_progress: HElem_progress,
        //顯示框
        HElem_floatShow: HElem_progress.querySelector('.LxPlyerTimeLine_floatShow'),
        //緩衝條
        HElem_buffer: HElem_progress.querySelector('.LxPlyerTimeLine_buffer'),
        //撥放條
        HElem_play: HElem_progress.querySelector('.LxPlyerTimeLine_play'),
    });
```


必要影片資訊函數：

```
var jPlyerCtrl_timeLine = new jPlyerTimeLine({
        //撥放暫停函數
        play: function( ChoA ){
            switch( ChoA ){
                case true: /* 撥放 */ break;
                case false: /* 暫停 */ break;
            }
        },
        //改變畫面函數
        setCurrentPlayShow: function( jInf ){...},
    });
```

```
var jPlyerCtrl_timeLine = new jPlyerTimeLine({
        /* VOD */
        //>> 取得 緩衝百分比函數
        vodBuffer: function(){ ... return Number; },
        //>> 取得 總時間函數
        vodDuration: function(){ ... return Number; },
        //>> 設定或取得 撥放時間函數
        vodCurrent: function( NumTime ){
            switch( typeof NumTime ){
                case 'number': /* 設定撥放時間 */ break;
                default:
                    /* 取得撥放時間 */
                    return Number;
            }
        },
```

```
var jPlyerCtrl_timeLine = new jPlyerTimeLine({
        /* Live： 若 isLivePlayback = false 時可略過 */
        //>> 取得 總時間函數
        liveDuration: function( jTypeName ){
            var Num;
            switch( jTypeName ){
                case 'start': Num = /* 起始時間 */ break;
                case 'end': Num = /* 結束時間 */ break;
                default: Num = /* 可回放的總時間 ( 結束 - 起始 ) */;
            }
            return Num;
        },
        //>> 設定或取得 撥放時間函數
        //>> >> NumTime： 使用 liveCurrent() 取得。
        //>> >> NumTimeFromEnd： 計算 liveDuration('end') - liveCurrent() 所得。
        liveCurrent: function( NumTime, NumTimeFromEnd ){
            switch( typeof NumTime ){
                case 'number': /* 設定撥放時間 */ break;
                default:
                    /* 取得撥放時間 */
                    return Number;
            }
        },
    });
```


可選值：

```
var jPlyerCtrl_timeLine = new jPlyerTimeLine({
        //影片是否準備完成
        isVideoReady: Boolean || true,
        //是否為直播
        isLive: Boolean || false,
        //直播是否可回放
        isLivePlayback: Boolean || false,
        //緩衝條是否為累進制
        isCumulativeBuffer: Boolean || false,
        //允許拖拉動作時 延遲設定撥放的毫秒數
        lazyPlayTime: Number || 300,
    });
```



### new jPlyerTimeLine 物件


更改影片準備狀態：

```
jPlyerCtrl_timeLine.isVideoReady = Boolean;
jPlyerCtrl_timeLine.setIsVideoReady( Boolean );
```


更改影片直播狀態：

```
jPlyerCtrl_timeLine.isLive = Boolean;
jPlyerCtrl_timeLine.setIsLive( Boolean );
```


當串流緩衝時間改變時：

```
jPlyerCtrl_timeLine.streamBufferChange();
```


當時間改變時：

```
jPlyerCtrl_timeLine.timeChange();
jPlyerCtrl_timeLine.timeChange( jCurrentTime );
```

