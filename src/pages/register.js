import React from 'react';
import "./auth.css";

class Register extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            isAuthenticates:false,
            resData: '',
            email: '',
            pwd:'',
            name:''
        };
        this.signUp = this.signUp.bind(this);
    }

    handleEmail(event){
        this.setState({email: event.target.value})
    }
    handlePassword(event){
        this.setState({pwd: event.target.value})
    }
    handleName(event){
        this.setState({name: event.target.value})
    }
    
    signUp(event)
    {
        let payload = {}
        payload.username = this.state.email;
        payload.password = this.state.pwd;
        payload.name = this.state.name;

        this.setState({
            email:event.target.email,
            pwd: event.target.pwd,
            name:event.target.name
        })

        alert(payload.username)
        alert(payload.password)
        alert(payload.name)
        fetch('https://divercity-test.herokuapp.com/register',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-type':'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(res=>res.json())
        .then((data)=>{
            console.log(data);
            alert(data.message);
            this.setState({resData:data.token,
            isAuthenticated:true});
        },
        (error) => {
            alert(error);
            this.setState({
                isAuthentication:false,
                resData:'No Data From Server'
            })
        })
    }

    render()
    {
        return(
            <div className="outer">
        <div className="inner">
            <form>
                <h3>Register</h3>

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" onChange={(event) => {this.handleName(event)}} className="form-control" placeholder="Enter Name" />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" onChange={(event) => {this.handleEmail(event)}} className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" onChange={(event) => {this.handlePassword(event)}} className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" onClick={event => this.signUp(event)} className="btn btn-dark btn-lg btn-block">Register</button>
                <p className="forgot-password text-right">
                    Already registered <a href="#">log in?</a>
                </p>
            </form>
            </div>
            </div>
        )
    }
}
export default Register;
