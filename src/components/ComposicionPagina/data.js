import React from 'react';
import { SecurityScanOutlined,GlobalOutlined, FormOutlined, NotificationOutlined ,PieChartOutlined,FolderAddOutlined,SnippetsOutlined,HomeOutlined } from '@ant-design/icons';

const sidebarItems = [
  {
    key: 'sub1',
    icon: React.createElement(HomeOutlined),
    label: 'Pagina Principal',
    to: '/home'
  },
  {
    key: 'sub2',
    icon: React.createElement(GlobalOutlined),
    label: 'Administrador',
    children: [
      { key: '1', label: 'Establecimiento', to: '/establecimiento' },
      { key: '2', label: 'Sucursal', to: '/sucursal' },
    ]
  },
  {
    key: 'sub3',
    icon: React.createElement(SecurityScanOutlined),
    label: 'Seguridad',
    children: [
      { key: '3', label: 'Permisos', to: '/permisos' },
      { key: '4', label: 'Modulos', to: '/modulos' },
      { key: '5', label: 'Usuarios', to: '/usuarios' },
      { key: '6', label: 'Pefiles', to: '/perfiles' },
      { key: '7', label: 'Crear Caja', to: '/crearcaja' },
    ]
  },
  {
    key: 'sub4',
    icon: React.createElement(FormOutlined),
    label: 'Matriculas',
    children: [
      { key: '8', label: 'Inscribir Alumno', to: '/inscribiralumno' },
      { key: '9', label: 'Inscribir Apoderado', to: '/inscribirapoderado' },
      { key: '10', label: 'Lista Matriculado', to: '/listamatricula' },
    ]
  },
  { 
    key: 'sub5',
    icon: React.createElement(SnippetsOutlined),
    label: 'Planificacion',
    children: [
      { key: '11', label: 'Aulas', to: '/aulas' }, 
      { key: '12', label: 'Cursos', to: '/cursos' }, 
      { key: '13', label: 'Horarios', to: '/horarios' }
    ]
  },
  {
    key: 'sub6',
    icon: React.createElement(FolderAddOutlined),
    label: 'Registro',
    children: [

      { key: '14', label: 'Notas', to: '/notas' },
      { key: '15', label: 'Asistencias', to: '/asistencias' },

    ]
  },
  {
    key: 'sub7',
    icon: React.createElement(PieChartOutlined),
    label: 'Caja',
    children: [
      { key: '16', label: 'Pagos', to: '/pagos' },
      { key: '17', label: 'Caja', to: '/caja' },
      { key: '18', label: 'Control estudiantes', to: '/controlestudiantes' }
    ]
  },
  {
    key: 'sub8',
    icon: React.createElement(NotificationOutlined),
    label: 'Reportes',
    children: [
      { key: '19', label: 'Notas', to: '/reportesnotas' },
      { key: '20', label: 'Pagos', to: '/reportespagos' },
      { key: '21', label: 'Asistencias', to: '/reportesasistencia' }

    ]
  }
];

export default sidebarItems;
