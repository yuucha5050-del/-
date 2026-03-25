import { useState, useMemo, useCallback, useEffect } from "react";

// ======== Supabase設定 ========
// ⬇️ あなたのSupabaseプロジェクト情報に書き換えてください
const SUPA_URL = "https://rguztestgadxbtnzgiux.supabase.co"; // 例: https://abc123.supabase.co
const SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJndXp0ZXN0Z2FkeGJ0bnpnaXV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0MTUxMzEsImV4cCI6MjA4OTk5MTEzMX0.dy9EwoMXL14QhJKggXkG2XLXELLVk8V8dj8VItG_ewY"; // 例: eyJhbGci...
const SUPA_ON = SUPA_URL !== "YOUR_SUPABASE_URL"; // 設定済みなら自動でON

function supaFetch(path, opt) {
  if (!SUPA_ON) return Promise.resolve({ ok: false });
  return fetch(SUPA_URL + "/rest/v1/" + path, Object.assign({
    headers: { "apikey": SUPA_KEY, "Authorization": "Bearer " + SUPA_KEY, "Content-Type": "application/json", "Prefer": opt && opt.method === "POST" ? "return=minimal,resolution=merge-duplicates" : "" }
  }, opt)).catch(function() { return { ok: false }; });
}
async function supaGetMini() {
  try {
    var res = await supaFetch("miniloto_draws?select=*&order=round.desc&limit=1500");
    if (!res.ok) return null;
    var rows = await res.json();
    return rows.map(function(r) { return [r.round, r.draw_date || "", [r.n1, r.n2, r.n3, r.n4, r.n5].sort(function(a, b) { return a - b; }), [r.bonus]]; });
  } catch (e) { return null; }
}
async function supaAddMini(rd, dt, nums, bonus) {
  try {
    var body = { round: rd, draw_date: dt, n1: nums[0], n2: nums[1], n3: nums[2], n4: nums[3], n5: nums[4], bonus: bonus[0] };
    var res = await supaFetch("miniloto_draws", { method: "POST", body: JSON.stringify(body) });
    return res.ok || res.status === 409;
  } catch (e) { return false; }
}
// ======== Supabase設定ここまで ========

const CFG = { name:"MINI LOTO", total:31, pick:5, bc:1, prob:"1/169,911", prize:"約1000万円", sch:"毎週火曜" };



const DM = [
[1378,"2026/03/17",[4, 15, 18, 30, 31],[23]],
[1377,"2026/03/10",[3, 13, 19, 29, 31],[30]],
[1376,"2026/03/03",[1, 9, 11, 22, 29],[3]],
[1375,"2026/02/24",[1, 3, 11, 16, 20],[4]],
[1374,"2026/02/17",[10, 16, 21, 29, 30],[20]],
[1373,"2026/02/10",[7, 8, 21, 28, 29],[26]],
[1372,"2026/02/03",[4, 14, 21, 24, 31],[5]],
[1371,"2026/01/27",[3, 10, 12, 20, 31],[11]],
[1370,"2026/01/20",[1, 5, 12, 24, 31],[21]],
[1369,"2026/01/13",[1, 2, 3, 5, 11],[26]],
[1368,"2026/01/06",[7, 8, 20, 25, 26],[24]],
[1367,"2025/12/30",[17, 21, 27, 28, 29],[2]],
[1366,"2025/12/23",[3, 19, 20, 21, 28],[13]],
[1365,"2025/12/16",[3, 10, 20, 25, 27],[24]],
[1364,"2025/12/09",[1, 3, 10, 27, 31],[19]],
[1363,"2025/12/02",[6, 12, 16, 19, 31],[25]],
[1362,"2025/11/25",[6, 12, 13, 17, 26],[18]],
[1361,"2025/11/18",[20, 25, 26, 27, 30],[13]],
[1360,"2025/11/11",[4, 18, 20, 24, 29],[31]],
[1359,"2025/11/04",[1, 3, 15, 16, 20],[13]],
[1358,"2025/10/28",[1, 6, 22, 27, 29],[28]],
[1357,"2025/10/21",[7, 9, 21, 25, 28],[15]],
[1356,"2025/10/14",[6, 7, 20, 22, 24],[5]],
[1355,"2025/10/07",[3, 6, 10, 23, 27],[15]],
[1354,"2025/09/30",[11, 13, 15, 16, 26],[2]],
[1353,"2025/09/23",[6, 11, 13, 14, 18],[5]],
[1352,"2025/09/16",[5, 8, 10, 11, 29],[27]],
[1351,"2025/09/09",[4, 9, 10, 19, 29],[6]],
[1350,"2025/09/02",[2, 3, 11, 22, 28],[15]],
[1349,"2025/08/26",[2, 3, 15, 28, 29],[20]],
[1348,"2025/08/19",[4, 16, 20, 26, 28],[29]],
[1347,"2025/08/12",[4, 16, 18, 27, 31],[24]],
[1346,"2025/08/05",[5, 16, 20, 23, 30],[2]],
[1345,"2025/07/29",[3, 11, 14, 30, 31],[28]],
[1344,"2025/07/22",[2, 5, 21, 24, 28],[12]],
[1343,"2025/07/15",[4, 13, 22, 29, 30],[9]],
[1342,"2025/07/08",[1, 9, 13, 19, 23],[11]],
[1341,"2025/07/01",[5, 12, 16, 24, 28],[31]],
[1340,"2025/06/24",[8, 19, 22, 24, 27],[25]],
[1339,"2025/06/17",[6, 14, 21, 23, 31],[22]],
[1338,"2025/06/10",[13, 18, 21, 28, 31],[11]],
[1337,"2025/06/03",[3, 11, 17, 20, 22],[14]],
[1336,"2025/05/27",[3, 20, 21, 24, 25],[26]],
[1335,"2025/05/20",[12, 17, 18, 22, 31],[30]],
[1334,"2025/05/13",[3, 8, 21, 27, 29],[16]],
[1333,"2025/05/06",[7, 11, 18, 25, 26],[6]],
[1332,"2025/04/29",[12, 16, 17, 20, 25],[28]],
[1331,"2025/04/22",[9, 11, 13, 27, 28],[16]],
[1330,"2025/04/15",[1, 13, 24, 25, 31],[11]],
[1329,"2025/04/08",[5, 6, 8, 21, 30],[23]],
[1328,"2025/04/01",[1, 12, 15, 27, 31],[18]],
[1327,"2025/03/25",[4, 9, 26, 27, 29],[16]],
[1326,"2025/03/18",[4, 9, 15, 19, 26],[3]],
[1325,"2025/03/11",[10, 15, 22, 23, 25],[13]],
[1324,"2025/03/04",[5, 6, 14, 20, 27],[1]],
[1323,"2025/02/25",[4, 9, 18, 24, 25],[15]],
[1322,"2025/02/18",[5, 16, 18, 22, 28],[6]],
[1321,"2025/02/11",[1, 5, 6, 24, 25],[11]],
[1320,"2025/02/04",[2, 3, 7, 25, 28],[4]],
[1319,"2025/01/28",[4, 6, 16, 26, 29],[31]],
[1318,"2025/01/21",[5, 7, 15, 24, 29],[12]],
[1317,"2025/01/14",[7, 22, 26, 30, 31],[11]],
[1316,"2025/01/07",[4, 7, 10, 11, 17],[23]],
[1315,"2024/12/24",[6, 15, 22, 29, 30],[13]],
[1314,"2024/12/17",[18, 20, 21, 23, 30],[25]],
[1313,"2024/12/10",[2, 5, 9, 22, 31],[15]],
[1312,"2024/12/03",[10, 12, 13, 21, 31],[23]],
[1311,"2024/11/26",[3, 11, 27, 28, 31],[26]],
[1310,"2024/11/19",[13, 14, 19, 24, 28],[3]],
[1309,"2024/11/12",[6, 12, 25, 27, 29],[22]],
[1308,"2024/11/05",[3, 8, 12, 16, 22],[29]],
[1307,"2024/10/29",[11, 13, 16, 18, 20],[19]],
[1306,"2024/10/22",[5, 7, 27, 28, 29],[16]],
[1305,"2024/10/15",[7, 12, 14, 29, 30],[4]],
[1304,"2024/10/08",[3, 4, 6, 20, 31],[2]],
[1303,"2024/10/01",[7, 14, 17, 30, 31],[22]],
[1302,"2024/09/24",[6, 11, 12, 17, 24],[4]],
[1301,"2024/09/17",[13, 15, 25, 26, 27],[17]],
[1300,"2024/09/10",[1, 4, 16, 27, 31],[15]],
[1299,"2024/09/03",[3, 4, 9, 11, 18],[7]],
[1298,"2024/08/27",[2, 4, 12, 13, 17],[29]],
[1297,"2024/08/20",[1, 12, 17, 21, 28],[31]],
[1296,"2024/08/13",[9, 13, 18, 19, 21],[6]],
[1295,"2024/08/06",[4, 11, 12, 21, 26],[28]],
[1294,"2024/07/30",[8, 21, 22, 27, 29],[1]],
[1293,"2024/07/23",[6, 8, 10, 20, 28],[15]],
[1292,"2024/07/16",[6, 11, 21, 23, 25],[27]],
[1291,"2024/07/09",[1, 2, 8, 11, 29],[19]],
[1290,"2024/07/02",[21, 26, 27, 29, 31],[7]],
[1289,"2024/06/25",[17, 18, 21, 27, 30],[3]],
[1288,"2024/06/18",[4, 12, 14, 16, 22],[8]],
[1287,"2024/06/11",[10, 12, 23, 26, 30],[22]],
[1286,"2024/06/04",[9, 10, 12, 13, 30],[25]],
[1285,"2024/05/28",[4, 5, 18, 23, 25],[11]],
[1284,"2024/05/21",[4, 11, 23, 28, 31],[22]],
[1283,"2024/05/14",[1, 11, 25, 29, 31],[3]],
[1282,"2024/05/07",[2, 22, 23, 30, 31],[29]],
[1281,"2024/04/30",[4, 10, 15, 18, 24],[5]],
[1280,"2024/04/23",[7, 9, 14, 17, 20],[13]],
[1279,"2024/04/16",[1, 14, 18, 22, 28],[26]],
[1277,"2024/04/02",[2, 13, 18, 22, 28],[30]],
[1276,"2024/03/26",[4, 9, 13, 16, 31],[27]],
[1275,"2024/03/19",[6, 11, 12, 13, 14],[5]],
[1274,"2024/03/12",[1, 7, 8, 10, 14],[18]],
[1273,"2024/03/05",[7, 18, 20, 22, 23],[5]],
[1272,"2024/02/27",[3, 7, 14, 21, 30],[13]],
[1271,"2024/02/20",[16, 17, 19, 22, 23],[24]],
[1270,"2024/02/13",[2, 7, 16, 19, 26],[20]],
[1269,"2024/02/06",[5, 10, 16, 20, 21],[14]],
[1268,"2024/01/30",[9, 11, 14, 22, 29],[31]],
[1267,"2024/01/23",[13, 15, 18, 20, 29],[17]],
[1266,"2024/01/16",[1, 16, 22, 23, 31],[18]],
[1265,"2024/01/09",[8, 9, 11, 15, 31],[17]],
[1264,"2023/12/26",[2, 7, 10, 22, 27],[24]],
[1263,"2023/12/19",[1, 2, 15, 25, 28],[5]],
[1262,"2023/12/12",[11, 16, 18, 19, 29],[31]],
[1261,"2023/12/05",[19, 21, 25, 29, 31],[7]],
[1260,"2023/11/28",[2, 4, 14, 21, 29],[12]],
[1259,"2023/11/21",[1, 13, 17, 18, 22],[25]],
[1258,"2023/11/14",[3, 6, 12, 19, 30],[13]],
[1257,"2023/11/07",[8, 13, 19, 22, 24],[21]],
[1256,"2023/10/31",[7, 8, 14, 19, 21],[23]],
[1255,"2023/10/24",[2, 3, 4, 17, 23],[12]],
[1254,"2023/10/17",[1, 5, 12, 17, 28],[14]],
[1253,"2023/10/10",[1, 11, 17, 19, 25],[28]],
[1252,"2023/10/03",[1, 4, 11, 25, 30],[10]],
[1251,"2023/09/26",[3, 4, 5, 30, 31],[17]],
[1250,"2023/09/19",[2, 12, 13, 19, 23],[27]],
[1249,"2023/09/12",[7, 9, 11, 14, 21],[27]],
[1248,"2023/09/05",[2, 4, 5, 14, 25],[24]],
[1247,"2023/08/29",[9, 15, 23, 26, 30],[19]],
[1246,"2023/08/22",[16, 17, 20, 21, 28],[18]],
[1245,"2023/08/15",[10, 11, 16, 29, 30],[19]],
[1244,"2023/08/08",[2, 6, 9, 11, 19],[22]],
[1243,"2023/08/01",[2, 4, 13, 15, 20],[24]],
[1242,"2023/07/25",[7, 8, 13, 27, 28],[6]],
[1241,"2023/07/18",[6, 8, 17, 22, 28],[14]],
[1240,"2023/07/11",[3, 8, 10, 19, 22],[20]],
[1239,"2023/07/04",[1, 6, 10, 17, 24],[18]],
[1238,"2023/06/27",[10, 13, 17, 19, 21],[3]],
[1237,"2023/06/20",[2, 9, 10, 25, 31],[18]],
[1236,"2023/06/13",[1, 18, 19, 30, 31],[29]],
[1235,"2023/06/06",[8, 12, 17, 22, 28],[5]],
[1234,"2023/05/30",[4, 14, 15, 27, 28],[22]],
[1233,"2023/05/23",[3, 8, 17, 19, 23],[22]],
[1232,"2023/05/16",[4, 5, 17, 27, 29],[6]],
[1231,"2023/05/09",[1, 14, 20, 21, 31],[5]],
[1230,"2023/05/02",[4, 18, 21, 22, 23],[28]],
[1229,"2023/04/25",[1, 5, 7, 12, 27],[26]],
[1228,"2023/04/18",[1, 4, 18, 19, 26],[22]],
[1227,"2023/04/11",[1, 5, 11, 20, 26],[14]],
[1226,"2023/04/04",[2, 5, 13, 18, 21],[4]],
[1225,"2023/03/28",[1, 7, 15, 29, 31],[19]],
[1224,"2023/03/21",[1, 5, 8, 11, 22],[14]],
[1223,"2023/03/14",[1, 11, 21, 26, 31],[25]],
[1222,"2023/03/07",[6, 18, 23, 26, 27],[15]],
[1221,"2023/02/28",[6, 11, 15, 22, 25],[10]],
[1220,"2023/02/21",[4, 14, 17, 19, 26],[3]],
[1219,"2023/02/14",[6, 10, 16, 23, 28],[27]],
[1218,"2023/02/07",[5, 6, 8, 10, 18],[12]],
[1217,"2023/01/31",[8, 10, 14, 20, 25],[30]],
[1216,"2023/01/24",[10, 12, 18, 25, 28],[13]],
[1215,"2023/01/17",[1, 2, 3, 5, 20],[6]],
[1214,"2023/01/10",[5, 9, 10, 19, 26],[2]],
[1213,"2022/12/27",[17, 21, 23, 25, 26],[6]],
[1212,"2022/12/20",[14, 19, 23, 30, 31],[26]],
[1211,"2022/12/13",[4, 8, 16, 25, 26],[12]],
[1210,"2022/12/06",[14, 26, 27, 30, 31],[10]],
[1209,"2022/11/29",[12, 14, 17, 27, 28],[29]],
[1208,"2022/11/22",[5, 10, 15, 16, 27],[26]],
[1207,"2022/11/15",[2, 8, 14, 25, 28],[7]],
[1206,"2022/11/08",[7, 9, 12, 14, 30],[19]],
[1205,"2022/11/01",[11, 12, 16, 24, 28],[20]],
[1204,"2022/10/25",[5, 10, 12, 18, 20],[4]],
[1203,"2022/10/18",[4, 7, 8, 12, 19],[23]],
[1202,"2022/10/11",[2, 18, 19, 22, 29],[23]],
[1201,"2022/10/04",[1, 9, 15, 20, 21],[12]],
[1200,"2022/09/27",[6, 9, 18, 27, 28],[22]],
[1199,"2022/09/20",[7, 8, 15, 17, 22],[24]],
[1198,"2022/09/13",[2, 16, 23, 25, 31],[27]],
[1197,"2022/09/06",[7, 9, 17, 26, 27],[24]],
[1196,"2022/08/30",[1, 5, 17, 19, 23],[26]],
[1195,"2022/08/23",[3, 10, 11, 13, 14],[4]],
[1194,"2022/08/16",[3, 5, 7, 18, 20],[30]],
[1193,"2022/08/09",[1, 4, 8, 11, 20],[15]],
[1192,"2022/08/02",[4, 10, 11, 22, 31],[28]],
[1191,"2022/07/26",[11, 16, 20, 25, 26],[7]],
[1190,"2022/07/19",[3, 20, 23, 24, 28],[29]],
[1189,"2022/07/12",[6, 7, 16, 17, 22],[9]],
[1188,"2022/07/05",[2, 25, 26, 29, 31],[6]],
[1187,"2022/06/28",[3, 5, 6, 11, 23],[16]],
[1186,"2022/06/21",[9, 13, 15, 24, 28],[17]],
[1185,"2022/06/14",[1, 14, 16, 17, 22],[4]],
[1184,"2022/06/07",[5, 8, 12, 19, 27],[15]],
[1183,"2022/05/31",[3, 7, 9, 14, 15],[23]],
[1182,"2022/05/24",[3, 5, 22, 27, 31],[17]],
[1181,"2022/05/17",[10, 14, 19, 24, 25],[29]],
[1180,"2022/05/10",[14, 19, 20, 25, 31],[3]],
[1179,"2022/04/26",[7, 9, 12, 14, 22],[18]],
[1161,"2021/12/28",[3, 9, 13, 17, 24],[29]],
[1160,"2021/12/21",[7, 19, 22, 24, 31],[21]],
[1159,"2021/12/14",[11, 12, 14, 18, 31],[6]],
[1158,"2021/12/07",[1, 14, 23, 25, 26],[29]],
[1157,"2021/11/30",[2, 6, 7, 13, 30],[17]],
[1156,"2021/11/23",[1, 3, 14, 27, 30],[7]],
[1155,"2021/11/16",[1, 9, 13, 16, 19],[18]],
[1154,"2021/11/09",[9, 10, 12, 21, 24],[27]],
[1153,"2021/11/02",[17, 25, 27, 29, 30],[15]],
[1152,"2021/10/26",[2, 12, 14, 23, 27],[21]],
[1151,"2021/10/19",[14, 18, 21, 30, 31],[9]],
[1150,"2021/10/12",[1, 10, 13, 27, 29],[14]],
[1149,"2021/10/05",[5, 12, 14, 15, 20],[7]],
[1148,"2021/09/28",[1, 3, 6, 15, 19],[10]],
[1147,"2021/09/21",[6, 8, 23, 27, 29],[21]],
[1146,"2021/09/14",[4, 5, 11, 29, 30],[24]],
[1145,"2021/09/07",[11, 14, 20, 28, 31],[12]],
[1144,"2021/08/31",[4, 11, 14, 21, 30],[27]],
[1143,"2021/08/24",[3, 4, 16, 19, 27],[23]],
[1142,"2021/08/17",[11, 23, 25, 29, 30],[18]],
[1141,"2021/08/10",[9, 12, 17, 18, 27],[22]],
[1140,"2021/08/03",[7, 11, 17, 19, 28],[25]],
[1139,"2021/07/27",[12, 16, 17, 24, 31],[22]],
[1138,"2021/07/20",[14, 20, 23, 28, 29],[27]],
[1137,"2021/07/13",[7, 8, 21, 25, 31],[14]],
[1136,"2021/07/06",[11, 15, 20, 22, 23],[4]],
[1135,"2021/06/29",[7, 19, 21, 23, 28],[24]],
[1134,"2021/06/22",[6, 13, 20, 23, 28],[21]],
[1133,"2021/06/15",[14, 17, 23, 28, 30],[7]],
[1132,"2021/06/08",[3, 4, 14, 15, 18],[5]],
[1131,"2021/06/01",[6, 8, 11, 24, 29],[23]],
[1130,"2021/05/25",[5, 6, 8, 25, 26],[11]],
[1129,"2021/05/18",[5, 9, 16, 29, 30],[12]],
[1128,"2021/05/11",[4, 7, 13, 24, 30],[2]],
[1127,"2021/05/04",[8, 22, 24, 27, 28],[16]],
[1126,"2021/04/27",[6, 8, 20, 30, 31],[25]],
[1125,"2021/04/20",[2, 6, 10, 14, 21],[18]],
[1124,"2021/04/13",[3, 4, 6, 8, 27],[12]],
[1123,"2021/04/06",[7, 17, 26, 28, 29],[24]],
[1122,"2021/03/30",[8, 9, 14, 25, 28],[11]],
[1121,"2021/03/23",[13, 19, 21, 24, 25],[16]],
[1120,"2021/03/16",[2, 10, 11, 17, 31],[26]],
[1119,"2021/03/09",[9, 10, 12, 17, 18],[14]],
[1118,"2021/03/02",[8, 13, 16, 27, 29],[11]],
[1117,"2021/02/23",[4, 13, 22, 27, 30],[19]],
[1116,"2021/02/16",[7, 24, 25, 27, 29],[10]],
[1115,"2021/02/09",[2, 4, 6, 11, 29],[20]],
[1114,"2021/02/02",[7, 18, 21, 25, 26],[12]],
[1113,"2021/01/26",[19, 20, 21, 26, 27],[12]],
[1112,"2021/01/19",[5, 6, 8, 13, 25],[29]],
[1111,"2021/01/12",[2, 3, 4, 13, 31],[29]],
[1110,"2021/01/05",[2, 7, 19, 23, 28],[3]],
[1109,"2020/12/29",[7, 15, 17, 26, 27],[8]],
[1108,"2020/12/22",[6, 10, 14, 17, 19],[27]],
[1107,"2020/12/15",[7, 10, 16, 18, 29],[5]],
[1106,"2020/12/08",[2, 18, 21, 25, 30],[19]],
[1105,"2020/12/01",[4, 11, 16, 21, 26],[9]],
[1104,"2020/11/24",[7, 16, 20, 23, 28],[6]],
[1103,"2020/11/17",[1, 6, 7, 21, 31],[18]],
[1102,"2020/11/10",[8, 13, 20, 26, 29],[6]],
[1101,"2020/11/03",[1, 8, 10, 12, 29],[13]],
[1100,"2020/10/27",[13, 18, 19, 25, 27],[16]],
[1099,"2020/10/20",[1, 3, 5, 14, 23],[15]],
[1098,"2020/10/13",[3, 13, 17, 28, 31],[19]],
[1097,"2020/10/06",[5, 12, 18, 19, 24],[16]],
[1096,"2020/09/29",[1, 2, 12, 20, 22],[8]],
[1095,"2020/09/22",[4, 10, 16, 21, 24],[6]],
[1094,"2020/09/15",[3, 5, 8, 14, 22],[21]],
[1093,"2020/09/08",[2, 12, 17, 23, 30],[8]],
[1092,"2020/09/01",[9, 13, 14, 19, 22],[25]],
[1091,"2020/08/25",[1, 14, 25, 29, 31],[30]],
[1090,"2020/08/18",[4, 12, 15, 22, 25],[10]],
[1089,"2020/08/11",[3, 13, 18, 19, 22],[29]],
[1088,"2020/08/04",[2, 8, 14, 17, 26],[4]],
[1087,"2020/07/28",[1, 3, 4, 9, 16],[28]],
[1086,"2020/07/21",[2, 18, 19, 28, 30],[16]],
[1085,"2020/07/14",[9, 10, 16, 17, 28],[13]],
[1084,"2020/07/07",[11, 19, 28, 29, 31],[2]],
[1083,"2020/06/30",[1, 3, 19, 26, 29],[5]],
[1082,"2020/06/23",[1, 2, 14, 19, 29],[5]],
[1081,"2020/06/16",[2, 3, 4, 24, 25],[8]],
[1080,"2020/06/09",[4, 5, 13, 19, 21],[14]],
[1079,"2020/06/02",[2, 6, 14, 16, 26],[4]],
[1078,"2020/05/26",[3, 10, 16, 17, 25],[24]],
[1077,"2020/05/19",[3, 17, 19, 25, 31],[4]],
[1076,"2020/05/12",[5, 7, 11, 22, 26],[15]],
[1075,"2020/05/05",[4, 11, 13, 16, 31],[6]],
[1074,"2020/04/28",[15, 18, 20, 22, 27],[21]],
[1073,"2020/04/21",[2, 13, 21, 24, 30],[14]],
[1072,"2020/04/14",[3, 4, 10, 12, 13],[31]],
[1071,"2020/04/07",[2, 3, 4, 27, 31],[7]],
[1070,"2020/03/31",[7, 9, 11, 27, 31],[21]],
[1069,"2020/03/24",[1, 3, 9, 14, 25],[20]],
[1068,"2020/03/17",[2, 3, 20, 24, 31],[9]],
[1067,"2020/03/10",[2, 10, 13, 15, 28],[26]],
[1066,"2020/03/03",[15, 17, 20, 22, 23],[21]],
[1065,"2020/02/25",[8, 11, 14, 16, 31],[10]],
[1064,"2020/02/18",[1, 5, 8, 28, 29],[7]],
[1063,"2020/02/11",[10, 18, 20, 26, 27],[25]],
[1062,"2020/02/04",[14, 18, 23, 29, 31],[17]],
[1061,"2020/01/28",[5, 10, 19, 23, 28],[9]],
[1060,"2020/01/21",[19, 23, 24, 28, 31],[11]],
[1059,"2020/01/14",[2, 11, 13, 16, 18],[3]],
[1058,"2020/01/07",[2, 16, 19, 24, 27],[20]],
[1057,"2019/12/24",[9, 13, 21, 23, 26],[1]],
[1056,"2019/12/17",[3, 12, 14, 21, 25],[10]],
[1055,"2019/12/10",[1, 5, 18, 19, 21],[9]],
[1054,"2019/12/03",[2, 19, 25, 26, 31],[22]],
[1053,"2019/11/26",[2, 3, 13, 16, 23],[14]],
[1052,"2019/11/19",[4, 8, 9, 14, 26],[5]],
[1051,"2019/11/12",[7, 11, 12, 21, 22],[5]],
[1050,"2019/11/05",[2, 15, 19, 23, 28],[10]],
[1049,"2019/10/29",[2, 16, 21, 26, 31],[27]],
[1048,"2019/10/22",[1, 8, 11, 19, 23],[12]],
[1047,"2019/10/15",[8, 12, 19, 25, 26],[9]],
[1046,"2019/10/08",[16, 23, 24, 28, 29],[12]],
[1045,"2019/10/01",[3, 5, 7, 10, 18],[16]],
[1044,"2019/09/24",[12, 19, 27, 28, 30],[1]],
[1043,"2019/09/17",[7, 9, 23, 24, 25],[30]],
[1042,"2019/09/10",[11, 12, 19, 23, 28],[7]],
[1041,"2019/09/03",[3, 9, 14, 15, 27],[31]],
[1040,"2019/08/27",[7, 10, 13, 25, 27],[30]],
[1039,"2019/08/20",[4, 19, 22, 24, 30],[12]],
[1038,"2019/08/13",[2, 5, 21, 23, 30],[8]],
[1037,"2019/08/06",[7, 19, 23, 24, 27],[17]],
[1036,"2019/07/30",[7, 14, 16, 23, 28],[9]],
[1035,"2019/07/23",[3, 8, 11, 16, 31],[26]],
[1034,"2019/07/16",[12, 22, 27, 28, 29],[10]],
[1033,"2019/07/09",[2, 12, 14, 24, 31],[22]],
[1032,"2019/07/02",[1, 9, 14, 21, 26],[29]],
[1031,"2019/06/25",[5, 8, 17, 21, 23],[15]],
[1030,"2019/06/18",[21, 24, 26, 27, 28],[22]],
[1029,"2019/06/11",[3, 4, 9, 11, 29],[5]],
[1028,"2019/06/04",[2, 3, 8, 16, 27],[17]],
[1027,"2019/05/28",[5, 6, 17, 21, 27],[19]],
[1026,"2019/05/21",[3, 14, 15, 22, 26],[1]],
[1025,"2019/05/14",[3, 4, 13, 19, 23],[18]],
[1024,"2019/05/07",[4, 11, 12, 23, 28],[3]],
[1023,"2019/04/30",[2, 12, 22, 23, 26],[25]],
[1022,"2019/04/23",[5, 13, 24, 27, 29],[22]],
[1021,"2019/04/16",[13, 19, 23, 25, 29],[8]],
[1020,"2019/04/09",[3, 12, 17, 24, 30],[31]],
[1019,"2019/04/02",[5, 6, 16, 23, 24],[3]],
[1018,"2019/03/26",[13, 16, 23, 27, 29],[15]],
[1017,"2019/03/19",[9, 16, 21, 23, 24],[8]],
[1016,"2019/03/12",[5, 21, 23, 25, 27],[22]],
[1015,"2019/03/05",[3, 5, 6, 20, 25],[27]],
[1014,"2019/02/26",[4, 17, 19, 20, 25],[5]],
[1013,"2019/02/19",[1, 6, 11, 19, 28],[8]],
[1012,"2019/02/12",[1, 13, 18, 26, 29],[8]],
[1011,"2019/02/05",[9, 16, 21, 30, 31],[27]],
[1010,"2019/01/29",[10, 17, 20, 21, 30],[15]],
[1009,"2019/01/22",[2, 8, 17, 23, 27],[4]],
[1008,"2019/01/15",[3, 4, 22, 26, 27],[11]],
[1007,"2019/01/08",[2, 10, 11, 25, 31],[17]],
];



function calcScores(data, cfg) {
  if(!data||!data.length) return {scores:{},freq:{},intv:{},hc:{},cyc:{},bal:{avgSum:100,sumStd:30,oddR:0.5}};
  const {total,pick}=cfg, scores={}, avgF=data.length*pick/total;
  const freq={}, intv={}, hc={};
  for(let i=1;i<=total;i++){freq[i]=0;intv[i]=data.length;}
  for(let idx=0;idx<data.length;idx++){const m=data[idx]&&data[idx][2];if(!Array.isArray(m))continue;for(const n of m){freq[n]++;if(idx<intv[n])intv[n]=idx;}}
  const sw=Math.min(8,data.length);
  for(let n=1;n<=total;n++){
    let sr=0,lr=0;
    for(let i=0;i<data.length;i++){if(data[i]&&data[i][2]&&data[i][2].includes(n)){lr++;if(i<sw)sr++;}}
    sr/=sw;lr/=data.length;hc[n]={m:sr-lr,sr,lr};
  }
  const cyc={};
  for(let n=1;n<=total;n++){
    const ap=[];for(let i=0;i<data.length;i++){if(data[i]&&data[i][2]&&data[i][2].includes(n))ap.push(i);}
    if(ap.length<3){cyc[n]={c:0,cf:0,nd:99};continue;}
    const gaps=[];for(let i=0;i<ap.length-1;i++)gaps.push(ap[i+1]-ap[i]);
    const avg=gaps.reduce((a,b)=>a+b,0)/gaps.length;
    const std=Math.sqrt(gaps.reduce((s,g)=>s+(g-avg)**2,0)/gaps.length);
    cyc[n]={c:avg,cf:avg>0?Math.max(0,1-std/avg):0,nd:Math.max(0,avg-ap[0])};
  }
  for(let i=1;i<=total;i++){
    let s=0;
    s+=Math.min((freq[i]/Math.max(avgF,.01))*10,20);
    s+=Math.min(intv[i]*2.5,15);
    if(data[0]&&data[0][2]&&data[0][2].includes(i))s+=12;
    const b0=data[0]&&data[0][3];if(b0&&(Array.isArray(b0)?b0:[b0]).includes(i))s+=8;
    s+=Math.max(-5,Math.min(hc[i].m*50,15));
    if(cyc[i].cf>.3&&cyc[i].nd<=1.5)s+=cyc[i].cf*12;
    if(data.length>1&&data[1]&&data[1][2]&&data[1][2].includes(i))s+=5;
    scores[i]=Math.round(s*10)/10;
  }
  const sums=data.map(d=>(d&&d[2]||[]).reduce((a,b)=>a+b,0));
  const avgSum=sums.reduce((a,b)=>a+b,0)/sums.length;
  const sumStd=Math.sqrt(sums.reduce((s,v)=>s+(v-avgSum)**2,0)/sums.length);
  const oddAvg=data.map(d=>(d&&d[2]||[]).filter(n=>n%2===1).length).reduce((a,b)=>a+b,0)/data.length;
  return {scores,freq,intv,hc,cyc,bal:{avgSum,sumStd,oddR:oddAvg/pick}};
}

function selBal(scores,candidates,pick,bal){
  const b=bal||{avgSum:100,sumStd:30,oddR:0.5};
  const sel=[];const rem=[...candidates];
  while(sel.length<pick&&rem.length>0){
    let bi=0,bs=-1e9;
    for(let i=0;i<rem.length;i++){
      const n=rem[i];const trial=[...sel,n];
      let sc=scores[n]||0;
      if(trial.length===pick){
        const sum=trial.reduce((a,c)=>a+c,0);
        sc-=Math.abs(sum-b.avgSum)*.1;
        sc-=Math.abs(trial.filter(x=>x%2===1).length-b.oddR*pick)*2;
      }
      if(sc>bs){bs=sc;bi=i;}
    }
    sel.push(rem[bi]);rem.splice(bi,1);
  }
  return sel.sort((a,b)=>a-b);
}

function gen3(data,cfg,sc){
  if(!data||!data.length||!sc||!sc.scores)return{sets:[]};
  const {total,pick}=cfg;
  const scores=sc.scores;const hc=sc.hc||{};const cyc=sc.cyc||{};const freq=sc.freq||{};const intv=sc.intv||{};const bal=sc.bal;
  const sorted=Object.entries(scores).sort((a,b)=>b[1]-a[1]).map(([n])=>+n);
  if(!sorted.length)return{sets:[]};
  function genMulti(pool,count){
    const results=[];const used=new Set();
    for(let i=0;i<count;i++){
      const shuffled=[...pool].sort((a,b)=>(scores[b]||0)+Math.random()*8-(scores[a]||0)-Math.random()*8);
      const set=selBal(scores,shuffled.slice(0,pick*3),pick,bal);
      const key=set.join(",");
      if(!used.has(key)){used.add(key);results.push(set);}
      else{const retry=[...pool].sort(()=>Math.random()-.5);results.push(selBal(scores,retry.slice(0,pick*3),pick,bal));}
    }
    return results;
  }

  // 1. 逆引っ張り2 (6.3%): 2回前の出現数字を避ける
  const ap2Sc={};for(let i=1;i<=total;i++){ap2Sc[i]=scores[i]||0;}
  const prev2N=data[1]&&data[1][2]?data[1][2]:[];
  prev2N.forEach(function(n){ap2Sc[n]-=15;});
  const s1=genMulti(Object.entries(ap2Sc).sort((a,b)=>b[1]-a[1]).map(e=>+e[0]),3);

  // 2. 逆引っ張り3 (5.7%): 3回前の出現数字を避ける
  const ap3Sc={};for(let i=1;i<=total;i++){ap3Sc[i]=scores[i]||0;}
  const prev3N=data[2]&&data[2][2]?data[2][2]:[];
  prev3N.forEach(function(n){ap3Sc[n]-=10;});
  const s2=genMulti(Object.entries(ap3Sc).sort((a,b)=>b[1]-a[1]).map(e=>+e[0]),3);

  // 3. 引っ張り1 (5.5%): 前回出現数字を軸に
  const pl1Sc={};for(let i=1;i<=total;i++){pl1Sc[i]=scores[i]||0;}
  const prevN=data[0]&&data[0][2]?data[0][2]:[];
  prevN.forEach(function(n){pl1Sc[n]+=30;});
  const s3=genMulti(Object.entries(pl1Sc).sort((a,b)=>b[1]-a[1]).map(e=>+e[0]),3);

  // 4. 引っ張り1+3 (5.5%): 前回と3回前を軸に
  const pl13Sc={};for(let i=1;i<=total;i++){pl13Sc[i]=scores[i]||0;}
  prevN.forEach(function(n){pl13Sc[n]+=30;});
  prev3N.forEach(function(n){pl13Sc[n]+=15;});
  const s4=genMulti(Object.entries(pl13Sc).sort((a,b)=>b[1]-a[1]).map(e=>+e[0]),3);

  // 5. 引っ張り1+4 (5.5%): 前回と4回前を軸に
  const pl14Sc={};for(let i=1;i<=total;i++){pl14Sc[i]=scores[i]||0;}
  prevN.forEach(function(n){pl14Sc[n]+=30;});
  const prev4N=data[3]&&data[3][2]?data[3][2]:[];
  prev4N.forEach(function(n){pl14Sc[n]+=10;});
  const s5=genMulti(Object.entries(pl14Sc).sort((a,b)=>b[1]-a[1]).map(e=>+e[0]),3);

  // 6. 全要素ブレンドB (5.0%): 頻度1.5倍+間隔+HC0.5倍+引っ張り+B
  const baBSc={};
  const prevBN=data[0]&&data[0][3]?(Array.isArray(data[0][3])?data[0][3]:[data[0][3]]):[];
  for(let i=1;i<=total;i++){
    const fsc=(freq[i]||0)/Math.max(data.length,1)*30;
    const gsc=Math.min(intv[i]||0,10);
    const hsc=(hc[i]?.m||0)*10;
    const ag=data.length/Math.max(freq[i]||1,1);
    const due=Math.max(0,((intv[i]||0)/Math.max(ag,1)-1)*10);
    baBSc[i]=fsc+gsc+hsc+due+(prevN.includes(i)?12:0)+(prev2N.includes(i)?6:0)+(prevBN.includes(i)?8:0);
  }
  const s6=genMulti(Object.entries(baBSc).sort((a,b)=>b[1]-a[1]).map(e=>+e[0]),3);

  // 7. 引っ張り1+3+4 (4.8%): 前回+3回前+4回前を軸に
  const pl134Sc={};for(let i=1;i<=total;i++){pl134Sc[i]=scores[i]||0;}
  prevN.forEach(function(n){pl134Sc[n]+=20;});
  prev3N.forEach(function(n){pl134Sc[n]+=12;});
  prev4N.forEach(function(n){pl134Sc[n]+=8;});
  const s7=genMulti(Object.entries(pl134Sc).sort((a,b)=>b[1]-a[1]).map(e=>+e[0]),3);

  // 8. 引っ張り+B (4.8%): 前回本数字+ボーナスを軸に
  const pb1Sc={};for(let i=1;i<=total;i++){pb1Sc[i]=scores[i]||0;}
  prevN.forEach(function(n){pb1Sc[n]+=25;});
  prevBN.forEach(function(n){pb1Sc[n]+=15;});
  const s8=genMulti(Object.entries(pb1Sc).sort((a,b)=>b[1]-a[1]).map(e=>+e[0]),3);

  // 9. 線形回帰20 (4.8%): 直近20回の出現トレンドで予測
  const lr20Sc={};
  for(let i=1;i<=total;i++){
    const xs=[],ys=[];
    for(let j=0;j<Math.min(20,data.length);j++){xs.push(j);ys.push(data[j]&&data[j][2]&&data[j][2].includes(i)?1:0);}
    if(xs.length<3){lr20Sc[i]=scores[i]||0;continue;}
    const mx2=xs.reduce((a,c)=>a+c,0)/xs.length;const my=ys.reduce((a,c)=>a+c,0)/ys.length;
    let num2=0,den=0;
    for(let j=0;j<xs.length;j++){num2+=(xs[j]-mx2)*(ys[j]-my);den+=(xs[j]-mx2)*(xs[j]-mx2);}
    lr20Sc[i]=(scores[i]||0)+(den>0?num2/den*40:0);
  }
  const s9=genMulti(Object.entries(lr20Sc).sort((a,b)=>b[1]-a[1]).map(e=>+e[0]),3);

  // 10. 引っ張り1+2 (4.7%): 前回+前々回を軸に
  const pl12Sc={};for(let i=1;i<=total;i++){pl12Sc[i]=scores[i]||0;}
  prevN.forEach(function(n){pl12Sc[n]+=25;});
  prev2N.forEach(function(n){pl12Sc[n]+=15;});
  const s10=genMulti(Object.entries(pl12Sc).sort((a,b)=>b[1]-a[1]).map(e=>+e[0]),3);

  return {sets:[
    {k:"ap2",l:"🔃 逆引っ張り2",d:"2回前の出現数字を避ける【1位6.3%】",c:"#ff4081",multi:s1},
    {k:"ap3",l:"🔃 逆引っ張り3",d:"3回前の出現数字を避ける【2位5.7%】",c:"#f50057",multi:s2},
    {k:"pl1",l:"🧲 引っ張り",d:"前回出現数字をそのまま軸に【3位5.5%】",c:"#ff7043",multi:s3},
    {k:"pl13",l:"🧲 引っ張り1+3",d:"前回と3回前の出現数字を軸に【4位5.5%】",c:"#ff5722",multi:s4},
    {k:"pl14",l:"🧲 引っ張り1+4",d:"前回と4回前の出現数字を軸に【5位5.5%】",c:"#e64a19",multi:s5},
    {k:"bab",l:"👑 全要素ブレンド",d:"頻度×1.5+間隔+HC+引っ張り+B融合【6位5.0%】",c:"#ce93d8",multi:s6},
    {k:"pl134",l:"🧲 引っ張り1+3+4",d:"前回+3回前+4回前を軸に【7位4.8%】",c:"#d84315",multi:s7},
    {k:"pb1",l:"🎁 引っ張り+B",d:"前回本数字+ボーナスを軸に【8位4.8%】",c:"#ffd740",multi:s8},
    {k:"lr20",l:"📈 線形回帰",d:"直近20回の出現トレンドの傾きで予測【9位4.8%】",c:"#26a69a",multi:s9},
    {k:"pl12",l:"🧲 引っ張り1+2",d:"前回+前々回を軸に【10位4.7%】",c:"#ff8a65",multi:s10},
  ]};
}

function runBT(allData,cfg,win){
  win=win||30;
  const is7=cfg.pick===7,res=[],mx=Math.min(allData.length-win,80);
  const pa={"1等":1e7,"2等":15e4,"3等":1e4,"4等":9e2,"ハズレ":0};
  const pl=Object.keys(pa);
  for(let i=0;i<mx;i++){
    const d=allData[i];if(!d||!d[2]||!d[3])continue;
    const rd=d[0],tm=d[2],tb=d[3];const aB=Array.isArray(tb)?tb:[tb];
    const hist=allData.slice(i+1,i+1+win);if(hist.length<10)continue;
    const sc=calcScores(hist,cfg);const g=gen3(hist,cfg,sc);
    if(!g.sets)continue;
    g.sets.forEach(function(s){
      if(!s.multi)return;
      for(var mi=0;mi<s.multi.length;mi++){
        var nums=s.multi[mi];
        if(!nums||!nums.length)continue;
        const mh=nums.filter(n=>tm.includes(n)).length;
        const bh=nums.filter(n=>aB.includes(n)).length;
        let p="ハズレ";
        if(mh===5)p="1等";else if(mh===4&&bh>=1)p="2等";else if(mh===4)p="3等";else if(mh===3)p="4等";
        res.push({rd:rd,k:s.k,mi:mi,nums:nums,mh:mh,bh:bh,p:p});
      }
    });
  }
  var sum={};
  ["ap23","pl137","ap2","pl136","pl1","pl14","pl15","pl16","pl17","pl147"].forEach(function(t){
    var f=res.filter(function(r){return r.k===t;}),tot=f.length,pz={};
    pl.forEach(function(l){pz[l]=0;});var th=0;
    f.forEach(function(r){pz[r.p]++;th+=r.mh;});
    var w=tot-(pz["ハズレ"]||0);
    var earn=0;Object.keys(pz).forEach(function(l){earn+=pz[l]*(pa[l]||0);});
    sum[t]={tot:tot,w:w,wr:tot?(w/tot*100).toFixed(1):"0",ah:tot?(th/tot).toFixed(2):"0",pz:pz,earn:earn,cost:tot*200,profit:earn-tot*200};
  });
  var allPz={};pl.forEach(function(l){allPz[l]=0;});res.forEach(function(r){allPz[r.p]++;});
  var tAll=res.length,wAll=tAll-(allPz["ハズレ"]||0);
  var tEarn=0;Object.keys(allPz).forEach(function(l){tEarn+=allPz[l]*(pa[l]||0);});
  return{res:res,sum:sum,pl:pl,pa:pa,tAll:tAll,allPz:allPz,tProfit:tEarn-tAll*200,roi:tAll?(tEarn/(tAll*200)*100).toFixed(1):"0",wr:tAll?(wAll/tAll*100).toFixed(1):"0"};
}

export default function App(){
  const [tab,setTab]=useState("prediction");
  const [rN,setRN]=useState(50);
  const [aD,setAD]=useState(DM);
  const [bt,setBt]=useState(null);
  const [btR,setBtR]=useState(false);
  const [btW,setBtW]=useState(30);
  const [btOpen,setBtOpen]=useState(null);
  const [sv,setSv]=useState([]);
  const [sMsg,setSMsg]=useState(null);
  const [showInput,setShowInput]=useState(false);
  const [inputRound,setInputRound]=useState("");
  const [inputDate,setInputDate]=useState("");
  const [selMain,setSelMain]=useState([]);
  const [selBonus,setSelBonus]=useState([]);
  const [inputMsg,setInputMsg]=useState(null);
  const [coAmount,setCoAmount]=useState("");

  const cfg=CFG;
  const data=useMemo(function(){return aD.slice(0,rN);},[aD,rN]);
  const lr=aD.length>0?aD[0][0]:0;
  const sc=useMemo(function(){return calcScores(data,cfg);},[data,cfg]);
  const pred=useMemo(function(){return gen3(data,cfg,sc);},[data,cfg,sc]);

  // === Persistence via localStorage ===
  const LS_KEY_UD="mini-uds";
  const LS_KEY_SV="mini-slim";
  const [showShare,setShowShare]=useState(false);
  const [importTxt,setImportTxt]=useState("");
  const [sharMsg,setSharMsg]=useState(null);
  
  function lsGet(k){try{var v=localStorage.getItem(k);return v?JSON.parse(v):null;}catch(e){return null;}}
  function lsSet(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true;}catch(e){return false;}}

  // Encode user data to compact string: "rd:n1.n2.n3.n4.n5:b|..."
  function encodeUD(arr){
    if(!arr||!arr.length)return "";
    return arr.map(function(d){return d[0]+":"+d[2].join(".")+":"+((Array.isArray(d[3])?d[3]:[d[3]]).join("."));}).join("|");
  }
  function decodeUD(str){
    if(!str)return [];
    return str.split("|").map(function(s){
      var p=s.split(":");if(p.length<3)return null;
      var rd=parseInt(p[0]);var nums=p[1].split(".").map(Number).filter(function(n){return n>0&&n<=31;});
      var bonus=p[2].split(".").map(Number).filter(function(n){return n>0&&n<=31;});
      if(!rd||nums.length!==5||bonus.length<1)return null;
      return [rd,"",nums,bonus];
    }).filter(Boolean);
  }

  useEffect(function(){
    // Load from localStorage
    var ud=lsGet(LS_KEY_UD);
    if(ud&&Array.isArray(ud)&&ud.length){
      setAD(function(prev){
        var m=new Map(prev.map(function(d){return[d[0],d];}));
        for(var j=0;j<ud.length;j++){if(ud[j]&&ud[j][0]&&ud[j][2])m.set(ud[j][0],ud[j]);}
        return Array.from(m.values()).sort(function(a,b){return b[0]-a[0];});
      });
    }
    var svd=lsGet(LS_KEY_SV);
    if(svd&&Array.isArray(svd)){
      var valid=svd.filter(function(p){return p&&p.nums&&Array.isArray(p.nums)&&p.nums.length>0;});
      if(valid.length)setSv(valid);
    }
    // Load from Supabase (shared data)
    if(SUPA_ON){
      supaGetMini().then(function(rows){
        if(rows&&rows.length){
          setAD(function(prev){
            var m=new Map(prev.map(function(d){return[d[0],d];}));
            rows.forEach(function(d){if(d[0]&&d[2])m.set(d[0],d);});
            return Array.from(m.values()).sort(function(a,b){return b[0]-a[0];});
          });
        }
      });
    }
  },[]);

  var save=useCallback(function(type,nums){
    if(!nums||!Array.isArray(nums)||nums.length===0)return;
    var e={id:Date.now()+Math.random(),type:type,tr:lr+1,nums:nums.slice().sort(function(a,b){return a-b;}),at:new Date().toISOString()};
    var u=[e].concat(sv);setSv(u);lsSet(LS_KEY_SV,u);
    setSMsg("✅ 第"+(lr+1)+"回 保存");setTimeout(function(){setSMsg(null);},2500);
  },[lr,sv]);

  var addResult=useCallback(function(){
    var rd=parseInt(inputRound);if(!rd||rd<1){setInputMsg("❌ 回号を入力");return;}
    var dt=inputDate.trim()||"";
    if(selMain.length!==5){setInputMsg("❌ 本数字を5個選択（現在"+selMain.length+"個）");return;}
    if(selBonus.length!==1){setInputMsg("❌ ボーナス数字を1個選択（現在"+selBonus.length+"個）");return;}
    var nums=selMain.slice().sort(function(a,b){return a-b;});
    var bonus=selBonus.slice();
    var entry=[rd,dt,nums,bonus];
    setAD(function(prev){
      var m=new Map(prev.map(function(d){return[d[0],d];}));
      m.set(rd,entry);
      return Array.from(m.values()).sort(function(a,b){return b[0]-a[0];});
    });
    // Save to localStorage
    var arr=lsGet(LS_KEY_UD)||[];
    if(!Array.isArray(arr))arr=[];
    arr=arr.filter(function(d){return d[0]!==rd;});
    arr.push(entry);
    lsSet(LS_KEY_UD,arr);
    // Save to Supabase (shared with all users)
    if(SUPA_ON){
      supaAddMini(rd,dt,nums,bonus).then(function(ok){
        if(ok){setInputMsg("✅ 第"+rd+"回を追加（クラウド同期済☁️）");}
        else{setInputMsg("✅ 第"+rd+"回を追加（ローカルのみ）");}
        setTimeout(function(){setInputMsg(null);},4000);
      });
    } else {
      setInputMsg("✅ 第"+rd+"回を追加（"+arr.length+"件ローカル保存）");
      setTimeout(function(){setInputMsg(null);},4000);
    }
    setInputRound("");setSelMain([]);setSelBonus([]);
  },[inputRound,inputDate,selMain,selBonus,aD]);

  var verified=useMemo(function(){
    var rMap=new Map();
    for(var i=0;i<aD.length;i++){rMap.set(aD[i][0],aD[i]);}
    return sv.map(function(p){
      var d=rMap.get(p.tr);
      if(!d||!d[2])return Object.assign({},p,{st:"pending"});
      var am=d[2];var ab=d[3];var aB=Array.isArray(ab)?ab:[ab];
      var pn=p.nums||[];
      var mh=pn.filter(function(n){return am.includes(n);}).length;
      var bh=pn.filter(function(n){return aB.includes(n);}).length;
      var pr="ハズレ";
      if(mh===5)pr="1等";else if(mh===4&&bh>=1)pr="2等";else if(mh===4)pr="3等";else if(mh===3)pr="4等";
      return Object.assign({},p,{st:"done",am:am,aB:aB,mh:mh,bh:bh,pr:pr});
    });
  },[sv,aD]);

  var pzC={"1等":"#ffd700","2等":"#c0c0c0","3等":"#cd7f32","4等":"#4fc3f7","ハズレ":"#506878"};
  var iStyle={width:"100%",padding:"7px",background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.15)",borderRadius:"6px",color:"#e0e8f0",fontSize:"14px",fontFamily:"inherit"};

  return(
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#0a0a1a,#1a0a2e 30%,#0a1a3e 60%,#0a0a1a)",color:"#e0e8f0",fontFamily:"'Noto Sans JP',sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Noto+Sans+JP:wght@400;700;900&display=swap');
        .C{background:rgba(255,255,255,.04);border-radius:12px;padding:12px;margin-bottom:8px}
        .B{display:inline-flex;align-items:center;justify-content:center;border-radius:50%;font-weight:700;font-family:'Orbitron'}
        .T{padding:6px 10px;border:none;background:none;color:#6080a0;font-size:11px;cursor:pointer;font-weight:700;border-bottom:2px solid transparent;white-space:nowrap;font-family:inherit}
        .T.a{color:#2196f3;border-bottom-color:#2196f3}
        @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
      `}</style>

      <div style={{padding:"12px 12px 6px",textAlign:"center",maxWidth:"700px",margin:"0 auto"}}>
        <h1 style={{fontFamily:"'Orbitron'",fontSize:"clamp(16px,4.5vw,24px)",fontWeight:900,letterSpacing:"2px",background:"linear-gradient(135deg,#2196f3,#00bcd4,#ffd700)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:"4px"}}>MINI LOTO ANALYZER</h1>
        <p style={{color:"#506878",fontSize:"9px"}}>1〜31から5個 ｜ 毎週火曜 ｜ 最高約4000万円</p>

        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",margin:"8px 0"}}>
          <span style={{color:"#6080a0",fontSize:"9px"}}>分析:</span>
          <input type="range" min={5} max={aD.length} value={rN} onChange={function(e){setRN(+e.target.value);}} style={{width:"120px"}}/>
          <span style={{color:"#64b5f6",fontSize:"11px",fontWeight:700}}>{rN}回</span>
        </div>
        <div style={{display:"flex",justifyContent:"center",gap:"8px",fontSize:"9px",color:"#506878"}}>
          <span>📦{aD.length}回</span><span>🏷️第{lr}回</span><span>🎯次回:第{lr+1}回</span>
        </div>

        <div style={{textAlign:"center",marginTop:"6px"}}>
          <button onClick={function(){setShowInput(!showInput);}} style={{padding:"5px 12px",border:"1px solid rgba(100,200,255,.3)",background:"rgba(100,150,255,.08)",color:"#64b5f6",borderRadius:"8px",cursor:"pointer",fontSize:"10px",fontWeight:700,fontFamily:"inherit"}}>{showInput?"✕ 閉じる":"✏️ 当選番号を入力"}</button>
        </div>
        {showInput&&<div style={{margin:"8px auto",maxWidth:"340px",background:"rgba(255,255,255,.04)",borderRadius:"10px",padding:"12px",border:"1px solid rgba(100,200,255,.15)"}}>
          <div style={{display:"flex",gap:"6px",marginBottom:"6px"}}>
            <div style={{flex:1}}><div style={{fontSize:"9px",color:"#6080a0",marginBottom:"2px"}}>回号 *</div><input value={inputRound} onChange={function(e){setInputRound(e.target.value);}} placeholder={""+(lr+1)} style={iStyle}/></div>
            <div style={{flex:2}}><div style={{fontSize:"9px",color:"#6080a0",marginBottom:"2px"}}>抽選日</div><input value={inputDate} onChange={function(e){setInputDate(e.target.value);}} placeholder="2026/3/27" style={iStyle}/></div>
          </div>
          <div style={{marginBottom:"6px"}}><div style={{fontSize:"9px",color:"#6080a0",marginBottom:"4px"}}>本数字 * （5個選択） <span style={{color:selMain.length===5?"#4caf50":"#ff9100",fontWeight:700}}>{selMain.length}/5</span></div>
            <div style={{display:"flex",flexWrap:"wrap",gap:"4px",justifyContent:"center"}}>
              {Array.from({length:31},function(_,i){return i+1;}).map(function(n){
                var isSel=selMain.includes(n);var isBonus=selBonus.includes(n);
                return <button key={n} onClick={function(){if(isBonus)return;if(isSel){setSelMain(selMain.filter(function(x){return x!==n;}));}else if(selMain.length<5){setSelMain(selMain.concat(n).sort(function(a,b){return a-b;}));}}} style={{width:32,height:32,borderRadius:"50%",border:isSel?"2px solid #2196f3":isBonus?"2px solid #ffd740":"1px solid rgba(255,255,255,.15)",background:isSel?"linear-gradient(135deg,#2196f3,#00bcd4)":isBonus?"rgba(255,215,0,.1)":"rgba(255,255,255,.06)",color:isSel?"#fff":isBonus?"#ffd740aa":"#c0c8d0",fontSize:"12px",fontWeight:isSel?900:500,cursor:isBonus?"not-allowed":"pointer",fontFamily:"inherit",padding:0,opacity:isBonus?0.4:1}}>{n}</button>;
              })}
            </div>
            {selMain.length>0&&<div style={{display:"flex",gap:"4px",justifyContent:"center",marginTop:"4px"}}>{selMain.map(function(n){return <span key={n} style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:28,height:28,borderRadius:"50%",background:"linear-gradient(135deg,#2196f3,#00bcd4)",color:"#fff",fontSize:"12px",fontWeight:900}}>{n}</span>;})}</div>}
          </div>
          <div style={{marginBottom:"8px"}}><div style={{fontSize:"9px",color:"#6080a0",marginBottom:"4px"}}>ボーナス数字 * （1個選択） <span style={{color:selBonus.length===1?"#4caf50":"#ff9100",fontWeight:700}}>{selBonus.length}/1</span></div>
            <div style={{display:"flex",flexWrap:"wrap",gap:"4px",justifyContent:"center"}}>
              {Array.from({length:31},function(_,i){return i+1;}).map(function(n){
                var isSel=selBonus.includes(n);var isMain=selMain.includes(n);
                return <button key={n} onClick={function(){if(isMain)return;if(isSel){setSelBonus([]);}else{setSelBonus([n]);}}} style={{width:32,height:32,borderRadius:"50%",border:isSel?"2px solid #ffd740":isMain?"2px solid #2196f3":"1px solid rgba(255,255,255,.15)",background:isSel?"linear-gradient(135deg,#ffd740,#ffb832)":isMain?"rgba(33,150,243,.1)":"rgba(255,255,255,.06)",color:isSel?"#1a1a2e":isMain?"#2196f3aa":"#c0c8d0",fontSize:"12px",fontWeight:isSel?900:500,cursor:isMain?"not-allowed":"pointer",fontFamily:"inherit",padding:0,opacity:isMain?0.4:1}}>{n}</button>;
              })}
            </div>
          </div>
          <button onClick={addResult} style={{width:"100%",padding:"10px",border:"none",background:selMain.length===5&&selBonus.length===1?"linear-gradient(135deg,rgba(100,150,255,.4),rgba(150,100,255,.4))":"rgba(255,255,255,.06)",color:selMain.length===5&&selBonus.length===1?"#64b5f6":"#506878",borderRadius:"8px",cursor:selMain.length===5&&selBonus.length===1?"pointer":"not-allowed",fontSize:"13px",fontWeight:700,fontFamily:"inherit"}}>💾 保存してデータに追加</button>
          {inputMsg&&<p style={{textAlign:"center",fontSize:"11px",marginTop:"4px",color:inputMsg[0]==="✅"?"#81c784":"#ff6b6b"}}>{inputMsg}</p>}
        </div>}

        {/* データ共有 */}
        <div style={{textAlign:"center",margin:"6px 0"}}>
          <button onClick={function(){setShowShare(!showShare);}} style={{padding:"4px 10px",border:"1px solid rgba(100,200,100,.3)",background:"rgba(100,200,100,.08)",color:"#81c784",borderRadius:"6px",cursor:"pointer",fontSize:"9px",fontWeight:700,fontFamily:"inherit"}}>{showShare?"✕ 閉じる":"📤 追加データの共有・読込"}</button>
        </div>
        {showShare&&(function(){
          var ud=lsGet(LS_KEY_UD)||[];
          var encoded=encodeUD(ud);
          return(<div style={{margin:"4px auto",maxWidth:"340px",background:"rgba(255,255,255,.04)",borderRadius:"10px",padding:"10px",border:"1px solid rgba(100,200,100,.15)"}}>
            <div style={{marginBottom:"8px"}}>
              <div style={{fontSize:"9px",color:"#81c784",marginBottom:"3px"}}>📤 エクスポート（{ud.length}件）</div>
              {ud.length>0?<div>
                <textarea readOnly value={encoded} style={{width:"100%",height:"50px",background:"rgba(0,0,0,.3)",border:"1px solid rgba(255,255,255,.15)",borderRadius:"6px",color:"#e0e8f0",fontSize:"10px",fontFamily:"monospace",padding:"6px",resize:"none",boxSizing:"border-box"}}/>
                <button onClick={function(){try{navigator.clipboard.writeText(encoded);setSharMsg("✅ コピーしました");}catch(e){setSharMsg("⚠️ 手動でコピーしてください");}setTimeout(function(){setSharMsg(null);},2000);}} style={{width:"100%",padding:"6px",border:"1px solid rgba(100,200,100,.3)",background:"rgba(100,200,100,.1)",color:"#81c784",borderRadius:"6px",cursor:"pointer",fontSize:"10px",fontWeight:700,fontFamily:"inherit",marginTop:"3px"}}>📋 コピー</button>
              </div>:<p style={{fontSize:"10px",color:"#506878"}}>追加データなし</p>}
            </div>
            <div>
              <div style={{fontSize:"9px",color:"#64b5f6",marginBottom:"3px"}}>📥 インポート（貼り付けて読込）</div>
              <textarea value={importTxt} onChange={function(e){setImportTxt(e.target.value);}} placeholder="ここにデータを貼り付け" style={{width:"100%",height:"50px",background:"rgba(0,0,0,.3)",border:"1px solid rgba(255,255,255,.15)",borderRadius:"6px",color:"#e0e8f0",fontSize:"10px",fontFamily:"monospace",padding:"6px",resize:"none",boxSizing:"border-box"}}/>
              <button onClick={function(){
                var decoded=decodeUD(importTxt.trim());
                if(!decoded.length){setSharMsg("❌ データが読み取れません");setTimeout(function(){setSharMsg(null);},2000);return;}
                var existing=lsGet(LS_KEY_UD)||[];
                var m=new Map(existing.map(function(d){return[d[0],d];}));
                decoded.forEach(function(d){m.set(d[0],d);});
                var merged=Array.from(m.values()).sort(function(a,b){return b[0]-a[0];});
                lsSet(LS_KEY_UD,merged);
                setAD(function(prev){
                  var m2=new Map(prev.map(function(d){return[d[0],d];}));
                  merged.forEach(function(d){m2.set(d[0],d);});
                  return Array.from(m2.values()).sort(function(a,b){return b[0]-a[0];});
                });
                setSharMsg("✅ "+decoded.length+"件インポート完了");setImportTxt("");
                setTimeout(function(){setSharMsg(null);},3000);
              }} style={{width:"100%",padding:"6px",border:"1px solid rgba(100,150,255,.3)",background:"rgba(100,150,255,.1)",color:"#64b5f6",borderRadius:"6px",cursor:"pointer",fontSize:"10px",fontWeight:700,fontFamily:"inherit",marginTop:"3px"}}>📥 読み込む</button>
            </div>
            {sharMsg&&<p style={{textAlign:"center",fontSize:"11px",marginTop:"4px",color:sharMsg[0]==="✅"?"#81c784":"#ff6b6b"}}>{sharMsg}</p>}
          </div>);
        })()}

        {/* CO買い時判定 */}
        <div style={{margin:"8px auto",maxWidth:"340px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"6px",justifyContent:"center"}}>
            <span style={{fontSize:"10px",color:"#6080a0"}}>💰 CO額:</span>
            <input value={coAmount} onChange={function(e){setCoAmount(e.target.value.replace(/[^0-9]/g,""));}} placeholder="0" style={{width:"120px",padding:"5px 8px",background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.15)",borderRadius:"6px",color:"#e0e8f0",fontSize:"14px",fontFamily:"inherit",textAlign:"right"}}/>
            <span style={{fontSize:"10px",color:"#6080a0"}}>円</span>
          </div>
          {(function(){
            var co=parseInt(coAmount)||0;if(!co)return null;
            var base1=1e7,maxP=4e7;
            var est1=Math.min(base1+co,maxP);
            var coR=co/base1;
            var ev=(est1/169911+150000/7245+10000/455+900/29);
            var evP=(ev/200*100).toFixed(1);
            var score=0,reasons=[];
            if(coR>=3){score+=40;reasons.push("CO額が1等基準の"+coR.toFixed(1)+"倍🔥🔥🔥");}
            else if(coR>=1.5){score+=30;reasons.push("CO額が1等基準の"+coR.toFixed(1)+"倍🔥🔥");}
            else if(coR>=0.5){score+=15;reasons.push("CO額が1等基準の"+coR.toFixed(1)+"倍🔥");}
            else{reasons.push("CO額は1等基準の"+coR.toFixed(1)+"倍（低め）");}
            if(ev>=300){score+=30;reasons.push("期待値¥"+Math.round(ev)+"（購入額以上!）");}
            else if(ev>=200){score+=20;reasons.push("期待値¥"+Math.round(ev)+"（平均より高い）");}
            else if(ev>=150){score+=10;reasons.push("期待値¥"+Math.round(ev)+"（やや高い）");}
            else{reasons.push("期待値¥"+Math.round(ev)+"（通常水準）");}
            if(est1>=maxP){score+=20;reasons.push("1等推定"+Math.round(est1/1e8)+"億円（上限到達!）");}
            else if(est1>=base1*1.5){score+=10;reasons.push("1等推定"+Math.round(est1/1e8)+"億円");}
            else{reasons.push("1等推定"+(est1/1e8).toFixed(1)+"億円");}
            if(co>base1){score+=10;reasons.push("連続キャリーオーバーの可能性");}
            var lv=score>=60?"🟢 激アツ！今が買い時！":score>=40?"🟡 買い時！CO効果あり":score>=20?"🔵 普通（CO少なめ）":"⚪ CO低め";
            var lc=score>=60?"#4caf50":score>=40?"#ffd740":score>=20?"#42a5f5":"#78909c";
            return(<div style={{marginTop:"8px",padding:"10px",background:"rgba(255,255,255,.04)",borderRadius:"10px",border:"1px solid "+lc+"44"}}>
              <div style={{textAlign:"center",marginBottom:"6px"}}>
                <div style={{fontSize:"15px",fontWeight:900,color:lc}}>{lv}</div>
                <div style={{fontSize:"10px",color:"#8090a8",marginTop:"2px"}}>買い時スコア: {score}/100</div>
                <div style={{height:6,borderRadius:3,background:"rgba(255,255,255,.06)",marginTop:"4px",overflow:"hidden"}}><div style={{height:"100%",width:score+"%",borderRadius:3,background:lc}}/></div>
              </div>
              <div style={{display:"flex",gap:"6px",marginBottom:"6px"}}>
                <div style={{flex:1,textAlign:"center",background:"rgba(255,255,255,.04)",borderRadius:"6px",padding:"5px"}}><div style={{fontSize:"8px",color:"#6080a0"}}>CO額</div><div style={{fontSize:"12px",fontWeight:900,color:"#ffd740"}}>¥{co.toLocaleString()}</div></div>
                <div style={{flex:1,textAlign:"center",background:"rgba(255,255,255,.04)",borderRadius:"6px",padding:"5px"}}><div style={{fontSize:"8px",color:"#6080a0"}}>1等推定</div><div style={{fontSize:"12px",fontWeight:900,color:"#00bcd4"}}>{(est1/1e8).toFixed(1)}億円</div></div>
                <div style={{flex:1,textAlign:"center",background:"rgba(255,255,255,.04)",borderRadius:"6px",padding:"5px"}}><div style={{fontSize:"8px",color:"#6080a0"}}>期待値率</div><div style={{fontSize:"12px",fontWeight:900,color:parseFloat(evP)>=100?"#4caf50":"#42a5f5"}}>{evP}%</div></div>
              </div>
              {reasons.map(function(r,i){return <div key={i} style={{fontSize:"10px",color:"#b0bec5",padding:"1px 0"}}>• {r}</div>;})}
            </div>);
          })()}
        </div>
      </div>

      <div style={{display:"flex",gap:"1px",padding:"3px 6px",borderBottom:"1px solid rgba(255,255,255,.06)",justifyContent:"center"}}>
        {[{id:"prediction",l:"🔮予想"},{id:"ranking",l:"🏆ランキング"},{id:"backtest",l:"🧪検証"},{id:"history",l:"📋履歴"}].map(function(t){return <button key={t.id} className={"T "+(tab===t.id?"a":"")} onClick={function(){setTab(t.id);}}>{t.l}</button>;})}
      </div>

      <div style={{padding:"8px",maxWidth:"700px",margin:"0 auto"}}>

        {/* ランキングタブ */}
        {tab==="ranking"&&(function(){
          // 全予想をスコア順にフラット化
          var allPreds=[];
          (pred.sets||[]).forEach(function(s){
            (s.multi||[]).forEach(function(nums,ni){
              var totalSc=nums.reduce(function(a,n){return a+(sc.scores[n]||0);},0);
              var maxSc=Object.values(sc.scores||{}).sort(function(a,b){return b-a;}).slice(0,5).reduce(function(a,c){return a+c;},0);
              var strength=maxSc>0?totalSc/maxSc*100:0;
              allPreds.push({strat:s.k,label:s.l,color:s.c,ni:ni,nums:nums,score:strength,totalSc:totalSc});
            });
          });
          allPreds.sort(function(a,b){return b.score-a.score;});
          var seen=new Set();var unique=[];
          allPreds.forEach(function(p){var key=p.nums.slice().sort(function(a,b){return a-b;}).join(",");if(!seen.has(key)){seen.add(key);unique.push(p);}});
          allPreds=unique;
          return(<div>
            <div className="C" style={{border:"1px solid rgba(255,184,50,.3)",background:"rgba(255,184,50,.06)",textAlign:"center"}}>
              <h3 style={{fontSize:"14px",fontWeight:700,color:"#ffb832",marginBottom:"2px"}}>🏆 予想ランキング（第{lr+1}回）</h3>
              <p style={{color:"#8090a8",fontSize:"9px",marginBottom:"8px"}}>全{allPreds.length}組をスコア順に表示（重複除外）</p>
            </div>
            {allPreds.map(function(p,rank){
              var isTop3=rank<3;
              var medal=rank===0?"🥇":rank===1?"🥈":rank===2?"🥉":"";
              return(<div key={p.strat+"-"+p.ni} className="C" style={{borderLeft:"3px solid "+p.color,padding:"8px",background:isTop3?"rgba(255,184,50,.04)":"rgba(255,255,255,.03)"}}>
                <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
                  <div style={{minWidth:"36px",textAlign:"center"}}>
                    <div style={{fontSize:isTop3?"16px":"12px",fontWeight:900,color:isTop3?"#ffb832":"#6080a0"}}>{medal||("#"+(rank+1))}</div>
                    <div style={{fontSize:"9px",fontWeight:700,color:p.score>=90?"#4caf50":p.score>=75?"#ffd740":"#6080a0"}}>{p.score.toFixed(0)}点</div>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",gap:"3px",marginBottom:"3px",flexWrap:"wrap"}}>
                      {p.nums.map(function(n){return <span key={n} className="B" style={{width:isTop3?32:26,height:isTop3?32:26,fontSize:isTop3?13:10,background:isTop3?"linear-gradient(135deg,"+p.color+","+p.color+"cc)":p.color+"30",color:isTop3?"#fff":p.color,fontWeight:isTop3?900:700,boxShadow:isTop3?"0 1px 6px "+p.color+"50":"none"}}>{n}</span>;})}
                    </div>
                    <span style={{fontSize:"9px",color:p.color}}>{p.label} #{p.ni+1}</span>
                  </div>
                  <button onClick={function(){save(p.strat+"-"+(p.ni+1),p.nums);}} style={{padding:"4px 10px",border:"1px solid "+p.color+"44",background:p.color+"10",color:p.color,borderRadius:"5px",cursor:"pointer",fontSize:"9px",fontFamily:"inherit"}}>💾</button>
                </div>
              </div>);
            })}
            {sMsg&&<p style={{textAlign:"center",fontSize:"11px",color:"#81c784"}}>{sMsg}</p>}
          </div>);
        })()}

        {/* 予想タブ */}
        {tab==="prediction"&&<div>
          {(pred.sets||[]).map(function(s){return(
            <div key={s.k} className="C" style={{borderLeft:"3px solid "+s.c}}>
              <div style={{marginBottom:"6px"}}>
                <span style={{fontSize:"13px",fontWeight:900,color:s.c}}>{s.l}</span>
                <span style={{fontSize:"9px",color:"#6080a0",marginLeft:"6px"}}>{s.d}</span>
              </div>
              {(s.multi||[]).map(function(nums,ni){
                // 各数字のスコアから期待値を計算
                var totalSc=nums.reduce(function(a,n){return a+(sc.scores[n]||0);},0);
                var maxSc=Object.values(sc.scores||{}).sort(function(a,b){return b-a;}).slice(0,7).reduce(function(a,c){return a+c;},0);
                var strength=maxSc>0?(totalSc/maxSc*100).toFixed(0):0;
                var co=parseInt(coAmount)||0;
                var base1=1e7,maxP=4e7;
                var est1=co>0?Math.min(base1+co,maxP):base1;
                // 各数字の出現確率の積ではなく、スコアベースの相対期待値
                var evBase=est1/169911+150000/7245+10000/455+900/29;
                var evAdj=evBase*(totalSc/Math.max(maxSc,1));
                var evYen=Math.round(evAdj*100)/100;
                return(
                <div key={ni} style={{display:"flex",alignItems:"center",gap:"4px",marginBottom:"4px",padding:"3px 0",borderBottom:ni<(s.multi||[]).length-1?"1px solid rgba(255,255,255,.04)":"none"}}>
                  <div style={{minWidth:"36px",textAlign:"center"}}>
                    <div style={{fontSize:"10px",color:s.c,fontWeight:700}}>#{ni+1}</div>
                    <div style={{fontSize:"8px",color:parseInt(strength)>=90?"#4caf50":parseInt(strength)>=75?"#ffd740":"#6080a0",fontWeight:700}}>{strength}点</div>
                  </div>
                  <div style={{display:"flex",gap:"3px",flex:1,flexWrap:"wrap"}}>
                    {nums.map(function(n){return <span key={n} className="B" style={{width:ni===0?34:28,height:ni===0?34:28,fontSize:ni===0?14:11,background:ni===0?"linear-gradient(135deg,"+s.c+","+s.c+"cc)":s.c+"25",color:ni===0?"#fff":s.c,fontWeight:ni===0?900:700,boxShadow:ni===0?"0 1px 8px "+s.c+"50":"none",animation:ni===0?"pulse 2s infinite":"none"}}>{n}</span>;})}
                  </div>
                  <div style={{minWidth:"50px",textAlign:"right"}}>
                    <div style={{fontSize:"9px",color:evYen>=150?"#4caf50":"#6080a0",fontWeight:700}}>¥{evYen.toFixed(0)}</div>
                    <button onClick={function(){save(s.k+"-"+(ni+1),nums);}} style={{padding:"2px 8px",border:"1px solid "+s.c+"44",background:s.c+"10",color:s.c,borderRadius:"5px",cursor:"pointer",fontSize:"9px",fontFamily:"inherit",marginTop:"2px"}}>💾</button>
                  </div>
                </div>
              );})}
            </div>
          );})}
          {sMsg&&<p style={{textAlign:"center",fontSize:"11px",color:"#81c784"}}>{sMsg}</p>}
        </div>}

        {/* バックテストタブ */}
        {tab==="backtest"&&<div>
          <div className="C" style={{border:"1px solid rgba(156,39,176,.3)",background:"rgba(156,39,176,.05)"}}>
            <h3 style={{fontSize:"14px",fontWeight:700,color:"#ce93d8",marginBottom:"4px"}}>🧪 過去データ検証</h3>
            <p style={{color:"#8090a8",fontSize:"9px",marginBottom:"8px"}}>10戦略×3組×最大80回シミュレーション</p>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",marginBottom:"8px"}}>
              <span style={{fontSize:"10px",color:"#8090a8"}}>分析窓:</span>
              <select value={btW} onChange={function(e){setBtW(+e.target.value);}} style={{background:"rgba(255,255,255,.08)",color:"#e0e8f0",border:"1px solid rgba(255,255,255,.15)",borderRadius:"6px",padding:"4px 8px",fontSize:"13px"}}><option value={15}>15回</option><option value={20}>20回</option><option value={30}>30回</option><option value={50}>50回</option></select>
            </div>
            <div style={{textAlign:"center"}}>
              <button onClick={function(){setBtR(true);setBt(null);setBtOpen(null);setTimeout(function(){try{setBt(runBT(aD,cfg,btW));}catch(e){setBt({err:e.message});}setBtR(false);},50);}} disabled={btR} style={{padding:"10px 20px",border:"1px solid rgba(156,39,176,.4)",background:"rgba(156,39,176,.12)",color:"#ce93d8",borderRadius:"10px",cursor:btR?"not-allowed":"pointer",fontSize:"13px",fontWeight:700,opacity:btR?.6:1,fontFamily:"inherit"}}>{btR?"⏳ 計算中...":"🧪 実行"}</button>
            </div>
          </div>
          {bt&&!bt.err&&<div>
            <div className="C">
              <h3 style={{fontSize:"13px",fontWeight:700,color:"#ce93d8",marginBottom:"6px"}}>📊 全体（{bt.tAll}件）当選率:{bt.wr}% ROI:{bt.roi}%</h3>
              <div style={{textAlign:"center",padding:"8px",borderRadius:"8px",background:bt.tProfit>=0?"rgba(76,175,80,.1)":"rgba(255,107,53,.1)",marginBottom:"8px"}}>
                <span style={{fontSize:"18px",fontWeight:900,color:bt.tProfit>=0?"#4caf50":"#00bcd4",fontFamily:"'Orbitron'"}}>{bt.tProfit>=0?"+":""}¥{bt.tProfit.toLocaleString()}</span>
              </div>
            </div>
            {[{k:"ap2",l:"🔃 逆引っ張り2",c:"#ff4081"},{k:"ap3",l:"🔃 逆引っ張り3",c:"#f50057"},{k:"pl1",l:"🧲 引っ張り",c:"#ff7043"},{k:"pl13",l:"🧲 引っ張り1+3",c:"#ff5722"},{k:"pl14",l:"🧲 引っ張り1+4",c:"#e64a19"},{k:"bab",l:"👑 全要素ブレンド",c:"#ce93d8"},{k:"pl134",l:"🧲 引っ張り1+3+4",c:"#d84315"},{k:"pb1",l:"🎁 引っ張り+B",c:"#ffd740"},{k:"lr20",l:"📈 線形回帰",c:"#26a69a"},{k:"pl12",l:"🧲 引っ張り1+2",c:"#ff8a65"}].map(function(st){
              var s=bt.sum[st.k];if(!s||!s.tot)return null;
              var profitRate=s.cost?(s.profit/s.cost*100).toFixed(0):"0";
              var isOpen=btOpen===st.k;
              return(<div key={st.k} className="C" style={{borderLeft:"3px solid "+st.c}}>
                <div onClick={function(){setBtOpen(isOpen?null:st.k);}} style={{cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"6px",flexWrap:"wrap",gap:"4px"}}>
                  <span style={{fontSize:"12px",fontWeight:700,color:st.c}}>{isOpen?"▼":"▶"} {st.l}</span>
                  <div style={{display:"flex",gap:"8px",fontSize:"9px"}}>
                    <span style={{color:"#4caf50"}}>当選率:<b>{s.wr}%</b></span>
                    <span style={{color:"#ffb832"}}>平均:<b>{s.ah}個</b></span>
                    <span style={{color:parseFloat(profitRate)>=0?"#4caf50":"#ff8a65"}}>利益率:<b>{profitRate}%</b></span>
                  </div>
                </div>
                <div style={{display:"flex",gap:"6px",marginBottom:"4px"}}>
                  <div style={{flex:1,textAlign:"center",background:"rgba(255,255,255,.04)",borderRadius:"6px",padding:"4px"}}><div style={{fontSize:"8px",color:"#6080a0"}}>購入</div><div style={{fontSize:"11px",fontWeight:700,color:"#ff8a65"}}>¥{s.cost.toLocaleString()}</div></div>
                  <div style={{flex:1,textAlign:"center",background:"rgba(255,255,255,.04)",borderRadius:"6px",padding:"4px"}}><div style={{fontSize:"8px",color:"#6080a0"}}>当選金</div><div style={{fontSize:"11px",fontWeight:700,color:"#4caf50"}}>¥{s.earn.toLocaleString()}</div></div>
                  <div style={{flex:1,textAlign:"center",background:s.profit>=0?"rgba(76,175,80,.08)":"rgba(255,107,53,.08)",borderRadius:"6px",padding:"4px"}}><div style={{fontSize:"8px",color:"#6080a0"}}>損益</div><div style={{fontSize:"11px",fontWeight:900,color:s.profit>=0?"#4caf50":"#00bcd4"}}>{s.profit>=0?"+":""}¥{s.profit.toLocaleString()}</div></div>
                </div>
                <div style={{display:"flex",gap:"3px",flexWrap:"wrap"}}>
                  {["1等","2等","3等","4等"].filter(function(l){return true;}).map(function(l){var cnt=s.pz[l]||0;return cnt>0?<div key={l} style={{background:(pzC[l]||"#555")+"15",border:"1px solid "+(pzC[l]||"#555")+"33",borderRadius:"5px",padding:"2px 5px",textAlign:"center"}}><div style={{fontSize:"8px",color:pzC[l],fontWeight:700}}>{l}</div><div style={{fontSize:"11px",fontWeight:900,color:pzC[l]}}>{cnt}</div></div>:null;})}
                  <div style={{background:"rgba(255,255,255,.04)",borderRadius:"5px",padding:"2px 5px",textAlign:"center"}}><div style={{fontSize:"8px",color:"#506878",fontWeight:700}}>ハズレ</div><div style={{fontSize:"11px",fontWeight:900,color:"#506878"}}>{s.pz["ハズレ"]||0}</div></div>
                </div>
                {isOpen&&(function(){
                  var stRes=bt.res.filter(function(r){return r.k===st.k;});
                  var bySet={};
                  stRes.forEach(function(r){var si=r.mi!=null?r.mi:0;if(!bySet[si])bySet[si]=[];bySet[si].push(r);});
                  return(<div style={{borderTop:"1px solid rgba(255,255,255,.08)",paddingTop:"8px",marginTop:"6px"}}>
                    {Object.keys(bySet).map(Number).sort(function(a,b){return a-b;}).map(function(si){
                      var hits=bySet[si];
                      var w=hits.filter(function(r){return r.p!=="ハズレ";}).length;
                      return(<div key={si} style={{marginBottom:"6px"}}><div style={{fontSize:"10px",fontWeight:700,color:st.c,marginBottom:"3px"}}>#{si+1} （当選{w}/{hits.length}）</div>
                        <div style={{maxHeight:"180px",overflowY:"auto"}}>{hits.map(function(r,ri){
                          var dd=aD.find(function(d){return d[0]===r.rd;});
                          var am=dd?dd[2]:[];var ab=dd?(Array.isArray(dd[3])?dd[3]:[dd[3]]):[];
                          return(<div key={ri} style={{display:"flex",alignItems:"center",gap:"3px",padding:"2px 0",borderBottom:"1px solid rgba(255,255,255,.03)",flexWrap:"wrap"}}>
                            <span style={{fontSize:"8px",color:"#506878",minWidth:"36px"}}>第{r.rd}回</span>
                            <span style={{fontSize:"8px",fontWeight:700,color:pzC[r.p]||"#506878",minWidth:"24px"}}>{r.p}</span>
                            {r.nums.map(function(n){var isM=am.includes(n);var isB=ab.includes(n);return <span key={n} style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:20,height:20,borderRadius:"50%",fontSize:"8px",fontWeight:isM||isB?900:400,background:isM?"linear-gradient(135deg,#2196f3,#00bcd4)":isB?"linear-gradient(135deg,#ffd700,#ffb832)":"rgba(255,255,255,.06)",color:isM||isB?"#fff":"#506878",boxShadow:isM?"0 0 4px rgba(255,45,135,.5)":isB?"0 0 4px rgba(255,215,0,.5)":"none"}}>{n}</span>;})}
                          </div>);
                        })}</div>
                      </div>);
                    })}
                  </div>);
                })()}
              </div>);
            })}
          </div>}
          {bt&&bt.err&&<div className="C"><p style={{color:"#ff6b6b"}}>❌ {bt.err}</p></div>}
        </div>}

        {/* 履歴タブ */}
        {tab==="history"&&<div>
          {verified.length===0&&<div className="C" style={{textAlign:"center"}}><p style={{color:"#506878",fontSize:"11px"}}>保存した予想はまだありません</p></div>}
          {verified.map(function(p){
            var isPending=p.st==="pending";
            return(<div key={p.id} className="C" style={{borderLeft:"3px solid "+(isPending?"#ffb832":pzC[p.pr]||"#506878")}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:"4px"}}>
                <span style={{fontSize:"11px",fontWeight:700,color:isPending?"#ffb832":pzC[p.pr]}}>{isPending?"⏳":"✅"} 第{p.tr}回 {p.type}</span>
                {!isPending&&<span style={{fontSize:"11px",fontWeight:900,color:pzC[p.pr]}}>{p.pr}</span>}
              </div>
              <div style={{display:"flex",gap:"3px",flexWrap:"wrap"}}>
                {(p.nums||[]).map(function(n){
                  var isM=!isPending&&p.am&&p.am.includes(n);
                  var isB=!isPending&&p.aB&&p.aB.includes(n);
                  return <span key={n} style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:28,height:28,borderRadius:"50%",fontSize:"11px",fontWeight:isM||isB?900:400,background:isM?"linear-gradient(135deg,#2196f3,#00bcd4)":isB?"linear-gradient(135deg,#ffd700,#ffb832)":isPending?"rgba(255,184,50,.15)":"rgba(255,255,255,.06)",color:isM||isB?"#fff":isPending?"#ffb832":"#506878"}}>{n}</span>;
                })}
              </div>
              {!isPending&&<div style={{fontSize:"9px",color:"#506878",marginTop:"3px"}}>{p.mh}個的中{p.bh>0?" +ボーナス"+p.bh+"個":""}</div>}
            </div>);
          })}
          {sv.length>0&&<div style={{textAlign:"center",marginTop:"8px"}}>
            <button onClick={function(){setSv([]);try{localStorage.removeItem("mini-slim");}catch(e){}}} style={{padding:"6px 14px",border:"1px solid rgba(255,107,107,.3)",background:"rgba(255,107,107,.08)",color:"#ff6b6b",borderRadius:"6px",cursor:"pointer",fontSize:"10px",fontFamily:"inherit"}}>🗑️ 全削除</button>
          </div>}
        </div>}

      </div>
    </div>
  );
}
