import React from 'react';
import Nav from '../Nav/Nav';
import BGV from '../video/backGVideo';
import './About.css'

const About = () => {

   

    return (
        <div>
            <Nav />
            <BGV />
            <div className='about-container'>
                <div className='about-title'>
                    <p>About Us</p>
                </div>
                <div className='about-p1'>
                    <p>
                        Cloud is a website created to display and demonstrate the skills of the creator.
                        This website was created using react as a front-end framework,
                        Express as a back-end framework,
                        MongoDB as a database server,
                        and SendGrid as an email API.
                    </p>
                </div>
                <div className='about-p2'>
                    <p>
                        <span className='about-note'>Note 1</span>
                        :- The purpose of this website is only to display and demonstrate the skills.
                        NO reals transaction will occur on this website.
                    </p>
                </div>
                <div className='about-p3'>
                    <p>
                        <span className='about-note'>Note 2</span>
                        :- The database server will be clean regularly.
                        There would be no data save for future or any use that is not related to this website.
                    </p>
                </div>
                <div className='about-p4'>
                    <p>
                        <span className='about-note'>Note 3</span>
                        :- Even though the password is hash before it enters the database server,
                        it is best to use a random password.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;