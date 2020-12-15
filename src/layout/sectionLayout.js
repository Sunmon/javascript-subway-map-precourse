/**
 * 지하철 노선 관련 모듈
 */

import PageLayout from './pageLayout.js';

export default class SectionLayout extends PageLayout {
  constructor(controller) {
    super(controller);
    this.elements = this.createElements(); // elemenet와 Child 저장
    this.rowTemplate = this.createRowTemplate();
    this.optionTemplate = this.createOptionTemplate();
    this.rendered = this.$render(this.elements.section);
  }

  // override
  createElements() {
    const elements = super.$createCommonElements();
    this.$appendChildElement(
      elements.section,
      'lineMenuButtonContainer',
      this.$createLineMenuButtonContainer(),
    );
    this.$appendChildElement(
      elements.section,
      'resultContainer',
      this.$createResultContainer(),
    );

    return elements;
  }

  createManagerButton() {
    return this.createElement({
      tag: 'button',
      id: 'section-manager-button',
      innerHTML: '3. 구간 관리',
      eventListener: { click: [() => this.handleManagerButton()] },
    });
  }

  createSection() {
    return this.createElement({ tag: 'section' });
  }

  createMenuButtonTitle(text) {
    return this.createElement({ tag: 'h2', innerHTML: text });
  }

  createStationSelector(line) {
    return this.createElement({
      tag: 'select',
      id: 'section-station-selector',
    });
  }

  handleSectionLineMenuButton(target) {
    this.refreshResultDataContainer(target.innerText);
    this.rendered.querySelector('#result-container').classList.remove('hide');
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

  createLineButton(text) {
    return this.createElement({
      tag: 'button',
      innerHTML: text,
      classList: ['section-line-menu-button'],
      eventListener: {
        click: [e => this.handleSectionLineMenuButton(e.target)],
      },
    });
  }

  $createLineMenuButtonContainer() {
    const container = this.createElement({ tag: 'article' });
    const title = this.$createElementNode(
      this.createMenuButtonTitle('구간을 수정할 노선을 선택해주세요'),
    );
    const div = this.$createElementNode(this.createElement({ tag: 'div' }));

    return this.$createElementNode(container, { title, div });
  }

  $createInputContainer() {
    const element = this.createElement({ tag: 'article' });
    const title = this.$createElementNode(this.createInputTitle());
    const selector = this.$createElementNode(this.createStationSelector());
    const input = this.$createElementNode(this.createInput());
    const button = this.$createElementNode(this.createInputAddButton());

    return this.$createElementNode(element, {
      title,
      selector,
      input,
      button,
    });
  }

  createInput() {
    return this.createElement({
      tag: 'input',
      id: 'section-order-input',
      placeholder: '순서',
    });
  }

  createInputTitle() {
    return this.createElement({
      tag: 'h3',
      innerHTML: '구간 등록',
    });
  }

  createInputAddButton() {
    return this.createElement({
      tag: 'button',
      id: 'section-add-button',
      innerHTML: '등록',
      eventListener: { click: [() => this.handleAddButton()] },
    });
  }

  // override
  handleAddButton() {
    const order = this.controller.getInputFromUser(this);
    const { lineName } = this.rendered.querySelectorAll('tr')[1].dataset;
    const stationName = this.getSelectedOption(
      this.rendered.querySelector('select'),
    ).value;

    this.controller.insertSectionData(order, lineName, stationName);
    this.refreshResultDataContainer(lineName);
    // this.clearInput(); // TODO: 넣기
  }

  createResultTable() {
    return this.createElement({
      tag: 'table',
      innerHTML:
        '<thead><tr><th>순서</th><th>이름</th><th>설정</th></tr></thead><tbody></tbody>',
    });
  }

  createResultTitle(target = 'n호선') {
    return this.createElement({
      tag: 'h2',
      innerHTML: `${target} 관리`,
    });
  }

  $createResultContainer() {
    const container = this.createElement({
      tag: 'article',
      id: 'result-container',
      classList: ['hide'],
    });
    const title = this.$createElementNode(this.createResultTitle());
    const inputContainer = this.$createInputContainer();
    const table = this.$createElementNode(this.createResultTable());

    return this.$createElementNode(container, {
      title,
      inputContainer,
      table,
    });
  }

  // override
  refreshResultData() {
    this.rendered
      .querySelector('article > div')
      .replaceWith(this.loadLineMenuButtonData());
  }

  loadSelectorData(position) {
    const stationList = this.controller.getStationListAll();
    const options = stationList.map(node => this.createOption(node.name));
    const selector = this.createStationSelector(position);
    selector.append(...options);

    return selector;
  }

  refreshResultDataContainer(text) {
    this.rendered // selector 업데이트
      .querySelector('#section-station-selector')
      .replaceWith(this.loadSelectorData(text));
    this.rendered // title 변환
      .querySelector('#result-container > h2')
      .replaceWith(this.createResultTitle(text));
    this.rendered.querySelector('tbody').replaceWith(this.loadTableData(text));
  }

  createLineMenuButtonTemplate() {
    return this.createElement({
      tag: 'template',
      id: 'line-menu-button',
      innerHTML: '<button></button>',
    });
  }

  loadTableData(lineName) {
    const lineList = this.controller.getLineList(lineName); // 1차원 배열
    const tableRows = lineList.map((station, index) =>
      this.createRow(index, station.line, station.name),
    );
    const tbody = this.createElement({ tag: 'tbody' });
    tbody.append(...tableRows);

    return tbody;
  }

  createRowTemplate() {
    return this.createElement({
      tag: 'template',
      id: 'line-row',
      innerHTML: '<tr><td></td><td></td><td></td></tr>',
    });
  }

  createRow(index, lineName, stationName) {
    const clone = this.rowTemplate.content.cloneNode(true);
    const td = clone.querySelectorAll('td');
    const tr = clone.querySelector('tr');
    tr.dataset.index = index;
    tr.dataset.lineName = lineName;
    tr.dataset.stationName = stationName;
    td[0].textContent = index;
    td[1].textContent = stationName;
    td[2].append(this.createDeleteButton());

    return clone;
  }

  createDeleteButton() {
    return this.createElement({
      tag: 'button',
      innerHTML: '노선에서 제거',
      classList: ['section-delete-button'],
      eventListener: { click: [e => this.handleDeleteButton(e.target)] },
    });
  }

  handleDeleteButton(target) {
    const tr = target.parentElement.parentElement;
    this.controller.deleteSectionData(
      tr.dataset.index,
      tr.dataset.lineName,
      tr.dataset.stationName,
    );
    this.refreshResultDataContainer(tr.dataset.lineName);
  }

  loadLineMenuButtonData() {
    const lineList = this.controller.getLineListAll(); // 2차원배열
    const container = this.createElement({ tag: 'div' });
    const buttonList = lineList.map(list =>
      this.createLineButton(list[0].line),
    );
    container.append(...buttonList);

    return container;
  }
}
