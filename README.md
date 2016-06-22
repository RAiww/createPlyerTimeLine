撥放器時間軸
=======


> 文件： 影片時間軸 createPlyerTimeLine<br />
> 作者： RAiww <ra@iww.twbbs.org> (http://ra.iww.twbbs.org/)<br />
> 版本： v1.0.0<br />
> 授權： MIT @license: [ra.iww.twbbs.org/ffish/MIT_License](http://ra.iww.twbbs.org/ffish/MIT_License)



## 簡介


撥放器時間軸模組。



## 目錄


  * lib
    * [JzTree 補充包](lib/jzTree_additional.js)
    * [createPlyerTimeLine.js](lib/createPlyerTimeLine.js)
  * [README.md](README.md)



## 使用方法


> 改變的狀態分為兩種： 「顯示畫面改變」、「影片時間改變」。



### 基本 HTML


HTML：

```html
<div id="TxPlyerTimeLine_1" class="TxPlyerTimeLine">
  <div class="TxPlyerTimeLine_floatShow">00:00</div>
  <div class="TxPlyerTimeLine_buffer"></div>
  <div class="TxPlyerTimeLine_play"></div>
</div>
```


CSS Style：

```css
.TxPlyerTimeLine {
  height: 6px;
  margin: 0 32px;
  position: relative;
  background-color: rgba(255, 255, 255, 0.3);
}
.TxPlyerTimeLine .TxPlyerTimeLine_floatShow {
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
.TxPlyerTimeLine.esFloat .TxPlyerTimeLine_floatShow,
.TxPlyerTimeLine.esDrag .TxPlyerTimeLine_floatShow {
  display: block;
}
.TxPlyerTimeLine .TxPlyerTimeLine_buffer {
  width: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.3);
}
.TxPlyerTimeLine.esLive .TxPlyerTimeLine_buffer {
  width: 0 !important;
}
.TxPlyerTimeLine .TxPlyerTimeLine_play {
  width: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: #f12b24;
}
.TxPlyerTimeLine.esLive .TxPlyerTimeLine_play {
  width: 100%;
}
```



### 事件狀態


```html
<div id="TxPlyerTimeLine_1" class="TxPlyerTimeLine esEvtState"></div>
```

esEvtState：
  - esNoReady： 未完成準備
  - esLive： 直播
  - 執行中：
    - esFloat： 懸浮
    - esDrag： 拖拉



### new createPlyerTimeLine 參數


標籤物件：

```js
var jPlyerCtrl_timeLine = new createPlyerTimeLine({
        //時間軸外框
        HElemMain: document.querySelector('#TxPlyerTimeLine_1'),
    });
```


必要影片資訊函數：

```js
var jPlyerCtrl_timeLine = new createPlyerTimeLine({
        //撥放暫停函數
        play: function( ChoA ){
            switch( ChoA ){
                case true: /* 撥放 */ break;
                case false: /* 暫停 */ break;
            }
        },
        //是否為暫停
        isPaused: function(){ return Boolean; },
    });
```

```js
var jPlyerCtrl_timeLine = new createPlyerTimeLine({
        //改變畫面函數
        /* Object jInf
            - HElemMain： 時間軸外框標籤元素。
            - HElem_floatShow： 顯示框標籤元素。
            - HElem_buffer： 緩衝條標籤元素。
            - HElem_play： 撥放條標籤元素。
            - state： 執行的狀態，其值有： start / move / end。
            - type： 執行的類型，其值有： hover / drag / timeUpdate。
            - typeState： 執行類型的細項狀態，其值有： start / move / end。
            - isLive： 是否為直播。
            - time： 時間數值。
            - timeFromEnd： 當直播時，此值為時間的倒數數值。
            - timeArr： 時間文字化數列。（直播時為倒數時間。）
            - timeStr： 時間文字化，格式 hh:mm:ss
            - placePercent： 撥放時間在時間軸上的位置百分比。
        -*/
        setCurrentPlayShow: function( jInf ){...},
    });
```

```js
var jPlyerCtrl_timeLine = new createPlyerTimeLine({
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
    });
```

```js
var jPlyerCtrl_timeLine = new createPlyerTimeLine({
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
        liveCurrent: function( NumTime ){
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

```js
var jPlyerCtrl_timeLine = new createPlyerTimeLine({
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



### new createPlyerTimeLine 物件


更改影片準備狀態：

```js
jPlyerCtrl_timeLine.isVideoReady = Boolean;
jPlyerCtrl_timeLine.setIsVideoReady( Boolean );
```


更改影片直播狀態：

```js
jPlyerCtrl_timeLine.isLive = Boolean;
jPlyerCtrl_timeLine.setIsLive( Boolean );
```


當串流緩衝時間改變時：

```js
jPlyerCtrl_timeLine.streamBufferChange();
```


當時間改變時：

```js
jPlyerCtrl_timeLine.timeChange();
jPlyerCtrl_timeLine.timeChange( jCurrentTime );
```

