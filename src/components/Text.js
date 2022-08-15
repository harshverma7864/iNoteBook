import React from 'react'
import Typical from 'react-typical'

export const Text = () => {
    const steps = [
        'Harsh Verma 😎',2000,

        'A Full Stack Web developer 🖥️',2000,

        'A Full Stack Android developer 📱',2000,

        'A Youtuber 📽️',2000,

        'A Video Editor 📹',2000,

        'A Blogger 😅',2000,

        'A Gamer 🕹️🎮',2000,

        'A Entrepreneur 😂',2000,

    ];
    return (
        <div className="container text-center">
            <h1 className="my-4">  I'm {' '}
                <Typical
                wrapper="span"
                loop={Infinity}
                steps={steps}
                
                />

                
            </h1>
        </div>
    )
}
