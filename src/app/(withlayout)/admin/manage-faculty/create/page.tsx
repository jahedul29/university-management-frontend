"use client";
import AcademicDepartmentDropdown from "@/components/Form/AcademicDepartmentDropdown";
import AcademicFacultyDropdown from "@/components/Form/AcademicFacultyDropdown";
import Form from "@/components/Form/Form";
import FormDatePicker from "@/components/Form/FormDatePicker";
import FormInput from "@/components/Form/FormInput";
import FormSelectField from "@/components/Form/FormSelectField";
import FormTextInput from "@/components/Form/FromTextInput";
import CustomBreadcrumb from "@/components/ui/CustomBreadcrumb";
import UploadImage from "@/components/ui/UploadImage";
import { bloodGroupOptions, genderOptions } from "@/constants/global";
import { useAddFacultyMutation } from "@/redux/api/facultyApi";
import { facultySchema } from "@/schemas/faculty";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

const CreatePage = () => {
  const { role } = getUserInfo() as any;
  const [addFaculty] = useAddFacultyMutation();
  const router = useRouter();

  const onSubmit = async (values: any) => {
    const obj = { ...values };
    const file = obj["file"];
    delete obj["file"];
    const data = JSON.stringify(obj);
    const formData = new FormData();
    formData.append("file", file as Blob);
    formData.append("data", data);
    message.loading("Creating faculty....");

    try {
      const res: any = await addFaculty(formData);
      if (res?.data) {
        message.success("Faculty created successfully!");
        router.push("/admin/manage-faculty");
      } else {
        message.error(res?.error?.data);
      }
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
            label: `Manage Faculty`,
            link: `/${role}/manage-faculty`,
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
              Faculty test Information
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
                <AcademicFacultyDropdown
                  name="faculty.academicFaculty"
                  label="Academic Faculty"
                />
              </Col>
              <Col className="gutter-row" span={8}>
                <AcademicDepartmentDropdown
                  name="faculty.academicDepartment"
                  label="Academic Department"
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
          <Button size="large" type="primary" htmlType="submit">
            Create
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreatePage;
