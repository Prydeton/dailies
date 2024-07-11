import dayjs, { type Dayjs } from 'dayjs'
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { DayGlobe, Header, Spinner } from '/src/components'
import { useAuth, useGetMonth } from '/src/hooks'
import DayDrawer from '../DayDrawer/DayDrawer'
import styles from './Calendar.module.css'

const Main = () => {
  const { session } = useAuth()

  const [currentPage, setCurrentPage] = useState<Dayjs>(dayjs().startOf('month'))
  const [firstPage, setFirstPage] = useState<Dayjs | undefined>()
  const lastPage = dayjs().startOf('month')

  const [openedDate, setOpenedDate] = useState<string | undefined>(undefined)
  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

  const { isLoading, data: month } = useGetMonth(currentPage)

  useEffect(() => {
    setFirstPage(dayjs(session?.user.created_at).startOf('month'))
  }, [session])

  const openedDay = useMemo(() => month?.days.filter((day) => day.date === openedDate)[0], [month, openedDate])

  return (
    <main className={styles.pageContainer}>
      <Header />
      <div className={styles.controlsWrapper}>
        <div className={styles.controlsContainer}>
          <button
            type="button"
            className={styles.controlButton}
            disabled={firstPage?.isSame(currentPage)}
            onClick={() => setCurrentPage(firstPage || currentPage)}
          >
            <ChevronFirst />
          </button>

          <button
            type="button"
            className={styles.controlButton}
            disabled={firstPage?.isSame(currentPage)}
            onClick={() => setCurrentPage(currentPage.subtract(1, 'month'))}
          >
            <ChevronLeft />
          </button>

          <h2 className={styles.controlMonth}>{currentPage.format('MMMM')}</h2>

          <button
            type="button"
            className={styles.controlButton}
            disabled={lastPage?.isSame(currentPage)}
            onClick={() => setCurrentPage(currentPage.add(1, 'month'))}
          >
            <ChevronRight />
          </button>

          <button
            type="button"
            className={styles.controlButton}
            disabled={lastPage?.isSame(currentPage)}
            onClick={() => setCurrentPage(lastPage || currentPage)}
          >
            <ChevronLast />
          </button>
        </div>
        <span className={styles.controlYear}>{currentPage.year()}</span>
      </div>

      {isLoading || !month ? (
        <Spinner center={true} />
      ) : (
        <>
          <div className={styles.monthWrapper}>
            <div className={styles.monthContainer}>
              {daysOfWeek.map((d, i) => (
                <p className={styles.dayLabel} key={i}>
                  {d}
                </p>
              ))}
              {Array.from(
                {
                  length: (dayjs(month.days[0].date).day() + 6) % 7,
                },
                (_, i) => i + 1,
              ).map((i) => (
                <DayGlobe key={i} date="" setOpenedDate={() => undefined} tasks={[]} />
              ))}
              {month.days.map(({ date, tasks }) => (
                <DayGlobe key={date} date={date} setOpenedDate={() => setOpenedDate(date)} tasks={tasks} />
              ))}
            </div>
          </div>
        </>
      )}

      <DayDrawer day={openedDay} closeFn={() => setOpenedDate(undefined)} />
    </main>
  )
}

export default Main
