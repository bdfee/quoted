import React from 'react'
import style from './Main.module.css'

const Main = () => {

    return (
        <div className={style.container}>    
            <div className={style.main}>
                <div
                style={{
                    border: '1px solid black',
                    width: '20vw',
                    height: '40vh'
                }}>
                    <img>{/* image */}</img>
                    image
                </div>
                <div
                    style={{
                        border: '1px solid black',
                    }}
                    >
                    <h3>John Doe</h3>
                    <p>10/03/1946 - 2/21/1985</p>
                    <p>bio: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
                </div>
                <div
                    style={{
                        gridRowStart: 2,
                        gridColumnStart: 1,
                        gridColumnEnd: 3,
                        border: '1px solid black',
                    }}
                >
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
                </div>
                <div
                    style={{
                        gridRowStart: 3,
                        gridColumnStart: 1,
                        gridColumnEnd: 3,
                        border: '1px solid black',
                    }}
                >
                    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
                </div>
            </div>
        </div>
    )

}

export default Main
