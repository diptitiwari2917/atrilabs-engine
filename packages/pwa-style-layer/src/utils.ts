import { BrowserForestManager } from "@atrilabs/core";
import { api } from "@atrilabs/pwa-builder-manager";
import { PatchEvent, UnsetEvent } from "@atrilabs/forest";
import CssTreeId from "@atrilabs/app-design-forest/src/cssTree?id";
// import ComponentTreeId from "@atrilabs/app-design-forest/src/componentTree?id";


export function patchCb(options: {
  selectedId: string;
  propName: string;
  value: string;
}) {
  const { selectedId, propName, value } = options;
  const { forestId, forestPkgId } = BrowserForestManager.currentForest;
  const cssNodeId =
    BrowserForestManager.currentForest.tree(CssTreeId)?.links[selectedId!]
      .childId!;
  const patchEvent: PatchEvent = {
    type: `PATCH$$${CssTreeId}`,
    id: cssNodeId,
    slice: {
      property: {
        styles: {
          [propName]: value,
        },
      },
    },
  };
  api.postNewEvents(forestPkgId, forestId, {
    name: "PATCH",
    events: [patchEvent],
    meta: { agent: "browser" },
  });
}

export function unsetCB(options: { selectedId: string; selector: string[] }) {
  const { selectedId, selector } = options;
  const { forestId, forestPkgId } = BrowserForestManager.currentForest;
  const cssNodeId =
    BrowserForestManager.currentForest.tree(CssTreeId)?.links[selectedId!]
      .childId!;
  const unsetEvent: UnsetEvent = {
    type: `UNSET$$${CssTreeId}`,
    id: cssNodeId,
    selector,
  };
  api.postNewEvents(forestPkgId, forestId, {
    name: "UNSET",
    events: [unsetEvent],
    meta: { agent: "browser" },
  });
}

// export function getAliasList() {
//   const aliasDict: { [alias: string]: boolean } = {};
//   const tree = BrowserForestManager.currentForest.tree(ComponentTreeId);
//   if (tree) {
//     const reverseMap = createReverseMap(tree.nodes, "body");
//     const nodeIds = getAllNodeIdsFromReverseMap(reverseMap, "body");
//     nodeIds.forEach((nodeId) => {
//       const node = tree.nodes[nodeId];
//       if (node.state.alias) {
//         aliasDict[node.state.alias] = true;
//       }
//     });
//   } else {
//     console.log("Expected component tree to exist");
//   }
//   return aliasDict;
// }