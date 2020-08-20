import moment from "moment-twitter";

const parseDate = (createdAt) => {
  let t = createdAt;
  t = new Date(t);

  let copyT = String(t);
  copyT = copyT.split(" ");

  t = Date.parse(t);
  t = Date.now() - t;

  let d = moment(moment() + t)
    .twitterShort()
    .split("");

  return d.slice(-1)[0] === "m" ||
    d.slice(-1)[0] === "s" ||
    (d[1] === "d" && d[0] <= 6)
    ? moment(moment() + t).twitterShort()
    : copyT[2] + " " + copyT[1];
};

export default parseDate;
