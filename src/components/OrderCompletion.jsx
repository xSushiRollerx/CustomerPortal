import React, { Component } from 'react';
//import { useTimer } from 'react-timer-hook';

class OrderCompletion extends Component {
    /** 
    timer = () => {
        const {
            seconds,
            isRunning,
            start,
        } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

        expiration = new Date()
        expiration.setSeconds(expiration.getSeconds + 30);
    }
    **/


    render() {
        let display = null;
        let words = null;
        if (JSON.parse(localStorage.getItem('orders')).length === 0) {
            display = "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z";
            words =  "Order(s) Sumbitted Sucessfully<" 
        } else {
           display = "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z";
           words = "Something Went Wrong Not All Orders Could Be Submitted Successfully"

        }
        return (
            <div className='d-flex-column text-center' style={{margin: "20px"}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path d={ display }/>
                </svg>
                <h3 style={{ marginTop: "20px" }}>{words }</h3>
        </div>
         
        )
    }

    
}

export default OrderCompletion;