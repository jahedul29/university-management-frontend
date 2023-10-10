"use client";

import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import { DatePicker, DatePickerProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { Controller, useFormContext } from "react-hook-form";

interface IFormDatePickerProps {
  onChange?: (value1: Dayjs | null, value2: string) => void;
  name: string;
  value?: Dayjs;
  label?: string;
  size?: "large" | "small";
}

const FormDatePicker = ({
  name,
  value,
  label,
  size,
  onChange,
}: IFormDatePickerProps) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  const handleOnChange: DatePickerProps["onChange"] = (date, dateString) => {
    onChange ? onChange(date, dateString) : null;
    setValue(name, dateString);
  };

  return (
    <>
      {label ? label : null}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <DatePicker
            size={size}
            value={dayjs(field.value) || ""}
            onChange={handleOnChange}
            style={{ width: "100%" }}
          />
        )}
      />
      <small style={{ color: "red" }}>{errorMessage}</small>
    </>
  );
};

export default FormDatePicker;
