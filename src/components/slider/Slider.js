import React, { Component } from 'react';

import './slider.sass';
import Slide_1 from '../../img/header-slide1.jpg';
import Slide_2 from '../../img/header-slide2.jpg';
import Slide_3 from '../../img/home-7.jpg';

class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slides: [
                {
                    eachSlide: `url(${Slide_1})`
                },
                {
                    eachSlide: `url(${Slide_2})`
                },
                {
                    eachSlide: `url(${Slide_3})`
                }
            ],
            autoplay: false,
            active: 0,
            max: 0
        }
        this.state.max = this.state.slides.length;
        // this.intervalBetweenSlides = this.intervalBetweenSlides.bind(this);
        this.nextOne = this.nextOne.bind(this);
        this.prevOne = this.prevOne.bind(this);
    }
    // componentDidMount() {
    //     this.interval = setInterval(() => this.intervalBetweenSlides(), 3000)
    // }
    // componentWillUnmount() {
    //     clearInterval(this.interval);
    // }

    // intervalBetweenSlides() {
    //     if(this.state.active === this.state.max - 1) {
    //         this.state.active = 0;
    //     }else {
    //         this.state.active++;
    //     }

    //     this.setState({
    //         active: this.state.active
    //     })
    // }

    nextOne() {
        if (this.state.active < this.state.max - 1) {
            let act = this.state.active;
            this.setState({
                active: ++act
            })
        } else {
            this.setState({
                active: 0
            })
        }
    }

    prevOne() {
        if (this.state.active > 0) {
            let act = this.state.active;
            this.setState({
                active: --act
            })
        } else {
            let max = this.state.max;
            this.setState({
                active: max - 1
            })
        }
    }

    dots(index, event) {
        this.setState({
            active: index
        })
    }

    isActive(value) {
        if(this.state.active === value) {
            return 'active';
        }
    }

    setSliderStyles() {

        const transition = this.state.active * - 100 / this.state.slides.length;

        return {
            width: (this.state.slides.length * 100) + '%',
            transform: `translateX(${transition}%)`
        }
    }

    renderSlides() {
        
        const transition = 100 / this.state.slides.length + '%';

        return this.state.slides.map((item, index) => (
            <div
                className= "each-slide" 
                key = {index} 
                style = {{backgroundImage: item.eachSlide, width: transition}}>
            </div>
        ))
    }

    renderDots() {
        return this.state.slides.map((item, index) => (
            <li
            className = {this.isActive(index) + ' dots'}
            key = {index}
            ref = "dots"
            onClick = {this.dots.bind(this, index)}>
                <a></a>
            </li>
        ))
    }

    renderArrows() {
        return (
            <>
                <button
                type="button"
                className="arrows prev"
                onClick={this.prevOne}>
                    <svg fill='black' width='50' height='50' viewBox='0 0 24 24'>
                        <path d='M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z'/>
                        <path d='M0 0h24v24H0z' fill='none'/>
                    </svg>
                </button>
                <button
                type="button"
                className="arrows next"
                onClick={this.nextOne}>
                    <svg fill='black' height='50' viewBox='0 0 24 24' width='50'>
                        <path d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z'/>
                        <path d='M0 0h24v24H0z' fill='none'/>
                    </svg>
                </button>
            </>
        )
    }

    render() {
        return (
            <div className="slider-container">
                <div className="slider">
                    <div className="wrapper"
                    style = {this.setSliderStyles()}>
                        {this.renderSlides()}>
                    </div>

                    {this.renderArrows()}

                    <ul className="dots-container">
                        {this.renderDots()}
                    </ul>
                </div>
            </div>
        )
    };
}

export default Slider;