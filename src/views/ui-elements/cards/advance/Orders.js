import { Modal, Row, Col, Button, Input } from 'reactstrap'
import React, { useEffect, useState } from 'react'

function Orders() {
    const [modal, setmodal] = useState(false)
    const [route, setroute] = useState("Barwala-To-Danoda")
    const [villageMapping, setvillageMapping] = useState({
        "Barwala-To-Danoda" : ["Gaibipur", "Kharkhra", "Bobua", "Hsanghar", "Khumba", "Udaypur", "Durjanpur", "Litani", "Saithli", "Jajnvaala", "Danoda", "Kalar Bhaini"],
        "Barwala-To-Sandalana" : ["Sarhera", "Matloda", "Bhanbhori", "Chan", "Sandlana", "Sotha", "Bhada", "Sarsana", "Gyanpura", "Panihari", "Kharak", "Bdhawar", "Dhad"],
        "Barwala-To-Hansi":["Dhani Mirdaad", "Gurana", "Shindar", "Khanpur", "Shinghva", "Ghiray", "Rajli", "Panghal", "Dhani KhanBhadur", "Dhani Garan", "Sarsod", "Bichpadi", "Chanot"],
        "Barwala-To-Agroha":["Khedar", "Jevra", "Balak", "Kirori", "Kano", "Pabra", "Nahala", "Daulatpur", "Faridpur", "Kinala", "Suhu", "Bhaini BadhshaPur"]
    })
    const [village, setvillage] = useState(villageMapping[route][0])
    useEffect(() => {
        return () => {
            
        }
    }, [village, route])
    const orders = () => {
        const query = `query {
            orders_aggregate(where: {route: {_in: "${village}"}}) {
              nodes {
                address
                PaymentType
                id
                paymentStatus
                products
                route
                status
                total
                user
              }
            }
          }`
         fetch('https://savetimesavemoney.hasura.app/v1/graphql', {
                headers: {'content-type': 'application/json'},
                  method: 'POST',
                  body: JSON.stringify({
                    query
                  })
            }).then(resp =>  resp.json()).then((resp) => { console.log(resp) })
    }
    return (
        <div>
            
            <Row>
                <Col xl="4" md="4" xs="12">
                    <Input type="select" onChange={(e) => { setvillage(villageMapping[e.target.value][0]); setroute(e.target.value) }} placeholder="Select The Route">
                        <option>Barwala-To-Danoda</option>
                        <option>
                            Barwala-To-Sandalana
                        </option>
                        <option>Barwala-To-Hansi</option>
                        <option>
                            Barwala-To-Agroha
                        </option>
                    </Input>
                </Col>
                <Col xl="4" md ="4" xs ="12">
                    <Input type="select" onChange={(e) => setvillage(e.target.value)}>
                        {
                            villageMapping[route].map((data) => {
                                return (
                                    <option>{data}</option>
                                )
                            })
                        }
                    </Input>
                </Col>
                <Col xl="3" md="3" xs="12"><Button color="primary" outline onClick={() => orders()}>Get Orders</Button></Col>
            </Row>
            {/* <Row>
                {<Col xl="12" md="12" xs="12">

                </Col>}
            </Row> */}
        </div>
    )
}

export default Orders
