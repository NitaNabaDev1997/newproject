import React, { Component } from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addProjectTask} from "../../actions/projectTaskActions";
import classnames from "classnames";

 class AddProjectTask extends Component {
     constructor(){
         super();
         this.state = {
             product_name: "",
             date_of_sale: "",
             sale_status: "",
            errors: {}
         };
         this.onChange=this.onChange.bind(this);
         this.onSubmit=this.onSubmit.bind(this);
     }

     componentWillReceiveProps(nextProps){
       if(nextProps.errors){
           this.setState({ errors:nextProps.errors });
       }
     }
     onChange(e) {
         this.setState({[e.target.name]:e.target.value});
     }

     onSubmit(e){
         e.preventDefault()
         const newProjectTask = {
            product_name: this.state.product_name,
            date_of_sale: this.state.date_of_sale,
            sale_status: this.state.sale_status,
           
         };
         //console.log(newProjectTask);
         this.props.addProjectTask(newProjectTask, this.props.history);
     }
    render() {
        const { errors } = this.state;
        return (
            <div className="addProjectTask">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <Link to="/" className="btn btn-light">
                        Back to Board
                    </Link>
                    <h4 className="display-4 text-center">Add /Update Project Task</h4>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input type="text" className={classnames("form-control form-control-lg", {
                                "is-invalid": errors.product_name
                            })} name="product_name" value={this.state.product_name} onChange={this.onChange} placeholder="Project Task product_name" />
                           {
                               errors.product_name && (
                               <div className="invalid-feedback">{errors.product_name}</div>    
                               )
                           } 
                        </div>
                        <div className="form-group">
                            <textarea className="form-control form-control-lg" placeholder="date of sale" name="date_of_sale" value={this.state.date_of_sale} onChange={this.onChange}></textarea>
                        </div>
                        <div className="form-group">
                            <select className="form-control form-control-lg" name="sale_status" value={this.state.sale_status} onChange={this.onChange}>
                                <option value="">Select Sale Status</option>
                                <option value="SOLD">SOLD</option>
                                <option value="NOT SOLD">NOT SOLD</option>
                                <option value="PURCHASED">PURCHASED</option>
                            </select>
                        </div>
                        <input type="submit" className="btn btn-primary btn-block mt-4" />
                    </form>
                </div>
            </div>
        </div>
    </div>
        );
    }
}
AddProjectTask.propTypes = {
   addProjectTask: PropTypes.func.isRequired,
   errors: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(mapStateToProps, {addProjectTask}) (AddProjectTask);