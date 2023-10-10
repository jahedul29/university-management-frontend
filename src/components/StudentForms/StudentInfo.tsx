"use client";

import {
  academicDepartmentOptions,
  academicSemesterOptions,
  facultyOptions,
  genderOptions,
} from "@/constants/global";
import { Col, Row } from "antd";
import FormInput from "../Form/FormInput";
import FormSelectField from "../Form/FormSelectField";
import UploadImage from "../ui/UploadImage";

const StudentInfo = () => {
  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "20px",
        borderRadius: "5px",
        marginBottom: "10px",
        marginTop: "20px",
      }}
    >
      <p style={{ fontSize: 20, marginBottom: 15 }}>Student Information</p>
      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 16, sm: 16, md: 16, lg: 16 },
        ]}
      >
        <Col className="gutter-row" span={6}>
          <FormInput
            type="text"
            name="student.name.firstName"
            label="First Name"
            placeholder="First Name"
            size="large"
          />
        </Col>
        <Col className="gutter-row" span={6}>
          <FormInput
            type="text"
            name="student.name.middleName"
            label="Middle Name"
            placeholder="Middle Name"
            size="large"
          />
        </Col>
        <Col className="gutter-row" span={6}>
          <FormInput
            type="text"
            name="student.name.lastName"
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
            name="student.academicDepartment"
            label="Academic Department"
            size="large"
            options={academicDepartmentOptions}
            placeholder="Select"
          />
        </Col>
        <Col className="gutter-row" span={8}>
          <FormSelectField
            name="student.academicFaculty"
            label="Academic Faculty"
            size="large"
            options={facultyOptions}
            placeholder="Select"
          />
        </Col>
        <Col className="gutter-row" span={8}>
          <FormSelectField
            name="student.academicSemester"
            label="Academic Semester"
            size="large"
            options={academicSemesterOptions}
            placeholder="Select"
          />
        </Col>
        <Col className="gutter-row" span={8}>
          <FormSelectField
            name="student.gender"
            label="Gender"
            size="large"
            options={genderOptions}
            placeholder="Select"
          />
        </Col>
        <Col className="gutter-row" span={8}>
          <UploadImage />
        </Col>
      </Row>
    </div>
  );
};

export default StudentInfo;
