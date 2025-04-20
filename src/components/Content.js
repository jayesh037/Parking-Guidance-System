import React from 'react';
import '../assets/css/styles.css';
import image1 from '../assets/img/projects-1.webp';
import image2 from '../assets/img/projects-2.webp';
import image3 from '../assets/img/projects-3.webp';
import image4 from '../assets/img/project-4.webp';
import image5 from '../assets/img/projects-5.webp';

const Content = () => {
    const projects = [
        { img: image1, title: "Real-Time Tracking" },
        { img: image2, title: "Smart Reservation" },
        { img: image3, title: "AI Parking Guidance" },
        { img: image4, title: "App & Web Integration" },
        { img: image5, title: "Automated Payment" },
        { img: image1, title: "Real-Time Tracking" },
        { img: image2, title: "Smart Reservation" },
        { img: image3, title: "AI Parking Guidance" },
        { img: image4, title: "App & Web Integration" },
        { img: image5, title: "Automated Payment" }
    ];

    return (
        <section className="projects section" id="projects">
            <div className="project-container">
               <h2 className="section__title" >SERVICES WE OFFER</h2>
            </div>

            <div className="ticker-container">
                <div className="ticker-content">
                    {/* Duplicate items for infinite scroll effect */}
                    {[...projects, ...projects].map((project, index) => (
                        <div key={index} className="ticker-item">
                            <a href="#" target="_blank" className="projects__image">
                                <img src={project.img} alt={project.title} className="projects__img" />
                            </a>
                            <h3 className="projects__name">{project.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Content;
