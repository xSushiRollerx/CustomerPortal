import React, { Component } from 'react';

class OrderCompletion extends Component {


    render() {
        return (
            <div className='d-flex-column text-center' style={{margin: "20px"}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                 <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
                <h3 style={{ marginTop: "20px" }}>Order(s) Sumbitted Sucessfully</h3>
        </div>
         
        )
    }

    
}

export default OrderCompletion;