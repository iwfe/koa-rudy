import React,{Component} from 'react';

module.exports = class Hello extends Component{
  constructor(props){
    super(props);
    this.state = {name:props.name};
  }

  onChange(event){
    this.setState({name:event.target.value});
  }
  
  render(){
    return (
      <div>
        <input value={this.state.name} onChange={this.onChange.bind(this)}/>
        <p>Hello {this.state.name}</p>
      </div>
    );
  }
};