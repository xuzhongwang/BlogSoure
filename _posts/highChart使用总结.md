---
title: highChart使用总结
date: 2019-04-16 11:25:45
tags:
---

# 1. Highcharts更新series的5种方法

## 1.1. series.update

```javascript
//Highcarts图表中，可以有多个series。当我们想更新其中某一个series时，可以直接调用其update方法。
chart.series[0].update({
    data: [29.9, 71.5, 306.4, 429.2, 144.0, 176.0, 135.6, 248.5, 216.4, 194.1, 95.6, 54.4]
});
```

## 1.2. chart.update

```javascript
chart.update({
    series: [{
    type: 'column',
    name: 's1',
    data: [129.9, 171.5, 306.4, 429.2, 144.0, 176.0, 135.6, 248.5, 216.4, 194.1, 95.6, 54.4]
    },{
    type: 'column',
    name: 's2',
    data: [69.9, 51.5, 176.4, 121.2, 124.0, 476.0, 935.6, 248.5, 266.4, 191.1, 99.6, 53.4]
    }]
```

## 1.3. chart.addSeries

```javascript
chart.addSeries({
    type: 'column',
    name: 's3',
    data: [129.9, 171.5, 1106.4, 1129.2, 144.0, 176.0, 135.6, 1148.5, 216.4, 194.1, 95.6, 54.4]
    });
```

## 1.4. series.remove & chart.addSeries

```javascript
seriesData = [{
    type: 'column',
    name: 's1 new',
    data: [234.9, 171.5, 1106.4, 1129.2, 144.0, 176.0, 135.6, 1148.5, 216.4, 194.1, 195.6, 454.4]
    }];
while (chart.series.length > 0) {
    chart.series[0].remove(true);
}
for (var i = 0; i < seriesData.length; i++) {    
    chart.addSeries(seriesData[i]);
}
```

## 1.5. series.remove/chart.addSeries & chart.update

```javascript
seriesData = [{
    type: 'column',
    name: 's1 new',
    data: [234.9, 171.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 195.6, 454.4]
    },{
    type: 'column',
    name: 's2 new',
    data: [234.9, 171.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 195.6, 454.4]
    },{
    type: 'column',
    name: 's3 new',
    data: [234.9, 171.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 195.6, 454.4]
    }];

var diff = chart.series.length - seriesData.length;
if(diff > 0){
    for (var i = chart.series.length; i > diff; i--){
    chart.series[i-1].remove(true);
    }
} else if (diff < 0){
    for (var i = chart.series.length; i < seriesData.length; i ++){
    chart.addSeries({});
    }
}
chart.update({
    series:seriesData
});
```