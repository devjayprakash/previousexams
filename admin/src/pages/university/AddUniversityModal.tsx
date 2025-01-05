import {
  Modal,
  Alert,
  Input,
  DatePicker,
  Select,
  notification,
  Form,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import { AxiosError } from "axios";
import { useState } from "react";
import api from "../../utils/axios";
import { Dayjs } from "dayjs";
import { useForm } from "antd/es/form/Form";

interface UniversityDetails {
  name: string;
  state: string;
  country: string;
  pinCode: string;
  establishmentYear: Dayjs;
  tiers: string;
}

interface AddUniversityModalProps {
  showCreateUniversityModal: boolean;
  setShowCreateUniversityModal: (value: boolean) => void;
}

const AddUniversityModal: React.FC<AddUniversityModalProps> = ({
  showCreateUniversityModal,
  setShowCreateUniversityModal,
}) => {
  const [createError, setCreateError] = useState<string | null>(null);

  const [form] = useForm();

  //   TODO: Separate the login from this component
  const onFinish = async (values: UniversityDetails) => {
    const establishmentYear = values.establishmentYear.year().toString();

    try {
      const response = await api.post("/university/create", {
        ...values,
        establishmentYear,
      });
      if (response.data.result) {
        setShowCreateUniversityModal(false);
        notification.success({
          message: "University created",
          description: "University has been created successfully",
        });
      } else {
        setCreateError(response.data.msg);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const response = error.response;
        setCreateError(response?.data.msg);
      }
    }
  };

  return (
    <Modal
      title="Create University"
      open={showCreateUniversityModal}
      onOk={() => form.submit()}
      onCancel={() => setShowCreateUniversityModal(false)}
    >
      {createError && (
        <Alert message={createError} type="error" showIcon closable />
      )}
      <Form form={form} onFinish={onFinish} layout="vertical" className="mt-4">
        <FormItem name={"name"} label={"University Name"} required>
          <Input />
        </FormItem>
        <FormItem name={"state"} required label={"State"}>
          <Input />
        </FormItem>
        <FormItem name={"country"} required label={"Country"}>
          <Input />
        </FormItem>
        <FormItem name={"pinCode"} required label={"Pin code"}>
          <Input />
        </FormItem>
        <FormItem
          name={"establishmentYear"}
          required
          label={"Establishment year"}
        >
          <DatePicker picker="year" />
        </FormItem>
        <FormItem name={"tier"} label={"Tiers"}>
          <Select defaultActiveFirstOption>
            <Select.Option value="first_tier">First Tier</Select.Option>
            <Select.Option value="first_tier">Second Tier</Select.Option>
            <Select.Option value="first_tier">Third Tier</Select.Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default AddUniversityModal;
