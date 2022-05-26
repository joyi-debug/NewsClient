/* index.js */
const allTagList = require("../../utils/all-tags").allTagList;
const tagConfigManager = require("../../utils/tag-config-manager");

Page({
  data: {
    selectedTagList: [], //当前选中新闻标签
    unselectedTagList: [], //当前未选中新闻标签
  },
  onLoad() {
    this.loadTagConfig();
  },
  loadTagConfig() {
    const selectedTagList = tagConfigManager.getSelectedTagList();
    console.log(selectedTagList);
    this.updateTagList(selectedTagList);
  },
  //根据选中的新闻标签列表更新data中的数据
  updateTagList(selectedTagList) {
    //数组操作，获取选中的新闻标签ID组成的set
    const selectedSet = new Set(selectedTagList);
    console.log("000");
    console.log(selectedSet);
    const unselectedTagList = [];
    /* 遍历完整的便签列表，将被选中的剔除，将未被选中的放入unselectedTagList */
    for (let tagItem of allTagList) {
      if (selectedSet.has(tagItem)) continue;
      unselectedTagList.push(tagItem);
    }
    this.setData({
      selectedTagList,
      unselectedTagList,
    });
    console.log("1111");
    console.log(this.data.selectedTagList);
  },
  onRemoveTag(event) {
    //移除新闻标签的回调函数
    //从event中获取当前移除的新闻标签index
    const tagIndex = event.currentTarget.dataset["tagIndex"];
    //从选中的新闻标签列表中移除该标签
    this.data.selectedTagList.splice(tagIndex, 1);
    //根据剩余被选中的标签列表更新data中数据
    this.updateTagList(this.data.selectedTagList);
  },
  onAddTag(event) {
    //选中新闻标签的回调函数
    //从event中获取当前增加新闻标签的index
    const tagIndex = event.currentTarget.dataset["tagIndex"];
    //从未被选中的新闻标签列表中获取该标签
    const newTag = this.data.unselectedTagList[tagIndex];
    //将该标签加入选中的标签列表
    this.data.selectedTagList.push(newTag);
    this.updateTagList(this.data.selectedTagList);
  },
  saveSetting() {
    //当前选中的新闻标签列表保存到storage
    tagConfigManager.setSelectedTagList(this.data.selectedTagList);
    //返回上一页
    wx.navigateBack();
  },
});
