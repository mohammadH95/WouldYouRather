import React, { Component } from "react";

class QuestionList extends Component {
    render() {
        const { keys } = this.props
        console.log(keys);
        
        return(
            <div>
                {keys === 'unanswered' 
                    ? <p>unanswered</p>
                    : <p>answered</p>}
            </div>
        )
    }
}

export default QuestionList