"use client";
import Form from "@/components/Form/Form";
import FormDatePicker from "@/components/Form/FormDatePicker";
import FormInput from "@/components/Form/FormInput";
import FormSelectField from "@/components/Form/FormSelectField";
import FormTextInput from "@/components/Form/FromTextInput";
import CustomBreadcrumb from "@/components/ui/CustomBreadcrumb";
import UploadImage from "@/components/ui/UploadImage";
import {
  academicDepartmentOptions,
  bloodGroupOptions,
  facultyOptions,
  genderOptions,
} from "@/constants/global";
import { facultySchema } from "@/schemas/faculty";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row } from "antd";

const CreatePage = () => {
  const { role } = getUserInfo() as any;

  const onSubmit = async (data: any) => {
    try {
      // const res = await userLogin({ ...data }).unwrap();
      console.log({ data });
    } catch (error: any) {
      console.log(error.message);
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
            label: `Manage Faculty`,
            link: `${role}/manage-faculty`,
          },
          {
            label: `Create`,
            link: ``,
          },
        ]}
      />
      <h1>Create Faculty</h1>
      <div>
        <Form submitHandler={onSubmit} resolver={yupResolver(facultySchema)}>
          <div
            style={{
              border: "1px solid gray",
              padding: "20px",
              borderRadius: "5px",
              marginBottom: "10px",
            }}
          >
            <p style={{ fontSize: 20, marginBottom: 15 }}>
              Faculty Information
            </p>
            <Row
              gutter={[
                { xs: 8, sm: 16, md: 24, lg: 32 },
                { xs: 16, sm: 16, md: 16, lg: 16 },
              ]}
            >
              <Col className="gutter-row" span={6}>
                <FormInput
                  type="text"
                  name="faculty.name.firstName"
                  label="First Name"
                  placeholder="First Name"
                  size="large"
                />
              </Col>
              <Col className="gutter-row" span={6}>
                <FormInput
                  type="text"
                  name="faculty.name.middleName"
                  label="Middle Name"
                  placeholder="Middle Name"
                  size="large"
                />
              </Col>
              <Col className="gutter-row" span={6}>
                <FormInput
                  type="text"
                  name="faculty.name.lastName"
                  label="Last Name"
                  placeholder="Last Name"
                  size="large"
                />
              </Col>
              <Col className="gutter-row" span={6}>
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
                  name="faculty.gender"
                  label="Gender"
                  size="large"
                  options={genderOptions}
                  placeholder="Select"
                />
              </Col>
              <Col className="gutter-row" span={8}>
                <FormSelectField
                  name="faculty.academicFaculty"
                  label="Academic Faculty"
                  size="large"
                  options={facultyOptions}
                  placeholder="Select"
                />
              </Col>
              <Col className="gutter-row" span={8}>
                <FormSelectField
                  name="faculty.academicDepartment"
                  label="Academic Department"
                  size="large"
                  options={academicDepartmentOptions}
                  placeholder="Select"
                />
              </Col>

              <Col className="gutter-row" span={8}>
                <UploadImage />
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
                  name="faculty.email"
                  label="Email"
                  placeholder="Email"
                  size="large"
                />
              </Col>
              <Col className="gutter-row" span={8}>
                <FormInput
                  type="text"
                  name="faculty.contactNo"
                  label="Contact Number"
                  placeholder="Contact Number"
                  size="large"
                />
              </Col>
              <Col className="gutter-row" span={8}>
                <FormInput
                  type="text"
                  name="faculty.emergencyContactNo"
                  label="Emergency Contact Number"
                  placeholder="Emergency Contact Number"
                  size="large"
                />
              </Col>
              <Col className="gutter-row" span={8}>
                <FormDatePicker
                  name="faculty.dateOfBirth"
                  label="Date of Birth"
                  size="large"
                />
              </Col>
              <Col className="gutter-row" span={8}>
                <FormSelectField
                  name="faculty.bloodGroup"
                  label="Blood Group"
                  size="large"
                  options={bloodGroupOptions}
                  placeholder="Select"
                />
              </Col>
              <Col className="gutter-row" span={8}>
                <FormInput
                  type="text"
                  name="faculty.designation"
                  label="Designation"
                  placeholder="Designation"
                  size="large"
                />
              </Col>
              <Col className="gutter-row" span={12}>
                <FormTextInput
                  name="faculty.presentAddress"
                  label="Present Address"
                  placeholder="Present Address"
                  size="large"
                />
              </Col>
              <Col className="gutter-row" span={12}>
                <FormTextInput
                  name="faculty.permanentAddress"
                  label="Permanent Address"
                  placeholder="Permanent Address"
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
