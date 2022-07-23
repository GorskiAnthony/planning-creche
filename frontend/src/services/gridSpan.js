const getSpanGridRow = (event) => {
  const start = parseInt(event.timeStart.split(":")[0]);
  const end = parseInt(event.timeEnd.split(":")[0]);
  return end - start;
};

const getSpanGridStart = (event) => {
  const start = parseInt(event.timeStart.split(":")[0]);
  return start - 6;
};

export { getSpanGridRow, getSpanGridStart };
