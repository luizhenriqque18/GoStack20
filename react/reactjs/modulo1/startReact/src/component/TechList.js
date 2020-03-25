import React, { Component } from 'react';

import TechItem from './TechItem';

class TechList extends Component {

    componentDidMount(){
        const techs = JSON.parse(localStorage.getItem('techs'));
        if(techs){
            this.setState({techs});
        }
    }

    componentDidUpdate(prevProps, prevState){
        const { techs } = this.state;
        if(prevState.techs !== techs){
            localStorage.setItem('techs', JSON.stringify(techs));
        }
    }

    state = {
        newTech: '',
        techs: [],
    }

    handlerTextInput = e =>{
       this.setState({ newTech: e.target.value });
    }

    handlerSubmit = e => {
        e.preventDefault();

        this.setState({ 
            techs: [...this.state.techs, this.state.newTech],
            newTech: ''
        });
    }

    handlerDelete = e => {
        this.setState({ techs: this.state.techs.filter(value => value != e) })
    }

    render() {
        return(
            <form>
                <ul>
                    {
                        this.state.techs.map( tech => 
                            (<TechItem 
                                key={tech} 
                                tech={tech} 
                                onDelete={()=>this.handlerDelete(tech)}/>)
                        )
                    }
                </ul>
                <input type="text" onChange={this.handlerTextInput} value={this.state.newTech }/>
                <button type="submit" onClick={this.handlerSubmit}> Enviar </button>
            </form>
        );
    }
}

export default TechList;