import classNames from "classnames";
import { Divide } from "lucide-react";
import React from "react";

interface Input {
  placeholder?: string;
  onChange?: any;
  label?: string;
  value?: string; // Make value optional
  name: string; // Also ID
  required?: boolean;
  className?: string;
  disabled?: boolean;
  type?: string;
  area?: boolean;
  iconsrc?: string;
  iconclass?: string;
  iconName?: string;
  register?: any; // react hook form register function
  errors?: any;
  svgprop?: React.ReactNode;
  areaClass?: string;
  min?: any;
  instruction?: string;
  [key: string]: any;
  widthClass?: any;
}

export const InputField = (props: Input) => {
  const {
    placeholder,
    onChange,
    value,
    name,
    label,
    required,
    disabled,
    className = "relative",
    area,
    type = "text",
    iconclass = "",
    iconsrc,
    register,
    errors,
    instruction,
    widthClass,
    min,
    svgprop,
    areaClass = "",
    ...rest
  } = props;
  const outputClass = React.useMemo(() => {
    let baseClass = `w-full outline-none ${
      area
        ? ` min-h-[100px] !bg-white border border-[#909090] text-[#8E8E8E]`
        : ""
    }`;

    if (disabled) {
      baseClass = classNames(
        "bg-gray-200 text-body cursor-not-allowed",
        baseClass
      );
    }

    return classNames(baseClass, className);
  }, [className, disabled]);

  const inputProps: any = {
    id: name,
    name,
    placeholder,
    required,
    type,
    className: outputClass,
    disabled,
    readOnly: disabled,
    iconclass,
    iconsrc,
    errors,

    register,
    svgprop,
    ...rest,
  };
  if (onChange) inputProps.onChange = onChange;
  if (value) inputProps.value = value || "";
  const containerClass = classNames("relative ", className);

  if (area) {
    return (
      <div className={className}>
        <label htmlFor={name}>
          <div className="block text-primaryDash text-lg font-semibold mb-1">
            {label} <span className="text-error">{required ? "*" : null}</span>
          </div>
        </label>
        <div className="border border-gray-300 rounded-md overflow-hidden bg-white focus-within:border-gray-700">
          <textarea
            {...(register ? register(name, { required }) : {})}
            {...inputProps}
            className={classNames(outputClass, areaClass, "bg-transparent p-1")}
            rows={8}
          />
        </div>
        {errors?.[name]?.message ? (
          <p className="text-error text-responsive-sm">
            {props.errors?.[name]?.message}
          </p>
        ) : null}
      </div>
    );
  }

  if (label) {
    return (
      <div className={className}>
        <label htmlFor={name}>
          <div className="block text-primaryDash text-sm font-semibold mb-[1px]">
            {label} <span className="text-error">{required ? "*" : null}</span>
          </div>
        </label>
        <div className="flex h-[2.8rem] px-4 py-2 items-center rounded-md overflow-hidden bg-white border border-gray-300 focus-within:border-gray-700">
          {svgprop && (
            <>
              <div className="flex items-center justify-center px-1">
                {svgprop}
              </div>
              <div className="h-[2.3rem] w-px bg-[#909090] mx-2" />
            </>
          )}
          {iconsrc && (
            <>
              <div className="flex items-center justify-center px-1">
                <img alt={name} src={iconsrc} className={iconclass} />
              </div>
            </>
          )}
          <input
            {...(register ? register(name, { required }) : {})}
            {...inputProps}
            min={min}
            readOnly
            onFocus={(e) => {
              e.target.readOnly = false;
            }}
            className={`w-full bg-transparent outline-none  ${
              type === "password" ? "" : ""
            }`}
          />
        </div>
        {errors?.[name]?.message ? (
          <p className="text-error text-responsive-sm">
            {props.errors?.[name]?.message}
          </p>
        ) : (
          ""
        )}
        {instruction && <p className="text-sm text-gray-500">{instruction}</p>}
      </div>
    );
  }

  return (
    <div className={classNames(containerClass, widthClass && widthClass)}>
      <div className="flex items-center rounded-md overflow-hidden bg-white border border-gray-300 px-4 py-2 text-lg text-gray-500 focus-within:border-gray-700">
        {svgprop && (
          <div className="flex items-center justify-center h-[2.3rem] px-3">
            {svgprop}
          </div>
        )}
        <input
          {...(register ? register(name, { required }) : {})}
          {...inputProps}
          className={`w-full bg-transparent outline-none  ${
            type === "password" ? "" : ""
          }`}
        />
      </div>
      {iconsrc && <img className={iconclass} alt={name} src={iconsrc} />}
      {errors?.[name]?.message ? (
        <p className="text-error text-responsive-sm">
          {props.errors?.[name]?.message}
        </p>
      ) : (
        ""
      )}
    </div>
  );
};
