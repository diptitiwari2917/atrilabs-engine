import { useListenSelect } from "./hooks/useListenSelect";
import { Tab } from "@atrilabs/core";
import { TabHeader } from "./TabHeader";
import { patchCb } from "./utils";
import { TabBody } from "./TabBody";
import { useManageCSS } from "./hooks/useManageCSS";
import { useGetTrees } from "./hooks/useGetTrees";


export default function () {
  const { selectedId } = useListenSelect();
  const { compTree, cssTree } = useGetTrees();
  const { styles, treeOptions } = useManageCSS({
    id: selectedId,
    compTree,
    cssTree,
  });
  //debugger
  return (
    <>
      <Tab
        name="PropertiesTab"
        header={<TabHeader />}
        body = {<TabBody 
          patchCb={patchCb}
          styles={styles}
          compId={selectedId}
          treeOptions={treeOptions}
        />
      }
        itemName={"styles"}
      ></Tab>
    </>
  );
}
