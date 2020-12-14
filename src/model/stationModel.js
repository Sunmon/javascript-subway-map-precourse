import StationNode from './stationNode.js';

/**
 * localStorage와 통신하는 DAO
 * 데이터 저장/수정시에 StaionNode를 이용한다.
 */
export default class StationModel {
  constructor() {}

  createNode(stationName) {
    return new StationNode({ name: stationName });
  }

  findNodeByName(stationName) {
    const stationList = this.getList();
    return stationList.find(station => station.name === stationName);
  }

  updateData(newNodes) {
    const stationList = this.getList();
    const updateNodes = [...newNodes];
    for (const updateNode of updateNodes) {
      const newLine = updateNode.line;
      const oldNode = stationList.find(node => node.name === updateNode.name);
      const index = oldNode.line.findIndex(line => line === newLine);
      if (index === -1) {
        oldNode.line.push(newLine);
      } else {
        oldNode.line.splice(index, 1);
      }
    }
    localStorage.setItem('stationList', JSON.stringify(stationList));
  }

  insertData(stationName) {
    const stationList = this.getList();
    stationList.push(this.createNode(stationName));
    // stationList.push(stationName);
    localStorage.setItem('stationList', JSON.stringify(stationList));
  }

  deleteData(stationName) {
    const stationList = this.getList();
    const index = stationList.findIndex(
      station => station.name === stationName,
    );

    stationList.splice(index, 1);
    localStorage.setItem('stationList', JSON.stringify(stationList));
  }

  // TODO: getList도 통일 가능할듯
  getList() {
    const storageStationList = localStorage.getItem('stationList');
    let stationList = [];
    if (storageStationList) {
      stationList = [...JSON.parse(storageStationList)];
    }

    return stationList;
  }
}
