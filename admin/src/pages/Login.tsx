import { Alert, Button, Card, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";

const LoginPage: React.FC = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-slate-100">
      <div className="fixed top-0 left-0 right-0   p-5 bg-white">
        <div>
          <div className="text-xl font-bold container mx-auto text-teal-500">
            previousexams
          </div>
        </div>
      </div>
      <Card className="min-w-[400px]">
        <div className="text-2xl mb-4 font-bold">Login as admin</div>
        <Alert className="mb-3" message={"Something went wrong"} />
        <Form layout="vertical">
          <FormItem label={"Username"}>
            <Input type="email" />
          </FormItem>
          <FormItem label={"Password"}>
            <Input type="password" />
          </FormItem>
          <div className="flex justify-end">
            <Button type="primary">Login</Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
