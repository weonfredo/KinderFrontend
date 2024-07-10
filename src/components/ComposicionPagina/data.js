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
      { key: '1', label: 'Permisos', to: '/permisos' },
      { key: '2', label: 'Modulos', to: '/modulos' },
      { key: '3', label: 'Usuarios', to: '/usuarios' },
      { key: '4', label: 'Pefiles', to: '/perfiles' },
    ]
  },
  {
    key: 'sub3',
    icon: React.createElement(FormOutlined),
    label: 'Matriculas',
    children: [
      { key: '5', label: 'Inscribir Alumno', to: '/inscribiralumno' },
      { key: '6', label: 'Inscribir Apoderado', to: '/inscribirapoderado' },
      { key: '7', label: 'Lista Matriculado', to: '/listamatricula' },
    ]
  },
  { 
    key: 'sub4',
    icon: React.createElement(SnippetsOutlined),
    label: 'Planificacion',
    children: [
      { key: '8', label: 'Aulas', to: '/aulas' }, 
      { key: '9', label: 'Cursos', to: '/cursos' }, 
      { key: '10', label: 'Horarios', to: '/horarios' }
    ]
  },
  {
    key: 'sub5',
    icon: React.createElement(FolderAddOutlined),
    label: 'Registro',
    children: [
<<<<<<< HEAD
      { key: '10', label: 'Notas', to: '/seleccionnota' },
      { key: '11', label: 'Asistencias', to: '/seleccionasistencia' },
=======
      { key: '11', label: 'Notas', to: '/notas' },
      { key: '12', label: 'Asistencias', to: '/asistencias' },
>>>>>>> 3a8e8455969866297ae8d624001f66edb21478b5
    ]
  },
  {
    key: 'sub6',
    icon: React.createElement(PieChartOutlined),
    label: 'Caja',
    children: [
      { key: '13', label: 'Pagos', to: '/pagos' },
      { key: '14', label: 'Caja', to: '/caja' },
      { key: '15', label: 'Control estudiantes', to: '/controlestudiantes' }
    ]
  },
  {
    key: 'sub7',
    icon: React.createElement(NotificationOutlined),
    label: 'Reportes',
    children: [
<<<<<<< HEAD
      { key: '15', label: 'Reporte Notas', to: '/reportesnotas' },
      { key: '16', label: 'Reporte Pagos', to: '/payment-reports' },
      { key: '17', label: 'Asistencias', to: '/reportesasistencia' }
=======
      { key: '16', label: 'Notas', to: '/reportesnotas' },
      { key: '17', label: 'Pagos', to: '/reportespagos' },
      { key: '18', label: 'Asistencias', to: '/reportesasistencia' }
>>>>>>> 3a8e8455969866297ae8d624001f66edb21478b5
    ]
  }
];

export default sidebarItems;
