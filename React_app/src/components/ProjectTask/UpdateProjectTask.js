import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getProjectTask, addProjectTask} from "../../actions/projectTaskActions";

class UpdateProjectTask extends Component {

  constructor()
  {
  super();
  this.state = {
   id: "",
   product_name: "",
   date_of_sale: "",
   sale_status: "",
   errors: {}

  };
  this.onChange = this.onChange.bind(this);
  this.onSubmit = this.onSubmit.bind(this)
  }

 componentWillReceiveProps(nextProps){

    if(nextProps.errors){
        this.setState({errors: nextProps.errors});

    }
     const {
        id,
        product_name,
        date_of_sale,
        sale_status 
     } = nextProps.project_task;

     this.setState({
        id,
        product_name,
        date_of_sale,
        sale_status

     });
 }


  componentDidMount() {
    const { pt_id } = this.props.match.params;
    this.props.getProjectTask(pt_id);
  }

  onSubmit(e)
  {
      e.preventDefault()
      const updatedTask = {
        id: this.state.id,
        product_name: this.state.product_name,
        date_of_sale: this.state.date_of_sale,
        sale_status: this.state.sale_status
      };

      this.props.addProjectTask(updatedTask, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
      const { errors } = this.state;
    return (
      <div className="addProjectTask">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <a href="/" className="btn btn-light">
                Back to Board
              </a>
              <h4 className="display-4 text-center">
                Add /Update Project Task
              </h4>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg",{
                        "is-invalid": errors.product_name
                    })}
                    name="product_name"
                    placeholder="product_name"
                    value={this.state.product_name}
                    onChange={this.onChange}
                  />
                  {errors.product_name && (
                    <div className="invalid-feedback">{errors.product_name}</div>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Acceptance Criteria"
                    name="date_of_sale"
                    value={this.state.date_of_sale}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="sale_status"
                    value={this.state.sale_status}
                    onChange={this.onChange}
                  >
                    <option value="">Select Sale Status</option>
                    <option value="SOLD">SOLD</option>
                    <option value="NOT SOLD">NOT SOLD</option>
                    <option value="PURCHASED">PURCHASED</option>
                  </select>
                </div>
                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateProjectTask.propTypes = {
  project_task: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getProjectTask: PropTypes.func.isRequired,
  addProjectTask: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  project_task: state.project_task.project_task,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getProjectTask, addProjectTask }
)(UpdateProjectTask);