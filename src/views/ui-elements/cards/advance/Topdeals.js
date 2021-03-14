import React, { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel'
import { Collapse } from 'reactstrap'
import CardBody from 'reactstrap/lib/CardBody'
import CardImg from 'reactstrap/lib/CardImg'
import CardSubtitle from 'reactstrap/lib/CardSubtitle'
import CardText from 'reactstrap/lib/CardText'
import CardTitle from 'reactstrap/lib/CardTitle'
import Col from 'reactstrap/lib/Col'
import Row from 'reactstrap/lib/Row'

function Topdeals() {
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
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5,
          slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3,
          slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      }
    return (
        <div className="card" style={{padding:"10px"}}>
            <h2>
                Top Deals
            </h2>
            <Row>
                <Col xl="12" md="12" xs="12">
                    <Carousel
                        swipeable={false}
                        draggable={false}
                        showDots={false}
                        responsive={responsive}
                        ssr={true} // means to render carousel on server-side.
                        infinite={true}
                        autoPlay={ false }
                        autoPlaySpeed={5000}
                        keyBoardControl={true}
                        customTransition="all 2"
                        transitionDuration={500}
                        containerClass="carousel-container"
                        removeArrowOnDeviceType={[]}
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px"
                    >
                     {offerData.length > 0 && offerData.map((data) => {
                       return (
                        <div onClick={() => { window.location.pathname = `/product-discription/${data.id}` }} style={{marginLeft:"10px", marginRight:"10px", marginTop:"10px", marginBottom:"10px", boxShadow:" 0 4px 24px 0 rgb(34 41 47 / 10%)"}} >
                        <CardBody>
                                <CardImg src={data.imageUrl} />
                                <CardTitle tag="h5">{data.name}</CardTitle>
                                <CardSubtitle tag="h6" className={"mb-2 text-muted"}><span style={{color:`${parseInt(data.quantity) > 0 ? "limegreen" : "red"}`}} >{parseInt(data.quantity) > 0 ? "InStock" : "OutOfStock"}</span></CardSubtitle>
                                {/* <CardText>{data.description}</CardText> */}
                                <p style={{fontSize:"18px", color:"red"}}>
                                    Rs {parseInt(data.price) > 0 ? parseInt(data.price) - (parseInt(data.price) * parseInt(data.discount) / 100) : 'Free'}/- 
                                    <span style={{color:"grey", textDecorationLine:"line-through", marginLeft:"8px"}}>Rs {data.price}</span>
                                </p>
                                <p>You Save {(parseInt(data.price) * parseInt(data.discount) / 100)} Rs</p>
                                {/* <Button.Ripple color="primary" outline onClick={() => { localStorage.setItem(data.id, JSON.stringify(data)); notifyAutoClose() }}>Add To Cart</Button.Ripple> */}
                                </CardBody>
                        </div>
                       )
                     })}
                    </Carousel>
                </Col>
            </Row>
        </div>
    )
}

export default Topdeals
