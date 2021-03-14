import React, { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel'
import {Button} from 'reactstrap'
import Card from 'reactstrap/lib/Card'
import CardBody from 'reactstrap/lib/CardBody'
import CardImg from 'reactstrap/lib/CardImg'
import CardSubtitle from 'reactstrap/lib/CardSubtitle'
import CardText from 'reactstrap/lib/CardText'
import CardTitle from 'reactstrap/lib/CardTitle'
import Col from 'reactstrap/lib/Col'
import Row from 'reactstrap/lib/Row'

function Topcategories() {
    const [dataForCategory, setdataForCategory] = useState([])
    function dataFor() {
        const query = `query MyQuery {
            products {
              category
            }
          }`
       fetch('https://savetimesavemoney.hasura.app/v1/graphql', {
              headers: {'content-type': 'application/json'},
                method: 'POST',
                body: JSON.stringify({
                  query
                })
          }).then(resp =>  resp.json()).then((resp) => { 
              const array = []
              resp.data.products.map((oneData) => {
                   const foundCategory = array.find(item =>  item === oneData.category)
                    if (!foundCategory) {
                        array.push(oneData.category)
                    }
              })
              setdataForCategory(array)
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
          items: 2,
          slidesToSlide: 1 // optional, default to 1.
        }
      }
    return (
        <div className="card" style={{padding:"10px"}}>
            <h3>
                Shop From Top Categories
            </h3>
            <Row className='match-height'>
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
                        {dataForCategory.length > 0 && dataForCategory.map((data) => {
                            return (
                                <div onClick={() => { window.location.pathname = `/product-categories/${data}` }} style={{cursor:"pointer", marginLeft:"10px", marginTop:"10px", marginBottom:"10px", boxShadow:" 0 4px 24px 0 rgb(34 41 47 / 10%)"}} >
                                <CardBody style={{textAlign : "center"}}>
                                    <b style={{fontSize:"18px"}} tag="h5">{data}</b>
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

export default Topcategories
