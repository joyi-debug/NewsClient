Page({
  data: {
    newsUrl: "", //页面中WebView展示的URL
  },
  onLoad(options) {
    console.log(options);
    this.setData({
      //由options中获取需要打开的新闻
      newsUrl: options.newsUrl,
    });
  },
});
