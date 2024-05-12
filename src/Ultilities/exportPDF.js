import { jsPDF } from "jspdf";
import "jspdf-autotable";

export const exportPDF = (data = [], dirfile) => {
  const doc = new jsPDF();

  const cols = Object.keys(data[0]);
  console.log("col", cols);

  const rows = data.map((item) => {
    const rowvalues = [];
    for (let i = 0; i < cols.length; i++) {
      rowvalues.push(item[cols[i]]);
    }
    return [...rowvalues];
  });

  //   const x = 15;
  const y = 20;

  doc.autoTable({
    head: [cols],
    body: rows,
    startY: y,
    margin: { top: 20 },
    headStyles: { fillColor: [41, 128, 185], textColor: 255, halign: "center" },
    bodyStyles: { halign: "center" },
    alternateRowStyles: { fillColor: [225, 225, 225] },
    columnStyles: { 0: { halign: "left" } },
    didParseCell: (data) => {
      if (data.section === "head") {
        data.cell.styles.fontSize = 12;
        data.cell.styles.fontStyle = "bold";
      } else {
        data.cell.styles.fontSize = 10;
      }
    },
  });

  doc.save(dirfile);
};
