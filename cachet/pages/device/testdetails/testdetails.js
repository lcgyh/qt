// pages/device/testdetails/testdetails.js
Page({
  data: {
    urls: [],
    imgBox: [],
    tempFilePaths: ''
  },
  chosePhoto: function () {
    var that = this;
    var imgBox = [];
    wx.chooseImage({
      count: 8, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFiles = res.tempFiles;

        for (var i = 0; i < tempFiles.length; i++) {
          var path = res.tempFiles[i].path;
          imgBox.push(path);
        }
        that.setData({
          imgBox: that.data.imgBox.concat(imgBox)
        })
      }
    })
  },
  deletePic: function (e) {
    var _src = e.currentTarget.dataset.src;
    var imgBox = this.data.imgBox;
    for (var i = 0; i < imgBox.length; i++) {
      if (imgBox[i] == _src) {
        imgBox.splice(i, 1)
      }
    }
    this.setData({
      imgBox: imgBox
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: this.data.imgBox // 需要预览的图片http链接列表
    })
  }
})