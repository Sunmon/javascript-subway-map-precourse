import StationNode from './stationNode.js';

/**
 * localStorage에 저장하는 LineList 구조
 * lineList : [][] 이차원배열
 * lineList[a][b]: a번째로 추가한 호선의 b+1번째 역
 */

export default class LineModel {
  insertData(line, start, end) {
    let lineList = this.getLineListAll();
    const startNode = new StationNode({ name: start, line });
    const endNode = new StationNode({ name: end, line });

    lineList = [...lineList, [startNode, endNode]];
    localStorage.setItem('lineList', JSON.stringify(lineList));

    return [startNode, endNode];
  }

  deleteData(line) {
    const lineList = this.getLineListAll();
    const index = lineList.findIndex(lineNodes => lineNodes[0].line === line);
    const nodes = lineList.splice(index, 1)[0]; // splice의 결과는 이차원배열
    localStorage.setItem('lineList', JSON.stringify(lineList));

    return nodes;
  }

  deleteSectionData(index, lineName) {
    const lineList = this.getLineListAll();
    const lineIndex = lineList.findIndex(
      lineNodes => lineNodes[0].line === lineName,
    );
    const node = lineList[lineIndex].splice(index, 1); // splice의 결과는 이차원배열
    localStorage.setItem('lineList', JSON.stringify(lineList));

    return node;
  }

  insertSectionData(index, lineName, stationName) {
    const lineList = this.getLineListAll();
    const lineIndex = lineList.findIndex(
      lineNodes => lineNodes[0].line === lineName,
    );
    const node = new StationNode({ name: stationName, line: lineName });
    lineList[lineIndex].splice(index, 0, node);
    localStorage.setItem('lineList', JSON.stringify(lineList));

    return node;
  }

  getLineList(lineName) {
    return this.getLineListAll().find(row => row[0].line === lineName);
  }

  getLineListAll() {
    const storageLineList = localStorage.getItem('lineList');
    let lineList = [];
    if (storageLineList) {
      lineList = [...JSON.parse(storageLineList)];
    }

    return lineList;
  }
}
