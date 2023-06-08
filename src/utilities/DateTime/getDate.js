export function getCurrentDMY() {
  const currentDate = new Date();

  // Lấy ngày, tháng, năm hiện tại
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0, nên cần +1
  const year = currentDate.getFullYear();

  // Định dạng chuỗi "dd/mm/YYYY"
  if (day < 10) {
    day = `0${day}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }
  return `${day}-${month}-${year}`;
}

export function getCurrentYMD() {
  const currentDate = new Date();

  // Lấy ngày, tháng, năm hiện tại
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0, nên cần +1
  const year = currentDate.getFullYear();

  // Định dạng chuỗi "dd/mm/YYYY"
  if (day < 10) {
    day = `0${day}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }
  return `${year}-${month}-${day}`;
}
