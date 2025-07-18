import { Modal, Input, Select, Switch, Button } from 'antd';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const { Option } = Select;

interface UserEditModalProps {
  visible: boolean;
  user: any;
  onCancel: () => void;
  onSave: (user: any) => void;
}

export default function UserEditModal({ visible, user, onCancel, onSave }: UserEditModalProps) {
  const [editedUser, setEditedUser] = useState<any>({
    id: '',
    name: '',
    email: '',
    phone: '',
    role: '',
    status: false,
  });

  useEffect(() => {
    if (user) {
      setEditedUser({
        id: user.id,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        role: user.role || '',
        status: !!user.status,
      });
    } else {
      setEditedUser({
        id: '',
        name: '',
        email: '',
        phone: '',
        role: '',
        status: false,
      });
    }
  }, [user]);

  const handleChange = (field: string, value: any) => {
    setEditedUser({ ...editedUser, [field]: value });
  };

  const validateAndSave = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]+$/;

    if (!editedUser.name || !editedUser.email || !editedUser.role) {
      Swal.fire({
        icon: 'error',
        title: 'Datos incompletos',
        text: 'Por favor completa todos los campos obligatorios.',
      });
      return;
    }

    if (!emailRegex.test(editedUser.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Correo inválido',
        text: 'Por favor ingresa un correo válido.',
      });
      return;
    }

    if (!phoneRegex.test(editedUser.phone)) {
      Swal.fire({
        icon: 'error',
        title: 'Teléfono inválido',
        text: 'El teléfono solo debe contener números.',
      });
      return;
    }

    onSave(editedUser);
  };

  return (
    <Modal
      title={user ? 'Editar Usuario' : 'Agregar Usuario'}
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancelar
        </Button>,
        <Button key="save" type="primary" onClick={validateAndSave}>
          Guardar
        </Button>,
      ]}
    >
      <div style={{ marginBottom: 16 }}>
        <label>Nombre:</label>
        <Input
          value={editedUser.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>Correo:</label>
        <Input
          value={editedUser.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>Teléfono:</label>
        <Input
          value={editedUser.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>Rol:</label>
        <Select
          value={editedUser.role}
          onChange={(value) => handleChange('role', value)}
          style={{ width: '100%' }}
        >
          <Option value="user">Usuario</Option>
          <Option value="admin">Administrador</Option>
          <Option value="moderator">Moderador</Option>
        </Select>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>Estado:</label>
        <Switch
          checked={editedUser.status}
          onChange={(checked) => handleChange('status', checked)}
        />
      </div>
    </Modal>
  );
}
