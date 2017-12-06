export default function(userIp, yamsaferIps = process.env.YAMSAFER_IPS) {
  if (!yamsaferIps) {
    return false;
  }
  return (
    yamsaferIps
      .split(',')
      .map(ip => ip.trim())
      .indexOf(userIp) >= 0
  );
}
