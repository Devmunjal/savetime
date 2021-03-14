import { useContext, useState } from 'react'
import { Row, Col, Modal } from 'reactstrap'
import CompanyTable from './CompanyTable'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import Earnings from '@src/views/ui-elements/cards/analytics/Earnings'
import CardMedal from '@src/views/ui-elements/cards/advance/CardMedal'
import CardMeetup from '@src/views/ui-elements/cards/advance/CardMeetup'
import StatsCard from '@src/views/ui-elements/cards/statistics/StatsCard'
import GoalOverview from '@src/views/ui-elements/cards/analytics/GoalOverview'
import RevenueReport from '@src/views/ui-elements/cards/analytics/RevenueReport'
import OrdersBarChart from '@src/views/ui-elements/cards/statistics/OrdersBarChart'
import ProfitLineChart from '@src/views/ui-elements/cards/statistics/ProfitLineChart'
import CardTransactions from '@src/views/ui-elements/cards/advance/CardTransactions'
import CardBrowserStates from '@src/views/ui-elements/cards/advance/CardBrowserState'

import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'
import Carausel from '../../ui-elements/cards/advance/Carausel'
import Topcategories from '../../ui-elements/cards/advance/Topcategories'
import Topdeals from '../../ui-elements/cards/advance/Topdeals'
import Offer from '../../ui-elements/cards/advance/Offer'
import Carausel2 from '../../ui-elements/cards/advance/Caraousel2'
import Carausel3 from '../../ui-elements/cards/advance/Caraousel3'
import SpecialForYou from '../../ui-elements/cards/advance/SpecialForYou'
import { AbilityContext } from '@src/utility/context/Can'
import Button from 'reactstrap/lib/Button'
import ModalHeader from 'reactstrap/lib/ModalHeader'
import ModalBody from 'reactstrap/lib/ModalBody'
import Form from 'reactstrap/lib/Form'
import FormGroup from 'reactstrap/lib/FormGroup'
import Label from 'reactstrap/lib/Label'
import Input from 'reactstrap/lib/Input'
import Card from 'reactstrap/lib/Card'
import CardImg from 'reactstrap/lib/CardImg'
// import { render } from 'node-sass'


const EcommerceDashboard = () => {
  const [deal, setdeal] = useState("True")
  // const [CLIENT_ID, setCLIENT_ID] = useState("926965815026-2pcd90a5d6mjfd2qbrf7l1f8p9peh8od.apps.googleusercontent.com")
  // const [CLIENT_SECRET, setCLIENT_SECRET] = useState("37Rw9EVp1yixMKI8L7MBTTLg")
  // const [REDIRECT_URI, setREDIRECT_URI] = useState("https://developers.google.com/oauthplayground")
  // const [REFRESH_TOKEN, setREFRESH_TOKEN] = useState("1//04f-_teTSMHBvCgYIARAAGAQSNwF-L9Ir_aqayIvXZjCsDOGmkdE7jckn5TbIRBv0GyY-hPFzRuA7SXQ_Iu7Oz-VO2bDV461t9_8")
  const [offer, setoffer] = useState("True")
  const [banner, setbanner] = useState("True")
  const [category, setcategory] = useState("")
  const [discount, setdiscount] = useState("")
  const [img, setImg] = useState("")
  const [productName, setproductName] = useState("")
  const [quantity, setquantity] = useState("")
  const [description, setdescription] = useState("")
  const [price, setprice] = useState("")
  const [modal, setmodal] = useState(false)
  const ability = useContext(AbilityContext)
  const { colors } = useContext(ThemeColors),
    trackBgColor = '#e9ecef'
  const toggle = () => setmodal(!modal)
    const onChange = e => {
        const reader = new FileReader(),
          files = e.target.files
        reader.onload = function () {
          setImg(reader.result)
        }
        reader.readAsDataURL(files[0])
      }
  const add = () => {
     fetch('https://savetimesavemoney.hasura.app/v1/graphql', {
     headers: {'content-type': 'application/json'},
      method: 'POST',
      body: JSON.stringify({
        query:`mutation {
          insert_products(objects: {bestDeals: "${deal}", category: "${category}", description: "${description}", discount: "${discount}", imageUrl: "${img}", isbanner: "${banner}", name: "${productName}", offer:"${offer}", price: "${price}", quantity: "${quantity}"}) {
            affected_rows
          }
        }`
      })
    }).then((resp) => window.location.reload())
    setmodal(false)
  }

  return (
    <div id='dashboard-ecommerce'>
    {ability.can('read', "Analytics") && <Row className='match-height' style={{marginBottom:"10px"}}>
      <Col xl="3" md="3" xs ="6">
        <Button onClick={() => setmodal(!modal)} color="primary" outline>
          Add Product
        </Button>
      </Col>
    </Row>}
    <Modal isOpen={modal}  backdrop={true}>
                <ModalHeader toggle={toggle}>Creation Form</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>
                                Product Name
                            </Label>
                            <Input type="text" onChange={(e) => { setproductName(e.target.value) }}  name="name" placeholder="Enter Product Name" />
                        </FormGroup>
                        <FormGroup>
                          <Card>
                            <CardImg src={img} />
                            <Button  style={{width:"100%", marginTop:"10px"}} tag={Label}  color='primary'>
                                <span >Add Image</span>
                                <Input type='file' hidden id='change-img'  onChange={onChange} accept='image/*' />
                            </Button>
                          </Card>
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                Product Quantity
                            </Label>
                            <Input type="text" onChange={(e) => { setquantity(e.target.value) } } name="description" placeholder="Enter Product Description" />
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                Product Description
                            </Label>
                            <Input type="textarea" onChange={(e) => { setdescription(e.target.value) }} name="description" placeholder="Enter Product Description" />
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                Category
                            </Label>
                            <Input type="text" onChange={(e) => { setcategory(e.target.value) }} name="category" placeholder="Category" />
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                Price
                            </Label>
                            <Input type="text" onChange={(e) => { setprice(e.target.value) }} name="price" placeholder="Price"/>
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                Discount
                            </Label>
                            <Input type="text" onChange={(e) => { setdiscount(e.target.value) }} name="discount" placeholder="Discount" />
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                For Banner
                            </Label>
                            <Input onChange={(e) => setbanner(e.target.value)} type="select" name="Banner" >
                                <option >True</option>
                                <option>False</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                For Top Deal
                            </Label>
                            <Input onChange={(e) => setdeal(e.target.value) } type="select" name="topDeal" >
                                <option >True</option>
                                <option >False</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                For Top Offer
                            </Label>
                            <Input onChange={(e) => setoffer(e.target.value)} type="select" name="topOffer" >
                                <option >True</option>
                                <option >False</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                          <Button onClick={() => add() } color="success" outline>
                            Done
                          </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
      <Row className='match-height'>
        <Col xl='12' md='12' xs='12'>
          {/* <CardMedal /> */}
          <Carausel />
        </Col>
        {/* <Col xl='8' md='6' xs='12'>
          <StatsCard cols={{ xl: '3', sm: '6' }} />
        </Col> */}
      </Row>
      <Row className='match-height'>
        <Col xl='12' md='12' xs="12">
          <Topcategories />
          {/* <RevenueReport primary={colors.primary.main} warning={colors.warning.main} /> */}
        </Col>
      </Row>
       <Row className='match-height'>
        <Col xl='12' md='12' xs="12">
          <Carausel2 />
        </Col>
      </Row>
      <Row className='match-height'>
        <Col xl='12' md='12' xs="12">
          <SpecialForYou />
        </Col>
      </Row>
      <Row className='match-height'>
        <Col xl='12' md='12' xs="12">
          <Topdeals />
        </Col>
      </Row>
      <Row className='match-height'>
        <Col xl='12' md='12' xs="12">
          <Carausel3 />
        </Col>
      </Row>
      <Row className='match-height'>
        <Col xl='12' md='12' xs="12">
          <Offer />
        </Col>
      </Row>
      
     
      <Row className='match-height'>
        <Col lg='8' xs='12'>
          {/* <CompanyTable /> */}
        </Col>
        <Col lg='4' md='6' xs='12'>
          {/* <CardMeetup /> */}
        </Col>
        <Col lg='4' md='6' xs='12'>
          {/* <CardBrowserStates colors={colors} trackBgColor={trackBgColor} /> */}
        </Col>
        <Col lg='4' md='6' xs='12'>
          {/* <GoalOverview success={colors.success.main} /> */}
        </Col>
        <Col lg='4' md='6' xs='12'>
          {/* <CardTransactions /> */}
        </Col>
      </Row>
    </div>
  )
}

export default EcommerceDashboard
