import {
  Alert,
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  notification,
  Select,
  Table,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import { AxiosError } from "axios";
import { University } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../utils/axios";
import { useForm } from "antd/es/form/Form";

interface UniversityDetails {
  name: string;
  state: string;
  country: string;
  pinCode: string;
  establishmentYear: any;
  tiers: string;
}

interface University {
  id: string;
  name: string;
  state: string;
  country: string;
  pinCode: string;
  establishmentYear: string;
  tier: string;
}

const UniversityPage: React.FC = () => {
  const [createError, setCreateError] = useState<string | null>(null);
  const [fetchUniversitiesError, setFetchUniversitiesError] = useState<
    string | null
  >(null);

  const [form] = useForm();

  const [universities, setUniversities] = useState<University[]>([]);

  const [showCreateUniversityModal, setShowCreateUniversityModal] =
    useState(false);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await api.get("/university/allUniversities");
        setUniversities(response.data.universities);
      } catch (error) {
        if (error instanceof AxiosError) {
          setFetchUniversitiesError(error.message);
        }
      }
    };
    fetchUniversities();
  }, []);

  const onFinish = async (values: UniversityDetails) => {
    values.establishmentYear = values.establishmentYear.year().toString();

    try {
      const response = await api.post("/university/create", values);
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

      {fetchUniversitiesError && (
        <Alert
          message={fetchUniversitiesError}
          type="error"
          showIcon
          closable
        />
      )}

      <Table
        className="mt-3"
        columns={[
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "State",
            dataIndex: "state",
            key: "state",
          },
          {
            title: "Country",
            dataIndex: "country",
            key: "country",
          },
          {
            title: "Pin code",
            dataIndex: "pinCode",
            key: "pinCode",
          },
          {
            title: "Establishment year",
            dataIndex: "establishmentYear",
            key: "establishmentYear",
          },
          {
            title: "Tier",
            dataIndex: "tier",
            key: "tier",
          },
          {
            title: "Actions",
            render: () => (
              <div className="flex gap-2">
                <Button type="primary">Show details</Button>
              </div>
            ),
          },
        ]}
        dataSource={universities}
      />

      <Modal
        title="Create University"
        open={showCreateUniversityModal}
        onOk={() => form.submit()}
        onCancel={() => setShowCreateUniversityModal(false)}
      >
        {createError && (
          <Alert message={createError} type="error" showIcon closable />
        )}
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="mt-4"
        >
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
    </div>
  );
};

export default UniversityPage;
