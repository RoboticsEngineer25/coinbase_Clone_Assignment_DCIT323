export default function Sparkline({ data, positive, width = 80, height = 32 }) {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * (height - 4) - 2;
    return [x, y];
  });
  const pathD = `M ${points.map(([x, y]) => `${x},${y}`).join(" L ")}`;
  const fillD = `M ${points[0][0]},${height} L ${points.map(([x, y]) => `${x},${y}`).join(" L ")} L ${points[points.length - 1][0]},${height} Z`;
  const color = positive ? "#05B169" : "#F05252";
  const fillColor = positive ? "rgba(5,177,105,0.1)" : "rgba(240,82,82,0.1)";
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path d={fillD} fill={fillColor} />
      <path d={pathD} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
