import * as XLSX from "xlsx";

export const importFromExcel = (dirfile) => {
  const workbook = XLSX.readFile(dirfile);
  const sheet_name_list = workbook.SheetNames;
  const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  console.log(data);
};
