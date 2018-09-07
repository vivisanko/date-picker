import React, {PureComponent} from 'react';
import './style.css';

class MonthlyCalendar extends PureComponent {
   constructor(props){
       super(props) 
   
    this.state = {
            weekDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        }
  
    }
    
    render(){
        const week = this.state.weekDays.map((day, index) => 
           <div key={index} className="monthlyCalendar__weekDays">
          {day.slice(0,3)}
           </div>
        )
        
        return (
            <div className="monthlyCalendar__weekBox">{week}</div>
        )
    }
    
 
}

   


export default MonthlyCalendar;