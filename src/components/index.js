import React, { Component } from "react";
import Tree from "./tree";

class Department extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData: [],
      nestTree: [],
      checkedList: [],
    };
    this.mainTreeData = [];
    this.onExpand = this.onExpand.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount() {
    const { treeData } = this.props;
    if(!this.mainTreeData.length) {
      this.mainTreeData = this.dealRootData(treeData);
      this.setTreeDataParam(this.mainTreeData, this.mainTreeData[0]);
    }
  }
  componentDidMount() {
    this.refreshTreeData();
  }
  componentWillReceiveProps(nextProp) {
    this.refreshTreeData();
  }

  getTreeData = (data = [...this.mainTreeData]) => {
    const treeData = [];
    const { expandLevel } = this.props;
    data.forEach((item, index) => {
      if(item.level < expandLevel + 1) {
        treeData.push(item);
        if (item.expand && item.Children && item.Children.length) {
          const _treeData = this.getTreeData(item.Children);
          treeData.push(..._treeData);
        }
      }
    });
    return treeData;
  };

  refreshTreeData = () => {
    const treeData = this.getTreeData();
    const { checkedList } = this.state;
    this.setState({
      treeData,
      checkedList,
    });
  };

  setTreeDataParam = (tree = [], parent) => {
    let { level = -1, departmentName = "" } = parent;
    let { expandLevel } = this.props;
    const treeData = [];
    level += 1;
    for (let i = 0, l = tree.length; i < l; i++) {
      const node = tree[i];
      node.level = level;
      node.checked = false;
      if (level < expandLevel && node.Children && node.Children.length) {
        node.expand = true;
        const _treeData = this.setTreeDataParam(node.Children, node);
        treeData.push(_treeData);
      }
    }
    return treeData;
  };

  dealRootData = (data = [], id = -1) => {
    const map = {}, tree = [];
    data.forEach(node => {
      map[node.departmentId] = node;
    });
    for(let i = 0, len = data.length; i < len; i++) {
      const parent = map[data[i].parentDepartmentId];  
      if(parent) {
        parent.Children ? parent.Children.push(data[i]) : parent.Children = [data[i]];
      } else {
        tree.push(data[i]);
      }
    }
    return tree;
  };

  handleChange(dep) {
    const { checkedList } = this.props;
    dep.checked = !dep.checked;
    if(dep.checked && dep.Children && dep.Children.length) {
      dep.Children.forEach(item => {
        item.checked = true;
      })
    }
    checkedList.push(dep);
    this.refreshTreeData();
  }

  onExpand(department, expandStatus) {
    const { expandLevel } = this.props;
    department.expand = !expandStatus; 
    if(department.level > this.state.level - 1)
      this.setState({
        expandLevel: expandLevel + 1,
      })
    this.refreshTreeData();
  }
  render() {
    return <Tree handleChange={this.handleChange} onExpand={this.onExpand} treeData={this.state.treeData} />;
  }
}
export default Department;
