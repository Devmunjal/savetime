// ** Third Party Components
import { Card, Label, FormGroup, CardHeader, CardTitle, CardBody, CardText, Button, Row, Col } from 'reactstrap'
import { AvForm, AvInput } from 'availity-reactstrap-validation-safe'
import { Fragment, useState } from 'react'
import { insert } from 'formik'
import { toast } from 'react-toastify'

const Address = props => {
  // ** Props
  const { stepper } = props
  const [name, setname] = useState()
  const [number, setnumber] = useState()
  const [fatherName, setfatherName] = useState()
  const [house, sethouse] = useState()
  const [landmark, setlandmark] = useState()
  const [village, setvillage] = useState()
  const [pin, setpin] = useState()
  const [address, setaddress] = useState("")
  // ** On form submit if there are no errors then go to next step
  const onSubmit = (event, errors) => {
    if (!errors.length) {
      stepper.next()
    }
    event.preventDefault()
  }
  const redirect = () => {
    window.location.pathname = "/"
  }
  const removeLocalStorage = () => {
    let i = 0
    const data = localStorage.length
    for (i = 0; i < data; i++) {
      const keyInStorage = localStorage.key(i)
      if (keyInStorage !== "userData" && keyInStorage !== "skin") {
        localStorage.removeItem(keyInStorage)
      }
    }
    redirect()
  }
  const AutoCloseToast = () => (
    removeLocalStorage(),
    <Fragment>
      <div className='toastify-header'>
        <div className='title-wrapper'>
          {/* <Avatar size='sm' color='primary' icon={<Loader size={12} />} /> */}
          <h6 className='text-primary ml-50 mb-0'>Order Placed</h6>
        </div>
        {/* <small className='text-muted'>Check Your Cart</small> */}
      </div>
      <div className='toastify-body'>
        <span>ThankYou We Will Call You Soon</span>
      </div>
    </Fragment>
  )
  const notifyAutoClose = () => toast.success(<AutoCloseToast />, { autoClose: 3000, hideProgressBar: true })
  const InsertOrder = (address) => {
    console.log(address)
    let i = 0
    const array = []
    const data = localStorage.length
    for (i = 0; i < data; i++) {
      const keyInStorage = localStorage.key(i)
      if (keyInStorage !== "userData" && keyInStorage !== "skin") {
        array.push(keyInStorage)
      }
    }
    let total = 0
    let discount = 0
    array.map(item => {        
      const data = JSON.parse(localStorage.getItem(item))
      // let quantity = 1
      // console.log(data)
      if (data) {
      const price =  parseInt(data.price) - (parseInt(data.price) * parseInt(data.discount) / 100)
      total = total +  parseInt(data.price) - (parseInt(data.price) * parseInt(data.discount) / 100)
      discount = discount + (parseInt(data.price) * parseInt(data.discount) / 100)
      }
    })
    fetch('https://savetimesavemoney.hasura.app/v1/graphql', {
     headers: {'content-type': 'application/json'},
      method: 'POST',
      body: JSON.stringify({
        query:`mutation {
          insert_orders(objects: {PaymentType: "Cash", address:"${address}", products: "${array.toString()}", route: "${village}", status: "Booked", total: "${total}", paymentStatus: "Pending"}) {
            affected_rows
            returning {
              id
            }
          }
        }`
      })
    }).then((resp) => notifyAutoClose())
  }

  const prepareAddress = () => {
    InsertOrder(`${name},${fatherName},${landmark},${number},${pin},${village},${house}`)
  }
  return (
    <AvForm className='list-view product-checkout' onSubmit={onSubmit}>
      <Card>
        <CardHeader className='flex-column align-items-start'>
          <CardTitle tag='h4'>Add New Address</CardTitle>
          <CardText className='text-muted mt-25'>
            Be sure to check "Deliver to this address" when you have finished
          </CardText>
        </CardHeader>
        <CardBody>
          <Row>
          <Col md='4' sm='12'>
              <FormGroup className='mb-2'>
                <Label for='checkout-name'>Full Name:</Label>
                <AvInput onChange = {(e) => setname(e.target.value)} name='checkout-name' id='checkout-name' placeholder='John Doe' required />
              </FormGroup>
            </Col>
            {/* <Col md='4' sm='12'>
              <FormGroup className='mb-2'>
                <Label for='checkout-name'>Nick Name:</Label>
                <AvInput name='checkout-name' id='checkout-name' placeholder='John Doe' required />
              </FormGroup>
            </Col> */}<Col md='4' sm='12'>
              <FormGroup className='mb-2'>
                <Label for='checkout-apt-number'>Father Name</Label>
                <AvInput
                  type='text'
                  name='fathername'
                  id='checkout-apt-number'
                  placeholder=''
                  required
                  onChange = {(e) => setfatherName(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
              <FormGroup className='mb-2'>
                <Label for='checkout-number'>Number:</Label>
                <AvInput onChange = {(e) => setnumber(e.target.value)} type='number' name='checkout-number' id='checkout-number' placeholder='0123456789' required />
              </FormGroup>
            </Col>
            
            <Col md='6' sm='12'>
              <FormGroup className='mb-2'>
                <Label for='checkout-apt-number'>House No:</Label>
                <AvInput
                  type='number'
                  name='checkout-apt-number'
                  id='checkout-apt-number'
                  placeholder='9447 Glen Eagles Drive'
                  onChange = {(e) => sethouse(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md='6' sm='12'>
              <FormGroup className='mb-2'>
                <Label for='checkout-landmark'>Landmark e.g. near :</Label>
                <AvInput onChange = {(e) => setlandmark(e.target.value)} name='checkout-landmark' id='checkout-landmark' placeholder='Near Apollo Hospital' required />
              </FormGroup>
            </Col>
            <Col md='6' sm='12'>
              <FormGroup className='mb-2'>
                <Label for='checkout-city'>Village</Label>
                <AvInput onChange = {(e) => setvillage(e.target.value)} name='checkout-city' id='checkout-city' placeholder='Khedar' required />
              </FormGroup>
            </Col>
            <Col md='6' sm='12'>
              <FormGroup className='mb-2'>
                <Label for='checkout-pincode'>Pincode:</Label>
                <AvInput onChange = {(e) => setpin(e.target.value)} type='number' name='checkout-pincode' id='checkout-pincode' placeholder='201301' required />
              </FormGroup>
            </Col>
            {/* <Col md='6' sm='12'>
              <FormGroup className='mb-2'>
                <Label for='checkout-state'>State:</Label>
                <AvInput name='checkout-state' id='checkout-state' placeholder='California' required />
              </FormGroup>
            </Col> */}
            {/* <Col md='6' sm='12'>
              <FormGroup className='mb-2'>
                <Label for='add-type'>Address Type:</Label>
                <AvInput type='select' name='add-type' id='add-type' required>
                  <option value='home'>Home</option>
                  <option value='work'>Work</option>
                </AvInput>
              </FormGroup>
            </Col> */}
            {/* <Col sm='12'>
              <Button.Ripple type='submit' className='btn-next delivery-address' color='primary'>
                Save And Deliver Here
              </Button.Ripple>
            </Col> */}
          </Row>
        </CardBody>
      </Card>
      <div className='customer-card'>
        <Card>
          <CardHeader>
            <CardTitle tag='h4'>Name : {name} s/o {fatherName}</CardTitle>
          </CardHeader>
          <CardBody>
            <CardText>Mobile No : {number}</CardText>
            <CardText className='mb-0'>Village : {village} {pin}</CardText>
            <CardText>House No. : {house}</CardText>
            <CardText>Near : {landmark}</CardText>
            
            <Button
              block
              type='button'
              color='primary'
              onClick={() => prepareAddress()}
              className='btn-next delivery-address mt-2'
            >
              Deliver To This Address
            </Button>
          </CardBody>
        </Card>
      </div>
    </AvForm>
  )
}

export default Address
