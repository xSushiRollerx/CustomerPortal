import React, { Component } from 'react';
import UserService from '../../services/UserService';
import AdminService from '../../services/AdminService';
import UpdateAccountRole from './UpdateAccountRole';
import UpdateAccountFields from './UpdateAccountFields';

//https://github.com/machadop1407/React-Search-Bar/blob/main/search-bar-code/src/Components/SearchBar.js
export default class AccountManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            user_loaded: false,
            filteredData: [],
        }
        this.submit = this.submit.bind(this);
    }
    submit = (e) => {
        e.preventDefault();
        try{
            let userid = e.value;
            UserService.readUser(userid).then(res => {
              this.setState({user: res.data});
              this.setState({user_loaded: true});
            }).catch((error)=>{
              console.log(error);
              this.setState({user_loaded: false});
            });
          }
          catch(e){
            console.log(e);
          }
    }
    
    render() {
        // function UpdateRole() {
        //     const [open, setOpen] = useState(false);
        //     return (
        //       <>
        //         <Button
        //           onClick={() => setOpen(!open)}
        //           aria-controls="example-collapse-text"
        //           aria-expanded={open}
        //         >
        //           Update User Role
        //         </Button>
        //         <Collapse in={open}>
        //           <UpdateAccountRole name={this.state.user.username}/>
        //         </Collapse>
        //       </>
        //     );
        //   }
        //   function UpdateAccount() {
        //     const [open, setOpen] = useState(false);
        //     return (
        //       <>
        //         <Button
        //           onClick={() => setOpen(!open)}
        //           aria-controls="example-collapse-text"
        //           aria-expanded={open}
        //         >
        //           Update User Role
        //         </Button>
        //         <Collapse in={open}>
        //         {this.state.user_loaded?(<UpdateAccountRole name={this.state.user.username}/>):null}
        //         </Collapse>
        //       </>
        //     );
        //   }
        const handleFilter = (e) => {
            const pattern = e.target.value;
            e.preventDefault();
            AdminService.getAllMatchingUsers(pattern).then(res=>{
                this.state.filteredData=res.data
            })
            console.log(this.state.filteredData);
        }
        return (
            <div>
                <h1>Account Management</h1>
                <h2>Type email or username of account you would like to look up</h2>
                <div className="search">
                    <input
                    type='text'
                    autoComplete="off"
                    id='userid'
                    onChange={handleFilter}
                    placeholder='username'
                    />
                </div>
                {this.state.filteredData.length!=0 && (
                    <div className="dataResult">
                    {this.state.filteredData.slice(0, 15).map((value, key) => {
                      return (
                        <button className="dataItem" onClick={this.submit}>
                          <p>{value} </p>
                        </button>
                      );
                    })}
                  </div>
                )}
                {this.state.user_loaded?(
                <div>
                <h2>Username: </h2>
                <p1 id='username'>{this.state.user.username}</p1>
                <h2>First Name:</h2>
                <p1 id='firstName'>{this.state.user.firstName}</p1>
                <h2>Last Name:</h2>
                <p1 id='lastName'>{this.state.user.lastName}</p1>
                <h2>Email:</h2>
                <p1 id='email'>{this.state.user.email}</p1>
                <h2>Phone:</h2>
                <p1 id='phone'>{this.state.user.phone}</p1>
                <div>
                </div>
                <div>
                    <UpdateAccountRole name={this.state.user.username}/>
                    <UpdateAccountFields name={this.state.user.username}/>
                    <br/>
                </div>
                </div>
                ):null}
            </div>
        )
    }
}