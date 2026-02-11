import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';

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
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* 入力エリア */}
      <div className="w-full lg:w-[400px] xl:w-[480px] bg-white border-r border-slate-200 overflow-y-auto">
        <div className="p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">年表作成</h1>
            <p className="text-sm text-slate-600">期間とイベントを設定して年表を作成します</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">期間設定</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="start-month">開始年月</Label>
                <Input
                  id="start-month"
                  type="month"
                  value={startYearMonth}
                  onChange={(e) => setStartYearMonth(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="end-month">終了年月</Label>
                <Input
                  id="end-month"
                  type="month"
                  value={endYearMonth}
                  onChange={(e) => setEndYearMonth(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">イベント</h2>
              <Button onClick={addEvent} size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                追加
              </Button>
            </div>

            <div className="space-y-3">
              {events.map((event) => (
                <Card key={event.id} className="relative">
                  <CardContent className="pt-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`start-${event.id}`}>開始日</Label>
                      <Input
                        id={`start-${event.id}`}
                        type="date"
                        value={event.startDate}
                        onChange={(e) => updateEvent(event.id, 'startDate', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`end-${event.id}`}>終了日（任意）</Label>
                      <Input
                        id={`end-${event.id}`}
                        type="date"
                        value={event.endDate || ''}
                        onChange={(e) => updateEvent(event.id, 'endDate', e.target.value)}
                        placeholder="期間イベントの場合に設定"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`content-${event.id}`}>イベント内容</Label>
                      <Input
                        id={`content-${event.id}`}
                        type="text"
                        value={event.content}
                        onChange={(e) => updateEvent(event.id, 'content', e.target.value)}
                        placeholder="イベントの説明を入力"
                      />
                    </div>

                    <Button
                      onClick={() => removeEvent(event.id)}
                      variant="destructive"
                      size="sm"
                      className="w-full gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      削除
                    </Button>
                  </CardContent>
                </Card>
              ))}

              {events.length === 0 && (
                <div className="text-center py-8 text-slate-500">
                  イベントを追加してください
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 表示エリア */}
      <div className="flex-1 overflow-x-auto">
        <div className="p-6 lg:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">年表プレビュー</h2>
            <p className="text-sm text-slate-600">左側で設定したイベントがここに表示されます</p>
          </div>

          <Card className="bg-white/80 backdrop-blur">
            <CardContent className="p-6">
              <TimelineSVG
                startYearMonth={startYearMonth}
                endYearMonth={endYearMonth}
                events={events}
              />
            </CardContent>
          </Card>
        </div>
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

  const parseDate = (dateStr: string): number => {
    return new Date(dateStr).getTime();
  };

  const startDate = parseDate(startYearMonth + '-01');
  const endDate = parseDate(endYearMonth + '-01');
  const dateRange = endDate - startDate;

  if (dateRange <= 0) {
    return (
      <div className="flex items-center justify-center h-[600px] text-slate-500">
        有効な期間を設定してください
      </div>
    );
  }

  const dateToX = (dateStr: string): number => {
    const date = parseDate(dateStr);
    const ratio = (date - startDate) / dateRange;
    return margin.left + ratio * timelineWidth;
  };

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
      current.setMonth(current.getMonth() + 1);
    }

    return ticks;
  };

  const monthTicks = generateMonthTicks();

  const renderEvents = () => {
    return events.map((event, index) => {
      const y = margin.top + 100 + (index * 60);

      try {
        const startX = dateToX(event.startDate);

        if (event.endDate) {
          const endX = dateToX(event.endDate);
          const rectWidth = Math.max(endX - startX, 2);

          return (
            <g key={event.id}>
              <rect
                x={startX}
                y={y - 10}
                width={rectWidth}
                height={20}
                fill="url(#blueGradient)"
                rx="4"
              />
              <text
                x={startX + rectWidth / 2}
                y={y + 5}
                textAnchor="middle"
                fill="white"
                fontSize="12"
                fontWeight="500"
              >
                {event.content}
              </text>
            </g>
          );
        } else {
          return (
            <g key={event.id}>
              <circle cx={startX} cy={y} r={7} fill="url(#redGradient)" />
              <line
                x1={startX}
                y1={y}
                x2={startX}
                y2={y - 30}
                stroke="#ef4444"
                strokeWidth={2}
              />
              <text
                x={startX}
                y={y - 35}
                textAnchor="middle"
                fill="#1e293b"
                fontSize="13"
                fontWeight="500"
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
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <defs>
        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="redGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f87171" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>

      <line
        x1={margin.left}
        y1={margin.top + 50}
        x2={margin.left + timelineWidth}
        y2={margin.top + 50}
        stroke="#475569"
        strokeWidth={3}
        strokeLinecap="round"
      />

      {monthTicks.map((tick, index) => (
        <g key={index}>
          <line
            x1={tick.x}
            y1={margin.top + 45}
            x2={tick.x}
            y2={margin.top + 55}
            stroke="#475569"
            strokeWidth={2}
          />
          <text
            x={tick.x}
            y={margin.top + 70}
            textAnchor="middle"
            fill="#64748b"
            fontSize="12"
            fontWeight="500"
          >
            {tick.label}
          </text>
        </g>
      ))}

      {renderEvents()}
    </svg>
  );
};

export default Home;
