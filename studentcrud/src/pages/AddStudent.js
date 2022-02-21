import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function AddStudent() {

    const history = useHistory();
    const [studentInput, setStudent] = useState({
        name: '',
        course: '',
        email: '',
        phone: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setStudent({...studentInput, [e.target.name]: e.target.value })
    }

    const saveStudent = (e) => {
        e.preventDefault();
        
        const data = {
            name:studentInput.name,
            course:studentInput.course,
            email:studentInput.email,
            phone:studentInput.phone,
        }

        axios.post(`/api/add-student`, data).then(res => {

            if(res.data.status === 200)
            {
                swal("Success!",res.data.message,"success");
                setStudent({
                    name: '',
                    course: '',
                    email: '',
                    phone: '',
                    error_list: [],
                });
                history.push('/students');
            }
            else if(res.data.status === 422)
            {
                setStudent({...studentInput, error_list: res.data.validate_err });
            }
        });
    }

    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Add Students 
                                    <Link to={'/'} className="btn btn-danger btn-sm float-end"> BACK</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={saveStudent} >
                                    <div className="form-group mb-3">
                                        <label>Student Name</label>
                                        <input type="text" name="name" onChange={handleInput} value={studentInput.name} className="form-control" />
                                        <span className="text-danger">{studentInput.error_list.name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Student Course</label>
                                        <input type="text" name="course" onChange={handleInput} value={studentInput.course}  className="form-control" />
                                        <span className="text-danger">{studentInput.error_list.course}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Student Email</label>
                                        <input type="text" name="email" onChange={handleInput} value={studentInput.email}  className="form-control" />
                                        <span className="text-danger">{studentInput.error_list.email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Student Phone</label>
                                        <input type="text" name="phone" onChange={handleInput} value={studentInput.phone}  className="form-control" />
                                        <span className="text-danger">{studentInput.error_list.phone}</span>
                                    </div>

                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Save Student</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default AddStudent;
