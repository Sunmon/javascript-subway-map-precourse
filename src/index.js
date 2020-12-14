import {
  app,
  managerContainer,
  sectionContainer,
} from './layout/mainLayout.js';
// import StationLayout from './layout/stationLayout.js';
// import { lineElements } from './layout/lineLayout.js';
// import  sectionLayout  from './layout/section.js';
import { mapPrintElements } from './layout/mapPrintLayout.js';
import Controller from './controllers/controller.js';

const initHTML = function () {
  // const stationLayout = new StationLayout();
  const controller = new Controller();
  app.append(managerContainer, sectionContainer);
  managerContainer.append(
    // stationElements.managerButton,
    // lineElements.managerButton,
    // sectionElements.managerButton,
    controller.viewList.station.elements.managerButton,
    controller.viewList.line.elements.managerButton,
    controller.viewList.section.elements.managerButton,
    mapPrintElements.managerButton,
  );
};

initHTML();
