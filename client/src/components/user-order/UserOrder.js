import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import UserCard from "./UserCard";

const UserOrder = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios("/api/orders/user");
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
              <UserCard
                amount={item.amount}
                index={index}
                resname={item.resname}
                order={JSON.stringify(item._meals, ["name", "total"])}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

UserOrder.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(UserOrder);

// var json = JSON.stringify(myObject, ['today', 'obj', 'min', 'max', 're'] );
// console.log(json);
