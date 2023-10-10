"use client";

import StepperForm from "@/components/StepperForm/StepperForm";
import StudentInfo from "@/components/StudentForms/StudentInfo";
import StudentLocalGuardianInfo from "@/components/StudentForms/StudentLocalGuardianInfo";
import CustomBreadcrumb from "@/components/ui/CustomBreadcrumb";
import { getUserInfo } from "@/services/auth.service";
import StudentBasicInfo from "./../../../../../components/StudentForms/StudentBasicInfo";
import StudentGuardianInfo from "./../../../../../components/StudentForms/StudentGuardianInfo";

const CreatePage = () => {
  const { role } = getUserInfo() as any;

  const steps = [
    {
      title: "Student Information",
      content: <StudentInfo />,
    },
    {
      title: "Basic Information",
      content: <StudentBasicInfo />,
    },
    {
      title: "Guardian Information",
      content: <StudentGuardianInfo />,
    },
    {
      title: "Local Guardian Information",
      content: <StudentLocalGuardianInfo />,
    },
  ];

  const handleStudentSubmit = async (data: any) => {
    try {
      console.log({ data });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <CustomBreadcrumb
        items={[
          {
            label: `${role}`,
            link: `/${role}`,
          },
          {
            label: `Manage student`,
            link: `${role}/manage-student`,
          },
          {
            label: `Create`,
            link: ``,
          },
        ]}
      />
      <h1>Create user</h1>
      <StepperForm steps={steps} submitHandler={handleStudentSubmit} />
    </div>
  );
};

export default CreatePage;
