import React, { Component } from 'react';
// Importing components here
import Newsitem from './Newsitem';


export class News extends Component {
    render() {
        return (
            <div className='container my-3'>
                <h2>News Monkey - Top Headlines</h2>
                <div className="row my-4">
                    <div className="col-md-4">
                        <Newsitem title="mytitle1" description="my desc1" />
                    </div>
                    <div className="col-md-4">
                        <Newsitem title="mytitle2" description="my desc2" />
                    </div>
                    <div className="col-md-4">
                        <Newsitem title="mytitle3" description="my desc3" />
                    </div>
                </div>
            </div>
        );
    };
};

export default News;
