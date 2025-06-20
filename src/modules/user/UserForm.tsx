import React from 'react';
import { Form, Input, Radio } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const onFinish = (values: any) => {
  console.log('Form values:', values);
};

const UserForm: React.FC = () => (
  <Form
    {...layout}
    name="nest-messages"
    onFinish={onFinish}
    style={{ maxWidth: 600 }}
    validateMessages={validateMessages}
  >
    <Form.Item name={['user', 'name']} label="Nombre" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item name={['user', 'email']} label="Correo Electrónico" rules={[{ type: 'email', required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item name={['user', 'password']} label="Contraseña" rules={[{ required: true, message: 'Por favor, ingrese su contraseña!' }]}>
      <Input.Password />
    </Form.Item>
    <Form.Item name={['user', 'role']} label="Rol" rules={[{ required: true }]}>
      <Radio.Group>
        <Radio.Button value="user">Usuario</Radio.Button>
        <Radio.Button value="admin">Administrador</Radio.Button>
        <Radio.Button value="moderator">Moderador</Radio.Button>
      </Radio.Group>
    </Form.Item>
    <Form.Item name={['user', 'phone']} label="Teléfono" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item name={['user', 'status']} label="Estado" rules={[{ required: true }]}>
      <Radio.Group>
        <Radio.Button value={true}>Activo</Radio.Button>
        <Radio.Button value={false}>Inactivo</Radio.Button>
      </Radio.Group>
    </Form.Item>
  </Form>
);

export default UserForm;