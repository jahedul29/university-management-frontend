import { useAcademicDepartmentsQuery } from "@/redux/api/academicDepartemntApi";
import { IAcademicDepartment } from "@/types";
import FormSelectField from "./FormSelectField";

type AcademicDepartmentDropdownPropsType = {
  name: string;
  label: string;
};

const AcademicDepartmentDropdown = ({
  name,
  label,
}: AcademicDepartmentDropdownPropsType) => {
  const { data, isLoading } = useAcademicDepartmentsQuery({
    limit: 100,
    page: 1,
  });

  const academicDepartmentOptions = data?.academicDepartments?.map(
    (item: IAcademicDepartment) => ({
      label: item.title,
      value: item.id,
    })
  );

  return (
    <FormSelectField
      name={name}
      label={label}
      size="large"
      options={academicDepartmentOptions || []}
      placeholder="Select"
    />
  );
};

export default AcademicDepartmentDropdown;
