// ** React Imports
import { Fragment, useContext } from 'react'

// ** Custom Components
import NavbarUser from './NavbarUser'
import NavbarBookmarks from './NavbarBookmarks'
import {Button} from 'reactstrap'
import { AbilityContext } from '@src/utility/context/Can'

const ThemeNavbar = props => {
  // ** Props
  const ability = useContext(AbilityContext)
  const { skin, setSkin, setMenuVisibility } = props

  return (
    <Fragment>
      <div className='bookmark-wrapper d-flex align-items-center'>
        <Button.Ripple outline  color ="primary" onClick={ () => { window.location.pathname = "/" } }>
          Home
        </Button.Ripple>
        {
          ability.can('read', 'Analysis') && <Button.Ripple onClick={() => { window.location.pathname = '/Orders' }} outline style={{ marginLeft:"5px"}}  color ="primary" outline >
            Orders
          </Button.Ripple>
        }
        {
          !ability.can('read', "Analytics") && <Button.Ripple style={{marginLeft:"5px"}} color="primary" outline >About Us</Button.Ripple>
        }
        {/* <NavbarBookmarks setMenuVisibility={setMenuVisibility} /> */}
      </div>
      <NavbarUser skin={skin} setSkin={setSkin} />
    </Fragment>
  )
}

export default ThemeNavbar
