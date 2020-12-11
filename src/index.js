import {
  app,
  managerContainer,
  sectionContainer,
} from './layout/mainLayout.js';
import { stationElements } from './layout/station.js';
import { lineElements } from './layout/line.js';
import { sectionElements } from './layout/section.js';

const initHTML = function () {
  app.append(managerContainer, sectionContainer);
  managerContainer.append(
    stationElements.managerButton,
    lineElements.managerButton,
    sectionElements.managerButton,
  );
};

initHTML();
