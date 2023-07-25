import { useEffect, useMemo, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react'

import { DayGlobe, Header, Spinner } from '/src/components'
import { useCalendarQuery } from '/src/hooks'
import { Calendar } from '/src/hooks/useCalendarQuery'

import { ControlButton, ControlMonth, ControlsContainer, ControlsWrapper, ControlYear, MonthContainer, PageContainer } from './Calendar.styles'
import { Day } from '..'

const Main = () => {
  const {
    calendar,
    loading,
  } = useCalendarQuery()

  const [currentPage, setCurrentPage] = useState<Dayjs>(dayjs().startOf('month'))
  const [firstPage, setFirstPage] = useState<Dayjs | undefined>()
  const [lastPage, setLastPage] = useState<Dayjs | undefined>()

  const sortedCalendar = useMemo(() => calendar &&
    Object.keys(calendar).sort((a, b) => dayjs(a).isBefore(dayjs(b)) ? -1 : 1)
      .reduce((obj, key) => ({...obj, [key]: calendar[key]}), {})
  , [calendar])

  useEffect(() => {
    if (sortedCalendar) {
      const sortedDates = Object.keys(sortedCalendar)
      setFirstPage(dayjs(sortedDates.at(0)).startOf('month'))
      setLastPage(dayjs(sortedDates.at(-1)).startOf('month'))
    }
  }, [sortedCalendar])

  const currentMonthTasks: Calendar | undefined = useMemo(() => calendar &&
    Object.keys(calendar)
      .filter(date => dayjs(date).month() === currentPage.month())
      .sort((a, b) => dayjs(a).isBefore(dayjs(b)) ? -1 : 1)
      .reduce((obj, key) => ({...obj, [key]: calendar[key]}), {})
  , [calendar, currentPage])

  const [openedDate, setOpenedDate] = useState<string | undefined>(undefined)

  const openedDayTasks = useMemo(() => (openedDate && currentMonthTasks) ? currentMonthTasks[openedDate].sort((a, b) => a.order - b.order) : [], [currentMonthTasks, openedDate])

  return (<PageContainer>
    <Header />
    <ControlsWrapper>
      <ControlsContainer>
        <ControlButton
          disabled={firstPage?.isSame(currentPage)}
          onClick={(() => setCurrentPage(firstPage || currentPage))}>
          <ChevronFirst />
        </ControlButton>

        <ControlButton
          disabled={firstPage?.isSame(currentPage)}
          onClick={() => setCurrentPage(currentPage.subtract(1, 'month'))}>
          <ChevronLeft />
        </ControlButton>

        <ControlMonth>{currentPage.format('MMMM')}</ControlMonth>

        <ControlButton
          disabled={lastPage?.isSame(currentPage)}
          onClick={() => setCurrentPage(currentPage.add(1, 'month'))}>
          <ChevronRight />
        </ControlButton>

        <ControlButton
          disabled={lastPage?.isSame(currentPage)}
          onClick={(() => setCurrentPage(lastPage || currentPage))}>
          <ChevronLast />
        </ControlButton>
      </ControlsContainer>
      <ControlYear>{currentPage.year()}</ControlYear>
    </ControlsWrapper>

    {loading || !currentMonthTasks ?
      <Spinner center={true} /> :
      <MonthContainer>
        {Object.entries(currentMonthTasks).map(([date, tasks]) => (<DayGlobe key={date} date={date} setOpenedDate={() => setOpenedDate(date)} tasks={tasks} />))}
      </MonthContainer>
    }

    <Day openedDate={openedDate} tasks={openedDayTasks} closeFn={() => setOpenedDate(undefined)} />
  </PageContainer>)
}

export default Main
