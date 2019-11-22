let musicList = require('./data');

class Music {
  constructor(id, name, singer, isHightRate) {
    this.id = id;
    this.name = name;
    this.singer = singer;
    this.isHightRate = isHightRate;
  }

  // 获取所有音乐
  getAllMusic() {
    return musicList;
  }

  // 添加一首音乐
  addMusic(name, singer, isHightRate) {
    let id = musicList[musicList.length - 1].id - 0 + 1;
    let json = {
      id,
      name,
      singer,
      isHightRate
    };
    var flag = false;
    try{
      musicList.push(json);
      flag = true;
    } catch(e){
      console.log('add error');
    }
    return flag;
  }

  // edit music
  editMusicById(id, name, singer, isHightRate) {
    // find index in the array based on id
    let index = musicList.findIndex(m => m.id === id);
    if(index === -1) {
      return false;
    }
    musicList[index].name = name;
    musicList[index].singer = singer;
    musicList[index].isHightRate = isHightRate === '1';
    return true;
  }

  // delete music by id
  removeMusicById(id) {
    let index = musicList.findIndex(m => m.id === id);
    if(index === -1) {
      return false;
    }
    musicList.splice(index, 1);
    return true;
  }

  // 通过id查询音乐
  getMusicById(id) {
    return musicList.find((item) => {
      return item.id === id
    });
  }

}

module.exports = new Music();