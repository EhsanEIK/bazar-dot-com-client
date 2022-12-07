import React from 'react';

const About = () => {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src="https://media.istockphoto.com/id/1086341762/vector/about-us-flat-design-style-colorful-illustration.jpg?s=612x612&w=0&k=20&c=jeUDlovR0TRmuSb6lp19P7ijHx8UNtZzZhHJZVmoWJc=" className="rounded-lg shadow-2xl" alt='' />
                <div>
                    <h1 className="text-5xl font-bold">About Us</h1>
                    <p className="py-6">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex autem aut culpa odio repudiandae dolorem laudantium fuga doloribus commodi magni modi quis necessitatibus ad hic nihil tempore quae optio blanditiis placeat, sit eos incidunt? Error porro reiciendis, perspiciatis necessitatibus tempora doloremque doloribus dolorum, magni quae delectus maiores minima modi neque!</p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div >
        </div >
    );
};

export default About;