import { useEffect, useMemo, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react'
import { useLocation } from 'wouter'

import { DayGlobe, Header, Spinner } from '/src/components'
import { Calendar } from '/src/config/api'
import { useCalendarStore } from '/src/hooks'
import { useAuthStore } from '/src/hooks/useAuth'

import { ControlButton, ControlMonth, ControlsContainer, ControlsWrapper, MonthContainer, PageContainer } from './Calendar.styles'
import { Day } from '..'

const Main = () => {
  const { isAuthLoading, session } = useAuthStore()
  const { calendar, loading: isCalendarLoading, getCalendar } = useCalendarStore()
  const [, setLocation] = useLocation()

  useEffect(() => {
    if (!isAuthLoading) {
      !session ? setLocation('/login') : getCalendar()
    }
  }, [isAuthLoading, session])

  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs().startOf('month'))
  const [firstMonth, setFirstMonth] = useState<Dayjs | undefined>()
  const [lastMonth, setLastMonth] = useState<Dayjs | undefined>()

  const sortedCalendar = useMemo(() => calendar &&
    Object.keys(calendar).sort((a, b) => dayjs(a).isBefore(dayjs(b)) ? -1 : 1)
      .reduce((obj, key) => ({...obj, [key]: calendar[key]}), {})
  , [calendar])

  useEffect(() => {
    if (sortedCalendar) {
      const sortedDates = Object.keys(sortedCalendar)
      setFirstMonth(dayjs(sortedDates.at(0)).startOf('month'))
      setLastMonth(dayjs(sortedDates.at(-1)).startOf('month'))
    }
  }, [sortedCalendar])

  const currentMonthTasks: Calendar | null = useMemo(() => calendar &&
    Object.keys(calendar)
      .filter(date => dayjs(date).month() === currentMonth.month())
      .sort((a, b) => dayjs(a).isBefore(dayjs(b)) ? -1 : 1)
      .reduce((obj, key) => ({...obj, [key]: calendar[key]}), {})
  , [calendar, currentMonth])

  const [openedDate, setOpenedDate] = useState<string | undefined>(undefined)

  const openedDayTasks = useMemo(() => (openedDate && currentMonthTasks) ? currentMonthTasks[openedDate].sort((a, b) => a.order - b.order) : [], [currentMonthTasks, openedDate])

  return (<PageContainer>
    <Header />
    <ControlsWrapper>
      <ControlsContainer>
        <ControlButton
          disabled={firstMonth?.isSame(currentMonth)}
          onClick={(() => setCurrentMonth(firstMonth || currentMonth))}>
          <ChevronFirst />
        </ControlButton>

        <ControlButton
          disabled={firstMonth?.isSame(currentMonth)}
          onClick={() => setCurrentMonth(currentMonth.subtract(1, 'month'))}>
          <ChevronLeft />
        </ControlButton>

        <ControlMonth>{currentMonth.format('MMMM')}</ControlMonth>

        <ControlButton
          disabled={lastMonth?.isSame(currentMonth)}
          onClick={() => setCurrentMonth(currentMonth.add(1, 'month'))}>
          <ChevronRight />
        </ControlButton>

        <ControlButton
          disabled={lastMonth?.isSame(currentMonth)}
          onClick={(() => setCurrentMonth(lastMonth || currentMonth))}>
          <ChevronLast />
        </ControlButton>
      </ControlsContainer>
    </ControlsWrapper>

    <MonthContainer>
      {isCalendarLoading || !currentMonthTasks ?
        <Spinner center={true} /> : <>
          {Object.entries(currentMonthTasks).map(([date, tasks]) => (<DayGlobe key={date} date={date} setOpenedDate={() => setOpenedDate(date)} tasks={tasks} />))}
        </>
      }
    </MonthContainer>

    <Day openedDate={openedDate} tasks={openedDayTasks} closeFn={() => setOpenedDate(undefined)} />
  </PageContainer>)
}

export default Main
