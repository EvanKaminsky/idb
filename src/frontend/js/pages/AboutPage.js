import React from 'react';

/* Local Imports */
import "../../static/css/cocktail.css"
import backgroundStyle from "../constants.js"

/* Page that displays team information */
export default class AboutPage extends React.Component {
    render() {
        return (
            <div style={backgroundStyle}>

            <div id="about" className="row">
                <div className="col-md-12">
                    <h3>About</h3>
                    TipsyMix is a platform that allows user to search for cocktails based off of a variety of attributes. Whether you're a professional bartender or a college student, this site is for you.
                    <br />
                    Total Commits: 99
                    <br />
                    Total Issues: 23
                    <br />
                    Total Unit Tests: 0
                    <br />
                    Links: <a href="https://github.com/EvanKaminsky/idb">GitHub Repo</a> | <a href = "https://trello.com/b/0Ks1mfas/primary">Trello</a> | <a href = "http://docs.evankaminsky.apiary.io/">Apiary API</a> | <a href = "https://utexas.box.com/s/5ipui9nvcda5ft29ekc1euk91f2499rs">Technical Report</a>
                    <br />
                    Data Sources: <a href="http://www.1001cocktails.com/recipes/most-popular-mixed-drinks.html">1001 Cocktails</a> | <a href="http://www.barnonedrinks.com/drinks/top_ingredients/">BarnOne Drinks</a> | <a href="https://en.wikipedia.org/wiki/List_of_national_liquorshttps://www.thewhiskyexchange.com/brands/spirits">Wikipedia</a> | <a href="https://www.thewhiskyexchange.com/brands/spirits">The Whisky Exchange</a>
                    <br />
                    Data was scraped manually for the time being.
                    <br />
                    <h3>Tools Used</h3>
                    <b>Apiary</b> was used to document and host our API with data scraped from the aforementioned data sources.
                    <br />
                    <b>Trello</b> was used to track issues.
                    <br />
                    <b>GitHub</b> was used to host our code.
                    <br />
                    <b>SublimeText</b> and <b>Atom</b> were used to write all of the HTML and CSS.
                </div>
            </div>

            <div id="names" className="container">
                <div className="row">
                    <div className="col-md-1"/>
                    <div className="col-md-2">
                        <h3>Rohit</h3>
                        <img className="img-responsive" src="../../static/faces/rohit.jpg" />
                        <p>Hi, my name is Rohit and I'm a junior CS major at UT. I'm interested in AI and machine learning as possible topics to study in the future.</p>
                        <p>For this project, I got multiple instances of each model and labeled all their attributes. I also contributed to the technical report.</p>
                        <p>Commits: 6</p>
                        <p>Unit Tests: 0</p>
                        <p>Issues: 5</p>
                    </div>
                    <div className = "col-md-2">
                        <h3>Mica</h3>
                        <img className="img-responsive" src="../../static/faces/mica.jpg" />
                        <p>I'm Mica, a senior computer science major with a UTeach minor. I'm interested in computer science as a tool in education, so much so it is the topic of my undergraduate thesis, and after working in industry I want to teach high school computer science.</p>
                        <p>I worked on the front-end design of the static website using Bootstrap, CSS, and HTML and contributed to the creation of user stories.</p>
                        <p>Commits: 14</p>
                        <p>Unit Tests: 0</p>
                        <p>Issues: 7</p>g
                    </div>
                    <div className = "col-md-2">
                        <h3>Abhi</h3>
                        <img className="img-responsive" src="../../static/faces/abhi.jpg" />
                        <p>Hello, I'm Abhi Ilindra. I'm a CS major interested in computational linguistics as well as natural language processing.</p>
                        <p>In this project I worked primarily on front-end design, using React and Bootstrap. I also helped document the site in the technical report and create user stories.</p>
                        <p>Commits: 32</p>
                        <p>Unit Tests: 0</p>
                        <p>Issues: 7</p>
                    </div>
                    <div className = "col-md-2">
                        <h3>Evan</h3>
                        <img className="img-responsive" src="../../static/faces/evan.jpg" />
                        <p>My name is Evan Kaminsky and I’m a junior at UT Austin. I’m currently taking AI and software engineering, and plan on doing research in systems.</p>
                        <p>For this project, I’ll be working on our React frontend and managing Google Cloud Platform.</p>
                        <p>Commits: 31</p>
                        <p>Unit Tests: 0</p>
                        <p>Issues: 7</p>
                    </div>
                    <div className="col-md-2">
                        <h3>Balazs</h3>
                        <img className="img-responsive" src="../../static/faces/balazs.jpg" />
                        <p>Hi, my name is Balazs and I'm a junior at UT majoring in CS(Turing) and Pure Math. I'm interested in computation/complexity theory as well as graphics for possible future research, but I plan to work in software development for some time after college.</p>
                        <p>For this project, I created our API writeup, helped design our models, and contributed to the technical report.</p>
                        <p>Commits: 4</p>
                        <p>Unit Tests: 0</p>
                        <p>Issues: 7</p>
                    </div>

                    <div className="col-md-1"/>
                </div>
            </div>
            </div>
        )
    }
}


