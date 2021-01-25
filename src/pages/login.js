import React from 'react';
import "./auth.css";

class Login extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            isAuthenticates:false,
            resData: '',
            email: '',
            pwd:'',
        };
        this.login = this.login.bind(this);
    }

    handleEmail(event){
        this.setState({email: event.target.value})
    }
    handlePassword(event){
        this.setState({pwd: event.target.value})
    }
    login(event) 
    {
        let payload = {}
        payload.username = this.state.email;
        payload.password = this.state.pwd;

       this.setState({
           email:event.target.email,
           pwd: event.target.pwd
       })
        fetch('https://divercity-test.herokuapp.com/login',{
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
            alert(data.token)
            this.setState({resData:data.token,
            isAuthenticated:true});
        },
        (error) => {
            console.log(error);
            this.setState({
                isAuthentication:false,
                resData:'No Data From Server'
            })
        }
        )
    }

    render()
    {
        
        return(
            <div className="outer">
        <div className="inner">
                <form>
                    <h3>Log in</h3>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" onChange={(event) => {this.handleEmail(event)}} className="form-control" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" onChange={(event) => {this.handlePassword(event)}} className="form-control" placeholder="Enter password" />
                    </div>
                    <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" onClick={event => this.login(event)} className="btn btn-dark btn-lg btn-block">Sign in</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
                </form>
                </div>
                </div>
        )
        // }
        // else{
        //     return(
        //         <p>No data was returned. Error occured.</p>
        //     )
        // }
    }
}
export default Login;