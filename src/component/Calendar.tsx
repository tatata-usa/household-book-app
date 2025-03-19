import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import jaLacale from '@fullcalendar/core/locales/ja'
import "../calendar.css"
import React from 'react'
import { DatesSetArg, EventContentArg } from '@fullcalendar/core'
import { Balance, CalendarContent, Transaction } from '../types'
import { calculateDailyBalances } from '../utils/financeCalculations'
import { formatCurrency } from '../utils/formatting'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { useTheme } from '@mui/material'
import { isSameMonth } from 'date-fns'

interface CalendarProps {
  monthlyTransactions: Transaction[],
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>
  setCurrentDay: React.Dispatch<React.SetStateAction<string>>
  currentDay: string
  today: string
}

const Calendar = ({monthlyTransactions, setCurrentMonth, setCurrentDay, currentDay, today}: CalendarProps) => {

  const renderEventContent = (eventInfo: EventContentArg) => {
    return(
      <div>
        <div className='money' id="event-income">
          {eventInfo.event.extendedProps.income}
        </div>
        <div className='money' id="event-expense">
          {eventInfo.event.extendedProps.expense}
        </div>
        <div className='money' id="event-balance">
          {eventInfo.event.extendedProps.balance}
        </div>
      </div>
    )
  }

  const createCalendarEvents = (dailyBalances: Record<string, Balance>): CalendarContent[] => {
    return Object.keys(dailyBalances).map((date) => {
      const {income, expense, balance} = dailyBalances[date]
      return {
        start: date,
        income: formatCurrency(income),
        expense: formatCurrency(expense),
        balance: formatCurrency(balance),
      }
    })
  }

  const theme = useTheme()
  // 選択された日付に色を付けるためのイベント
  const backgroundEvent = {
    start: currentDay,
    display: "background",
    backgroundColor: theme.palette.incomeColor.light
  }

  // 日付ごとの収支を計算
  const dailyBalances = calculateDailyBalances(monthlyTransactions)
  // FullCalendar用のイベントを生成
  const calendarEvents = createCalendarEvents(dailyBalances)

  // 月の日付取得
  const handleDateSet = (datesetInfo: DatesSetArg) => {
    const currentmonth = datesetInfo.view.currentStart
    setCurrentMonth(datesetInfo.view.currentStart)

    const todayDate = new Date();
    if(isSameMonth(todayDate, currentmonth)) {
      setCurrentDay(today)
    }
  }

  const handleDateClick = (dateInfo: DateClickArg) => {
    setCurrentDay(dateInfo.dateStr);
  }



  return (
    <FullCalendar
      locale={jaLacale}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView='dayGridMonth'
      events={[...calendarEvents, backgroundEvent]}
      eventContent={renderEventContent}
      datesSet={handleDateSet}
      dateClick={handleDateClick}

      />
  )
}

export default Calendar