export const cls = (...c) => c.filter(Boolean).join(" ");

export function timeAgo(date) {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const sec = Math.max(1, Math.floor((now - d) / 1000));
  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });
  const ranges = [
    [60, "seconds"], [3600, "minutes"], [86400, "hours"],
    [604800, "days"], [2629800, "weeks"], [31557600, "months"],
  ];
  let unit = "years";
  let value = -Math.floor(sec / 31557600);
  for (const [limit, u] of ranges) {
    if (sec < limit) {
      unit = u;
      const div =
        unit === "seconds" ? 1 :
        limit / (unit === "minutes" ? 60 :
        unit === "hours" ? 3600 :
        unit === "days" ? 86400 :
        unit === "weeks" ? 604800 : 2629800);
      value = -Math.floor(sec / div);
      break;
    }
  }
  return rtf.format(value, /** @type {Intl.RelativeTimeFormatUnit} */ (unit));
}

export const makeId = (p) => `${p}${Math.random().toString(36).slice(2, 10)}`;
