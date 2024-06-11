import React from 'react';
import { SecurityScanOutlined, FormOutlined, NotificationOutlined ,PieChartOutlined,FolderAddOutlined,SnippetsOutlined} from '@ant-design/icons';

const sidebarItems = [
  {
    key: 'sub1',
    icon: React.createElement(SecurityScanOutlined),
    label: 'Seguridad',
    children: [
      { key: '1', label: 'Permisos' },
      { key: '2', label: 'Modulos' },
      { key: '3', label: 'Usuarios' },
      { key: '4', label: 'Pefiles' },
    ]
  },
  {
    key: 'sub2',
    icon: React.createElement(FormOutlined),
    label: 'Matriculas',
    children: [
      { key: '5', label: 'Inscribir alumno', icon:React.createElement(FormOutlined) },
      { key: '6', label: 'Lista Matriculado' },
    ]
  },
  { 
    key: 'sub3',
    icon: React.createElement(SnippetsOutlined),
    label: 'Planificacion',
    children: [
      { key: '7', label: 'Aulas' }, 
      { key: '8', label: 'Cursos' }, 
      { key: '9', label: 'Horarios' }
    ]
  },
  {
    key: 'sub4',
    icon: React.createElement(FolderAddOutlined),
    label: 'Registro',
    children: [
      { key: '10', label: 'Notas' },
      { key: '11', label: 'Asistencias' },
    ]
  },
  {
    key: 'sub5',
    icon: React.createElement(PieChartOutlined),
    label: 'Caja',
    children: [
      { key: '12', label: 'Pagos' },
      { key: '13', label: 'Caja' },
      { key: '14', label: 'Control estudiantes' }
    ]
  },
  {
    key: 'sub6',
    icon: React.createElement(NotificationOutlined),
    label: 'Reportes',
    children: [
      { key: '15', label: 'Notas' },
      { key: '16', label: 'Pagos' },
      { key: '17', label: 'Asistencias' }
    ]
  }
];

export default sidebarItems;
