// ** React Imports
import { Link } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import { X, Heart, Star } from 'react-feather'
import { Card, CardBody, CardText, Button, Badge, InputGroup, InputGroupAddon, Input, InputGroupText } from 'reactstrap'

// ** Custom Components
import NumberInput from '@components/number-input'
import { useEffect, useState } from 'react'

const Cart = props => {
  // ** Props

  const { products, stepper, deleteCartItem, dispatch, addToWishlist, deleteWishlistItem, getCartItems } = props
  const [dataForStore, setdataForStore] = useState([])
  const [total, settotal] = useState(0)
  const [discount, setdiscount] = useState(0)
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
    let total = 0
    let discount = 0
    array.map(item => {        
      const data = JSON.parse(localStorage.getItem(item))
      // let quantity = 1
      // console.log(data)
      if (data) {
      const price =  parseInt(data.price) - (parseInt(data.price) * parseInt(data.discount) / 100)
      total = total +  parseInt(data.price)
      discount = discount + (parseInt(data.price) * parseInt(data.discount) / 100)
      }
    })
    settotal(total)
    setdiscount(discount)
    return () => {
    
    }
  }, [localStorage.length])
  // ** Function to convert Date
  const formatDate = (value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) => {
    if (!value) return value
    return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
  }

  // ** Funciton Function to toggle wishlist item
  const handleWishlistClick = (id, val) => {
    if (val) {
      dispatch(deleteWishlistItem(id))
    } else {
      dispatch(addToWishlist(id))
    }
    dispatch(getCartItems())
  }
  useEffect(() => {
    return () => {
     
    }
  }, [])
  // ** Render cart items
  const renderCart = () => {
  
    return dataForStore.map(item => {        
      const data = JSON.parse(localStorage.getItem(item))
      // let quantity = 1
      // console.log(data)
      if (data) {
      const price =  parseInt(data.price) - (parseInt(data.price) * parseInt(data.discount) / 100)
     
      return (
        <Card key={data.name} className='ecommerce-card'>
          <div className='item-img'>
            <Link to={`/product-discription/${data.id}`}>
              <img className='img-fluid' src={data.image} alt={data.name} />
            </Link>
          </div>
          <CardBody>
            <div className='item-name'>
              <h6 className='mb-0'>
                <Link to={`/product-discription/${data.id}`}>{data.name}</Link>
              </h6>
              <span className='item-company'>
                {data.description}
              </span>
              {/* <div className='item-rating'>
                <ul className='unstyled-list list-inline'>
                  {new Array(5).fill().map((listItem, index) => {
                    return (
                      <li key={index} className='ratings-list-item mr-25'>
                        <Star
                          className={classnames({
                            'filled-star': index + 1 <= item.rating,
                            'unfilled-star': index + 1 > item.rating
                          })}
                        />
                      </li>
                    )
                  })}
                </ul>
              </div> */}
            </div>
            <span className='text-success mb-1'><span style={{color:`${parseInt(data.quantity) > 0 ? "limegreen" : "red"}`}} >{parseInt(data.quantity) > 0 ? "InStock" : "OutOfStock"}</span></span>
            {/* <div className='item-quantity'>
              <span className='quantity-title mr-50'>Qty</span>
              <NumberInput value={item.qty} min={1} max={10} size='sm' style={{ width: '7rem', height: '2.15rem' }} />
            </div> */}
            {/* <div className='delivery-date text-muted'>Delivery by, {formatDate(item.shippingDate)}</div> */}
            {/* <span className='text-success'>
              {item.discountPercentage}% off {item.offers} offers Available
            </span> */}
          </CardBody>
          <div className='item-options text-center'>
            <div className='item-wrapper'>
              <div className='item-cost'>
                <h4 className='item-price'>Rs  {parseInt(data.price) - (parseInt(data.price) * parseInt(data.discount) / 100)}</h4>
                {item.hasFreeShipping ? (
                  <CardText className='shipping'>
                    <Badge color='light-success' pill>
                      Free Shipping
                    </Badge>
                  </CardText>
                ) : null}
              </div>
            </div>
            <Button className='mt-1 remove-wishlist' color='light' onClick={() => { localStorage.removeItem(data.id); window.location.reload()  }}>
              <X size={14} className='mr-25' />
              <span>Remove</span>
            </Button>
            {/* <Button
              className='btn-cart'
              color='primary'
              onClick={() => handleWishlistClick(item.id, item.isInWishlist)}
            >
              <Heart
                size={14}
                className={classnames('mr-25', {
                  'fill-current': item.isInWishlist
                })}
              />
              <span className='text-truncate'>Wishlist</span>
            </Button> */}
          </div>
        </Card>
      )
    }
    })
  }

  return (
    <div className='list-view product-checkout'>
      <div className='checkout-items'>{products.length ? renderCart() : <h4>Your cart is empty</h4>}</div>
      <div className='checkout-options'>
        <Card>
          <CardBody>
            <label className='section-label mb-1'>Options</label>
            {/* <InputGroup className='input-group-merge coupons'>
              <Input placeholder='Coupons' />
              <InputGroupAddon addonType='append'>
                <InputGroupText className='text-primary'>Apply</InputGroupText>
              </InputGroupAddon>
            </InputGroup> */}
            <hr />
            <div className='price-details'>
              <h6 className='price-title'>Price Details</h6>
              <ul className='list-unstyled'>
                <li className='price-detail'>
                  <div className='detail-title'>Total MRP</div>
                  <div className='detail-amt'>Rs {total}</div>
                </li>
                <li className='price-detail'>
                  <div className='detail-title'>Total Discount</div>
                  <div className='detail-amt discount-amt text-success'>Rs {discount}</div>
                </li>
                {/* <li className='price-detail'>
                  <div className='detail-title'>Estimated Tax</div>
                  <div className='detail-amt'></div>
                </li> */}
                {/* <li className='price-detail'>
                  <div className='detail-title'>EMI Eligibility</div>
                  <a href='/' className='detail-amt text-primary' onClick={e => e.preventDefault()}>
                    Details
                  </a>
                </li> */}
                <li className='price-detail'>
                  <div className='detail-title'>Delivery Charges</div>
                  <div className='detail-amt discount-amt text-success'>Free</div>
                </li>
              </ul>
              <hr />
              <ul className='list-unstyled'>
                <li className='price-detail'>
                  <div className='detail-title detail-total'>Total</div>
                  <div className='detail-amt font-weight-bolder'>Rs {total - discount}</div>
                </li>
              </ul>
              <Button.Ripple
                color='primary'
                classnames='btn-next place-order'
                block
                disabled={!products.length}
                onClick={() => stepper.next()}
              >
                Place Order
              </Button.Ripple>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Cart
