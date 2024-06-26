import React from 'react';
import { SecurityScanOutlined, FormOutlined, NotificationOutlined ,PieChartOutlined,FolderAddOutlined,SnippetsOutlined,HomeOutlined } from '@ant-design/icons';

const sidebarItems = [
  {
    key: 'sub1',
    icon: React.createElement(HomeOutlined),
    label: 'Pagina Principal',
    to: '/home'
  },
  {
    key: 'sub2',
    icon: React.createElement(SecurityScanOutlined),
    label: 'Seguridad',
    children: [
      { key: '1', label: 'Permisos', to: '/permissions' },
      { key: '2', label: 'Modulos', to: '/modules' },
      { key: '3', label: 'Usuarios', to: '/users' },
      { key: '4', label: 'Pefiles', to: '/profiles' },
    ]
  },
  {
    key: 'sub3',
    icon: React.createElement(FormOutlined),
    label: 'Matriculas',
    children: [
      { key: '5', label: 'Inscribir alumno', to: '/inscribiralumno' },
      { key: '6', label: 'Lista Matriculado', to: '/enrolled-list' },
    ]
  },
  { 
    key: 'sub4',
    icon: React.createElement(SnippetsOutlined),
    label: 'Planificacion',
    children: [
      { key: '7', label: 'Aulas', to: '/classrooms' }, 
      { key: '8', label: 'Cursos', to: '/courses' }, 
      { key: '9', label: 'Horarios', to: '/schedules' }
    ]
  },
  {
    key: 'sub5',
    icon: React.createElement(FolderAddOutlined),
    label: 'Registro',
    children: [
      { key: '10', label: 'Notas', to: '/grades' },
      { key: '11', label: 'Asistencias', to: '/attendances' },
    ]
  },
  {
    key: 'sub6',
    icon: React.createElement(PieChartOutlined),
    label: 'Caja',
    children: [
      { key: '12', label: 'Pagos', to: '/pagos' },
      { key: '13', label: 'Caja', to: '/caja' },
      { key: '14', label: 'Control estudiantes', to: '/controlestudiantes' }
    ]
  },
  {
    key: 'sub7',
    icon: React.createElement(NotificationOutlined),
    label: 'Reportes',
    children: [
      { key: '15', label: 'Notas', to: '/reportesnotas' },
      { key: '16', label: 'Pagos', to: '/payment-reports' },
      { key: '17', label: 'Asistencias', to: '/reportesasistencia' }
    ]
  }
];

export default sidebarItems;
