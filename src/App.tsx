import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import './App.css';
import 'antd/dist/reset.css';

function App() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Form values:', values);
    message.success('Form submitted successfully!');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error('Please check the form for errors.');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Test Form
        </h1>
        <Form
          form={form}
          name="test_form"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter your name!' }]}
          >
            <Input
              placeholder="Enter your name"
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input
              placeholder="Enter your email"
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item
            label="Message"
            name="message"
            rules={[{ required: true, message: 'Please enter a message!' }]}
          >
            <Input.TextArea
              placeholder="Enter your message"
              rows={4}
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="mt-2 bg-blue-600 hover:bg-blue-700"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default App;