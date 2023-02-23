import {
  gray300,
  gray800,
  h1Heading,
  smallText,
} from "@atrilabs/design-system";
import React, { useState } from "react";
import "./TabBody.css";
import { Size } from "./components/size/Size";
import { FlexChild } from "./components/flexchild/FlexChild";
import SpacingProperty from "./components/spacing/SpacingProperty";
import { Border } from "./components/border/Border";
import { BoxShadow } from "./components/box-shadow/BoxShadow";
import { Background } from "./components/background/Background";
import { CSSTreeOptions } from "@atrilabs/app-design-forest";
//import { CssSummary } from "./components/cssSummary/CssSummary";
import { Css2Display } from "./components/css2display/Css2Display";
import { Layout } from "./components/layout/Layout";
import { Miscellaneous } from "./components/miscellaneous/Miscellaneous";
import { Outline } from "./components/outline/Outline";
import Position from "./components/position/Position";
//import { Typography } from "./components/typography/Typography";

export type TabBodyProps = {
  compId: string | null;
  patchCb: (slice: any) => void;
  styles: React.CSSProperties;
  treeOptions: CSSTreeOptions;
};
const styles: { [key: string]: React.CSSProperties } = {
  // top level container
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    userSelect: "none",
  },

  // alias container
  aliasContainer: {
    ...h1Heading,
    color: gray300,
    padding: "0.5rem",
    borderBottom: `1px solid ${gray800}`,
    background: "transparent",
  },
};

export const TabBody: React.FC<TabBodyProps> = (props) => {
  if (!props.compId) return <></>;

  return (
    <div style={styles.container} className="tb-scroll">
      <input style={styles.aliasContainer} />
      <div style={{ ...smallText, color: gray300, padding: "0.5rem" }}></div>
      {/* <CssSummary
        compId={props.compId}
        cssTree={props.cssTree}
        compTree={props.compTree}
      /> */}

      {props.treeOptions && props.treeOptions.css2DisplayOptions ? (
        <Css2Display
          styles={props.styles}
          patchCb={props.patchCb}
          compId={props.compId}
        />
      ) : null}
      {props.treeOptions && props.treeOptions.flexContainerOptions ? (
        <Layout
          styles={props.styles}
          patchCb={props.patchCb}
          compId={props.compId}
        />
      ) : null}
      {props.treeOptions && props.treeOptions.flexChildOptions ? (
        <FlexChild
          compId={props.compId}
          styles={props.styles}
          patchCb={props.patchCb}
        />
      ) : null}
      {props.treeOptions && props.treeOptions.sizeOptions ? (
        <Size
          compId={props.compId}
          styles={props.styles}
          patchCb={props.patchCb}
        />
      ) : null}

      {props.treeOptions && props.treeOptions.spacingOptions ? (
        <SpacingProperty
          compId={props.compId}
          styles={props.styles}
          patchCb={props.patchCb}
        />
      ) : null}
      {props.treeOptions && props.treeOptions.borderOptions ? (
        <Border
          compId={props.compId}
          styles={props.styles}
          patchCb={props.patchCb}
        />
      ) : null}

      {props.treeOptions && props.treeOptions.boxShadowOptions ? (
        <BoxShadow
          compId={props.compId}
          styles={props.styles}
          patchCb={props.patchCb}
        />
      ) : null}
      {props.treeOptions && props.treeOptions.outlineOptions ? (
        <Outline
          styles={props.styles}
          patchCb={props.patchCb}
          compId={props.compId}
        />
      ) : null}
      {/* {props.treeOptions && props.treeOptions.typographyOptions ? (
        <Typography
          styles={props.styles}
          patchCb={props.patchCb}
          compId={props.compId}
        />
      ) : null} */}
      {props.treeOptions && props.treeOptions.backgroundOptions ? (
        <Background
          compId={props.compId}
          styles={props.styles}
          patchCb={props.patchCb}
        />
      ) : null}
      {props.treeOptions && props.treeOptions.positionOptions ? (
        <Position
          styles={props.styles}
          patchCb={props.patchCb}
          compId={props.compId}
        />
      ) : null}
      {props.treeOptions && props.treeOptions.miscellaneousOptions ? (
        <Miscellaneous
          styles={props.styles}
          patchCb={props.patchCb}
          compId={props.compId}
        />
      ) : null}
    </div>
  );
};
