import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./index.scss"; // Assuming this is your CSS file for styling
import { Button, Col, Image, Rate, Row, Tag } from "antd";
import Footer from "../../component/footer";

const Detail = () => {
  const { id } = useParams();
  const [orchid, setOrchid] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrchids = async () => {
      try {
        const response = await axios.get(
          `https://6639cdef1ae792804becd314.mockapi.io/orchids`,
        );
        const filteredOrchid = response.data.find((item) => item.id === id);
        if (filteredOrchid) {
          setOrchid(filteredOrchid);
        } else {
          throw new Error("Orchid not found");
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchOrchids();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <h2>Error: {error.message}</h2>;
  }

  if (!orchid) {
    return <h2>Orchid not found</h2>;
  }

  return (
    <div className="orchid-detail">
      <div className="detail">
        <Row
          gutter={24}
          style={{ marginTop: "20px" }}
          className="detail-orchid"
        >
          <Col span={12}>
            <Row gutter={8}>
              <Col span={8}></Col>
              <Col span={12}>
                <Image
                  src={orchid.image}
                  alt="Diamond"
                  style={{
                    width: "400px",
                    display: "flex",
                    justifyContent: "start",
                  }}
                />
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <div className="description-product">
              <h1>{orchid.name}</h1>
              <Rate disabled defaultValue={orchid.rating} />
              <div className="row">
                <p>Category: </p>
                <span>{orchid.category}</span>
              </div>
              <div className="row">
                <p>Color</p>
                <span> {orchid.color}</span>
              </div>
              <div className="row">
                <p>Origin</p>
                <span> {orchid.origin}</span>
              </div>
              {orchid.isSpecial && (
                <Tag
                  className="tag"
                  color="gold"
                  style={{
                    display: "block",
                    textAlign: "center",
                    width: "20%",
                  }}
                >
                  Special
                </Tag>
              )}
            </div>
            <div className="button" style={{ marginTop: "45px" }}>
              <Button className="button1" type="primary">
                <Link to={"/"}>Quay lại</Link>
              </Button>
            </div>
          </Col>
        </Row>
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Detail;
