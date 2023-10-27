import { useAcademicFacultiesQuery } from "@/redux/api/academicFacultyApi";
import { IAcademicFaculty } from "@/types";
import FormSelectField from "./FormSelectField";

type AcademicFacultyDropdownPropsType = {
  name: string;
  label: string;
};

const AcademicFacultyDropdown = ({
  name,
  label,
}: AcademicFacultyDropdownPropsType) => {
  const { data, isLoading } = useAcademicFacultiesQuery({
    limit: 100,
    page: 1,
  });

  const academicFacultyOptions = data?.academicFaculties?.map(
    (item: IAcademicFaculty) => ({
      label: item.title,
      value: item.id,
    })
  );

  return (
    <FormSelectField
      name={name}
      label={label}
      size="large"
      options={academicFacultyOptions || []}
      placeholder="Select"
    />
  );
};

export default AcademicFacultyDropdown;
