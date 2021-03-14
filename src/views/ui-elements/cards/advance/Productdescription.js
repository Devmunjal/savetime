import React, { Fragment, useContext, useEffect, useState } from 'react'
import Col from 'reactstrap/lib/Col'
import Row from 'reactstrap/lib/Row'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Label
  } from 'reactstrap'
import Offer from './Offer'
import { AbilityContext } from '@src/utility/context/Can'
import Input from 'reactstrap/lib/Input'
import Modal from 'reactstrap/lib/Modal'
import ModalHeader from 'reactstrap/lib/ModalHeader'
import ModalBody from 'reactstrap/lib/ModalBody'
import Form from 'reactstrap/lib/Form'
import FormGroup from 'reactstrap/lib/FormGroup'
import { toast } from 'react-toastify'

function Productdescription() {
    const [deal, setdeal] = useState("True")
    const [offer, setoffer] = useState("True")
    const [banner, setbanner] = useState("True")
    const [category, setcategory] = useState("")
    const [discount, setdiscount] = useState("")
    const [img, setImg] = useState("")
    const [productName, setproductName] = useState("")
    const [quantity, setquantity] = useState("")
    const [description, setdescription] = useState("")
    const [price, setprice] = useState("")
    const ability = useContext(AbilityContext)
    const [modal, setmodal] = useState(false)
    const [Id, setId] = useState("")
    const onChange = e => {
        const reader = new FileReader(),
          files = e.target.files
        reader.onload = function () {
          setImg(reader.result)
        }
        reader.readAsDataURL(files[0])
      }
    const [categoryData, setcategoryData] = useState([])
    
      async function dataFor(category) {
        const query = `query MyQuery {
            products_aggregate(where: {id: {_in: "${category}"}}) {
              nodes {
                bestDeals
                category
                description
                discount
                id
                imageUrl
                isbanner
                name
                offer
                price
                quantity
              }
            }
          }`
       fetch('https://savetimesavemoney.hasura.app/v1/graphql', {
              headers: {'content-type': 'application/json'},
                method: 'POST',
                body: JSON.stringify({
                  query
                })
          }).then(resp =>  resp.json()).then((resp) => { 
            //console.log(resp)  
            setcategoryData(resp.data.products_aggregate.nodes)
         })
    }
    useEffect(() => {
        const categoryInTitle = (window.location.pathname.split("/"))
        setId(categoryInTitle[2])
        dataFor(categoryInTitle[2])
          return () => {
              
          }
      }, [])
      const AutoCloseToast = () => (
        <Fragment>
          <div className='toastify-header'>
            <div className='title-wrapper'>
              {/* <Avatar size='sm' color='primary' icon={<Loader size={12} />} /> */}
              <h6 className='text-primary ml-50 mb-0'>Product Added</h6>
            </div>
            {/* <small className='text-muted'>Check Your Cart</small> */}
          </div>
          <div className='toastify-body'>
            <span>Check Your Cart</span>
          </div>
        </Fragment>
      )
      const notifyAutoClose = () => toast.success(<AutoCloseToast />, { autoClose: 3000, hideProgressBar: true })
      const toggle = () => setmodal(!modal)
      const update = () => {
        fetch('https://savetimesavemoney.hasura.app/v1/graphql', {
            headers: {'content-type': 'application/json'},
             method: 'POST',
             body: JSON.stringify({
               query:`mutation {
                update_products_by_pk(pk_columns: {id: "${Id}"}, _set: {bestDeals: "${deal}", category: "${category}", description: "${description}", discount: "${discount}", imageUrl: "", isbanner: "${banner}", name: "${productName}", offer: "${offer}", price: "${price}", quantity: "${quantity}"}) {
                  id
                }
              }`
             })
        })
        setmodal(false)
      }
    return (
        <div >
            <div className="card">
            <Row >
                <Col xl="12" md="12" xs="12">
                {categoryData.length > 0 && categoryData.map((data) => {
                  return (<Row>
                        <Col xl="4" md="4" xs="12" style={{height:"200px", overflow:"hidden", boxSizing:"border-box"}}>
                            <Card><CardImg style={{objectFit:"contain"}}  src={data.imageUrl} /></Card>
                        </Col>
                        <Col  xl="8" md="8" xs="12">
                            <Card>
                                <CardBody>
                                <CardTitle tag="h5">{data.name}</CardTitle>
                                    <CardSubtitle tag="h6" className={"mb-2 text-muted"}><span style={{color:`${parseInt(data.quantity) > 0 ? "limegreen" : "red"}`}} >{parseInt(data.quantity) > 0 ? "InStock" : "OutOfStock"}</span></CardSubtitle>
                                    <CardText>{data.description}</CardText>
                                    <p style={{fontSize:"18px", color:"red"}}>
                                        Rs {parseInt(data.price) > 0 ? parseInt(data.price) - (parseInt(data.price) * parseInt(data.discount) / 100) : 'Free'}/- 
                                        <span style={{color:"grey", textDecorationLine:"line-through", marginLeft:"8px"}}>Rs {data.price}</span>
                                    </p>
                                    <p>You Save {(parseInt(data.price) * parseInt(data.discount) / 100)} Rs</p>
                                    <Button.Ripple color="primary" outline onClick={() => { localStorage.setItem(data.id, JSON.stringify(data)); notifyAutoClose() }}>Add To Cart</Button.Ripple>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>)
                })}
                </Col>
            </Row>
            {
                ability.can('read', 'Analytics') && <Row style={{padding:"10px"}}>
                    <Col xl="3" md="3" xs="6">
                        <Button.Ripple onClick={() => setmodal(!modal)} color="primary" outline>
                            Edit Details
                        </Button.Ripple>
                    </Col>
                </Row>
            }
            </div>
            <div className="card"><Offer /></div>
            <Modal isOpen={modal}  backdrop={true}>
                <ModalHeader toggle={toggle}>Editing Form</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>
                                Product Name
                            </Label>
                            <Input type="text" onChange={(e) => { setproductName(e.target.name) }} name="name" value={productName}/>
                        </FormGroup>
                        <FormGroup>
                            <Label style={{marginRight:"10px"}}>
                                Image
                            </Label>
                            <Button.Ripple   style={{width:"100%"}} tag={Label}  color='primary'>
                                <span >Edit Image</span>
                                <Input type='file' hidden id='change-img'  onChange={onChange} accept='image/*' />
                            </Button.Ripple>
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                Product Description
                            </Label>
                            <Input onChange={(e) => { setdescription(e.target.name) }} type="textarea" name="description" value={description}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                Category
                            </Label>
                            <Input onChange={(e) => { setcategory(e.target.name) }} type="text" name="category" value={category}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                Price
                            </Label>
                            <Input onChange={(e) => { setprice(e.target.name) }} type="text" name="price" value={price}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                Discount
                            </Label>
                            <Input type="text" onChange={(e) => { setdiscount(e.target.name) }} name="discount" value={discount}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                For Banner
                            </Label>
                            <Input onChange={(e) => { setbanner(e.target.name) }} type="select" name="Banner" >
                                <option selected={ banner === "True" && true  }>True</option>
                                <option selected={ banner === "False" && true  }>False</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                For Top Deal
                            </Label>
                            <Input type="select" name="topDeal" >
                                <option selected={ deal === "True" && true  }>True</option>
                                <option selected={ deal === "False" && true  }>False</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                For Top Offer
                            </Label>
                            <Input type="select" name="topOffer" >
                                <option selected={ offer === "True" && true  }>True</option>
                                <option selected={ offer === "False" && true  }>False</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Button.Ripple onClick={() => update()} color="success" outline >
                                Done
                            </Button.Ripple>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default Productdescription
