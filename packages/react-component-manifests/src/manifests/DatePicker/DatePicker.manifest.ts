import { CSSTreeOptions } from "@atrilabs/app-design-forest/src/cssTree";
import { CustomPropsTreeOptions } from "@atrilabs/app-design-forest/src/customPropsTree";
import { ReactComponentManifestSchema } from "@atrilabs/react-component-manifest-schema";
import CSSTreeId from "@atrilabs/app-design-forest/src/cssTree?id";
import CustomTreeId from "@atrilabs/app-design-forest/src/customPropsTree?id";
import reactSchemaId from "@atrilabs/react-component-manifest-schema?id";
import iconSchemaId from "@atrilabs/component-icon-manifest-schema?id";
import AttributesTreeId from "@atrilabs/app-design-forest/src/attributesTree?id";
import {AttributesTreeOptionsBoolean} from "@atrilabs/app-design-forest/src/attributesTree";

const attributesTreeOptions: AttributesTreeOptionsBoolean = {
  basics: true,
  ariaLabelledBy: false,
};

const cssTreeOptions: CSSTreeOptions = {
  boxShadowOptions: true,
  flexContainerOptions: false,
  flexChildOptions: true,
  positionOptions: true,
  typographyOptions: true,
  spacingOptions: true,
  sizeOptions: true,
  borderOptions: true,
  outlineOptions: true,
  backgroundOptions: true,
  miscellaneousOptions: true,
};

const customTreeOptions: CustomPropsTreeOptions = {
  dataTypes: {
    picker: {
      type: "enum",
      options: ["date", "week", "month", "quarter", "year"],
    },
    showTime: {
      type: "boolean",
    },
    size: {
      type: "enum",
      options: ["small", "middle", "large"],
    },
    placement: {
      type: "enum",
      options: ["bottomLeft", "bottomRight", "topLeft", "topRight"],
    },
    format: {
      type: "enum",
      options: ["YYYY-MM-DD", "MM-DD-YYYY", "DD-MM-YYYY"],
    },
    placeholder: { type: "array" },
    bordered: { type: "boolean" },
    disabled: { type: "boolean" },
    status: {
      type: "enum",
      options: ["none", "error", "warning"],
    },
    range: { type: "boolean" },
  },
};

const compManifest: ReactComponentManifestSchema = {
  meta: { key: "DatePicker", category: "Basics" },
  dev: {
    decorators: [],
    attachProps: {
      styles: {
        treeId: CSSTreeId,
        initialValue: {},
        treeOptions: cssTreeOptions,
        canvasOptions: { groupByBreakpoint: true },
      },
      custom: {
        treeId: CustomTreeId,
        initialValue: { bordered: true },
        treeOptions: customTreeOptions,
        canvasOptions: { groupByBreakpoint: false },
      },
      attrs: {
        treeId: AttributesTreeId,
        initialValue: {},
        treeOptions: attributesTreeOptions,
        canvasOptions: {groupByBreakpoint: false},
      },
    },
    attachCallbacks: {
      onClick: [{ type: "controlled", selector: ["custom", "open"] }],
    },
    defaultCallbackHandlers: {
      onOpenChange: [{ sendEventData: true }],
    },
  },
};

const iconManifest = {
  panel: { comp: "CommonIcon", props: { name: "DatePicker" } },
  drag: {
    comp: "CommonIcon",
    props: {
      name: "DatePicker",
      containerStyle: { padding: "1rem" },
    },
  },
  renderSchema: compManifest,
};

export default {
  manifests: {
    [reactSchemaId]: compManifest,
    [iconSchemaId]: iconManifest,
  },
};
