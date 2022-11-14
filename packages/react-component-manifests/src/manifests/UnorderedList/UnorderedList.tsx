import React, { forwardRef, useCallback } from "react";
import reactSchemaId from "@atrilabs/react-component-manifest-schema?id";
import type { ReactComponentManifestSchema } from "@atrilabs/react-component-manifest-schema/lib/types";
import iconSchemaId from "@atrilabs/component-icon-manifest-schema?id";
import { CommonIcon } from "../CommonIcon";
import CSSTreeId from "@atrilabs/app-design-forest/lib/cssTree?id";
import { CSSTreeOptions } from "@atrilabs/app-design-forest/lib/cssTree";
import { CustomPropsTreeOptions } from "@atrilabs/app-design-forest/lib/customPropsTree";
import CustomTreeId from "@atrilabs/app-design-forest/lib/customPropsTree?id";
import logo from "./logo.png";

export const UnorderedList = forwardRef<
  HTMLDivElement,
  {
    styles: React.CSSProperties;
    custom: {
      //The list-style-type for the list
      type: string;
      //Title of the list
      items: {
        title: string;
        titleColor: string;
        description?: string;
        descriptionColor?: string;
        icon?: string;
      };
    };
    onClick: (event: { pageX: number; pageY: number }) => void;
    className?: string;
  }
>((props, ref) => {
  const onClick = useCallback(
    (e: React.MouseEvent) => {
      props.onClick({ pageX: e.pageX, pageY: e.pageY });
    },
    [props]
  );
  return (
    <div ref={ref} className={props.className} style={{ ...props.styles }}>
      <ul style={{ listStyle: props.custom.type }}>
        <li
          style={{
            padding: "0.5em 0",
            borderBottom: "1px solid rgba(0,0,0,.06)",
          }}
        >
          <div style={{ display: "flex", columnGap: "0.5em" }}>
            <div>
              {props.custom.items.icon && (
                <img
                  src={props.custom.items.icon}
                  alt="Element icon"
                  height="32em"
                />
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "0.5em",
              }}
            >
              <h4
                style={{
                  color: props.custom.items.titleColor,
                  fontSize: "1em",
                }}
              >
                {props.custom.items.title}
              </h4>
              {props.custom.items.description && (
                <p
                  style={{
                    color: props.custom.items.descriptionColor,
                    fontSize: "1em",
                  }}
                >
                  {props.custom.items.description}
                </p>
              )}
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
});

const cssTreeOptions: CSSTreeOptions = {
  css2DisplayOptions: true,
  flexContainerOptions: true,
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
    type: { type: "enum", options: ["disc", "circle", "square", "none"] },
    items: {
      type: "map",
      attributes: [
        {
          fieldName: "title",
          type: "text",
        },
        {
          fieldName: "titleColor",
          type: "color",
        },
        {
          fieldName: "description",
          type: "text",
        },
        {
          fieldName: "descriptionColor",
          type: "color",
        },
        {
          fieldName: "icon",
          type: "static_asset",
        },
      ],
    },
  },
};

const compManifest: ReactComponentManifestSchema = {
  meta: { key: "UnorderedList", category: "Basics" },
  render: {
    comp: UnorderedList,
  },
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
        initialValue: {
          type: "none",
          items: {
            title: "Atri Labs",
            titleColor: "#000000d9",
            descriptionColor: "#00000073",
          },
        },
        treeOptions: customTreeOptions,
        canvasOptions: { groupByBreakpoint: false },
      },
    },
    attachCallbacks: {
      onClick: [{ type: "do_nothing" }],
    },
    defaultCallbackHandlers: {
      onClick: [{ sendEventData: true }],
    },
  },
};

const iconManifest = {
  panel: { comp: CommonIcon, props: { name: "UnorderedList" } },
  drag: {
    comp: CommonIcon,
    props: { name: "UnorderedList", containerStyle: { padding: "1rem" } },
  },
  renderSchema: compManifest,
};

export default {
  manifests: {
    [reactSchemaId]: [compManifest],
    [iconSchemaId]: [iconManifest],
  },
};
