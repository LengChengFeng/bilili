import moment from "moment";
function formatDate(time: any, type = "mm:ss") {
  return moment(time).format(type);
}
export default formatDate;
