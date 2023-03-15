import React, {useState} from 'react'


export const TodoWrapper = () => {

  return (


    <div className='TodoWrapper'>
        <h1>IOT Data in Blockchain</h1>
        <div className='connect-wallet'>
          <button className='connect-btn'>Connect Wallet</button>
        </div>
          <form  className="TodoForm">
          <input type="text" className="todo-input" placeholder='Input your data here...' />
          <button type="submit" className='todo-btn'>Add</button>
          </form>
        <div className='data-list-container'>
              <div className='data-list'>
                <div className='data'>
                  <p>temp_log_196134_bd201015,Room Admin,08-12-2018 09:30,29,In</p>
                </div>
                <div className='data'>
                  <p>temp_log_196131_7bca51bc,Room Admin,08-12-2018 09:30,29,In</p>
                </div>
                <div className='data'>
                  <p>temp_log_196127_522915e3,Room Admin,08-12-2018 09:29,41,Out</p>
                </div>
                <div className='data'>
                  <p>temp_log_196128_be0919cf,Room Admin,08-12-2018 09:29,41,Out</p>
                </div>
                <div className='data'>
                  <p>temp_log_196126_d30b72fb,Room Admin,08-12-2018 09:29,31,In</p>
                </div>
                <div className='data'>
                  <p>temp_log_196125_b0fa0b41,Room Admin,08-12-2018 09:29,31,In</p>
                </div>
                <div className='data'>
                  <p>temp_log_196121_01544d45,Room Admin,08-12-2018 09:28,29,In</p>
                </div>
              </div>
        </div>
    </div>
  )
}
