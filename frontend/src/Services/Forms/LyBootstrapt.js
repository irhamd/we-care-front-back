import { Col, Row } from "react-bootstrap"


export const Row_ = (r) => {
    return (
        <Row>
            {r.children}
        </Row>
    )
}

export const Col_ = (r) => {
    return (
        <Col sm={r.sm } >
            {r.children}
        </Col>

    )
}