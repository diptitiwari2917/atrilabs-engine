import React, { forwardRef } from "react";
import { Checkbox as AntdCheckbox } from "antd";
import type { CheckboxValueType } from "antd/es/checkbox/Group";

interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}

const Checkbox = forwardRef<
  HTMLInputElement,
  {
    styles: React.CSSProperties;
    custom: {
      defaultValue: (string | number)[];
      disabled?: boolean;
      options: Option[];
      name?: string;
      value?: (string | number | boolean)[];
    };
    onChange?: (checkedValue: Array<CheckboxValueType>) => void;
    className?: string;
  }
>((props, ref) => {
  const { custom } = props;
  // moved ref to div, as the Antd Checkbox doesnt provide ref for Checkbox
  return (
    <div ref={ref} style={{ display: "inline-block" }}>
      <AntdCheckbox.Group
        className={props.className}
        style={props.styles}
        {...custom}
        onChange={props.onChange}
      />
    </div>
  );
});

export default Checkbox;
