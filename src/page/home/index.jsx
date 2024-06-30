import axios from "axios";
import Carousel from "../../component/carousel";
import { useEffect, useState } from "react";
import { Button, Card, Col, Row, Tag } from "antd";
import Footer from "../../component/footer";
import { Link } from "react-router-dom";

function HomePage() {
  const [orchids, setOrchids] = useState([]);

  async function fetchOrchids() {
    try {
      const response = await axios.get(
        "https://6639cdef1ae792804becd314.mockapi.io/orchids",
      );
      setOrchids(response.data);
    } catch (error) {
      console.error("Error fetching orchids:", error);
    }
  }
  useEffect(() => {
    fetchOrchids();
  }, []);
  return (
    <div>
      <Row gutter={16} style={{ padding: "40px 0px 20px 60px" }}>
        {orchids.map((orchid) => (
          <Col key={orchid.id} className="gutter-row" span={6}>
            <Card
              hoverable
              style={{ width: 200, height: "auto" }}
              cover={
                <div style={{ width: "100%", height: 150, overflow: "hidden" }}>
                  <img
                    alt={orchid.name}
                    src={orchid.image}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              }
            >
              <h2 style={{ textAlign: "center" }}>{orchid.name}</h2>
              <h3 style={{ textAlign: "center" }}>{orchid.rating} ⭐</h3>
              {orchid.isSpecial && (
                <Tag
                  color="gold"
                  style={{ display: "block", textAlign: "center" }}
                >
                  Special
                </Tag>
              )}
              <h4 style={{ textAlign: "center" }}>{orchid.category}</h4>
              <div style={{ textAlign: "center" }}>
                <Button>
                  <Link to={`/detail/${orchid.id}`}>Detail</Link>
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <h2
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        Flower relative
      </h2>
      <Carousel autoplay numberOfSiles={5} />
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
