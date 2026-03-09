import http from "k6/http";
import { check, sleep } from "k6";

export default function () {
  // Теперь стучимся на 5000 (Host)
  http.get("http://127.0.0.1:5000");

  // И на 5001 (Remote)
  const res = http.get("http://127.0.0.1:5001/assets/remoteEntry.js");

  check(res, {
    "remote is reachable": (r) => r.status === 200,
  });

  sleep(1);
}
    