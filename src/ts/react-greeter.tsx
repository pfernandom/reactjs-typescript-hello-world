/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="greeter.ts" />

import ComponentState = __React.ComponentState;

class Card extends React.Component<any, any> {
	render(){
		return <span className="card">Card</span>
	}
}


class HelloWorld extends React.Component<HelloWorldProps, any> {
	render() {
		return	<div className="greeting-card">
			<div className="greeting-head">
				Hello {this.props.firstname} {this.props.lastname}!
			</div>
			<div className="greeting-body">
				Welcome to the ReactJS + TypeScript + Grunt demo
				<br/>
				<button onClick={this.doAlert}>Do an action!</button>
				{this.state}
			</div>
		</div>

	}
	public card = 'Yea'
	public doAlert(){
		console.log(this.state)
		this.card = 'gool'
	}
}

ReactDOM.render(<HelloWorld
		firstname="John"
		lastname="Smith"/>,
	document.getElementById('app'));