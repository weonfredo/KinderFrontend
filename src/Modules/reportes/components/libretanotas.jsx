import React, { useRef } from "react";
import PageLayout from "../../../components/ComposicionPagina/Layout";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function Libreta() {
  const contentRef = useRef();
  const buttonRef = useRef();

  const exportPDF = async () => {
    const element = contentRef.current;
    const button = buttonRef.current;

    // Ocultar el botón antes de generar el PDF
    button.style.display = 'none';

    // Ajustar las opciones de html2canvas
    const canvas = await html2canvas(element, {
      scrollX: -window.scrollX,
      scrollY: -window.scrollY,
      windowWidth: document.documentElement.offsetWidth,
      windowHeight: document.documentElement.offsetHeight,
    });

    // Volver a mostrar el botón después de generar el PDF
    button.style.display = 'block';

    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4'
    });

    const imgWidth = 595.28;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const pdfHeight = pdf.internal.pageSize.height;
    let heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save('libreta.pdf');
  };

  return (
    <PageLayout>
      <div className="p-4" ref={contentRef}>
        <div className="flex justify-between items-center mb-4">
          <img
            src="https://placehold.co/100x100"
            alt="Logo 1"
            className="w-24 h-24"
          />
          <div className="text-center">
            <h1 className="text-lg font-bold">
              INFORME DE PROGRESO DEL APRENDIZAJE DEL ESTUDIANTE - 2024
            </h1>
          </div>
          <img
            src="https://placehold.co/100x100"
            alt="Logo 2"
            className="w-24 h-24"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <table className="w-full border-collapse border border-black mb-4">
            <tbody>
              <tr>
                <td className="border border-black p-2 bg-gray-300">DRE:</td>
                <td className="border border-black p-2">DRE Puno</td>
                <td className="border border-black p-2 bg-gray-300">UGEL:</td>
                <td className="border border-black p-2">UGEL Huancané</td>
              </tr>
              <tr>
                <td className="border border-black p-2 bg-gray-300">Nivel:</td>
                <td className="border border-black p-2">Inicial - Jardín</td>
                <td className="border border-black p-2 bg-gray-300">Código Modular:</td>
                <td className="border border-black p-2"></td>
              </tr>
              <tr>
                <td className="border border-black p-2 bg-gray-300">IE o Programa Educativo:</td>
                <td className="border border-black p-2" colSpan="3"></td>
              </tr>
              <tr>
                <td className="border border-black p-2 bg-gray-300">Edad:</td>
                <td className="border border-black p-2">4 años</td>
                <td className="border border-black p-2 bg-gray-300">Sección:</td>
                <td className="border border-black p-2"></td>
              </tr>
              <tr>
                <td className="border border-black p-2 bg-gray-300">Apellidos y nombres del estudiante:</td>
                <td className="border border-black p-2" colSpan="3"></td>
              </tr>
              <tr>
                <td className="border border-black p-2 bg-gray-300">Código del estudiante:</td>
                <td className="border border-black p-2"></td>
                <td className="border border-black p-2 bg-gray-300">DNI:</td>
                <td className="border border-black p-2"></td>
              </tr>
              <tr>
                <td className="border border-black p-2 bg-gray-300">Apellidos y nombres del profesor:</td>
                <td className="border border-black p-2" colSpan="3"></td>
              </tr>
            </tbody>
          </table>

          <table className="w-full border-collapse border border-black">
            <thead>
              <tr>
                <th className="border border-black p-2">Periodo</th>
                <th className="border border-black p-2">Competencia</th>
                <th className="border border-black p-2">Conclusión descriptiva</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black p-2"></td>
                <td className="border border-black p-2"></td>
                <td className="border border-black p-2"></td>
              </tr>
              <tr>
                <td className="border border-black p-2"></td>
                <td className="border border-black p-2"></td>
                <td className="border border-black p-2"></td>
              </tr>
              <tr>
                <td className="border border-black p-2"></td>
                <td className="border border-black p-2"></td>
                <td className="border border-black p-2"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <table className="w-full border-collapse border border-black mb-4">
          <thead>
            <tr>
              <th className="border border-black p-2" rowSpan={2}>ÁREA CURRICULAR</th>
              <th className="border border-black p-2" rowSpan={2}>COMPETENCIAS</th>
              <th className="border border-black p-2" colSpan={4}>CALIFICATIVO POR PERIODO</th>
              <th className="border border-black p-2" rowSpan={2}>Calif. anual de Comp.</th>
              <th className="border border-black p-2" rowSpan={2}>Calif. anual de área</th>
              <th className="border border-black p-2" rowSpan={2}>Conclusión descriptiva de final del periodo lectivo</th>
            </tr>
            <tr>
              <th className="border border-black p-2">1</th>
              <th className="border border-black p-2">2</th>
              <th className="border border-black p-2">3</th>
              <th className="border border-black p-2">4</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black p-2" rowSpan={3}>Personal Social</td>
              <td className="border border-black p-2">Construye su identidad.</td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2" rowSpan={3}></td>
              <td className="border border-black p-2" rowSpan={3}></td>
            </tr>
            <tr>
              <td className="border border-black p-2">Convive y participa democráticamente en la búsqueda del bien común.</td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
            </tr>
            <tr>
              <td className="border border-black p-2">Construye su identidad, como persona humana, amada por Dios, digna, libre y trascendente, comprendiendo la doctrina de su propia religión, abierto al diálogo con las que le son cercanas.</td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
            </tr>
            <tr>
              <td className="border border-black p-2" rowSpan={4}>Comunicación</td>
              <td className="border border-black p-2">Se comunica oralmente en su lengua materna.</td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2" rowSpan={4}></td>
              <td className="border border-black p-2" rowSpan={4}></td>
            </tr>
            <tr>
              <td className="border border-black p-2">Lee diversos tipos de texto en su lengua materna.</td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
            </tr>
            <tr>
              <td className="border border-black p-2">Escribe diversos tipos de texto en su lengua materna.</td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
            </tr>
            <tr>
              <td className="border border-black p-2">Se comunica oralmente en inglés como lengua extranjera.</td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
            </tr>
            <tr>
              <td className="border border-black p-2" rowSpan={3}>Educación Religiosa</td>
              <td className="border border-black p-2">Asume la vida como un don de Dios poniéndola al servicio de los demás.</td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2" rowSpan={3}></td>
              <td className="border border-black p-2" rowSpan={3}></td>
            </tr>
            <tr>
              <td className="border border-black p-2">Vive su fe con alegría y muestra de ello es su amor a Dios y al prójimo.</td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
            </tr>
            <tr>
              <td className="border border-black p-2">Anuncia a Jesús como la buena noticia para la vida de toda persona.</td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
            </tr>
            <tr>
              <td className="border border-black p-2" rowSpan={3}>Ciencia y Tecnología</td>
              <td className="border border-black p-2">Indaga mediante métodos científicos para construir sus conocimientos.</td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2" rowSpan={3}></td>
              <td className="border border-black p-2" rowSpan={3}></td>
            </tr>
            <tr>
              <td className="border border-black p-2">Explica el mundo físico basándose en conocimientos sobre los seres vivos, materia y energía, biodiversidad, Tierra y universo.</td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
            </tr>
            <tr>
              <td className="border border-black p-2">Diseña y construye soluciones tecnológicas para resolver problemas de su entorno.</td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
            </tr>
          </tbody>
        </table>
        <table className="w-full border-collapse border border-black mb-4">
          <thead>
            <tr>
              <th className="border border-black p-2">Periodo</th>
              <th className="border border-black p-2">Inasistencias</th>
              <th className="border border-black p-2">Tardanzas</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black p-2">1</td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
            </tr>
            <tr>
              <td className="border border-black p-2">2</td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
            </tr>
            <tr>
              <td className="border border-black p-2">3</td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
            </tr>
            <tr>
              <td className="border border-black p-2">4</td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
            </tr>
          </tbody>
        </table>

        <table className="w-full border-collapse border border-black mb-4">
          <thead>
            <tr>
              <th className="border border-black p-2">ESCALA DE CALIFICACIONES DEL CNEB</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black p-2">AD - Logro destacado</td>
            </tr>
            <tr>
              <td className="border border-black p-2">A - Logro esperado</td>
            </tr>
            <tr>
              <td className="border border-black p-2">B - En proceso</td>
            </tr>
            <tr>
              <td className="border border-black p-2">C - En inicio</td>
            </tr>
          </tbody>
        </table>

        <div className="flex flex-col items-center mb-4">
          <h2 className="text-lg font-bold">Firmas:</h2>
          <div className="flex w-full justify-around">
            <div className="text-center">
              <p>_________________________</p>
              <p>Director</p>
            </div>
            <div className="text-center">
              <p>_________________________</p>
              <p>Docente</p>
            </div>
          
          </div>
        </div>

    

        <div className="flex justify-center mt-4">
        <button ref={buttonRef} onClick={exportPDF} className="bg-blue-500 text-white px-4 py-2 rounded">Exportar a PDF</button>
        </div>
      </div>
    </PageLayout>
  );
}
