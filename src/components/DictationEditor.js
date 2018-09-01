import React, {Component} from 'react';
import {Button, Glyphicon, ListGroup, ListGroupItem} from 'react-bootstrap';

class DictationEditor extends Component {

    constructor(props) {
        super(props);

        const dictation = props.dictation;
        this.state = Object.assign({}, dictation, {wordToAdd: '', closeModal: props.closeModal, saveDictation: props.saveDictation});

        this.handleRemoveWord = this.handleRemoveWord.bind(this);
        this.handleAddWord = this.handleAddWord.bind(this);
        this.handleNewWordChange = this.handleNewWordChange.bind(this);
        this.handleDictationNameChange = this.handleDictationNameChange.bind(this);
        this.handleCancelEdit = this.handleCancelEdit.bind(this);
        this.handleSaveDictation = this.handleSaveDictation.bind(this);
    }

    handleRemoveWord(wordIndex) {
        this.setState((prevState) => {
                return Object.assign({}, prevState, {entries: prevState.entries.filter((word, index) => index !== wordIndex)});
            }
        )
    }

    handleAddWord() {
        this.setState((prevState) => {
                return { ...prevState, ...{entries: prevState.entries.concat(prevState.wordToAdd), wordToAdd: ''}};
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
        this.state.saveDictation(Object.assign({}, {
            id: this.state.id,
            name: this.state.name,
            entries: this.state.entries
        }));
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
