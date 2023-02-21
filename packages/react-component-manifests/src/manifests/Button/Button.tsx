import React, { forwardRef, useCallback, ReactNode } from "react";
import { Button as AntdButton } from "antd";

export enum ButtonShape {
  DEFAULT = "default",
  CIRCLE = "circle",
  ROUND = "round",
}

export enum ButtonType {
  PRIMARY = "primary",
  GHOST = "ghost",
  DASHED = "dashed",
  LINK = "link",
  TEXT = "text",
  DEFAULT = "default",
}

export enum ButtonSize {
  LARGE = "large",
  MIDDLE = "middle",
  SMALL = "small",
}
export enum ButtonhtmlType {
  BUTTON = "button",
  SUBMIT = "submit",
  RESET = "reset",
}

const Button = forwardRef<
  HTMLButtonElement,
  {
    styles: React.CSSProperties;
    custom: { text: string };
    onClick: (event: { pageX: number; pageY: number }) => void;
    className?: string;
    shape?: ButtonShape; //Can be set button shape
    type?: ButtonType; //Can be set to primary ghost dashed link text default
    size?: ButtonSize; //Set the size of button
    disabled?: boolean; //Disabled state of button
    icon?: ReactNode; //Set the icon component of button
    loading?: boolean | { delay: number }; //Set the loading status of button
    block?: boolean; //Option to fit button width to its parent width
    danger?: boolean; //Set the danger status of button
    ghost?: boolean; //Make background transparent and invert text and border colors
    href?: string; //Redirect url of link button
    htmlType?: ButtonhtmlType; //Set the original html type of button, see: MDN
    target?: string; //	Same as target attribute of a, works when href is specified
  }
>((props, ref) => {
  const onClick = useCallback(
    (e: React.MouseEvent) => {
      props.onClick({ pageX: e.pageX, pageY: e.pageY });
    },
    [props]
  );
  const { custom, ...restProps } = props;
  return <AntdButton {...restProps} {...custom}/>;
});

export default Button;
