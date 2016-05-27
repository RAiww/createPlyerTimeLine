"use strict";

Function.prototype.plant = function plant( jPropList ){
    for(let jMethod in jPropList )
        this.prototype[ jMethod ] = jPropList[ jMethod ];
};

window.jz = {
    wCode: {
        evtBind: function( HElem, jMethod, jEvtList ){
            if( jMethod !== 'add' && jMethod !== 'remove' ) return;
            else jMethod = jMethod + 'EventListener';
            
            for(var jName in jEvtList )
                HElem[ jMethod ]( jName, jEvtList[ jName ], false );
        },
    },
    prop: {
        //> jDirection: horizontal, vertical
        mouseOverPlacePercent: function( jDirection, evt, HElem ){
            HElem = HElem || evt.currentTarget;
            
            var jStyle = getComputedStyle( HElem ),
                jClient = HElem.getBoundingClientRect(),
                evtPage, HElem_size, HElem_pageOffset;
            switch( jDirection ){
                case 'horizontal':
                    evtPage = evt.pageX;
                    HElem_size = jStyle.width;
                    HElem_pageOffset = window.scrollX + jClient.left;
                    [ 'borderRightWidth', 'borderLeftWidth', 'paddingRight', 'paddingLeft' ]
                        .map(function( jItem ){
                            HElem_pageOffset -= parseFloat( jStyle[ jItem ] );
                        });
                    break;
                case 'vertical':
                    evtPage = evt.pageY;
                    HElem_size = jStyle.height;
                    HElem_pageOffset = window.scrollY + jClient.top;
                    [ 'borderTopWidth', 'borderBottomWidth', 'paddingTop', 'paddingBottom' ]
                        .map(function( jItem ){
                            HElem_pageOffset -= parseFloat( jStyle[ jItem ] );
                        });
                    break;
                default: return;
            }
            HElem_size = parseFloat( HElem_size );
            
            var jPercent = ( evtPage - HElem_pageOffset ) / HElem_size;
            jPercent = parseFloat( jPercent.toFixed(3) );
            
            if( jDirection === 'vertical' ) jPercent = 1 - jPercent;
            
            if( jPercent > 1 ){ jPercent = 1; }
            else if( jPercent < 0 ){ jPercent = 0; }
            
            return jPercent;
        },
    },
};
