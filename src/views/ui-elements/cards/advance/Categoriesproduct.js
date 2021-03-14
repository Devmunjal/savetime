import React, { Fragment, useEffect, useState } from 'react'
import Col from 'reactstrap/lib/Col'
import Row from 'reactstrap/lib/Row'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap'
import Offer from './Offer'
import { toast } from 'react-toastify'

function Categoriesproduct() {
    const [categoryData, setcategoryData] = useState([])
    
      async function dataFor(category) {
        const query = `query MyQuery {
            products_aggregate(where: {category: {_in: "${category}"}}) {
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
    return (
        <div >
            <div className="card">
            {categoryData.length > 0 && categoryData.map((data) => {
                return (
                    <Row >
                    <Col xl="4" md="4" xs="12" style={{height:"200px", overflow:"hidden", boxSizing:"border-box"}}>
                        <img style={{objectFit:"contain"}}  src={data.imageUrl} />
                    </Col>
                    <Col xl="8" md="8" xs="12">
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
                    </Row>
                )
            })}
            </div>
            <div className="card"><Offer /></div>
        </div>
    )
}

export default Categoriesproduct
