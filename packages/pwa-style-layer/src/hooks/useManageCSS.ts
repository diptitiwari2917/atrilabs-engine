import {
  manifestRegistryController,
} from "@atrilabs/core";
import React, { useCallback, useEffect, useState } from "react";

import ReactManifestSchemaId from "@atrilabs/react-component-manifest-schema?id";
import { Tree } from "@atrilabs/forest";
import { ReactComponentManifestSchema } from "@atrilabs/react-component-manifest-schema";

export const useManageCSS = (props: {
  id: string | null;
  compTree: Tree;
  cssTree: Tree;
}) => {
  const id = props.id;
  const compTree = props.compTree;
  const cssTree = props.cssTree;
  const [styles, setStyles] = useState<React.CSSProperties>({});
  const [treeOptions, setTreeOptions] = useState<
    | ReactComponentManifestSchema["dev"]["attachProps"]["0"]["treeOptions"]
    | null
  >(null);

  useEffect(() => {
    // find component registry
    if (
      id &&
      compTree.nodes[id] &&
      compTree.nodes[id].meta.manifestSchemaId === ReactManifestSchemaId
    ) {
      const pkg = compTree.nodes[id].meta.pkg;
      const key = compTree.nodes[id].meta.key;
      const manifestRegistry =
        manifestRegistryController.readManifestRegistry();
      const fullManifest = manifestRegistry[
        ReactManifestSchemaId
      ].manifests.find((curr) => {
        return curr.pkg === pkg && curr.manifest.meta.key === key;
      });
      if (fullManifest) {
        const manifest: ReactComponentManifestSchema = fullManifest.manifest;
        if (manifest.dev.attachProps["styles"]) {
          const treeOptions = manifest.dev.attachProps["styles"].treeOptions;
          setTreeOptions(treeOptions);
        } else {
          setTreeOptions(null);
        }
      }
    }
  }, [id, compTree]);

  return { styles, treeOptions};
};
