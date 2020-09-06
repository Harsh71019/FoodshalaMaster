import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import AdminCard from "./AdminCard";

const AdminOrder = (props) => {
  const [data, setData] = useState([]);
  const [meal, setMeal] = useState();

  // useEffect(async () => {
  //   const result = await axios("/api/orders/admin");
  //   setData(result.data);
  // });

  useEffect(() => {
    async function fetchData() {
      const result = await axios("/api/orders/admin");
      setData(result.data);
    }
    fetchData();
  }, []);
  console.log(data);

  return (
    <div className="container" style={{ width: "100%" }}>
      <h1>Find Your Orders Here!</h1>
      <div className="row">
        <div className="landing-copy col s12 center-align">
          <div className="row">
            {data.map((item, index) => (
              <AdminCard
                amount={item.amount}
                index={index}
                order={JSON.stringify(item._meals, ["name","total"])}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

AdminOrder.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  admin: state.admin,
});

export default connect(mapStateToProps)(AdminOrder);

// var json = JSON.stringify(myObject, ['today', 'obj', 'min', 'max', 're'] );
// console.log(json);
