import { useState } from 'react';
import styles from '../styles/Home.module.css';

interface EventData {
  id: string;
  startDate: string;
  endDate?: string;
  content: string;
}

const Home = () => {
  const [startYearMonth, setStartYearMonth] = useState<string>('2024-01');
  const [endYearMonth, setEndYearMonth] = useState<string>('2024-12');
  const [events, setEvents] = useState<EventData[]>([
    { id: '1', startDate: '2024-03-15', content: 'サンプルイベント1' },
    { id: '2', startDate: '2024-06-01', endDate: '2024-06-30', content: 'サンプルイベント2（期間）' },
  ]);

  const addEvent = () => {
    const newEvent: EventData = {
      id: Date.now().toString(),
      startDate: startYearMonth + '-01',
      content: '',
    };
    setEvents([...events, newEvent]);
  };

  const removeEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const updateEvent = (id: string, field: keyof EventData, value: string) => {
    setEvents(events.map(event =>
      event.id === id ? { ...event, [field]: value } : event
    ));
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputArea}>
        <h1>年表設定</h1>

        <div className={styles.formGroup}>
          <label>開始年月</label>
          <input
            type="month"
            value={startYearMonth}
            onChange={(e) => setStartYearMonth(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label>終了年月</label>
          <input
            type="month"
            value={endYearMonth}
            onChange={(e) => setEndYearMonth(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.eventsSection}>
          <div className={styles.eventHeader}>
            <h2>イベント</h2>
            <button onClick={addEvent} className={styles.addButton}>
              + イベント追加
            </button>
          </div>

          {events.map((event) => (
            <div key={event.id} className={styles.eventCard}>
              <div className={styles.formGroup}>
                <label>開始日</label>
                <input
                  type="date"
                  value={event.startDate}
                  onChange={(e) => updateEvent(event.id, 'startDate', e.target.value)}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label>終了日（任意）</label>
                <input
                  type="date"
                  value={event.endDate || ''}
                  onChange={(e) => updateEvent(event.id, 'endDate', e.target.value)}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label>イベント内容</label>
                <input
                  type="text"
                  value={event.content}
                  onChange={(e) => updateEvent(event.id, 'content', e.target.value)}
                  className={styles.input}
                  placeholder="イベントの説明"
                />
              </div>

              <button
                onClick={() => removeEvent(event.id)}
                className={styles.removeButton}
              >
                削除
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.displayArea}>
        <h1>年表</h1>
        <TimelineSVG
          startYearMonth={startYearMonth}
          endYearMonth={endYearMonth}
          events={events}
        />
      </div>
    </div>
  );
};

interface TimelineSVGProps {
  startYearMonth: string;
  endYearMonth: string;
  events: EventData[];
}

const TimelineSVG = ({ startYearMonth, endYearMonth, events }: TimelineSVGProps) => {
  const width = 800;
  const height = 600;
  const margin = { top: 50, right: 50, bottom: 50, left: 50 };
  const timelineWidth = width - margin.left - margin.right;
  const timelineHeight = height - margin.top - margin.bottom;

  // 日付を数値に変換
  const parseDate = (dateStr: string): number => {
    return new Date(dateStr).getTime();
  };

  const startDate = parseDate(startYearMonth + '-01');
  const endDate = parseDate(endYearMonth + '-01');
  const dateRange = endDate - startDate;

  if (dateRange <= 0) {
    return (
      <svg width={width} height={height}>
        <text x={width / 2} y={height / 2} textAnchor="middle" fill="#666">
          有効な期間を設定してください
        </text>
      </svg>
    );
  }

  // 日付をSVG座標に変換
  const dateToX = (dateStr: string): number => {
    const date = parseDate(dateStr);
    const ratio = (date - startDate) / dateRange;
    return margin.left + ratio * timelineWidth;
  };

  // 月ごとの目盛りを生成
  const generateMonthTicks = () => {
    const ticks = [];
    const start = new Date(startYearMonth + '-01');
    const end = new Date(endYearMonth + '-01');

    let current = new Date(start);
    while (current <= end) {
      const dateStr = current.toISOString().substring(0, 10);
      const x = dateToX(dateStr);
      const label = `${current.getFullYear()}/${current.getMonth() + 1}`;
      ticks.push({ x, label });

      // 次の月へ
      current.setMonth(current.getMonth() + 1);
    }

    return ticks;
  };

  const monthTicks = generateMonthTicks();

  // イベントを描画
  const renderEvents = () => {
    return events.map((event, index) => {
      const y = margin.top + 100 + (index * 60);

      try {
        const startX = dateToX(event.startDate);

        if (event.endDate) {
          // 期間イベント
          const endX = dateToX(event.endDate);
          const rectWidth = Math.max(endX - startX, 2);

          return (
            <g key={event.id}>
              <rect
                x={startX}
                y={y - 10}
                width={rectWidth}
                height={20}
                fill="#4A90E2"
                opacity={0.7}
              />
              <text
                x={startX + rectWidth / 2}
                y={y + 5}
                textAnchor="middle"
                fill="white"
                fontSize="12"
              >
                {event.content}
              </text>
            </g>
          );
        } else {
          // 単一日付イベント
          return (
            <g key={event.id}>
              <circle cx={startX} cy={y} r={6} fill="#E94B3C" />
              <line
                x1={startX}
                y1={y}
                x2={startX}
                y2={y - 30}
                stroke="#E94B3C"
                strokeWidth={2}
              />
              <text
                x={startX}
                y={y - 35}
                textAnchor="middle"
                fill="#333"
                fontSize="12"
              >
                {event.content}
              </text>
            </g>
          );
        }
      } catch (e) {
        return null;
      }
    });
  };

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
      {/* タイムライン軸 */}
      <line
        x1={margin.left}
        y1={margin.top + 50}
        x2={margin.left + timelineWidth}
        y2={margin.top + 50}
        stroke="#333"
        strokeWidth={3}
      />

      {/* 月の目盛り */}
      {monthTicks.map((tick, index) => (
        <g key={index}>
          <line
            x1={tick.x}
            y1={margin.top + 45}
            x2={tick.x}
            y2={margin.top + 55}
            stroke="#333"
            strokeWidth={2}
          />
          <text
            x={tick.x}
            y={margin.top + 70}
            textAnchor="middle"
            fill="#666"
            fontSize="11"
          >
            {tick.label}
          </text>
        </g>
      ))}

      {/* イベント描画 */}
      {renderEvents()}
    </svg>
  );
};

export default Home;
