import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import * as dictationActions from '../actions/dictationActions';
import {connect} from 'react-redux';
import {Button, ButtonGroup, Glyphicon, ListGroup, ListGroupItem, Modal, Panel} from 'react-bootstrap';

import DictationEditor from "./DictationEditor";

class DictationPicker extends Component {

    constructor(props) {
        super(props);

        this.state = {
            collapsedDictationIds: [],
            currentlyEditedId: null,
            addingDictation: false
        };

        this.handleCollapseToggle = this.handleCollapseToggle.bind(this);
        this.handleShowModal = this.handleShowModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleUpdateDictation = this.handleUpdateDictation.bind(this);

        this.handleCreateDictation = this.handleCreateDictation.bind(this);
    }

    componentDidMount() {
        this.props.dictationActions.fetchDictations();
    }

    handleCollapseToggle(id) {
        this.setState((prevState) => {
            const collapsedDictationIds = prevState.collapsedDictationIds.includes(id)
                ? prevState.collapsedDictationIds.filter(dictationId => (dictationId !== id))
                : prevState.collapsedDictationIds.concat(id);
            return Object.assign({}, prevState, {collapsedDictationIds: collapsedDictationIds});
        });
    }

    handleShowModal(id) {
        this.setState((prevState) => {
            return Object.assign({}, prevState, {currentlyEditedId: id});
        });
    }

    handleCloseModal() {
        this.setState((prevState) => {
            return Object.assign({}, prevState, {currentlyEditedId: null, addingDictation: false});
        });
    }

    handleUpdateDictation(dictation) {
        this.props.dictationActions.updateDictation(dictation);
    }

    handleCreateDictation(dictation) {
        this.props.dictationActions.createDictation(dictation);
    }

    handleAddDictation() {
        this.setState((prevState) => {
            return Object.assign({}, prevState, {addingDictation: true});
        });
    }

    render() {
        let choices = this.props.dictations.map((dictation) => {
                let words = dictation.entries.map((word, index) => (<ListGroupItem>{word}</ListGroupItem>));
                return (<div>
                    <Button onClick={() => this.handleCollapseToggle(dictation.id)}>
                        {dictation.name}
                    </Button>
                    <Panel id="collapsible-panel-example-1" expanded={(this.state.collapsedDictationIds.indexOf(dictation.id) === -1)}>
                        <Panel.Collapse>
                            <Modal show={this.state.currentlyEditedId === dictation.id} onHide={() => this.handleCloseModal()}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Dictation {dictation.name}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <DictationEditor dictation={dictation} closeModal={() => this.handleCloseModal()} saveDictation={this.handleUpdateDictation}/>
                                </Modal.Body>
                            </Modal>

                            <ListGroup>{words}</ListGroup>

                            <ButtonGroup>
                                <Button onClick={() => this.handleShowModal(dictation.id)}>
                                    Edit
                                </Button>
                                <Link to={`/analyses?dictation=${dictation.id}`}>
                                    <Button>
                                        Analyze Dictation {dictation.name}
                                    </Button>
                                </Link>
                            </ButtonGroup>
                        </Panel.Collapse>
                    </Panel>
                </div>);
            }
        );
        return (
            <div className="DictationPicker">
                <ListGroup>
                    {choices}
                </ListGroup>
                <div>
                    <Button onClick={() => this.handleAddDictation()}>
                        <Glyphicon glyph="plus" />
                    </Button>
                    <Modal show={this.state.addingDictation} onHide={() => this.handleCloseModal()}>
                        <Modal.Header closeButton>
                            <Modal.Title>Adding New Dictation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <DictationEditor dictation={{id:"", name:"new dictation", entries:[]}} closeModal={() => this.handleCloseModal()} saveDictation={this.handleCreateDictation}/>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        );
    }
}

DictationPicker.propTypes = {
    dictationActions: PropTypes.object,
    dictations: PropTypes.array
};

function mapStateToProps(state) {
    return {
        dictations: state.dictations
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dictationActions: bindActionCreators(dictationActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DictationPicker);
