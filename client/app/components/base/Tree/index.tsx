import React, { FC } from 'react';
import { Tree as BaseTree } from 'antd';
import {
    TreeProps as BaseTreeProps,
    AntTreeNodeProps as BaseTreeNodeProps,
    DirectoryTreeProps as BaseDirectoryTreeProps,
} from 'antd/es/tree';

const { TreeNode: BaseTreeNode, DirectoryTree: BaseDirectoryTree } = BaseTree;

export type TreeProps = BaseTreeProps;
export type TreeNodeProps = BaseTreeNodeProps;
export type DirectoryTreeProps = BaseDirectoryTreeProps;

type TreeComponent = FC<TreeProps> & {
    TreeNode: typeof BaseTreeNode;
    DirectoryTree: typeof BaseDirectoryTree;
};
const Tree: TreeComponent = (props) => <BaseTree {...props} />;

Tree.TreeNode = BaseTreeNode;
Tree.DirectoryTree = BaseDirectoryTree;

export default Tree;
