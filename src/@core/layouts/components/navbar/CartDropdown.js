// ** React Imports
import { useEffect, Fragment, useState } from 'react'
import { Link } from 'react-router-dom'

// ** Custom Components
import NumberInput from '@components/number-input'

// ** Third Party Components
import { ShoppingCart, X } from 'react-feather'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem, Media, Badge, Button } from 'reactstrap'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getCartItems, deleteCartItem, getProduct } from '@src/views/apps/ecommerce/store/actions'
import { data } from 'jquery'

const CartDropdown = () => {
  // ** State
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [dataForStore, setdataForStore] = useState([])
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.ecommerce)

  // ** ComponentDidMount
  useEffect(() => {
    let i = 0
    const array = []
    const data = localStorage.length
    for (i = 0; i < data; i++) {
      const keyInStorage = localStorage.key(i)
      if (keyInStorage !== "userData" && keyInStorage !== "skin") {
        array.push(keyInStorage)
      }
    }
    setdataForStore(array)
  }, [localStorage])

  // ** Function to toggle Dropdown
  const toggle = () => setDropdownOpen(prevState => !prevState)

  // ** Function to call on Dropdown Item Click
  const handleDropdownItemClick = id => {
    dispatch(getProduct(id))
    toggle()
  }

  // ** Loops through Cart Array to return Cart Items
  const renderCartItems = () => {
    if (dataForStore.length > 0) {
      let total = 0

      return (
        <Fragment>
          <PerfectScrollbar
            options={{
              wheelPropagation: false
            }}
            className='scrollable-container media-list'
          >
            {dataForStore.map(item => {
            
              const data = JSON.parse(localStorage.getItem(item))
              // let quantity = 1
              // console.log(data)
              if (data) {
              const price =  parseInt(data.price) - (parseInt(data.price) * parseInt(data.discount) / 100)
              total = total + price
              return (
                <Media key={item.id} className='align-items-center'>
                  <img className='d-block rounded mr-1' src={data.image} alt={item.name} width='62' />
                  <Media body>
                    <X size={14} className='cart-item-remove' onClick={() => { localStorage.removeItem(data.id) }} />
                    <div className='media-heading'>
                      <h6 className='cart-item-title'>
                        <Link
                          className='text-body'
                          to={`/product-discription/${data.id}`}
                          // onClick={() => handleDropdownItemClick(item.id)}
                        >
                          {data.name}
                        </Link>
                      </h6>
                      {/* <small className='cart-item-by'>by {item.brand}</small> */}
                    </div>
                    {/* <div className='cart-item-qty'>
                      <NumberInput
                        min={1}
                        max={10}
                        size='sm'
                        className='p-0'
                        onChange = {(e) => { quantity = e }}
                        style={{ width: '7rem', height: '2.15rem' }}
                      />
                    </div> */}
                    <h5 className='cart-item-price'>Rs  {parseInt(data.price) - (parseInt(data.price) * parseInt(data.discount) / 100)}</h5>
                  </Media>
                </Media>
              )
              }
            })}
          </PerfectScrollbar>
          <li className='dropdown-menu-footer'>
            <div className='d-flex justify-content-between mb-1'>
              <h6 className='font-weight-bolder mb-0'>Total:</h6>
              <h6 className='text-primary font-weight-bolder mb-0'>Rs{Number(total.toFixed(2))}</h6>
            </div>
            <Button.Ripple tag={Link} to='/apps/ecommerce/checkout' color='primary' block onClick={toggle}>
              Checkout
            </Button.Ripple>
          </li>
        </Fragment>
      )
    } else {
      return <p className='m-0 p-1 text-center'>Your cart is empty</p>
    }
  }

  return (
    <Dropdown onClick={() => { window.location.pathname = "/apps/ecommerce/checkout" }} isOpen={false} toggle={toggle} tag='li' className='dropdown-cart nav-item mr-25'>
      <DropdownToggle tag='a' className='nav-link position-relative'>
        <ShoppingCart className='ficon' />
        {dataForStore.length > 0 ? (
          <Badge pill color='primary' className='badge-up'>
            {dataForStore.length}
          </Badge>
        ) : null}
      </DropdownToggle>
      <DropdownMenu right tag='ul' className='dropdown-menu-media dropdown-cart mt-0'>
        <li className='dropdown-menu-header'>
          <DropdownItem tag='div' className='d-flex' header>
            <h4 className='notification-title mb-0 mr-auto'>My Cart</h4>
            <Badge color='light-primary' pill>
              {dataForStore.length > 0 && dataForStore.length} Items
            </Badge>
          </DropdownItem>
        </li>
        {renderCartItems()}
      </DropdownMenu>
    </Dropdown>
  )
}

export default CartDropdown
