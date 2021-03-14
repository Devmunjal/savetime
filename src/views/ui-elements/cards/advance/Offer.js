import React, { Fragment, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {Button} from 'reactstrap'
import CardBody from 'reactstrap/lib/CardBody'
import CardImg from 'reactstrap/lib/CardImg'
import CardSubtitle from 'reactstrap/lib/CardSubtitle'
import CardText from 'reactstrap/lib/CardText'
import CardTitle from 'reactstrap/lib/CardTitle'
import Col from 'reactstrap/lib/Col'
import Row from 'reactstrap/lib/Row'

function Offer() {
    const [offerData, setofferData] = useState([])
    
      async function dataFor() {
        const query = `query MyQuery {
            products_aggregate(where: {offer: {_in: "True"}}) {
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
            setofferData(resp.data.products_aggregate.nodes)
         })
    }
    useEffect(() => {
        dataFor()
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
        <div className="card" style={{padding:"10px"}}>
            <h2>
                Offer For You
            </h2>
            <Row>
                {offerData.length > 0 && offerData.map((data, i) => {
                    return (
                        <Col xl="3" md="3" xs="12">
                <div onClick={() => { window.location.pathname = `/product-discription/${data.id}` }} style={{marginLeft:"10px", marginRight:"10px", marginTop:"10px", marginBottom:"10px", boxShadow:" 0 4px 24px 0 rgb(34 41 47 / 10%)"}} >
                <CardBody>
                        <CardImg src={data.imageUrl} />
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
                </div>
                </Col>
                    )
                })}
            </Row>
        </div>
    )
}

export default Offer
