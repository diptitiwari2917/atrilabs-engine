import { useCallback, useMemo } from "react";
import { PageInfo } from "./types";
import { canvasApi } from "@atrilabs/pwa-builder-manager";
import { Tree } from "antd";
import type { DataNode, DirectoryTreeProps } from "antd/es/tree";

const { DirectoryTree } = Tree;

export const PageTree: React.FC<{
  pagesInfo: PageInfo;
  selectedPageRouteObjectPath: string;
}> = (props) => {
  const createTreeNodes = useCallback(
    (
      pathArr: string[],
      pathArrLen: number,
      route: string,
      treeNodes: DataNode[]
    ) => {
      function createTreeNode(title: string, key: string, leafNode: boolean) {
        if (leafNode)
          return {
            title,
            isLeaf: true,
            key,
          };
        return {
          title,
          children: [],
          key,
        };
      }

      const node: DataNode = createTreeNode(
        pathArr[pathArrLen - 1] !== "" ? pathArr[pathArrLen - 1] : "index",
        route,
        true
      );

      let tempTreeNode: DataNode[] = treeNodes;

      for (let i = 0; i < pathArrLen - 1; i++) {
        const path = pathArr[i];

        const lenBeforeUpdate = tempTreeNode.length;
        let j;

        for (j = 0; j < tempTreeNode.length; j++) {
          if (tempTreeNode[j].title === path) {
            tempTreeNode = tempTreeNode[j].children || [];
            break;
          }
        }

        if (lenBeforeUpdate === j) {
          tempTreeNode.push(
            createTreeNode(
              path !== "" ? path : "index",
              path + " " + pathArrLen,
              false
            )
          );
          tempTreeNode = tempTreeNode[tempTreeNode.length - 1].children || [];
        }
      }

      tempTreeNode.push(node);
    },
    []
  );

  const treeNodes = useMemo(() => {
    const treeNodes: DataNode[] = [];
    for (let i = 0; i < props.pagesInfo.length; i++) {
      const path = props.pagesInfo[i].unixFilepath;
      const route = props.pagesInfo[i].routeObjectPath;
      const pathArr = path.split("/").slice(1);
      let pathArrLen = pathArr.length;
      createTreeNodes(pathArr, pathArrLen, route, treeNodes);
    }
    return treeNodes;
  }, [createTreeNodes, props.pagesInfo]);

  const onSelect: DirectoryTreeProps["onSelect"] = (keys, info) => {
    if (info.node.children) return;
    const node = info.node.key as string;
    if (node !== "") canvasApi.navigatePage(node);
  };

  console.log("Page", treeNodes);

  return (
    <div>
      <DirectoryTree onSelect={onSelect} treeData={treeNodes} />
    </div>
  );
};
