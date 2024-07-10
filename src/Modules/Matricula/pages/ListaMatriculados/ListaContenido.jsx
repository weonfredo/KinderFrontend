import React, { useEffect, useState } from "react";
import { Avatar, List, Skeleton, Pagination, Button } from "antd";
import { ManOutlined, WomanOutlined } from "@ant-design/icons";
import ModalEditar from "./ModalEditar";
import tokenItem from "../../../../utils/TokenItem";

const countPerPage = 3; // Número de elementos por página

const ListaContenido = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
  const [modalVisible, setModalVisible] = useState(false); // Estado para mostrar/ocultar el modal
  const [selectedAlumno, setSelectedAlumno] = useState(null); // Estado para almacenar el alumno seleccionado

  useEffect(() => {
    tokenItem
      .get("/alumno/todos")
      .then((response) => {
        setInitLoading(false);
        setData(response.data);
        setList(response.data.slice(0, countPerPage)); // Mostrar la primera página inicialmente
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setInitLoading(false);
      });
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const startIndex = (page - 1) * countPerPage;
    const endIndex = startIndex + countPerPage;
    setList(data.slice(startIndex, endIndex)); // Actualizar la lista según la página seleccionada
  };

  const handleEditar = (alumno) => {
    setSelectedAlumno(alumno); // Almacenar el alumno seleccionado para editar
    setModalVisible(true); // Mostrar el modal de edición
  };

  const handleModalCancel = () => {
    setModalVisible(false); // Ocultar el modal de edición
  };

  return (
    <div>
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                key={`edit-${item.id}`}
                type="primary"
                onClick={() => handleEditar(item)}
              >
                Editar
              </Button>,
              <Button key={`more-${item.id}`}>Eliminar</Button>,
            ]}
          >
            <Skeleton avatar title={false} loading={initLoading} active>
              <List.Item.Meta
                avatar={
                  <Avatar
                    icon={
                      item.sexo === "M" ? <ManOutlined /> : <WomanOutlined />
                    }
                    src={
                      item.foto ? `data:image/jpeg;base64,${item.foto}` : null
                    } // Asegúrate de cómo recibes y manejas la imagen
                  />
                }
                title={
                  <a
                    href={`https://ant.design/${item.dni}`}
                  >{`${item.nombres} ${item.apellidos}`}</a>
                }
                description={
                  <div className="grid grid-flow-col-dense">
                    <div>DNI: {item.dni}</div>
                    <div>Grado: {item.aula.grado.nombre}</div>
                    <div>Sección: {item.aula.seccion.nombre}</div>
                    <div>Aula: {item.aula.nombre}</div>
                    <div>Apoderado: {item.apoderado.nombres}</div>
                  </div>
                }
              />
            </Skeleton>
          </List.Item>
        )}
      />

      <Pagination
        style={{ textAlign: "center", marginTop: 16 }}
        current={currentPage}
        pageSize={countPerPage}
        total={data.length}
        onChange={handlePageChange}
      />

      {/* Modal para editar alumno */}
      {selectedAlumno && (
        <ModalEditar
          visible={modalVisible}
          onCancel={handleModalCancel}
          alumno={selectedAlumno} // Pasar el alumno seleccionado al modal
        />
      )}
    </div>
  );
};

export default ListaContenido;
