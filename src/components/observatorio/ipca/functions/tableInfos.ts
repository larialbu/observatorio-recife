export const tableInfos = (
  data: any,
  type: string,
  setHeaders: any,
  setRows: any
) => {
  let correctData: any[] = [];

  if (type === "table general") {
    correctData = data.data1;
  } else if (type === "table tables") {
    correctData = data.data2;
  } else if (type === "table groups") {
    correctData = data.data3;
  }

  if (type === "table general") {
    setHeaders(Object.keys(correctData[0]));
    setRows(correctData.map((entry: any) => Object.values(entry).map(String)));
  } else if (type === "table groups") {
    setHeaders(Object.keys(correctData[0]));
    setRows(correctData.map((entry: any) => Object.values(entry).map(String)));
  } else if (type === "table tables") {
    setHeaders(Object.keys(correctData[0]));
    setRows(correctData.map((entry: any) => Object.values(entry).map(String)));
  }
};
