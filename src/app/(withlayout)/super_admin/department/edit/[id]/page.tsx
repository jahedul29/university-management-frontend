"use client";

import Form from "@/components/Form/Form";
import FormInput from "@/components/Form/FormInput";
import ActionBar from "@/components/ui/ActionBar";
import CustomBreadcrumb from "@/components/ui/CustomBreadcrumb";
import {
  useGetDepartmentByIdQuery,
  useUpdateDepartmentMutation,
} from "@/redux/api/departmentApi";
import { departmentSchema } from "@/schemas/department";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

type EditDepartmentPropsType = {
  params: {
    id: string;
  };
};

const EditDepartment = ({ params }: EditDepartmentPropsType) => {
  const { id } = params;
  const { role } = getUserInfo() as any;
  const router = useRouter();
  const { data, isLoading } = useGetDepartmentByIdQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const [updateDepartment] = useUpdateDepartmentMutation();

  const onSubmit = async (data: any) => {
    message.loading("Updating department");
    try {
      // const res = await userLogin({ ...data }).unwrap();
      await updateDepartment({ id, body: data });
      message.success("Department updated successfully");
      router.push("/super_admin/department");
    } catch (error: any) {
      console.log(error.message);
      message.error(error.message);
    }
  };

  const defaultValues = {
    title: data?.title,
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
            label: `Department List`,
            link: `/${role}/department`,
          },
          {
            label: `Update Department`,
            link: ``,
          },
        ]}
      />
      <ActionBar title="Update Department"></ActionBar>
      <div>
        <Form
          submitHandler={onSubmit}
          defaultValues={defaultValues}
          resolver={yupResolver(departmentSchema)}
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
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditDepartment;
