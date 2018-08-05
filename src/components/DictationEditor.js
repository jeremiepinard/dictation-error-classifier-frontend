import React, {Component} from 'react';
import {Button, Glyphicon, ListGroup, ListGroupItem} from 'react-bootstrap';

class DictationEditor extends Component {

    constructor(props) {
        super(props);

        this.state = {...props.dictation, ...{wordToAdd: '', closeModal: props.closeModal}};

        this.handleRemoveWord = this.handleRemoveWord.bind(this);
        this.handleAddWord = this.handleAddWord.bind(this);
        this.handleNewWordChange = this.handleNewWordChange.bind(this);
        this.handleDictationNameChange = this.handleDictationNameChange.bind(this);
        this.handleCancelEdit = this.handleCancelEdit.bind(this);
        this.handleSaveDictation = this.handleSaveDictation.bind(this);
    }

    handleRemoveWord(wordIndex) {
        this.setState((prevState) => {
                prevState.entries.splice(wordIndex, 1);
                return prevState;
            }
        )
    }

    handleAddWord() {
        this.setState((prevState) => {
                prevState.entries.push(prevState.wordToAdd);
                return { ...prevState, ...{wordToAdd: ''}};
            }
        );
    }

    handleNewWordChange(word) {
        this.setState((prevState) => {
                return { ...prevState, ...{wordToAdd: word}};
            }
        );
    }

    handleDictationNameChange(name) {
        this.setState((prevState) => {
                return { ...prevState, ...{name: name}};
            }
        );
    }

    handleCancelEdit() {
        this.state.closeModal();
    }

    handleSaveDictation() {
        this.state.closeModal();
    }

    render() {
        let words = this.state.entries.map((word, index) =>
            (<ListGroupItem>
                {word}
                <Button onClick={() => this.handleRemoveWord(index)}>
                    <Glyphicon glyph="remove" />
                </Button>
            </ListGroupItem>)
        );

        return (<div>
            <input type="text" value={this.state.name} onChange={(event) => this.handleDictationNameChange(event.target.value)}/>

            <ListGroup>
                {words}
            </ListGroup>

            <input type="text" value={this.state.wordToAdd} onChange={(event) => this.handleNewWordChange(event.target.value)}/>
            <Button onClick={() => this.handleAddWord()}>
                <Glyphicon glyph="plus" />
            </Button>
            <Button onClick={() => this.handleCancelEdit()}>
                Cancel
            </Button>
            <Button onClick={() => this.handleSaveDictation()}>
                Save
            </Button>
        </div>);
    }
}

export default DictationEditor;
