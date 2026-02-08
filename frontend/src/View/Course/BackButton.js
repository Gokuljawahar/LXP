// import { Button } from '@mui/material'
// import React from 'react'
// import { Col ,Row} from 'react-bootstrap'

// function BackButton() {
//   return (
//     <>

//         <Row className="mt-2 ">
//             {/* <Col xs={4}></Col>
//             <Col xs={4}></Col>
//             <Col xs={4}></Col> */}
//               <Button onclick="window.history.back()">Back</Button>

//         </Row>


//     </>


//   )
// }

// export default BackButton
import { useNavigate } from 'react-router-dom';
import { Col, Button, Row } from 'react-bootstrap';
export const BackButton = () => {
  let navigate = useNavigate();
  return (
    <Col className="text-end">
      <Button onClick={() => navigate(-1)} style={{ paddingLeft: '60px', paddingRight: '60px', color: 'blue', backgroundColor: 'white' }}>Back</Button>
    </Col>
  );
};