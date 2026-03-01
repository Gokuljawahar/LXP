import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { SavedTopics, AddTopic } from '../components';

export default function TopicsPage() {
  return (
    <Container fluid>
      <Row />
      <Row>
        <Col xs={4} md={2} />
        <Col xs={8} md={6} className="mt-5">
          <Row className="mt-4">
            <Col sx={10} md={2} />
          </Row>
          <AddTopic />
          <SavedTopics />
        </Col>
      </Row>
    </Container>
  );
}
