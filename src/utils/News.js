//获取新闻频道
async function fetchNewsTag() {
  return new Promise((resolve, reject) => {
    wx.request({
      url: "https://api.jisuapi.com/news/channel",
      header: {
        "Content-Type": "application/json",
      },
      method: "GET",
      data: {
        appkey: "1a451dff34c49672",
      },
      success: function (res) {
        //网络请求成功执行的回调函数
        if (res.statusCode !== 200) {
          //如果返回码不等于200,表明数据获取失败
          reject(new Error("网络请求错误，请稍后再试"));
        }
        const newsTag = res.data.result;
        //从http返回的data中获取想要的新闻列表数据
        resolve(newsTag); //通过resolve异步将数据返回
      },
      fail() {
        //网络请求失败回调函数
        reject(new Error("网络请求错误，请稍后再"));
      },
    });
  });
}

//根据新闻类别获取新闻列表的API
async function fetchNews(newsTag) {
  return new Promise((resolve, reject) => {
    wx.request({
      /* url: "http://v.juhe.cn/toutiao/index", */
      url: "https://api.jisuapi.com/news/get",
      header: {
        "Content-Type": "application/json",
      },
      method: "GET",
      data: {
        channel: newsTag, //根据newsTag拉取指定类别的新闻
        start: 0,
        num: 40,
        appkey: "1a451dff34c49672",
      },
      success: function (res) {
        //网络请求成功执行的回调函数
        if (res.statusCode !== 200) {
          //如果返回码不等于200,表明数据获取失败
          reject(new Error("网络请求错误，请稍后再试"));
        }
        const rspBody = res.data;
        //从http返回的data中获取想要的新闻列表数据
        const news = rspBody.result.list;
        resolve(news); //通过resolve异步将数据返回
      },
      fail() {
        //网络请求失败回调函数
        reject(new Error("网络请求错误，请稍后再"));
      },
    });
  });
}

module.exports = {
  fetchNewsTag,
  fetchNews,
};
