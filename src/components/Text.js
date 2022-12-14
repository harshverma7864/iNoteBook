import React from 'react'
import Typical from 'react-typical'

export const Text = () => {
    const steps = [
        'Harsh Verma đ',2000,

        'A Full Stack Web developer đĨī¸',2000,

        'A Full Stack Android developer đą',2000,

        'A Youtuber đŊī¸',2000,

        'A Video Editor đš',2000,

        'A Blogger đ',2000,

        'A Gamer đšī¸đŽ',2000,

        'A Entrepreneur đ',2000,

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
