import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import { University } from "lucide-react";
import { useState } from "react";

const UniversityPage: React.FC = () => {
  const [showCreateUniversityModal, setShowCreateUniversityModal] =
    useState(false);

  return (
    <div className="p-3">
      <div className="flex items-center gap-2">
        <University />
        <div className="text-2xl">Universities</div>
      </div>

      <div className="w-full mt-3 bg-white justify-between flex p-2 rounded-md">
        <div></div>
        <Button
          onClick={() => {
            setShowCreateUniversityModal(true);
          }}
          type="primary"
          size="small"
        >
          Create university
        </Button>
      </div>

      <Modal
        title="Create University"
        open={showCreateUniversityModal}
        onOk={() => setShowCreateUniversityModal(false)}
        onCancel={() => setShowCreateUniversityModal(false)}
      >
        <Form layout="vertical" className="mt-4">
          <FormItem label={"University Name"} required>
            <Input />
          </FormItem>
          <FormItem required label={"State"}>
            <Input />
          </FormItem>
          <FormItem required label={"Country"}>
            <Input />
          </FormItem>
          <FormItem required label={"Pin code"}>
            <Input />
          </FormItem>
          <FormItem required label={"Establishment year"}>
            <DatePicker picker="year" />
          </FormItem>
          <FormItem label={"Tiers"}>
            <Select defaultActiveFirstOption>
              <Select.Option value="first_tier">First Tier</Select.Option>
              <Select.Option value="first_tier">Second Tier</Select.Option>
              <Select.Option value="first_tier">Third Tier</Select.Option>
            </Select>
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
};

export default UniversityPage;
