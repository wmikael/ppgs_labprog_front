import {Outlet} from 'react-router-dom'
import {Header} from '../pages/Header'

export function DefaultLayout() {
    return (
      <div>
        <Header/>
        <Outlet/>
      </div>
    )
}
