import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TextAnalyzer.css';
import { Container, Form, Row, Col, Card, Navbar, Nav, Button } from 'react-bootstrap';

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
    partOfSpeech: '',
    synonyms: '',
    antonyms: '',
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
      definition: 'N/A',
      partOfSpeech: 'N/A',
      synonyms: 'N/A',
      antonyms: 'N/A',
    });
  };

  const handleChangeTextInput = (e) => {
    const text = e.target.value;
    setTextInput(text);
  
    if (inputType === 'word') {
      const metrics = analyzeText(text);
      setOutputMetrics(metrics);
    } else {
      // For paragraph input, update metrics directly
      const metrics = analyzeText(text);
      setOutputMetrics({
        charCount: metrics.charCount,
        wordCount: metrics.wordCount,
        sentenceCount: metrics.sentenceCount,
        paragraphCount: metrics.paragraphCount,
        spaceCount: metrics.spaceCount,
        punctuationCount: metrics.punctuationCount,
      });
    }
  };
  

  const handleProcessWord = async () => {
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${textInput}`);
      const [data] = await response.json();

      if (data) {
        const meaning = data.meanings.find(meaning => meaning.partOfSpeech);
        const synonyms = meaning ? meaning.definitions[0].synonyms.join(', ') : 'N/A';
        const antonyms = meaning ? meaning.antonyms.join(', ') : 'N/A';
        const definitions = meaning ? meaning.definitions.map(def => def.definition).join(', ') : 'N/A';
        const partOfSpeech = meaning ? meaning.partOfSpeech : 'N/A';

        setWordInfo({
          definition: definitions,
          partOfSpeech: partOfSpeech,
          synonyms: synonyms,
          antonyms: antonyms,
        });
      } else {
        setWordInfo({
          definition: '',
          partOfSpeech: '',
          synonyms: '',
          antonyms: '',
        });
      }
    } catch (error) {
      console.error('Error fetching word info:', error);
    }
  };

  return (
    <>
      <Navbar className="navbar" expand="lg">
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
            Word Input
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
            <Row>
              <Col xs={inputType === 'word' ? 10 : 12}>
                <Form.Control
                  as="textarea"
                  rows={inputType === 'word' ? 1 : 5}
                  placeholder={inputType === 'word' ? 'Type here...' : 'Type paragraph here...'}
                  value={textInput}
                  onChange={handleChangeTextInput}
                />
              </Col>
              {inputType === 'word' && (
                <Col xs={2}>
                  <Button className="process-button" onClick={handleProcessWord}>Process Word</Button>
                </Col>
              )}
            </Row>
          </Form.Group>
        </Form>

        {inputType === 'word' && (
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <table className="word-info-table">
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
                  <Card.Text>
                    <p><b>Definition: </b>{wordInfo.definition || 'N/A'}</p>
                    <p><b>Part of Speech:</b> {wordInfo.partOfSpeech || 'N/A'}</p>
                    <p><b>Synonyms: </b>{wordInfo.synonyms || 'N/A'}</p>
                    <p><b>Antonyms:</b> {wordInfo.antonyms || 'N/A'}</p>
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
                  <div className="table-responsive">
                    <table className="paragraph-info-table">
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
                  </div>
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
