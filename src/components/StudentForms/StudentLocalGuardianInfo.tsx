import { Col, Row } from "antd";
import FormInput from "../Form/FormInput";

const StudentLocalGuardianInfo = () => {
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
      <p style={{ fontSize: 20, marginBottom: 15 }}>
        Local Guardian Information
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
            name="student.localGuardian.name"
            label="Local Guardian Name"
            placeholder="Local Guardian Name"
            size="large"
          />
        </Col>
        <Col className="gutter-row" span={6}>
          <FormInput
            type="text"
            name="student.localGuardian.occupation"
            label="Local Guardian Occupation"
            placeholder="Local Guardian Occupation"
            size="large"
          />
        </Col>
        <Col className="gutter-row" span={6}>
          <FormInput
            type="text"
            name="student.localGuardian.contactNo"
            label="Local Guardian Contact No"
            placeholder="Local Guardian Contact No"
            size="large"
          />
        </Col>
        <Col className="gutter-row" span={6}>
          <FormInput
            type="text"
            name="student.localGuardian.address"
            label="Local Guardian Address"
            placeholder="Local Guardian Address"
            size="large"
          />
        </Col>
      </Row>
    </div>
  );
};

export default StudentLocalGuardianInfo;
