import './App.css';
import React, { Component } from 'react';

export class App extends Component {
	constructor() {
		super();
		this.state = {
			num: 6,
			colors: [],
			pickedColor: '',
			message: ''
		};
		this.pickColor = this.pickColor.bind(this);
		this.squareHandler = this.squareHandler.bind(this);
		this.randomColor = this.randomColor.bind(this);
		this.setColors = this.setColors.bind(this);
		this.playAgain = this.playAgain.bind(this);
		this.selectMode = this.selectMode.bind(this);
		this.changeColors = this.changeColors.bind(this);
	}
	componentDidMount() {
		this.setState(
			{
				colors: this.setColors(this.state.num),
				pickedColor: this.pickColor()
			},
			() => {
				let squares = document.querySelectorAll('.square');
				for (var i = 0; i < squares.length; i++) {
					squares[i].style.backgroundColor = this.state.colors[i];
				}
			}
		);
	}
	pickColor() {
		let rand = Math.floor(Math.random() * this.state.colors.length);
		return this.state.colors[rand];
	}
	squareHandler(e) {
		let clickedColor = e.target.style.backgroundColor;
		console.log('Clicked color: ' + clickedColor);
		if (clickedColor === this.state.pickedColor) {
			this.setState({ message: 'Korrekt' });
			this.changeColors(this.state.pickedColor);
			document.querySelector('h1').style.background = clickedColor;
			document.querySelector('#playAgain').textContent = 'NOCHMAL SPIELEN';
		} else {
			e.target.style.backgroundColor = '#232323';
			this.setState({ message: 'Versuche es nochmal' });
		}
	}
	randomColor() {
		var r = Math.floor(Math.random() * 256);
		var g = Math.floor(Math.random() * 256);
		var b = Math.floor(Math.random() * 256);
		return 'rgb(' + r + ', ' + g + ', ' + b + ')';
	}
	setColors(num) {
		var arr = [];
		for (var i = 0; i < num; i++) {
			arr.push(this.randomColor());
		}
		return arr;
	}
	playAgain() {
		let squares = document.querySelectorAll('.square');
		this.setColors(this.state.num);
		this.setState(
			{
				pickedColor: this.pickColor()
			},
			() => {
				this.setState({ message: '' });
				document.querySelector('#playAgain').textContent = 'SPIEL STARTEN';
				document.querySelector('h1').style.removeProperty('background');
				for (var i = 0; i < squares.length; i++) {
					squares[i].style.background = this.state.colors[i];
					console.log(this.state.colors[i]);
				}
				console.log('Picked color: ' + this.state.pickedColor);
			}
		);
	}
	selectMode(e) {
		document.querySelector('.easy').classList.remove('selected');
		document.querySelector('.hard').classList.remove('selected');
		if (e.target.className === 'easy') {
			document.querySelector('.easy').classList.add('selected');
			this.setState({ num: 3 }, () => {
				this.playAgain();
			});
		} else {
			document.querySelector('.hard').classList.add('selected');
			this.setState({ num: 6 }, () => {
				this.playAgain();
			});
		}
	}
	changeColors(color) {
		let squares = document.querySelectorAll('.square');

		for (var i = 0; i < squares.length; i++) {
			squares[i].style.background = color;
		}
	}
	render() {
		return (
			<div className="App">
				<h1>
					Errate die Farbe
					<br />
					<span>{this.state.pickedColor}</span>
					<br />
				</h1>
				<div id="bar">
					<button id="playAgain" onClick={this.playAgain}>
						SPIEL STARTEN
					</button>
					<span id="message">{this.state.message}</span>
					<button onClick={(event) => this.selectMode(event)} className="easy">
						LEICHT
					</button>
					<button onClick={(event) => this.selectMode(event)} className="hard selected">
						SCHWER
					</button>
				</div>
				{this.state.num === 6 ? (
					<div id="container">
						<div onClick={(event) => this.squareHandler(event)} className="square" />
						<div onClick={(event) => this.squareHandler(event)} className="square" />
						<div onClick={(event) => this.squareHandler(event)} className="square" />
						<div onClick={(event) => this.squareHandler(event)} className="square" />
						<div onClick={(event) => this.squareHandler(event)} className="square" />
						<div onClick={(event) => this.squareHandler(event)} className="square" />
					</div>
				) : (
					<div id="container">
						<div onClick={(event) => this.squareHandler(event)} className="square" />
						<div onClick={(event) => this.squareHandler(event)} className="square" />
						<div onClick={(event) => this.squareHandler(event)} className="square" />
					</div>
				)}
			</div>
		);
	}
}

export default App;
