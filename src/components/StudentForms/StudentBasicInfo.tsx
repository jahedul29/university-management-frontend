import { bloodGroupOptions } from "@/constants/global";
import { Col, Row } from "antd";
import FormDatePicker from "../Form/FormDatePicker";
import FormInput from "../Form/FormInput";
import FormSelectField from "../Form/FormSelectField";
import FormTextInput from "../Form/FromTextInput";

const StudentBasicInfo = () => {
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
      <p style={{ fontSize: 20, marginBottom: 15 }}>Basic Information</p>
      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 16, sm: 16, md: 16, lg: 16 },
        ]}
      >
        <Col className="gutter-row" span={8}>
          <FormInput
            type="text"
            name="student.email"
            label="Email"
            placeholder="Email"
            size="large"
          />
        </Col>
        <Col className="gutter-row" span={8}>
          <FormInput
            type="text"
            name="student.contactNo"
            label="Contact Number"
            placeholder="Contact Number"
            size="large"
          />
        </Col>
        <Col className="gutter-row" span={8}>
          <FormInput
            type="text"
            name="student.emergencyContact"
            label="Emergency Contact"
            placeholder="Emergency Contact"
            size="large"
          />
        </Col>
        <Col className="gutter-row" span={12}>
          <FormDatePicker
            name="student.dateOfBirth"
            label="Date of Birth"
            size="large"
          />
        </Col>
        <Col className="gutter-row" span={12}>
          <FormSelectField
            name="student.bloodGroup"
            label="Blood Group"
            size="large"
            options={bloodGroupOptions}
            placeholder="Select"
          />
        </Col>

        <Col className="gutter-row" span={12}>
          <FormTextInput
            name="student.presentAddress"
            label="Present Address"
            placeholder="Present Address"
            size="large"
          />
        </Col>
        <Col className="gutter-row" span={12}>
          <FormTextInput
            name="student.permanentAddress"
            label="Permanent Address"
            placeholder="Permanent Address"
            size="large"
          />
        </Col>
      </Row>
    </div>
  );
};

export default StudentBasicInfo;
