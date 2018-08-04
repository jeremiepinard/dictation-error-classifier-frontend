import React, {Component} from 'react';

import Table from 'react-bootstrap/lib/Table';

class DictationAnalysis extends Component {

    constructor(props) {
        super(props);
        this.state = {
            entries: props.correctSpellings.map( (correctSpelling, index) => {
                return {
                    key: index.toString(),
                    input: '',
                    correctSpelling: correctSpelling,
                    errors: ''
                };
            })
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let changedRowIndex = event.target.parentNode.parentNode.id;
        let changedValue = event.target.value;
        this.setState((prevState) => {
                return {
                    entries: prevState.entries.map(entry => {
                        if(entry.key === changedRowIndex) {
                            return {...entry, ...{input: changedValue, errors: 'analyzed'}};
                        } else {
                            return entry;
                        }
                    })
                };
            }
        )
    }

    render() {
        let wordEntries = this.state.entries.map( (entry, index) => {
            return (<tr key={index} id={index}>
                <td>
                    <input type="text" value={entry.input} onChange={this.handleChange} />
                </td>
                <td>{entry.correctSpelling}</td>
                <td>{entry.errors}</td>
            </tr> );
        });

        return (
            <Table responsive>
                <thead>
                <tr>
                    <th>Word to Analyze</th>
                    <th>Correct Spelling</th>
                    <th>Detected Errors</th>
                </tr>
                </thead>
                <tbody>
                    {wordEntries}
                </tbody>
            </Table>
        );
    }
}

export default DictationAnalysis;
