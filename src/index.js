import React, { Component } from 'react';
import Department from './components';
import DATA from './config/dep.json';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandLevel: 2,
      orgTree: DATA.tree,
      checkedKeys: [240532.1]
    };
  }

  onExpand = () => {};
  onCheck = () => {};
  otherRules = () => {};
  render() {
    return (
      <Department
        expandLevel={this.state.expandLevel}
        treeData={this.state.orgTree}
        checkedKeys={this.state.checkedKeys}
        onExpand={this.onExpand}
        onCheck={this.onCheck}
        rules={1}
        otherCheckedRules={this.otherRules}
      />
    );
  }
}
