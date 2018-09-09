import React, {PureComponent} from 'react';
import './style.css';

class MonthlyCalendar extends PureComponent {
   constructor(props){
       super(props) 
   
    this.state = {
            weekDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            monthDays: [],
            userDate: null,
            userDay:null,
            samePeriod: false,
        }
    
    // this.determineNumberDaysInMonth = this.determineNumberDaysInMonth.bind(this);
    // this.determineStartWeekDay = this.determineStartWeekDay.bind(this);
    this.createMonthDays = this.createMonthDays.bind(this)
    this.findOutIsTheSamePeriod = this.findOutIsTheSamePeriod.bind(this)
    }

    componentWillMount(){
        this.createMonthDays();
    }
    
    componentWillReceiveProps(){
        this.createMonthDays();
        this.findOutIsTheSamePeriod();
    }

    
    render(){
        const weekDaysName = this.state.weekDays.map((day, index) => 
        <div key={index} className="monthlyCalendar__weekDays">
        {day.slice(0,3)}
        </div>
        )
          const days = this.state.monthDays.map((day, index)=>
            <div key={index} 
            className = {[(day!=='')? "monthlyCalendar__weekDays monthlyCalendar__weekDays_withDate": "monthlyCalendar__weekDays", (this.state.userDay===day && this.state.samePeriod) ? "monthlyCalendar__selectedDate":''].join(' ')}
            onClick={this.handleClick.bind(this, index)}>
              {day}
            </div> 
        )

  
        return (
            <div className="monthlyCalendar__monthBlock">
              <div className="monthlyCalendar__weekBox monthlyCalendar__weekNamesBox">{weekDaysName}</div>
              <div className="monthlyCalendar__weekBox">{days}</div>
            </div>
        )
    }
    
 

   determineNumberDaysInMonth = () =>{       
       const month = this.props.period.getMonth();
       if (month === 3 || month === 5 || month === 8 || month === 10) {
           return 30
       }
       if(month === 1) {
           const year = this.props.period.getFullYear();
           if((year%4===0 &&year%100!==0)||year%400===0){
               return 29
           } else return 28
       }
       return 31
   }

   determineStartWeekDay = ()=>{
       let startDay= new Date(this.props.period);
       startDay.setDate(1);
       console.log('startDay',startDay);
       return startDay.getDay()
   }

   createMonthDays=()=>{
      
       let currentMonth = [];
       let day = 1;
       const numberDaysInMonth = this.determineNumberDaysInMonth(this.props);
       console.log('numberDaysInMonth',numberDaysInMonth);
    
       let startInd = (this.determineStartWeekDay(this.props) === 0) ? 6 : (this.determineStartWeekDay(this.props) - 1);
        console.log('startInd',startInd);
        while(currentMonth.length < startInd){
        currentMonth.push("");
         }
        for (let i=startInd;i<numberDaysInMonth+startInd; i++){
        currentMonth[i] = day;
        day+=1;
        }

        while(currentMonth.length%7!==0){
        currentMonth.push("");
        }
        this.setState({
            monthDays:currentMonth
        })
   }

   handleClick=(ind)=>{
       if(this.state.monthDays[ind]!==''){
           let chosen=new Date(this.props.period);           
           chosen.setDate(this.state.monthDays[ind]);
           console.log('chosen',chosen);
           
        this.setState({
            userDate: chosen,
            userDay:this.state.monthDays[ind]
        })
        
       }
       
   }

   findOutIsTheSamePeriod=()=>{
       let period1 = new Date(this.props.period);
       let period2 = new Date(this.state.userDate);
       console.log('period1',period1);
       console.log('period2',period2);
    let isTheSame=(period1.getMonth()===period2.getMonth() && period1.getFullYear()===period2.getFullYear())? true : false;    
    console.log('isTheSame',isTheSame);
    
    this.setState({
        samePeriod: isTheSame
    })  
   }
}

export default MonthlyCalendar;