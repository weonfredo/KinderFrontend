import React, { useEffect } from "react";
import PageLayout from "../../../../components/ComposicionPagina";

function PaginaPrincipal() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);
  }, []);

  return (
    <PageLayout>
      <h2>holaaaaaaa</h2>
    </PageLayout>
  );
}

export default PaginaPrincipal;
