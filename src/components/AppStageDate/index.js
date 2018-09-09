import React, {Component, PureComponent} from 'react';
import NavigationPanel from '../NavigationPanel';
import MonthlyCalendar from '../MonthlyCalendar';
import './style.css';


class AppStageDate extends PureComponent {
   constructor(props){
       super(props) 
       
    this.state = {
            selectedPeriod: null,
            isDisablePrev:true,
            isDisableNext:false,
            selectedDate: null,
        }
    this.defaultSelectedPeriod = this.defaultSelectedPeriod.bind(this);

    }

    componentWillMount(){
        this.defaultSelectedDate();
        this.defaultSelectedPeriod();
    }
    
    componentDidMount() {
        this.determineIsStepsDisable(this.state, this.props);

    }
  
    // shouldComponentUpdate(nextProps, nextState){    
    //   this.determineIsStepsDisable();
    // }


    
    render(){
        const {start, end, current} = this.props;
        this.determineIsStepsDisable();

        return (
        <div className="appStageDate__box">
               <NavigationPanel  period={this.state.selectedPeriod} buttonClick={this.handleButtonClick.bind(this)}
               isDisableNext={this.state.isDisableNext} isDisablePrev={this.state.isDisablePrev}
               /> 

               <MonthlyCalendar period={this.state.selectedPeriod} chosen={this.state.selectedDate} 
                dateClick={this.handleDateClick.bind(this)}/>
        </div>
        )
    }

    defaultSelectedPeriod=()=> {
        this.setState({
             selectedPeriod: new Date(this.props.current)
           });
         }

    defaultSelectedDate=()=>{
        this.setState({
            selectedDate: this.props.current
          });
    }


    determineIsStepsDisable=()=>{
        console.log('isStepDisable',this.state);
        
       let currentPoint = new Date(this.state.selectedPeriod);
       let startPoint = new Date(this.props.start);
       let endPoint = new Date(this.props.end);
      
    this.setState({
        isDisablePrev: (currentPoint.getMonth() ===startPoint.getMonth() && currentPoint.getFullYear()===startPoint.getFullYear())
       })
       this.setState({
        isDisableNext: (currentPoint.getMonth() ===endPoint.getMonth() && currentPoint.getFullYear()===endPoint.getFullYear())
     })

    }
       
    handleButtonClick = (event) => {
        console.log('click');
        
        console.log('id',event.target.id);
        
        let step =  (event.target.id==='next')? 1 : -1;
        let startMonth = this.state.selectedPeriod.getMonth();
        let newState = new Date( this.state.selectedPeriod);
    
         newState.setMonth(startMonth + step);
      
      this.setState({
         selectedPeriod: newState
      })  
    }

    handleDateClick=(day)=>{
        console.log('click day',day);
        
        // if(this.state.monthDays[ind]!==''){
        //     let chosen=new Date(this.props.period);           
        //     chosen.setDate(this.state.monthDays[ind]);
        //     console.log('chosen',chosen);
            let newDay = new Date(this.state.selectedPeriod);
            newDay.setDate(day);
            let from=new Date(this.props.start);
            from.setDate(from.getDate()-1);
            let to=new Date(this.props.end);
            to.setDate(to.getDate()+1);
            if((newDay>from) && (newDay<to)){
                console.log('меняем state', newDay, this.props.start);
                this.setState({
                    selectedDate: newDay,
                })
                
            }
         
        // }
        
    }

   
   
}

export default AppStageDate;