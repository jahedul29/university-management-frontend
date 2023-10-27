"use client";
import Form from "@/components/Form/Form";
import FormInput from "@/components/Form/FormInput";
import FormSelectField from "@/components/Form/FormSelectField";
import ActionBar from "@/components/ui/ActionBar";
import CustomBreadcrumb from "@/components/ui/CustomBreadcrumb";
import { useAddAcademicDepartmentMutation } from "@/redux/api/academicDepartemntApi";
import { useAcademicFacultiesQuery } from "@/redux/api/academicFacultyApi";
import { academicFacultySchema } from "@/schemas/academicFaculty";
import { getUserInfo } from "@/services/auth.service";
import { IAcademicFaculty } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

const CreatePage = () => {
  const { role } = getUserInfo() as any;
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();
  const router = useRouter();
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

  const onSubmit = async (data: any) => {
    message.loading("Creating Academic Department");
    console.log({ data });
    try {
      // const res = await userLogin({ ...data }).unwrap();
      await addAcademicDepartment(data);
      message.success("Academic department added successfully");
      router.push("/admin/academic/department");
    } catch (error: any) {
      console.log(error.message);
      message.error(error.message);
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
            label: `Manage Academic Department`,
            link: `${role}/academic/department`,
          },
          {
            label: `Create`,
            link: ``,
          },
        ]}
      />
      <ActionBar title="Create Academic Department"></ActionBar>
      <div>
        <Form
          submitHandler={onSubmit}
          resolver={yupResolver(academicFacultySchema)}
        >
          <div
            style={{
              marginBottom: "10px",
              marginTop: "20px",
            }}
          >
            <Row
              gutter={[
                { xs: 8, sm: 16, md: 24, lg: 32 },
                { xs: 16, sm: 16, md: 16, lg: 16 },
              ]}
            >
              <Col className="gutter-row" span={8}>
                <FormInput
                  type="text"
                  name="title"
                  label="Title"
                  placeholder="Title"
                  size="large"
                />
              </Col>
            </Row>
            <Row
              gutter={[
                { xs: 8, sm: 16, md: 24, lg: 32 },
                { xs: 16, sm: 16, md: 16, lg: 16 },
              ]}
            >
              <Col
                className="gutter-row"
                span={8}
                style={{ margin: "10px 0px" }}
              >
                <FormSelectField
                  name="academicFacultyId"
                  label="Academic Faculty"
                  size="large"
                  options={academicFacultyOptions || []}
                  placeholder="Select"
                />
              </Col>
            </Row>
          </div>

          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreatePage;
