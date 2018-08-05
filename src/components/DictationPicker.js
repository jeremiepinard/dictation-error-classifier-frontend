import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Button, ButtonGroup, ListGroup, ListGroupItem, Modal, Panel} from 'react-bootstrap';

import DictationEditor from "./DictationEditor";

class DictationPicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dictations: [
                {
                    collapsed: true,
                    dictation: {
                        key: "1",
                        name: "Animaux",
                        entries: ["aaa", "bbb"]
                    },
                    showEditModal: false,
                },
                {
                    collapsed: true,
                    dictation: {
                        key: "2",
                        name: "Animaux 2",
                        entries: ["aaa", "bbbcdcdcd"]
                    },
                    showEditModal: false
                }
            ]
        };

        this.handleCollapseToggle = this.handleCollapseToggle.bind(this);
        this.handleShowModal = this.handleShowModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleCollapseToggle(id) {
        this.setState((prevState) => {
                return {
                    dictations: prevState.dictations.map(dictation => {
                        if(dictation.dictation.key === id) {
                            return {...dictation, ...{collapsed: !dictation.collapsed}};
                        } else {
                            return dictation;
                        }
                    })
                };
            }
        )
    }

    handleShowModal(id) {
        this.setState((prevState) => {
                return {
                    dictations: prevState.dictations.map(dictation => {
                        if(dictation.dictation.key === id) {
                            return {...dictation, ...{showEditModal: true}};
                        } else {
                            return dictation;
                        }
                    })
                };
            }
        )
    }

    handleCloseModal(id) {
        this.setState((prevState) => {
                return {
                    dictations: prevState.dictations.map(dictation => {
                        if(dictation.dictation.key === id) {
                            return {...dictation, ...{showEditModal: false}};
                        } else {
                            return dictation;
                        }
                    })
                };
            }
        )
    }

    render() {
        let choices = this.state.dictations.map((dictation) => {
                let words = dictation.dictation.entries.map((word, index) => (<ListGroupItem>{word}</ListGroupItem>));

                return (<div>
                    <Button onClick={() => this.handleCollapseToggle(dictation.dictation.key)}>
                        {dictation.dictation.name}
                    </Button>
                    <Panel id="collapsible-panel-example-1" expanded={!dictation.collapsed}>
                        <Panel.Collapse>
                            <Modal show={dictation.showEditModal} onHide={() => this.handleCloseModal(dictation.dictation.key)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Dictation {dictation.dictation.name}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <DictationEditor dictation={dictation.dictation} closeModal={() => this.handleCloseModal(dictation.dictation.key)}/>
                                </Modal.Body>
                            </Modal>

                            <ListGroup>{words}</ListGroup>

                            <ButtonGroup>
                                <Button onClick={() => this.handleShowModal(dictation.dictation.key)}>
                                    Edit
                                </Button>
                                <Link to={`/analyses?dictation=${dictation.dictation.key}`}>
                                    <Button>
                                        Analyze Dictation {dictation.dictation.name}
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
            </div>
        );
    }
}

export default DictationPicker;
