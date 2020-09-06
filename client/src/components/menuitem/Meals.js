import React, { Component } from "react";
import get from "lodash/get";
import Spinner from "../layout/Spinner";
import { MealCard } from "./MealCard";
import { OrderFooter } from "./OrderFooter";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Meals extends Component {
  state = {
    meals: [],
    loading: false,
    submitting: false,
    admin: "",
    resDetails: "",
  };

  async componentDidMount() {
    try {
      const rev = await axios(`/api/menu/admin/${this.restaurantId}`);
      this.setState({ resDetails: rev.data.restaurantname, loading: false });
      this.setState({ loading: true });
      const response = await axios(`/api/menu/admin/${this.restaurantId}`);
      this.setState({ meals: response.data.item, loading: false });
    } catch (e) {
      console.error(e);
      this.setState({ loading: false });
    }
  }

  onIncrement = (index) => {
    const { meals } = this.state;
    const { total } = meals[index];
    this.setState({
      meals: [
        ...meals.slice(0, index),
        { ...meals[index], total: (total || 0) + 1 },
        ...meals.slice(index + 1),
      ],
    });
  };

  onDecrement = (index) => {
    const { meals } = this.state;
    const { total } = meals[index];
    if (!total) return;
    this.setState({
      meals: [
        ...meals.slice(0, index),
        { ...meals[index], total: total - 1 },
        ...meals.slice(index + 1),
      ],
    });
  };

  handleSubmit = async () => {
    const payload = {
      amount: this.orderTotal,
      admin: this.restaurantId,
      resname: this.resDetails,
      _meals: [],
    };
    this.state.meals.forEach((meal) => {
      if (meal.total) payload._meals.push(meal);
    });
    this.setState({ submitting: true });
    try {
      await axios.post("/api/orders", payload);
      const { push } = this.props.history;
      push("/userorder");
    } catch (e) {
      this.setState({ submitting: false });
      console.error(e);
    }
  };

  get restaurantId() {
    return get(this.props.match, "params.id");
  }

  get orderTotal() {
    return this.state.meals.reduce((total, meal) => {
      return total + meal.price * (meal.total || 0);
    }, 0);
  }

  render() {
    const { loading, meals, submitting, resDetails } = this.state;
    console.log(resDetails);
    if (meals.length === 0 && !loading)
      return <div className="center">No Meals Found.</div>;

    return (
      <div>
        <div>
          {loading ? (
            <Spinner />
          ) : (
            <footer>
              <div>
                <div>
                  <h1 className="menu-item-center">Menu-Items</h1>
                  {(meals || []).map((meal, index) => (
                    <MealCard
                      key={get(meal, "name")}
                      meal={meal}
                      onItemAdd={() => this.onIncrement(index)}
                      onItemRemove={() => this.onDecrement(index)}
                    />
                  ))}
                </div>
                <OrderFooter
                  orderTotal={this.orderTotal}
                  disabled={submitting}
                  onSubmit={this.handleSubmit}
                />
              </div>
            </footer>
          )}
        </div>
      </div>
    );
  }
}

Meals.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Meals);
