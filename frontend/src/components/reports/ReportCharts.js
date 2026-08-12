import React from 'react';

const ReportCharts = ({ data, type = 'bar', title, height = 250 }) => {
  if (!data || data.length === 0) {
    return <div className="chart-empty">Tidak ada data untuk ditampilkan.</div>;
  }

  const maxValue = Math.max(...data.map(item => item.value)) * 1.2;

  const renderBarChart = () => (
    <div className="bar-chart">
      {data.map((item, index) => (
        <div key={index} className="bar-item">
          <div className="bar-label">{item.label}</div>
          <div className="bar-track">
            <div
              className="bar-fill"
              style={{
                width: `${(item.value / maxValue) * 100}%`,
                backgroundColor: item.color || '#3b82f6',
              }}
            >
              <span className="bar-value">{item.value}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPieChart = () => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;
    const segments = data.map((item) => {
      const percentage = (item.value / total) * 100;
      const angle = (percentage / 100) * 360;
      const start = currentAngle;
      const end = currentAngle + angle;
      currentAngle = end;
      return { ...item, start, end, percentage };
    });

    // Generate SVG pie with conic gradient (simpler approach)
    const gradientStops = segments.map((seg, idx) => {
      const color = seg.color || `hsl(${idx * 60 + 120}, 70%, 50%)`;
      return `${color} ${seg.start}deg ${seg.end}deg`;
    }).join(', ');

    return (
      <div className="pie-chart">
        <div
          className="pie-svg"
          style={{
            background: `conic-gradient(${gradientStops})`,
            borderRadius: '50%',
            width: '180px',
            height: '180px',
          }}
        />
        <div className="pie-legend">
          {segments.map((seg, idx) => (
            <div key={idx} className="legend-item">
              <span className="legend-color" style={{ backgroundColor: seg.color || `hsl(${idx * 60 + 120}, 70%, 50%)` }} />
              <span>{seg.label}: {seg.percentage.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderLineChart = () => {
    // Simple line chart using SVG
    const points = data.map((item, index) => ({
      x: (index / (data.length - 1)) * 100,
      y: 100 - (item.value / maxValue) * 100,
      label: item.label,
      value: item.value,
    }));

    const pathD = points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ');

    return (
      <div className="line-chart">
        <svg viewBox="0 0 100 100" className="line-svg">
          <polyline points={pathD} fill="none" stroke="#3b82f6" strokeWidth="2" />
          {points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="2" fill="#3b82f6" />
          ))}
        </svg>
        <div className="line-labels">
          {data.map((item, i) => (
            <span key={i} className="line-label">{item.label}</span>
          ))}
        </div>
      </div>
    );
  };

  const renderChart = () => {
    switch (type) {
      case 'bar': return renderBarChart();
      case 'pie': return renderPieChart();
      case 'line': return renderLineChart();
      default: return renderBarChart();
    }
  };

  return (
    <div className="report-chart" style={{ height: height + 30 }}>
      {title && <h4 className="chart-title">{title}</h4>}
      <div className="chart-body" style={{ height: height }}>
        {renderChart()}
      </div>

      <style>{`
        .report-chart {
          background: #fff;
          border-radius: 12px;
          padding: 1rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          margin-bottom: 1.5rem;
        }
        .chart-title {
          margin: 0 0 0.75rem 0;
          font-size: 1rem;
          font-weight: 600;
          color: #1f2937;
        }
        .chart-body {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .chart-empty {
          color: #9ca3af;
          text-align: center;
          width: 100%;
        }
        /* Bar chart */
        .bar-chart {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .bar-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .bar-label {
          min-width: 70px;
          font-size: 0.85rem;
          color: #4b5563;
          text-align: right;
        }
        .bar-track {
          flex: 1;
          height: 24px;
          background: #f3f4f6;
          border-radius: 4px;
          overflow: hidden;
          position: relative;
        }
        .bar-fill {
          height: 100%;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 0.3rem;
          transition: width 0.3s ease;
        }
        .bar-value {
          color: #fff;
          font-size: 0.75rem;
          font-weight: 600;
        }
        /* Pie chart */
        .pie-chart {
          display: flex;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        .pie-svg {
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .pie-legend {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.9rem;
        }
        .legend-color {
          width: 16px;
          height: 16px;
          border-radius: 4px;
        }
        /* Line chart */
        .line-chart {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .line-svg {
          width: 100%;
          height: 80%;
          background: transparent;
        }
        .line-labels {
          display: flex;
          justify-content: space-around;
          font-size: 0.75rem;
          color: #6b7280;
          padding-top: 0.3rem;
        }
        .line-label {
          text-align: center;
        }
        @media (max-width: 640px) {
          .pie-chart {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ReportCharts;