import { Col, Row } from "antd";
import FormInput from "../Form/FormInput";

const StudentGuardianInfo = () => {
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
      <p style={{ fontSize: 20, marginBottom: 15 }}>Guardian Information</p>
      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 16, sm: 16, md: 16, lg: 16 },
        ]}
      >
        <Col className="gutter-row" span={6}>
          <FormInput
            type="text"
            name="student.guardian.fatherName"
            label="Father Name"
            placeholder="Father Name"
            size="large"
          />
        </Col>
        <Col className="gutter-row" span={6}>
          <FormInput
            type="text"
            name="student.guardian.fatherOccupation"
            label="Father Occupation"
            placeholder="Father Occupation"
            size="large"
          />
        </Col>
        <Col className="gutter-row" span={6}>
          <FormInput
            type="text"
            name="student.guardian.fatherContactNo"
            label="Father Contact No"
            placeholder="Father Contact no"
            size="large"
          />
        </Col>
        <Col className="gutter-row" span={6}>
          <FormInput
            type="text"
            name="student.guardian.motherName"
            label="Mother Name"
            placeholder="Mother Name"
            size="large"
          />
        </Col>
        <Col className="gutter-row" span={6}>
          <FormInput
            type="text"
            name="student.guardian.motherOccupation"
            label="Mother Occupation"
            placeholder="Mother Occupation"
            size="large"
          />
        </Col>
        <Col className="gutter-row" span={6}>
          <FormInput
            type="text"
            name="student.guardian.motherContactNo"
            label="Mother Contact No"
            placeholder="Mother Contact No"
            size="large"
          />
        </Col>
      </Row>
    </div>
  );
};

export default StudentGuardianInfo;
