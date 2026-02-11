import { useState } from "react"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import { Calendar as CalendarIcon, Plus, Trash2, Check } from "lucide-react"
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

// カラーパレット
const COLOR_PALETTE = {
  gray: [
    "#f9fafb", "#f3f4f6", "#e5e7eb", "#d1d5db",
    "#9ca3af", "#6b7280", "#4b5563", "#374151",
    "#1f2937", "#111827", "#0a0a0a", "#000000",
  ],
  blue: [
    "#eff6ff", "#dbeafe", "#bfdbfe", "#93c5fd",
    "#60a5fa", "#3b82f6", "#2563eb", "#1d4ed8",
    "#1e40af", "#1e3a8a", "#172554", "#0f1f3f",
  ],
  red: [
    "#fef2f2", "#fee2e2", "#fecaca", "#fca5a5",
    "#f87171", "#ef4444", "#dc2626", "#b91c1c",
    "#991b1b", "#7f1d1d", "#5f1c1c", "#3f0f0f",
  ],
  other: [
    "#22c55e", // 緑
    "#a855f7", // 紫
    "#eab308", // 黄色
    "#06b6d4", // シアン
    "#ec4899", // ピンク
    "#92400e", // 茶色
    "#ffd700", // ゴールド
    "#cd7f32", // ブロンズ
    "#f97316", // オレンジ
    "#84cc16", // ライム
    "#6366f1", // インディゴ
    "#14b8a6", // ティール
  ],
}

interface EventData {
  id: string
  startDate: Date | undefined
  endDate?: Date | undefined
  content: string
}

interface ColorSegment {
  id: string
  startDate: Date | undefined
  endDate: Date | undefined
  color: string
  textColor: string
}

interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
  label: string
}

const ColorPicker = ({ value, onChange, label }: ColorPickerProps) => {
  const allColors = [
    ...COLOR_PALETTE.gray,
    ...COLOR_PALETTE.blue,
    ...COLOR_PALETTE.red,
    ...COLOR_PALETTE.other,
  ]

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
          >
            <div
              className="w-6 h-6 rounded border border-zinc-300"
              style={{ backgroundColor: value }}
            />
            <span className="text-sm">{value}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3" align="start">
          <div className="space-y-3">
            <div>
              <div className="text-xs font-semibold text-zinc-600 mb-2">グレー</div>
              <div className="grid grid-cols-6 gap-2">
                {COLOR_PALETTE.gray.map((color) => (
                  <button
                    key={color}
                    onClick={() => onChange(color)}
                    className={cn(
                      "w-8 h-8 rounded border-2 transition-all hover:scale-110",
                      value === color ? "border-zinc-900 ring-2 ring-zinc-400" : "border-zinc-300"
                    )}
                    style={{ backgroundColor: color }}
                  >
                    {value === color && (
                      <Check className="w-4 h-4 mx-auto text-white mix-blend-difference" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-zinc-600 mb-2">青系</div>
              <div className="grid grid-cols-6 gap-2">
                {COLOR_PALETTE.blue.map((color) => (
                  <button
                    key={color}
                    onClick={() => onChange(color)}
                    className={cn(
                      "w-8 h-8 rounded border-2 transition-all hover:scale-110",
                      value === color ? "border-zinc-900 ring-2 ring-zinc-400" : "border-zinc-300"
                    )}
                    style={{ backgroundColor: color }}
                  >
                    {value === color && (
                      <Check className="w-4 h-4 mx-auto text-white mix-blend-difference" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-zinc-600 mb-2">赤系</div>
              <div className="grid grid-cols-6 gap-2">
                {COLOR_PALETTE.red.map((color) => (
                  <button
                    key={color}
                    onClick={() => onChange(color)}
                    className={cn(
                      "w-8 h-8 rounded border-2 transition-all hover:scale-110",
                      value === color ? "border-zinc-900 ring-2 ring-zinc-400" : "border-zinc-300"
                    )}
                    style={{ backgroundColor: color }}
                  >
                    {value === color && (
                      <Check className="w-4 h-4 mx-auto text-white mix-blend-difference" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-zinc-600 mb-2">その他</div>
              <div className="grid grid-cols-6 gap-2">
                {COLOR_PALETTE.other.map((color) => (
                  <button
                    key={color}
                    onClick={() => onChange(color)}
                    className={cn(
                      "w-8 h-8 rounded border-2 transition-all hover:scale-110",
                      value === color ? "border-zinc-900 ring-2 ring-zinc-400" : "border-zinc-300"
                    )}
                    style={{ backgroundColor: color }}
                  >
                    {value === color && (
                      <Check className="w-4 h-4 mx-auto text-white mix-blend-difference" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

const Home = () => {
  const [startYearMonth, setStartYearMonth] = useState<Date | undefined>(
    new Date(2020, 0, 1),
  )
  const [endYearMonth, setEndYearMonth] = useState<Date | undefined>(
    new Date(2025, 11, 1),
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
  const [colorSegments, setColorSegments] = useState<ColorSegment[]>([])

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

  const addColorSegment = () => {
    const newSegment: ColorSegment = {
      id: Date.now().toString(),
      startDate: startYearMonth || new Date(),
      endDate: endYearMonth || new Date(),
      color: "#3b82f6", // 青系の色
      textColor: "#ffffff", // 白1
    }
    setColorSegments([...colorSegments, newSegment])
  }

  const removeColorSegment = (id: string) => {
    setColorSegments(colorSegments.filter((segment) => segment.id !== id))
  }

  const updateColorSegment = (
    id: string,
    field: keyof ColorSegment,
    value: Date | undefined | string,
  ) => {
    setColorSegments(
      colorSegments.map((segment) =>
        segment.id === id ? { ...segment, [field]: value } : segment,
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
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="yyyy/M/d"
                      defaultValue={
                        startYearMonth
                          ? format(startYearMonth, "yyyy/M/d", { locale: ja })
                          : ""
                      }
                      key={startYearMonth?.getTime()}
                      onBlur={(e) => {
                        const value = e.target.value
                        // yyyy/M/d形式をパース
                        const match = value.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/)
                        if (match) {
                          const [, year, month, day] = match
                          const date = new Date(
                            parseInt(year),
                            parseInt(month) - 1,
                            parseInt(day)
                          )
                          if (!isNaN(date.getTime())) {
                            setStartYearMonth(date)
                          }
                        }
                      }}
                      className="flex-1"
                    />
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="icon">
                          <CalendarIcon className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={startYearMonth}
                          onSelect={(date) => {
                            if (date) {
                              // 月の1日に設定
                              setStartYearMonth(new Date(date.getFullYear(), date.getMonth(), 1))
                            }
                          }}
                          locale={ja}
                          captionLayout="dropdown"
                          fromYear={2000}
                          toYear={2050}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>終了年月</Label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="yyyy/M/d"
                      defaultValue={
                        endYearMonth
                          ? format(endYearMonth, "yyyy/M/d", { locale: ja })
                          : ""
                      }
                      key={endYearMonth?.getTime()}
                      onBlur={(e) => {
                        const value = e.target.value
                        // yyyy/M/d形式をパース
                        const match = value.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/)
                        if (match) {
                          const [, year, month, day] = match
                          const date = new Date(
                            parseInt(year),
                            parseInt(month) - 1,
                            parseInt(day)
                          )
                          if (!isNaN(date.getTime())) {
                            setEndYearMonth(date)
                          }
                        }
                      }}
                      className="flex-1"
                    />
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="icon">
                          <CalendarIcon className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={endYearMonth}
                          onSelect={(date) => {
                            if (date) {
                              // 月の1日に設定
                              setEndYearMonth(new Date(date.getFullYear(), date.getMonth(), 1))
                            }
                          }}
                          locale={ja}
                          captionLayout="dropdown"
                          fromYear={2000}
                          toYear={2050}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-zinc-900">
                  色セグメント
                </h2>
                <Button onClick={addColorSegment} size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  追加
                </Button>
              </div>

              <div className="space-y-3">
                {colorSegments.map((segment) => (
                  <Card key={segment.id} className="relative">
                    <CardContent className="pt-6 space-y-4">
                      <div className="space-y-2">
                        <Label>開始年月</Label>
                        <div className="flex gap-2">
                          <Input
                            type="text"
                            placeholder="yyyy/M/d"
                            defaultValue={
                              segment.startDate
                                ? format(segment.startDate, "yyyy/M/d", { locale: ja })
                                : ""
                            }
                            key={`start-${segment.id}-${segment.startDate?.getTime()}`}
                            onBlur={(e) => {
                              const value = e.target.value
                              // yyyy/M/d形式をパース
                              const match = value.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/)
                              if (match) {
                                const [, year, month, day] = match
                                const date = new Date(
                                  parseInt(year),
                                  parseInt(month) - 1,
                                  parseInt(day)
                                )
                                if (!isNaN(date.getTime())) {
                                  updateColorSegment(segment.id, "startDate", date)
                                }
                              }
                            }}
                            className="flex-1"
                          />
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" size="icon">
                                <CalendarIcon className="h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={segment.startDate}
                                onSelect={(date) => {
                                  if (date) {
                                    updateColorSegment(
                                      segment.id,
                                      "startDate",
                                      new Date(date.getFullYear(), date.getMonth(), 1)
                                    )
                                  }
                                }}
                                locale={ja}
                                captionLayout="dropdown"
                                fromYear={2000}
                                toYear={2050}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>終了年月</Label>
                        <div className="flex gap-2">
                          <Input
                            type="text"
                            placeholder="yyyy/M/d"
                            defaultValue={
                              segment.endDate
                                ? format(segment.endDate, "yyyy/M/d", { locale: ja })
                                : ""
                            }
                            key={`end-${segment.id}-${segment.endDate?.getTime()}`}
                            onBlur={(e) => {
                              const value = e.target.value
                              // yyyy/M/d形式をパース
                              const match = value.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/)
                              if (match) {
                                const [, year, month, day] = match
                                const date = new Date(
                                  parseInt(year),
                                  parseInt(month) - 1,
                                  parseInt(day)
                                )
                                if (!isNaN(date.getTime())) {
                                  updateColorSegment(segment.id, "endDate", date)
                                }
                              }
                            }}
                            className="flex-1"
                          />
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" size="icon">
                                <CalendarIcon className="h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={segment.endDate}
                                onSelect={(date) => {
                                  if (date) {
                                    updateColorSegment(
                                      segment.id,
                                      "endDate",
                                      new Date(date.getFullYear(), date.getMonth(), 1)
                                    )
                                  }
                                }}
                                locale={ja}
                                captionLayout="dropdown"
                                fromYear={2000}
                                toYear={2050}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>

                      <ColorPicker
                        label="背景色"
                        value={segment.color}
                        onChange={(color) =>
                          updateColorSegment(segment.id, "color", color)
                        }
                      />

                      <ColorPicker
                        label="文字色"
                        value={segment.textColor}
                        onChange={(color) =>
                          updateColorSegment(segment.id, "textColor", color)
                        }
                      />

                      <Button
                        onClick={() => removeColorSegment(segment.id)}
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

                {colorSegments.length === 0 && (
                  <div className="text-center py-8 text-zinc-500">
                    色セグメントを追加してください
                  </div>
                )}
              </div>
            </div>

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
                  colorSegments={colorSegments}
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
  colorSegments: ColorSegment[]
}

const TimelineSVG = ({
  startYearMonth,
  endYearMonth,
  events,
  colorSegments,
}: TimelineSVGProps) => {
  const width = 1000
  const height = 600
  const margin = { top: 80, right: 50, bottom: 50, left: 50 }
  const timelineWidth = width - margin.left - margin.right
  const bandHeight = 80
  const bandY = margin.top + 100

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

  // 年の区切りを生成（年表示用）
  const generateYearMarkers = () => {
    const markers = []
    const startYear = startYearMonth.getFullYear()
    const endYear = endYearMonth.getFullYear()

    for (let year = startYear; year <= endYear; year++) {
      const yearStart = new Date(year, 0, 1)
      const yearEnd = new Date(year, 11, 31)

      const segmentStart = new Date(
        Math.max(yearStart.getTime(), startDate)
      )
      const segmentEnd = new Date(
        Math.min(yearEnd.getTime(), endDate)
      )

      const x = dateToX(segmentStart)
      const width = dateToX(segmentEnd) - x

      markers.push({
        year,
        x,
        width,
      })
    }

    return markers
  }

  const yearMarkers = generateYearMarkers()

  // カスタム色セグメントをレンダリング用に準備
  const renderColorSegments = () => {
    return colorSegments.map((segment) => {
      if (!segment.startDate || !segment.endDate) return null

      try {
        const startX = dateToX(segment.startDate)
        const endX = dateToX(segment.endDate)
        const width = Math.max(endX - startX, 2)

        // 表示テキスト: "開始年月 - 終了年月"
        const startText = format(segment.startDate, "yyyy/M", { locale: ja })
        const endText = format(segment.endDate, "yyyy/M", { locale: ja })
        const label = `${startText} - ${endText}`

        return {
          id: segment.id,
          x: startX,
          width,
          color: segment.color,
          textColor: segment.textColor,
          label,
        }
      } catch (e) {
        return null
      }
    }).filter((seg) => seg !== null)
  }

  const customSegments = renderColorSegments()

  const renderEvents = () => {
    return events.map((event, index) => {
      if (!event.startDate) return null

      try {
        const startX = dateToX(event.startDate)

        if (event.endDate) {
          // 期間イベント
          const endX = dateToX(event.endDate)
          const rectWidth = Math.max(endX - startX, 20)
          const y = bandY + bandHeight + 20

          return (
            <g key={event.id}>
              {/* 接続線 */}
              <line
                x1={startX}
                y1={bandY + bandHeight}
                x2={startX}
                y2={y}
                stroke="#71717a"
                strokeWidth={2}
              />
              <line
                x1={endX}
                y1={bandY + bandHeight}
                x2={endX}
                y2={y}
                stroke="#71717a"
                strokeWidth={2}
              />
              {/* イベントバー */}
              <rect
                x={startX}
                y={y}
                width={rectWidth}
                height={30}
                fill="#3b82f6"
                rx="6"
                opacity="0.9"
              />
              <text
                x={startX + rectWidth / 2}
                y={y + 20}
                textAnchor="middle"
                fill="white"
                fontSize="13"
                fontWeight="600"
              >
                {event.content}
              </text>
            </g>
          )
        } else {
          // 単発イベント
          const y = bandY - 20
          const alternate = index % 2 === 0

          return (
            <g key={event.id}>
              {/* 接続線 */}
              <line
                x1={startX}
                y1={bandY}
                x2={startX}
                y2={alternate ? y : bandY + bandHeight + 40}
                stroke="#ef4444"
                strokeWidth={2}
              />
              {/* ドット */}
              <circle
                cx={startX}
                cy={bandY + bandHeight / 2}
                r={8}
                fill="#ef4444"
                stroke="white"
                strokeWidth={2}
              />
              {/* ラベル */}
              <text
                x={startX}
                y={alternate ? y - 5 : bandY + bandHeight + 55}
                textAnchor="middle"
                fill="#27272a"
                fontSize="13"
                fontWeight="600"
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
      {/* デフォルトの帯（グレー） */}
      <rect
        x={margin.left}
        y={bandY}
        width={timelineWidth}
        height={bandHeight}
        fill="#d4d4d8"
        opacity="0.85"
      />

      {/* 色セグメントがない場合は期間設定の範囲を表示 */}
      {customSegments.length === 0 && (
        <text
          x={margin.left + timelineWidth / 2}
          y={bandY + bandHeight / 2 + 6}
          textAnchor="middle"
          fill="#27272a"
          fontSize="18"
          fontWeight="700"
        >
          {format(startYearMonth, "yyyy/M", { locale: ja })} - {format(endYearMonth, "yyyy/M", { locale: ja })}
        </text>
      )}

      {/* カスタム色セグメント */}
      {customSegments.map((segment) => (
        <g key={segment.id}>
          <rect
            x={segment.x}
            y={bandY}
            width={segment.width}
            height={bandHeight}
            fill={segment.color}
            opacity="0.85"
          />
          {/* 色セグメントのラベル */}
          <text
            x={segment.x + segment.width / 2}
            y={bandY + bandHeight / 2 + 6}
            textAnchor="middle"
            fill={segment.textColor}
            fontSize="16"
            fontWeight="700"
          >
            {segment.label}
          </text>
        </g>
      ))}

      {/* イベント */}
      {renderEvents()}
    </svg>
  )
}

export default Home
