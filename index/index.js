Page({
  data: {
    status: "等待播放",
    current: null,
    duration: null
  },
  audioStatus() {
  },
  audioPlay(e) {
    let that = this
    var Index = e.currentTarget.dataset.index
    console.log(Index);
    this.innerAudioContext.play()
    this.innerAudioContext.onPlay(() => {
      this.setData({
        status: "正在播放"
      })
    })
    this.innerAudioContext.onTimeUpdate(function (res) {
      var currentTime = that.innerAudioContext.currentTime
      var duration = that.innerAudioContext.duration
      //console.log(currentTime, duration)
      that.setData({
        current: Math.round(currentTime),
        duration: Math.round(duration),
      });
    })
  },
  audioPause(e) {
    this.innerAudioContext.pause()
    this.innerAudioContext.onPause(() => {
      this.setData({
        status: "暂停"
      })
    })
  },
  audioStop(e) {
    this.innerAudioContext.stop()
    this.innerAudioContext.onStop(() => {
      this.setData({
        status: "停止"
      })
    })
  },
  hanle_slider_change(e) {
    const position = e.detail.value
    this.innerAudioContext.seek(position)
  },
  onReady: function () {
    this.innerAudioContext = wx.createInnerAudioContext()
    this.innerAudioContext.src = 'https://assignments-1300455967.cos.ap-chengdu.myqcloud.com/%E5%8E%8B%E8%85%BFB.mp3'
  },
})