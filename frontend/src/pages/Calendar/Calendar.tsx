import { useEffect, useMemo, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react'

import { DayGlobe, Header, Spinner } from '/src/components'
import { useCalendarQuery } from '/src/hooks'
import { Calendar } from '/src/hooks/useCalendarQuery'

import styles from './Calendar.module.css'
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
      .filter(date => dayjs(date).month() === currentPage.month() && dayjs(date).year() === currentPage.year())
      .sort((a, b) => dayjs(a).isBefore(dayjs(b)) ? -1 : 1)
      .reduce((obj, key) => ({...obj, [key]: calendar[key]}), {})
  , [calendar, currentPage])

  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

  const [openedDate, setOpenedDate] = useState<string | undefined>(undefined)

  const openedDayTasks = useMemo(() => (openedDate && currentMonthTasks) ? currentMonthTasks[openedDate].sort((a, b) => a.order - b.order) : [], [currentMonthTasks, openedDate])

  return (<main className={styles.pageContainer}>
    <Header />
    <div className={styles.controlsWrapper}>
      <div className={styles.controlsContainer}>
        <button className={styles.controlButton}
          disabled={firstPage?.isSame(currentPage)}
          onClick={(() => setCurrentPage(firstPage || currentPage))}>
          <ChevronFirst />
        </button>

        <button className={styles.controlButton}
          disabled={firstPage?.isSame(currentPage)}
          onClick={() => setCurrentPage(currentPage.subtract(1, 'month'))}>
          <ChevronLeft />
        </button>

        <h2 className={styles.controlMonth}>{currentPage.format('MMMM')}</h2>

        <button className={styles.controlButton}
          disabled={lastPage?.isSame(currentPage)}
          onClick={() => setCurrentPage(currentPage.add(1, 'month'))}>
          <ChevronRight />
        </button>

        <button className={styles.controlButton}
          disabled={lastPage?.isSame(currentPage)}
          onClick={(() => setCurrentPage(lastPage || currentPage))}>
          <ChevronLast />
        </button>
      </div>
      <span className={styles.controlYear}>{currentPage.year()}</span>
    </div>

    {loading || !currentMonthTasks ?
      <Spinner center={true} /> : <>
        <div className={styles.monthWrapper}>
          <div className={styles.monthContainer}>
            {daysOfWeek.map((d, i) => <p className={styles.dayLabel} key={i}>{d}</p>)}
            {Array.from({ length: (dayjs(Object.keys(currentMonthTasks)[0]).day() + 6) % 7 }, (_, i) => i + 1).map(i =>
              <DayGlobe key={i} date="" setOpenedDate={() => undefined} tasks={[]} />
            )}
            {Object.entries(currentMonthTasks).map(([date, tasks]) => (<DayGlobe key={date} date={date} setOpenedDate={() => setOpenedDate(date)} tasks={tasks} />))}
          </div>

        </div>
      </>
    }


    <Day openedDate={openedDate} tasks={openedDayTasks} closeFn={() => setOpenedDate(undefined)} />
  </main>)
}

export default Main
