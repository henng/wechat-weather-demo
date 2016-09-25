//index.js

//获取应用实例
var app = getApp()
Page({
  data: {
    weather: {},
    hasLocation: false,
    userInfo: {}
  },
  
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新 userInfo 数据
      that.setData({
        userInfo: userInfo
      })
    });
    wx.getLocation({
      success: function (res) {
        console.log(res)
        that.setData({
          hasLocation: true,
        })
        that.getWeatherInfo(res.longitude, res.latitude)
      }
    });
        
  },
  
  getWeatherInfo: function (longitude, latitude) {
    var that = this
    latitude = latitude.toString().split('.')[0] + "." + latitude.toString().split('.')[1]
    longitude = longitude.toString().split('.')[0] + "." + longitude.toString().split('.')[1]

    wx.request({
    url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(SELECT%20woeid%20FROM%20geo.places%20WHERE%20text%3D%22('
    + latitude +'%2C' + longitude + ')%22)%20'
    +'and%20u%3D%22c%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=',
    data: {
    },
    header:{
        "Content-Type":"application/json"
    },
    success: function(res) {
      var data = res.data
      //console.log(data)

      var location = data.query.results.channel
      console.log(location)
      
      that.setData({
      weather: location
    })
    }
  })
   
  }
})
