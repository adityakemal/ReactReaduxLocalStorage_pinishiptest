import React, {Component} from 'react'
import imageResume from '../assets/resumeFe2019.pdf'


class About extends Component {
    render() {

        return (
            <div>
                <embed src={imageResume} width="100%" height="1250px" />
            </div>

        )
    }
}

export default About