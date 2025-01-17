import React, { forwardRef, useMemo } from "react";
import { TimePicker as AntdTimePicker } from "antd";

const TimePicker = forwardRef<
  HTMLDivElement,
  {
    styles: React.CSSProperties;
    className?: string;
    custom: {
      size?: "small" | "middle" | "large";
      disabled?: boolean;
      format?:
        | "HH:mm:ss"
        | "HH:mm"
        | "hh:mm A"
        | "hh:mm a"
        | "HH:mm:ss A"
        | "HH:mm:ss a";
      use12Hours?: boolean;
      bordered?: boolean;
      status?: "error" | "warning";
      placement?:
        | "bottomLeft"
        | "bottomRight"
        | "topLeft"
        | "topRight"
        | undefined;
      onOpenChange?: (open: boolean) => void;
      range?: boolean;
    };
  }
>((props, ref) => {
  const { custom } = props;
  const { range, ...restprops } = custom;
  const key = useMemo(() => {
    if (range) {
      return Math.random();
    }
  }, [range]);

  // moved ref to div, as the Antd TimePicker doesnt provide ref for TimePicker
  return (
    <div ref={ref} style={{ display: "inline-block" }}>
      {range ? (
        <AntdTimePicker.RangePicker
          className={props.className}
          style={props.styles}
          {...restprops}
        />
      ) : (
        <AntdTimePicker
          className={props.className}
          style={props.styles}
          {...restprops}
          key={key}
        />
      )}
    </div>
  );
});

export default TimePicker;
