import React from 'react';
import { Checkbox } from 'antd';
import { AddSquareS, ReduceSquares,  NoData } from '@beisen-phoenix/icon';
import './index.scss';

const Item = props => {
  let expandClass = 'department-tree-collapse';
  const department = props.department;
  const { departmentName, expand, Children, level, checked} = department;
  const selectedClass = ['department-tree-item'];
  const expandBtn = (department) => {
    if(department.expand) {
      if(Children && Children.length > 0) return <ExpandIcon width="14" height="14" />
      return ''; 
    }
    else {
      if(Children && Children.length > 0) return <UnexpandIcon width="14" height="14" />
      return ''; 
    }
  }
  let ExpandIcon = AddSquareS, UnexpandIcon = ReduceSquares;
  const onClick = e => {
    e.stopPropagation();
  };
  const handleChange = (dep)=> {
    props.handleChange(dep);
  }
  return (
    <div>
      <div className="department-tree-node">
        <span
          style={{
            paddingLeft: `${ 20 * level }px`,
            display: 'inline-block'
          }}
        ></span>
        <span className="expand-class" onClick={props.onExpand.bind(this,department, expand)}>
          {expandBtn(department)}
        </span>
        <Checkbox checked={checked} onChange={handleChange.bind(this,department)}/>
        <span
          className="department-tree-name"
        >
          {departmentName}
        </span>
      </div>
    </div>
  );
};

const Tree = props => {
  const { treeData, onExpand, handleChange }  = props;
  const handleStatus = (data) => {
    treeData.filter((item,index) => {
      if(data.departmentId ===  item.departmentId) props.changeRootData(item.departmentId);
    })
  }

  return (
    <div className="department-tree">
    {
      treeData.length > 0 ?
      <div className="department-tree-list">
      {
        treeData.map(department => {
          return (
           <Item
             key={department.departmentId}
             department = { department}
             onExpand = { onExpand }
             handleChange = { handleChange }
           />
          );
        })
      }
      </div>
      :
      <div className="department-tree-void" >
        <NoData />
        <div className="department-tree-void-desc">这里什么都没有...</div>
      </div>
    }
    </div>
  );
};

export default Tree;
