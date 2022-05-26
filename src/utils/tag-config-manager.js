/* 实现对新闻标签列表编辑的结果的存取 */
//获取全部新闻标签的列表数据
const allTags = require("./all-tags").allTagList;

//storage中存放选中新闻标签列表的key
const SELECTED_TAG_LIST = "selectedTagList";

//获取选中的新闻标签列表
function getSelectedTagList() {
  //如果选中标签列表为空，默认返回整个列表
  return wx.getStorageSync(SELECTED_TAG_LIST) || allTags;
}

//更新选中的新闻标签列表
function setSelectedTagList(selectedTagList) {
  wx.setStorageSync(SELECTED_TAG_LIST, selectedTagList);
}

module.exports = {
  getSelectedTagList,
  setSelectedTagList,
};
