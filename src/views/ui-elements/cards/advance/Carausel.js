import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import React, { useContext, useEffect, useState } from 'react'
import { AbilityContext } from '@src/utility/context/Can'
import Button from "reactstrap/lib/Button"
import Row from "reactstrap/lib/Row"
import Col from "reactstrap/lib/Col"
import CardImg from "reactstrap/lib/CardImg"

function Carausel() {
  const [imageForCarausel, setimageForCarausel] = useState([])
  async function dataFor() {
    const query = `query MyQuery {
      products_aggregate(where: {isbanner: {_in: "True"}}) {
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
      }).then(resp =>  resp.json()).then((resp) => { setimageForCarausel(resp.data.products_aggregate.nodes) })
}
  useEffect(() => {
    dataFor()
    return () => {
    }
  }, [])
  const ability = useContext(AbilityContext)
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      }
    return (
        <div className="card">
        <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={ true }
        autoPlaySpeed={5000}
        keyBoardControl={true}
        customTransition="all 2"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        >
        {imageForCarausel.length > 0 && imageForCarausel.map((data, i) => {
          if (i <= 4) {
            return (<div onClick={() => { window.location.pathname = `/product-discription/${data.id}` }} style={{marginLeft:"50px", marginRight:"auto", display:"block"}}><CardImg width="400px" src={data.imageUrl} /></div>)
          }
          })}
        </Carousel>
        </div>
    )
}

export default Carausel