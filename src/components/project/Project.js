import React, { Component } from 'react';
import './project.sass';
import { connect } from 'react-redux'
import { NavLink as Link } from 'react-router-dom';

import title_img from '../../img/project_title.png'


import Title from '../titile/Title'

class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slide: this.props.projects[this.props.match.params.number]
        }
        
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
        this.upd = this.upd.bind(this);
    }

    prev() {
        this.props.match.params.number--;
        this.setState({slide: this.props.projects[this.props.match.params.number]})
    }

    next() {
        this.props.match.params.number++;
        this.setState({slide: this.props.projects[this.props.match.params.number]})
    }

    componentDidUpdate() {
        this.upd()
    }

    upd() {
        
        let prev = document.querySelector('.pr');
        let next = document.querySelector('.nx');

        +this.props.match.params.number === 0 ? prev.style.display = 'none' : prev.style.display = 'inline-block';

        +this.props.match.params.number === 8 ? next.style.display = 'none' : next.style.display = 'inline-block';
    }

    componentWillMount() {
        window.onhashchange = (e) => {
            e.preventDefault();
            this.setState({slide: this.props.projects[+this.props.match.params.number]})
        }
        
    }

    componentDidMount() {
        window.scroll(0, 0);

        this.upd();
    };

    render() {
        return (
            <div className="project__container">
                <Title image={`url(${title_img})`} color={'#e2e2e2'} headline="LATEST PROJECTS" sent="We Deliver Quality"/>
                <div className="prev-next">
                    <Link to={`/portfolio/${+this.props.match.params.number - 1}`} onClick={this.prev} className="pr">
                        <span className="arrow-prev"></span>
                        <span className="prev">PREVIOUS</span>
                    </Link>
                    <Link to={`/portfolio/${+this.props.match.params.number + 1}`} onClick={this.next} className="nx">
                        <span className="next">NEXT</span>
                        <span className="arrow-next"></span>
                    </Link>
                </div>
                <div className="project__inf-container">
                    <div className="inf">
                        <div className="inf__head">
                            <span className="headline">{this.state.slide.headline}</span>
                            <span className="sub">{this.state.slide.subheading}</span>
                        </div>
                        <div className="inf__body">
                            <span className="date">{this.state.slide.date}</span>
                            <span className="text">{this.state.slide.text}</span>
                        </div>
                        <div className="inf__role">
                            <span className="whitch">ROLE ON PROJECT:</span>
                            <span className="roles">{this.state.slide.role}</span>
                        </div>
                        <div className="inf__role">
                            <span className="whitch">TAGS:</span>
                            <span className="roles">{this.state.slide.tags}</span>
                        </div>
                    </div>
                    <div className="image" style={{backgroundImage: this.state.slide.eachSlide}}></div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        projects: state.slideInfo.projects
    }
}

export default connect(mapStateToProps)(Project);