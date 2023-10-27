"use client";
import Form from "@/components/Form/Form";
import FormInput from "@/components/Form/FormInput";
import ActionBar from "@/components/ui/ActionBar";
import CustomBreadcrumb from "@/components/ui/CustomBreadcrumb";
import { useAddAcademicFacultyMutation } from "@/redux/api/academicFacultyApi";
import { academicFacultySchema } from "@/schemas/academicFaculty";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

const CreatePage = () => {
  const { role } = getUserInfo() as any;
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    message.loading("Creating Academic Faculty");
    console.log({ data });
    try {
      // const res = await userLogin({ ...data }).unwrap();
      await addAcademicFaculty(data);
      message.success("Academic faculty added successfully");
      router.push("/admin/academic/faculty");
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
            label: `Manage Academic Faculties`,
            link: `${role}/academic/faculty`,
          },
          {
            label: `Create`,
            link: ``,
          },
        ]}
      />
      <ActionBar title="Create Academic Faculty"></ActionBar>
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
