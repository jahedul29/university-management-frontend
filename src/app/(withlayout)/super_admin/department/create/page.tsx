"use client";
import Form from "@/components/Form/Form";
import FormInput from "@/components/Form/FormInput";
import ActionBar from "@/components/ui/ActionBar";
import CustomBreadcrumb from "@/components/ui/CustomBreadcrumb";
import { useAddDepartmentMutation } from "@/redux/api/departmentApi";
import { departmentSchema } from "@/schemas/department";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

const CreatePage = () => {
  const { role } = getUserInfo() as any;
  const [addDepartment] = useAddDepartmentMutation();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    message.loading("Creating department");
    console.log({ data });
    try {
      // const res = await userLogin({ ...data }).unwrap();
      await addDepartment(data);
      message.success("Department added successfully");
      router.push("/super_admin/department");
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
            label: `Manage Department`,
            link: `${role}/department`,
          },
          {
            label: `Create`,
            link: ``,
          },
        ]}
      />
      <ActionBar title="Create Department"></ActionBar>
      <div>
        <Form submitHandler={onSubmit} resolver={yupResolver(departmentSchema)}>
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
