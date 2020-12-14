/**
 * 지하철 노선 관련 모듈
 */

import PageLayout from './pageLayout.js';

export default class SectionLayout extends PageLayout {
  createManagerButton() {
    const sectionManagerButton = document.createElement('button');
    sectionManagerButton.id = 'section-manager-button';
    sectionManagerButton.innerHTML = '3. 구간 관리';
    sectionManagerButton.addEventListener('click', () =>
      this.handleManagerButton(),
    );

    return sectionManagerButton;
  }

  createSection() {
    const section = document.createElement('section');
    // section.id = 'section-section'; // TODO: id 필요없으면 지워버리자

    return section;
  }

  createMenuButtonTitle(text) {
    const title = document.createElement('h2');
    title.innerHTML = text;

    return title;
  }

  createStationSelector(line) {
    const sectionStationSelector = document.createElement('select');
    sectionStationSelector.id = 'section-station-selector';
    if (!line) return sectionStationSelector;

    const lineList = this.controller.getLineList(line);
    console.log(`lineList:`);
    console.log(lineList);
    for (const node of lineList) {
      sectionStationSelector.insertAdjacentHTML(
        'beforeend',
        `<option>${node.name}</option>`,
      );
    }

    return sectionStationSelector;
  }

  createSectionOrderTitle() {
    const title = document.createElement('h3');
    title.innerHTML = '구간 등록';

    return title;
  }

  createSectionOrderInput() {
    const sectionOrderInput = document.createElement('input');
    sectionOrderInput.id = 'section-order-input';
    sectionOrderInput.placeholder = '순서';

    return sectionOrderInput;
  }

  createSectionAddButton() {
    const sectionAddButton = document.createElement('button');
    sectionAddButton.id = 'section-add-button';
    sectionAddButton.innerHTML = '등록';

    return sectionAddButton;
  }

  createSectionOrderContainer() {
    const sectionOrderContainer = document.createElement('div');
    sectionOrderContainer.append(
      this.createSectionOrderTitle(),
      this.createStationSelector(),
      this.createSectionOrderInput(),
      this.createSectionAddButton(),
    );

    return sectionOrderContainer;
  }

  handleSectionLineMenuButton(target) {
    // TODO: section 바꾸는 함수 일반화시켜서 사용
    const { section, resultContainer } = this.elements;
    resultContainer.querySelector('h2').innerHTML = `${target.innerText}`;
    resultContainer
      .querySelector('select')
      .replaceWith(this.createStationSelector(target.innerText));

    section.append(resultContainer);
  }

  createSectionLineMenuButton(text) {
    const button = document.createElement('button');
    button.innerHTML = text;
    button.className = 'section-line-menu-button';

    button.addEventListener('click', e =>
      this.handleSectionLineMenuButton(e.target),
    );

    return button;
  }

  createInputContainer() {
    const sectionLineMenuButtonContainer = document.createElement('div');
    sectionLineMenuButtonContainer.append(
      this.createMenuButtonTitle('구간을 수정할 노선을 선택해주세요'),
    );

    const lineList = this.controller.getLineListAll(); // 2차원배열
    for (const row of lineList) {
      sectionLineMenuButtonContainer.append(
        this.createSectionLineMenuButton(row[0].line),
      );
    }

    return sectionLineMenuButtonContainer;
  }

  createResultTable() {
    const sectionLineResultTable = document.createElement('table');
    sectionLineResultTable.innerHTML =
      '<thead><tr><th>순서</th><th>이름</th><th>설정</th></tr></thead>';

    return sectionLineResultTable;
  }

  createResultTitle() {
    const resultTitle = document.createElement('h2');
    resultTitle.innerHTML = 'n호선 관리'; // TODO: 동적으로 바꾸기

    return resultTitle;
  }

  createResultContainer() {
    const sectionResultContainer = document.createElement('div');
    sectionResultContainer.append(
      this.createResultTitle(),
      this.createSectionOrderContainer(),
      this.createResultTable(),
    );

    return sectionResultContainer;
  }

  // override
  createElements() {
    const managerButton = this.createManagerButton();
    const section = this.createSection();
    const inputContainer = this.createInputContainer();
    const resultContainer = this.createResultContainer();

    return { managerButton, section, inputContainer, resultContainer };
  }

  // override
  buildLayout() {
    const { section, inputContainer, resultContainer } = this.elements;
    section.append(inputContainer);
  }
}
