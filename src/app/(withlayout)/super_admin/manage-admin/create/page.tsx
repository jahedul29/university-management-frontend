"use client";

import Form from "@/components/Form/Form";
import FormDatePicker from "@/components/Form/FormDatePicker";
import FormInput from "@/components/Form/FormInput";
import FormSelectField from "@/components/Form/FormSelectField";
import FormTextInput from "@/components/Form/FromTextInput";
import CustomBreadcrumb from "@/components/ui/CustomBreadcrumb";
import UploadImage from "@/components/ui/UploadImage";
import { bloodGroupOptions, genderOptions } from "@/constants/global";
import { useAddAdminMutation } from "@/redux/api/adminApi";
import { useDepartmentsQuery } from "@/redux/api/departmentApi";
import { adminSchema } from "@/schemas/admin";
import { getUserInfo } from "@/services/auth.service";
import { IDepartment } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

const CreatePage = () => {
  const { role } = getUserInfo() as any;
  const { data, isLoading } = useDepartmentsQuery({ limit: 100, page: 1 });
  const departments: IDepartment[] | undefined = data?.departments;
  const [addAdmin] = useAddAdminMutation();
  const router = useRouter();

  const departmentOptions = departments
    ? departments?.map((item) => ({
        label: item.title,
        value: item.id,
      }))
    : [];

  const onSubmit = async (values: any) => {
    const obj = { ...values };
    const file = obj["file"];
    delete obj["file"];
    const data = JSON.stringify(obj);
    const formData = new FormData();
    formData.append("file", file as Blob);
    formData.append("data", data);
    message.loading("Creating admin....");

    try {
      await addAdmin(formData);
      message.success("Admin created successfully!");
      router.push("/super_admin/manage-admin");
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
            label: `Manage Admin`,
            link: `/${role}/manage-admin`,
          },
          {
            label: `Create`,
            link: ``,
          },
        ]}
      />
      <h1>Create Admin</h1>
      <div>
        {/* <Form submitHandler={onSubmit} resolver={yupResolver(adminSchema)}> */}
        <Form submitHandler={onSubmit} resolver={yupResolver(adminSchema)}>
          <div
            style={{
              border: "1px solid gray",
              padding: "20px",
              borderRadius: "5px",
              marginBottom: "10px",
            }}
          >
            <p style={{ fontSize: 20, marginBottom: 15 }}>Admin Information</p>
            <Row
              gutter={[
                { xs: 8, sm: 16, md: 24, lg: 32 },
                { xs: 16, sm: 16, md: 16, lg: 16 },
              ]}
            >
              <Col className="gutter-row" span={8}>
                <FormInput
                  type="text"
                  name="admin.name.firstName"
                  label="First Name"
                  placeholder="First Name"
                  size="large"
                />
              </Col>
              <Col className="gutter-row" span={8}>
                <FormInput
                  type="text"
                  name="admin.name.middleName"
                  label="Middle Name"
                  placeholder="Middle Name"
                  size="large"
                />
              </Col>
              <Col className="gutter-row" span={8}>
                <FormInput
                  type="text"
                  name="admin.name.lastName"
                  label="Last Name"
                  placeholder="Last Name"
                  size="large"
                />
              </Col>
              <Col className="gutter-row" span={8}>
                <FormInput
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Password"
                  size="large"
                />
              </Col>
              <Col className="gutter-row" span={8}>
                <FormSelectField
                  name="admin.gender"
                  label="Gender"
                  size="large"
                  options={genderOptions}
                  placeholder="Select"
                />
              </Col>
              <Col className="gutter-row" span={8}>
                <FormSelectField
                  name="admin.managementDepartment"
                  label="Department"
                  size="large"
                  options={departmentOptions}
                  placeholder="Select"
                />
              </Col>
              <Col className="gutter-row" span={8}>
                <UploadImage name="file" />
              </Col>
            </Row>
          </div>
          <div
            style={{
              border: "1px solid gray",
              padding: "20px",
              borderRadius: "5px",
              marginBottom: "10px",
            }}
          >
            <p style={{ fontSize: 20, marginBottom: 15 }}>Basic Information</p>
            <Row
              gutter={[
                { xs: 8, sm: 16, md: 24, lg: 32 },
                { xs: 16, sm: 16, md: 16, lg: 16 },
              ]}
            >
              <Col className="gutter-row" span={8}>
                <FormInput
                  type="email"
                  name="admin.email"
                  label="Email"
                  placeholder="Email"
                  size="large"
                />
              </Col>
              <Col className="gutter-row" span={8}>
                <FormInput
                  type="text"
                  name="admin.contactNo"
                  label="Contact Number"
                  placeholder="Contact Number"
                  size="large"
                />
              </Col>
              <Col className="gutter-row" span={8}>
                <FormInput
                  type="text"
                  name="admin.emergencyContactNo"
                  label="Emergency Contact Number"
                  placeholder="Emergency Contact Number"
                  size="large"
                />
              </Col>
              <Col className="gutter-row" span={8}>
                <FormDatePicker
                  name="admin.dateOfBirth"
                  label="Date of Birth"
                  size="large"
                />
              </Col>
              <Col className="gutter-row" span={8}>
                <FormSelectField
                  name="admin.bloodGroup"
                  label="Blood Group"
                  size="large"
                  options={bloodGroupOptions}
                  placeholder="Select"
                />
              </Col>
              <Col className="gutter-row" span={8}>
                <FormInput
                  type="text"
                  name="admin.designation"
                  label="Designation"
                  placeholder="Designation"
                  size="large"
                />
              </Col>
              <Col className="gutter-row" span={12}>
                <FormTextInput
                  name="admin.presentAddress"
                  label="Present Address"
                  placeholder="Present Address"
                  size="large"
                />
              </Col>
              <Col className="gutter-row" span={12}>
                <FormTextInput
                  name="admin.permanentAddress"
                  label="Permanent Address"
                  placeholder="Permanent Address"
                  size="large"
                />
              </Col>
            </Row>
          </div>
          <Button type="primary" htmlType="submit" size="large">
            Create
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreatePage;
