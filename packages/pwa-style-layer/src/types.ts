import React from "react";

export type CssProprtyComponentType = {
  compId: string;
  styles: React.CSSProperties;
  patchCb: (slice: any) => void;
};
