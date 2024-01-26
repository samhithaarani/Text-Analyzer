import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container, Form, Row, Col, Card, Navbar, Nav } from 'react-bootstrap';

const TextAnalyzer = () => {
  const [inputType, setInputType] = useState('word');
  const [textInput, setTextInput] = useState('');
  const [outputMetrics, setOutputMetrics] = useState({
    charCount: 0,
    wordCount: 0,
    sentenceCount: 0,
    paragraphCount: 0,
    spaceCount: 0,
    punctuationCount: 0,
  });
  const [wordInfo, setWordInfo] = useState({
    definition: '',
    partsOfSpeech: [],
    synonyms: [],
    antonyms: [],
  });

  const analyzeText = (text) => {
    const charCount = text.length;
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
    const sentenceCount = text.split(/[.!?]+/).filter(Boolean).length;
    const paragraphCount = text.split('\n').filter(Boolean).length;
    const spaceCount = (text.match(/\s/g) || []).length;
    const punctuationCount = (text.match(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g) || []).length;

    return {
      charCount,
      wordCount,
      sentenceCount,
      paragraphCount,
      spaceCount,
      punctuationCount,
    };
  };

  const handleChangeInputType = (type) => {
    setInputType(type);
    setTextInput('');
    setOutputMetrics({
      charCount: 0,
      wordCount: 0,
      sentenceCount: 0,
      paragraphCount: 0,
      spaceCount: 0,
      punctuationCount: 0,
    });
    setWordInfo({
      definition: '',
      partsOfSpeech: [],
      synonyms: [],
      antonyms: [],
    });
  };

  const handleChangeTextInput = (e) => {
    const text = e.target.value;
    setTextInput(text);
    const metrics = analyzeText(text);
    setOutputMetrics(metrics);
    if (inputType === 'word') {
      // Fetch word info (definition, parts of speech, synonyms, antonyms) here
      fetchWordInfo(text);
    }
  };

  const fetchWordInfo = async (word) => {
    // Fetch word info from an API or data source
    // Example:
    // const response = await fetch(`API_URL/${word}`);
    // const data = await response.json();
    // setWordInfo(data);
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#"><h3>Text Analyzer</h3></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
          
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
      <p className="description">Text Analyzer is a simple free online tool for SEO web content analysis that helps you find most frequent phrases and words, number of characters, words, sentences and paragraphs, and estimated read and speak time of your content.</p>

        <div className="input-type-buttons">
          <span
            className={`input-type-button ${inputType === 'word' ? 'active' : ''}`}
            onClick={() => handleChangeInputType('word')}
          >
            Word
          </span>
          <span
            className={`input-type-button ${inputType === 'para' ? 'active' : ''}`}
            onClick={() => handleChangeInputType('para')}
          >
            Paragraph
          </span>
        </div>
       
        <Form>
          <Form.Group controlId="textInput">
            <Form.Label>{inputType === 'word' ? 'Enter a word:' : 'Enter a paragraph:'}</Form.Label>
            <Form.Control
              as="textarea"
              rows={inputType === 'word' ? 1 : 5}
              placeholder={inputType === 'word' ? 'Type here...' : 'Type paragraph here...'}
              value={textInput}
              onChange={handleChangeTextInput}
            />
          </Form.Group>
        </Form>
        {inputType === 'word' && (
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  
                 
                  <Card.Title>Text Metrics</Card.Title>
                  <table>
                    <thead>
                      <tr>
                        <th>Number of Characters</th>
                        <th>Number of Words</th>
                     
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{outputMetrics.charCount}</td>
                        <td>{outputMetrics.wordCount}</td>
    
                      </tr>
                    </tbody>
                  </table>
                </Card.Body>
              </Card>
             
              <Card>
                <Card.Body>
                  <Card.Title>Word Info</Card.Title>
                  <Card.Text>
                    <p>Definition: {wordInfo.definition}</p>
                    <p>Parts of Speech: {wordInfo.partsOfSpeech.join(', ')}</p>
                    <p>Synonyms: {wordInfo.synonyms.join(', ')}</p>
                    <p>Antonyms: {wordInfo.antonyms.join(', ')}</p>
                  </Card.Text>
                </Card.Body>
              </Card>

            
            </Col>
          </Row>
        )}

{inputType === 'para' && (
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Text Metrics</Card.Title>
                  <table>
                    <thead>
                      <tr>
                        <th>Number of Characters</th>
                        <th>Number of Words</th>
                        <th>Number of Sentences</th>
                        <th>Number of Paragraphs</th>
                        <th>Number of Spaces</th>
                        <th>Number of Punctuations</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{outputMetrics.charCount}</td>
                        <td>{outputMetrics.wordCount}</td>
                        <td>{outputMetrics.sentenceCount}</td>
                        <td>{outputMetrics.paragraphCount}</td>
                        <td>{outputMetrics.spaceCount}</td>
                        <td>{outputMetrics.punctuationCount}</td>
                      </tr>
                    </tbody>
                  </table>
                </Card.Body>
              </Card>
              </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default TextAnalyzer;
