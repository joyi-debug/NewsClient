// index.js
const News = require("../../utils/News");
const tagConfigManager = require("../../utils/tag-config-manager");

Page({
  data: {
    currentTag: "头条",
    currentIndex: 0,
    newsTag: [
      "头条",
      "新闻",
      "财经",
      "体育",
      "娱乐",
      "军事",
      "教育",
      "科技",
      "NBA",
      "股票",
      "星座",
      "女性",
      "健康",
      "育儿",
    ],
    newsCategoryMap: {},
  },
  onShow() {
    this.initNewsTag();
    this.initNewsList();
  },
  initNewsTag() {
    //从storage中获取选中的新闻标签列表
    const newsTag = tagConfigManager.getSelectedTagList();
    this.data.currentTag = newsTag[0];
    this.setData({
      currentTag: this.data.currentTag,
      newsTag,
    });
  },
  async initNewsList() {
    this.selectNewsCategory(this.data.currentTag);
  },
  //新闻标签被点击的回调函数
  async onClickNewsTag(event) {
    //从event中获取当前点击的新闻标签
    const newsTag = event.currentTarget.dataset["tagId"];
    const tagIndex = this.data.newsTag.indexOf(newsTag) || 0;
    this.setData({
      currentIndex: tagIndex,
      currentTag: newsTag, //更新data中当前的标签字段
    });
    try {
      //根据新标签，拉取对应新闻列表
      const news = await News.fetchNews(newsTag);
      this.setData({
        newsList: news,
      });
    } catch (e) {
      wx.showToast({
        title: e.message,
        icon: "none",
        duration: 2000,
      });
    }
  },
  onClickNewsItem(event) {
    //获取当前点击的新闻数据
    const newsUrl = event.currentTarget.dataset.news;
    wx.navigateTo({
      //跳转到新闻详情页
      //url中传递选中新闻的URL
      url: `/pages/news-detail/index?newsUrl=${newsUrl}`,
    });
  },
  //点击新闻类别的回调函数
  async selectNewsCategory(newsCategoryKey) {
    try {
      //获取指定类别的新闻列表
      const newsList = await News.fetchNews(newsCategoryKey);
      const newsCategoryMap = this.data.newsCategoryMap;
      //将获取到的新闻列表更新到newsCatagoryMap中
      newsCategoryMap[newsCategoryKey] = newsList;
      this.setData({
        newsCategoryMap,
        currentTag: newsCategoryKey,
      });
    } catch (e) {
      console.error(e);
      wx.showToast({
        title: "获取新闻列表失败，请稍后重试",
        icon: "none",
        duration: 2000,
      });
    }
  },
  async onSwiperChange(event) {
    //列表滑动事件
    //获取当前滑动到的页面index
    const currentIndex = event.detail.current;
    //根据index，找到对应的新闻类别
    const currentNewsKey = this.data.newsTag[currentIndex];
    //通过调用selectNewsCategory实现切换新闻类型的效果
    this.selectNewsCategory(currentNewsKey);
  },
  onClickTagConfig() {
    //点击编辑按钮的回调函数
    //跳转至标签编辑页面
    wx.navigateTo({
      url: `/pages/tag-config/index`,
    });
  },
});
