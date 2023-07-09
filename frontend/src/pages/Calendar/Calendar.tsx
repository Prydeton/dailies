import { useEffect } from 'react'
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react'
import { useLocation } from 'wouter'

import { DayGlobe, Header, Spinner } from '/src/components'
import { useCalendarStore } from '/src/hooks'
import { useAuthStore } from '/src/hooks/useAuth'

import { ControlButton, ControlMonth, ControlsContainer, MonthContainer } from './Calendar.styles'

const Main = () => {
  const { isAuthLoading, session, signOut } = useAuthStore()
  const { calendar, loading: isCalendarLoading, getCalendar } = useCalendarStore()
  const [_, setLocation] = useLocation()
  console.log(calendar)
  useEffect(() => {
    if (!isAuthLoading) {
      !session ? setLocation('/login') : getCalendar()
    }
  }, [isAuthLoading, session])


  const handleSignout = () => {
    signOut()
  }

  return (<>
    <Header />
    <ControlsContainer>
      <ControlButton
        disabled={false}
        onClick={(() => console.log('End left'))}>
        <ChevronFirst />
      </ControlButton>

      <ControlButton
        disabled={false}
        onClick={() => console.log('Left')}>
        <ChevronLeft />
      </ControlButton>

      <ControlMonth>DECEMBER</ControlMonth>

      <ControlButton
        disabled={false}
        onClick={() => console.log('Right')}>
        <ChevronRight />
      </ControlButton>

      <ControlButton
        disabled={true}
        onClick={(() => console.log('End Right'))}>
        <ChevronLast />
      </ControlButton>
    </ControlsContainer>

    <MonthContainer>
      {isCalendarLoading || !calendar ?
        <Spinner center={true} /> : <>
          {Object.entries(calendar).forEach(([date, tasks]) => (<DayGlobe key={date} />))}
        </>
      }
    </MonthContainer>
    <button onClick={() => handleSignout()} />
  </>)
}

export default Main
