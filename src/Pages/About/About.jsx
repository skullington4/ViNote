import React from 'react';
import './About.css';
import Danny from '../../Images/Danny.png'; // Replace with actual image paths

export default function About() {
    return (
        <div className="aboutUs">
            <section className="intro">
                <h1>We are Taxsy</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rutrum turpis sit amet urna porta tristique. Quisque in elit id massa ullamcorper auctor. In ac nulla a urna blandit porta at a enim. Integer commodo diam rhoncus blandit tristique. Nam eu orci porta, fringilla elit eget, lacinia velit. In pharetra urna eget mollis ultricies. In cursus velit ac mi euismod consectetur. Donec rhoncus id justo non suscipit. Morbi pulvinar ante metus, a facilisis erat ultricies id. Phasellus condimentum lorem convallis turpis dictum, nec elementum nunc vehicula. Integer in aliquet mi, quis accumsan urna. Aliquam venenatis sed lorem sed congue.</p>
            </section>
            <section className="team">
                <h2>Meet the team</h2>
                <div className="teamMembers">
                    <div className="teamMember">
                        <img src={Danny} alt="Timothy Mitchell" />
                        <h3>Timothy Mitchell</h3>
                        <p>CEO/Co-Founder</p>
                    </div>
                    <div className="teamMember">
                        <img src={Danny} alt="Daniel Gallardo" />
                        <h3>Daniel Gallardo</h3>
                        <p>Co-Founder</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
