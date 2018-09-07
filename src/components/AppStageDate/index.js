import React, {Component, PureComponent} from 'react';
import MonthlyCalendar from '../MonthlyCalendar';
import './style.css';

class AppStageDate extends Component {
   constructor(props){
       super(props) 
       
    this.state = {
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            selectedPeriod: null,
            selectedDate: null,

        }
    this.defaultSelectedPeriod = this.defaultSelectedPeriod.bind(this);

    }

    componentWillMount(){
        this.defaultSelectedPeriod();
        this.defaultSelectedDate();


    }
    // componentDidMount() {
    //     // this.interval = setInterval(() => this.defaultSelectedPeriod(), 1000);
    //    this.defaultSelectedPeriod();
    //   }
  
    // shouldComponentUpdate(nextProps, nextState){
    //     return this.state.isOpen !== nextState.isOpen
    // }


    
    render(){
        const {start, end, current} = this.props;
        console.log('props',this.props);
        
        // const body = this.state.isOpen && <section>{article.text}</section>
    
        return (
        <div className="appStageDate__box">
            <div className="appStageDate__selectPeriod">
              <button className="appStageDate__changePeriod"
               id="previous"
               onClick={this.handleClick}
               disabled={this.props.current.getMonth()===this.props.start.getMonth() && this.props.current.getFullYear()===this.props.start.getFullYear()}>
                 Prev
              </button>
              <div className="appStageDate__periodInfo">{this.state.selectedPeriod}</div>
              <button className="appStageDate__changePeriod"
               id="next"
                onClick={this.handleClick}
                disabled={this.props.current.getMonth()===this.props.end.getMonth() && this.props.current.getFullYear()===this.props.end.getFullYear()}>
                Next
              </button>          
           </div>

           <div className="appStageDate__monthlyCalendar">
           <MonthlyCalendar/>
           тут календарь</div>
        </div>
        )
    }

    defaultSelectedPeriod=()=> {
        console.log('this.state AppStageDate',this.state);
        console.log('this.props AppStageDate',this.props);        
        this.setState({
             selectedPeriod: `${this.state.months[new Date(this.props.current).getMonth()]} ${new Date(this.props.current).getFullYear()}`
           });
         }

    defaultSelectedDate=()=>{
        this.setState({
            selectedDate: this.props.current
          });
    }
       
    handleClick = (event) => {
        let step =  (event.target.id==='next')? 1 : -1;
        console.log('step',step);
    //  это функция CreateendPeriod из родителя, как ее унифицировать и передать ребенку???
        let startMonth = this.state.selectedDate.getMonth();
        let newState = new Date( this.state.selectedDate);
    
      newState.setMonth(startMonth + step);
  
      
      this.setState({
         selectedDate: newState
      })
        
        this.setState({
            selectedPeriod: `${this.state.months[new Date(newState).getMonth()]} ${new Date(newState).getFullYear()}`
          });


        
        
    }
   
}

export default AppStageDate;