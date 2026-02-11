import { useState } from "react"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import { Calendar as CalendarIcon, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Header } from "@/components/header"
import { cn } from "@/lib/utils"

interface EventData {
  id: string
  startDate: Date | undefined
  endDate?: Date | undefined
  content: string
}

const Home = () => {
  const [startYearMonth, setStartYearMonth] = useState<Date | undefined>(
    new Date(2024, 0, 1),
  )
  const [endYearMonth, setEndYearMonth] = useState<Date | undefined>(
    new Date(2024, 11, 1),
  )
  const [events, setEvents] = useState<EventData[]>([
    { id: "1", startDate: new Date(2024, 2, 15), content: "サンプルイベント1" },
    {
      id: "2",
      startDate: new Date(2024, 5, 1),
      endDate: new Date(2024, 5, 30),
      content: "サンプルイベント2（期間）",
    },
  ])

  const addEvent = () => {
    const newEvent: EventData = {
      id: Date.now().toString(),
      startDate: startYearMonth || new Date(),
      content: "",
    }
    setEvents([...events, newEvent])
  }

  const removeEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id))
  }

  const updateEvent = (
    id: string,
    field: keyof EventData,
    value: Date | undefined | string,
  ) => {
    setEvents(
      events.map((event) =>
        event.id === id ? { ...event, [field]: value } : event,
      ),
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* 入力エリア */}
        <div className="w-full lg:w-[400px] xl:w-[480px] bg-white border-r border-zinc-200 overflow-y-auto">
          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-zinc-900 mb-2">設定</h2>
              <p className="text-sm text-zinc-600">
                期間とイベントを設定して年表を作成します
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">期間設定</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>開始年月</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startYearMonth && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startYearMonth ? (
                          format(startYearMonth, "yyyy年 M月", { locale: ja })
                        ) : (
                          <span>開始年月を選択</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startYearMonth}
                        onSelect={setStartYearMonth}
                        locale={ja}
                        captionLayout="dropdown-buttons"
                        fromYear={2000}
                        toYear={2050}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>終了年月</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endYearMonth && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endYearMonth ? (
                          format(endYearMonth, "yyyy年 M月", { locale: ja })
                        ) : (
                          <span>終了年月を選択</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endYearMonth}
                        onSelect={setEndYearMonth}
                        locale={ja}
                        captionLayout="dropdown-buttons"
                        fromYear={2000}
                        toYear={2050}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-zinc-900">
                  イベント
                </h2>
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
                        <Label>開始日</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !event.startDate && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {event.startDate ? (
                                format(event.startDate, "PPP", { locale: ja })
                              ) : (
                                <span>開始日を選択</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={event.startDate}
                              onSelect={(date) =>
                                updateEvent(event.id, "startDate", date)
                              }
                              locale={ja}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="space-y-2">
                        <Label>終了日（任意）</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !event.endDate && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {event.endDate ? (
                                format(event.endDate, "PPP", { locale: ja })
                              ) : (
                                <span>期間イベントの場合に設定</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={event.endDate}
                              onSelect={(date) =>
                                updateEvent(event.id, "endDate", date)
                              }
                              locale={ja}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="space-y-2">
                        <Label>イベント内容</Label>
                        <Input
                          type="text"
                          value={event.content}
                          onChange={(e) =>
                            updateEvent(event.id, "content", e.target.value)
                          }
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
                  <div className="text-center py-8 text-zinc-500">
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
              <h2 className="text-2xl font-bold text-zinc-900 mb-1">
                年表プレビュー
              </h2>
              <p className="text-sm text-zinc-600">
                左側で設定したイベントがここに表示されます
              </p>
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
    </div>
  )
}

interface TimelineSVGProps {
  startYearMonth: Date | undefined
  endYearMonth: Date | undefined
  events: EventData[]
}

const TimelineSVG = ({
  startYearMonth,
  endYearMonth,
  events,
}: TimelineSVGProps) => {
  const width = 800
  const height = 600
  const margin = { top: 50, right: 50, bottom: 50, left: 50 }
  const timelineWidth = width - margin.left - margin.right
  const timelineHeight = height - margin.top - margin.bottom

  if (!startYearMonth || !endYearMonth) {
    return (
      <div className="flex items-center justify-center h-[600px] text-zinc-500">
        開始年月と終了年月を設定してください
      </div>
    )
  }

  const startDate = startYearMonth.getTime()
  const endDate = endYearMonth.getTime()
  const dateRange = endDate - startDate

  if (dateRange <= 0) {
    return (
      <div className="flex items-center justify-center h-[600px] text-zinc-500">
        有効な期間を設定してください
      </div>
    )
  }

  const dateToX = (date: Date): number => {
    const time = date.getTime()
    const ratio = (time - startDate) / dateRange
    return margin.left + ratio * timelineWidth
  }

  const generateMonthTicks = () => {
    const ticks = []
    const start = new Date(startYearMonth)
    const end = new Date(endYearMonth)

    let current = new Date(start)
    while (current <= end) {
      const x = dateToX(current)
      const label = `${current.getFullYear()}/${current.getMonth() + 1}`
      ticks.push({ x, label })
      current.setMonth(current.getMonth() + 1)
    }

    return ticks
  }

  const monthTicks = generateMonthTicks()

  const renderEvents = () => {
    return events.map((event, index) => {
      const y = margin.top + 100 + index * 60

      if (!event.startDate) return null

      try {
        const startX = dateToX(event.startDate)

        if (event.endDate) {
          const endX = dateToX(event.endDate)
          const rectWidth = Math.max(endX - startX, 2)

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
          )
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
                fill="#27272a"
                fontSize="13"
                fontWeight="500"
              >
                {event.content}
              </text>
            </g>
          )
        }
      } catch (e) {
        return null
      }
    })
  }

  return (
    <svg
      width="100%"
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="overflow-visible"
    >
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
        stroke="#52525b"
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
            stroke="#52525b"
            strokeWidth={2}
          />
          <text
            x={tick.x}
            y={margin.top + 70}
            textAnchor="middle"
            fill="#71717a"
            fontSize="12"
            fontWeight="500"
          >
            {tick.label}
          </text>
        </g>
      ))}

      {renderEvents()}
    </svg>
  )
}

export default Home
