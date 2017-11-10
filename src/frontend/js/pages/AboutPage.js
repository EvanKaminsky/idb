import React from 'react';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import "../../static/css/about.css"
import backgroundStyle from "../constants.js"

const h2 = {
    color: 'white'
};

/* Page that displays team information */
export default class AboutPage extends React.Component {
    render() {
        return (
            <div style={backgroundStyle}>

            <div id="about" className="row">
                <div className="col-md-4 col-md-offset-4">
                    <Typography color='inherit' type='display3'>About</Typography>
                    <Typography color='inherit' type='headline' gutterBottom>TipsyMix is a web application that allows user to search for cocktails based off of a variety of attributes.
                    Whether you're a professional bartender or a college student, this site is for you! </Typography>

                    <Typography color='inherit' type='display1'>Stats:</Typography>
                    <Typography color='inherit' type='headline'>
                    Total Commits: 258 <br/>
                    Total Issues: 57 <br/>
                    Total Unit Tests: 30 <br/><br/></Typography>

                    <Typography color='inherit' type='display1'>Links:</Typography>
                    <div align="center" className="row">
                        <Button color='primary' href="https://github.com/EvanKaminsky/idb"> GitHub </Button>
                        <Button color='primary' href="https://trello.com/b/0Ks1mfas/primary"> Trello</Button>
                        <Button color='primary' href="http://docs.evankaminsky.apiary.io/"> Apiary API </Button>
                        <Button color='primary' href="https://utexas.box.com/s/mczsxwvbu0r0pq2k541asou4maczaxz0">Technical Report</Button>
                        <Button color='primary' href="https://utexas.box.com/s/gktvgjswvitlivx5hub9vjv48lzmpshp">UML</Button>
                        <Button color='primary' href="https://utexas.box.com/s/5vtuyat2nzw7cpu1rzyf3evy2g59xlli">PlanIt Poker</Button>
                        <br/><br/></div>

                    <Typography color='inherit' type='display1'>Data Sources:</Typography>
                    <Typography color='inherit' type='headline'>Data was acquired by a python web scraper, which wrote its results to the SQL datastore.</Typography>
                    <div align="center">
                        <Button color='primary' href="http://www.1001cocktails.com/recipes/most-popular-mixed-drinks.html">1001 Cocktails </Button>
                        <Button color='primary' href="http://www.barnonedrinks.com/drinks/top_ingredients/">BarnOne Drinks</Button>
                        <Button color='primary' href="https://en.wikipedia.org/wiki/List_of_national_liquors">Wikipedia</Button>
                        <Button color='primary' href="https://www.thewhiskyexchange.com/brands/spirits">The Whisky Exchange</Button><br/><br/></div>

                    <Typography color='inherit' type='display1'>Tools Used:</Typography>
                    <Typography color='inherit' type='headline'>
                    <b>Apiary</b> to document the Restful API.<br/>
                    <b>Trello</b> to track issues and for general project management.<br/>
                    <b>GitHub</b> to host our full codebase.<br/>
                    <b>WebStorm, PyCharm, and SublimeText</b> as primary development environments.<br/><br/></Typography>
                    <br/><br/>
                </div>
            </div>

            <div id="names" className="container">
                <div className="row">
                    <div className="col-md-1"/>
                    <div className="col-md-2" align="center">
                        <img className="img-responsive" src="../../static/faces/rohit.jpg" />
                        <Typography color='inherit' type='display1' gutterBottom><b>Rohit</b></Typography>
                        <Typography color='inherit' type='headline'>
                            Hi, my name is Rohit and I'm a junior CS major at UT. I'm interested in AI and machine
                            learning as possible topics to study in the future.<br/><br/>
                            Used GET endpoints and BeautifulSoup to scrape data on models and instances of each model.
                            Connections between instances were also obtained. Finally, used TF-IDF to determine tags
                            for each instance for search purposes.<br/><br/>
                            <b>Commits:</b> 16<br/>
                            <b>Unit Tests:</b> 0<br/>
                            <b>Issues:</b> 9<br/>
                            <br/><br/>
                        </Typography>
                    </div>

                    <div className = "col-md-2" align="center">
                        <img className="img-responsive" src="../../static/faces/mica.jpg" />
                        <Typography color='inherit' type='display1' gutterBottom><b>Mica</b></Typography>
                        <Typography color='inherit' type='headline'>
                            I'm Mica, a senior computer science major with a UTeach minor. I'm interested in computer
                            science as a tool in education, so much so it is the topic of my undergraduate thesis, and
                            after working in industry I want to teach high school computer science.<br/><br/>
                            I worked on the front-end design of the site. I primarily styled the detail pages of
                            individual instances using React and Material-UI, and the About page with a hybrid of
                            Bootstrap and Material-UI. I also wrote unit tests for the backend, made small api
                            updates, contributed to user stories, and updated the About page's content.<br/><br/>
                            <b>Commits:</b> 26<br/>
                            <b>Unit Tests:</b> 15<br/>
                            <b>Issues:</b> 7<br/>
                            <br/><br/>
                        </Typography>
                    </div>

                    <div className = "col-md-2" align="center">
                        <img className="img-responsive" src="../../static/faces/abhi.jpg" />
                        <Typography color='inherit' type='display1' gutterBottom><b>Abhi</b></Typography>
                        <Typography color='inherit' type='headline'>
                            Hello, I'm Abhi Ilindra. I'm a CS major interested in computational linguistics as well as
                            natural language processing.<br/><br/>
                            In this project I worked primarily on front-end design, using React and Bootstrap. I also
                            helped document the site in the technical report and create user stories.<br/><br/>
                            <b>Commits:</b> 34<br/>
                            <b>Unit Tests:</b> 0<br/>
                            <b>Issues:</b> 7<br/>
                            <br/><br/>
                        </Typography>
                    </div>

                    <div className = "col-md-2" align="center">
                        <img className="img-responsive" src="../../static/faces/evan.jpg" />
                        <Typography color='inherit' type='display1' gutterBottom><b>Evan</b></Typography>
                        <Typography color='inherit' type='headline'>
                            My name is Evan Kaminsky and I’m a junior at UT Austin. I’m currently taking AI and
                            software engineering, and I'm working on systems and blockchain research.<br/><br/>
                            For this project, I worked on all MVC components of our React frontend, focusing on
                            navigation, our networking layer, and component integration. I was also in charge of our
                            Flask backend API interface and deployment on GCP.
                            <br/><br/>
                            <b>Commits:</b> 56<br/>
                            <b>Unit Tests:</b> 7<br/>
                            <b>Issues:</b> 7<br/>
                            <br/><br/>
                        </Typography>
                    </div>

                    <div className="col-md-2" align="center">
                        <img className="img-responsive" src="../../static/faces/balazs.jpg" />
                        <Typography color='inherit' type='display1' gutterBottom><b>Balazs</b></Typography>
                        <Typography color='inherit' type='headline'>
                            Hi, my name is Balazs and I'm a junior at UT majoring in CS(Turing) and Pure Math. I'm
                            interested in computation/complexity theory as well as graphics for possible future
                            research, but I plan to work in software development for some time after college.<br/><br/>
                            For this project, I wrote the core of our python API backend. I designed the interface to
                            our database, as well as our search engine, complete with support for sorting, filtering,
                            and paginating results on the backend. I also set up our python unit testing suite,
                            implemented automatic code styling, scraped card colors from our image urls, and maintained
                            our API documentation.<br/><br/>
                            <b>Commits:</b> 61<br/>
                            <b>Unit Tests:</b> 8<br/>
                            <b>Issues:</b> 7<br/>
                            <br/><br/>
                        </Typography>
                    </div>

                    <div className="col-md-1"/>
                </div>
            </div>
            </div>
        )
    }
}


