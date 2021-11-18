import React, { FC, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CanvasDraw, { CanvasDrawProps } from 'react-canvas-draw';
import { getImageInfo, saveImageInfo } from '../../helpers/axios';
import Button from 'react-bootstrap/Button';
import Colorful from '@uiw/react-color-colorful';
import Form from 'react-bootstrap/esm/Form';
import './editor.scss';

const Editor: FC = (props: any) => {
  const [canvasRef, setCanvasRef] = useState<CanvasDraw | null>(null);
  const [canvasPenColor, setCanvasPenColor] = useState('#c0c0c0c0');
  const [canvasPenSize, setCanvasPenSize] = useState(12);
  const [canvasProps, setCanvasProps] = useState({
    hideGrid: true,
    brushColor: '#444',
    brushRadius: 12,
    backgroundColor: '#c6c6c6',
  } as CanvasDrawProps);
  const [canvasStyles, setCanvasStyles] = useState({
    backgroundColor: '#c6c6c6',
    height: 'calc(100vh - 72px)',
    width: '100%',
    overflow: 'hidden',
  });

  const saveImageDrawing = () => {
    const drawing = canvasRef?.getSaveData() || '{}';
    saveImageInfo(props.match.params.uuid, drawing);
  };

  useEffect(() => {
    getImageInfo(props.match.params.uuid).then(response => {
      const modifiedCanvasStyles = {
        ...canvasStyles,
        background: `url(${response.data.imageUri})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#f7f7f7',
      };
      setCanvasStyles(modifiedCanvasStyles);
    });
  }, []);

  useEffect(() => {
    const modifiedCanvasProps = {
      ...canvasProps,
      brushColor: canvasPenColor,
      brushRadius: canvasPenSize,
    };
    setCanvasProps(modifiedCanvasProps);
  }, [canvasPenColor, canvasPenSize]);

  const handleSizeSubmit = (event: any) => {
    event.preventDefault();
    const form = event.currentTarget;
    setCanvasPenSize(form.elements.size.value);
  };

  return (
    <Container fluid>
      <Row className='mt-2'>
        <Col xs={4}>
          <Row className='mt-2'>
            <Col xs={12}>
              <Button className='float-end m-1' onClick={() => saveImageDrawing()}>
                Save
              </Button>
              <Button className='float-end m-1' onClick={() => canvasRef?.undo()}>
                Undo
              </Button>
              <Button className='float-end m-1' variant='danger' onClick={() => canvasRef?.clear()}>
                Clear
              </Button>
            </Col>
            <Col xs={12}>
              <br />
              Pen color :
              <Colorful
                className='float-end m-1'
                color={canvasPenColor}
                onChange={color => setCanvasPenColor(color.hex)}
              />
            </Col>
            <Col xs={12} className='mt-3'>
              <Form id='penSizeForm' onSubmit={handleSizeSubmit}>
                <Form.Group as={Row} controlId='size'>
                  <Col sm='6'>
                    <Form.Label>Pen Size : </Form.Label>
                  </Col>
                  <Col sm='5' className='p-0 pe-1'>
                    <Form.Control size='sm' type='number' placeholder='12' />
                  </Col>
                  <Col sm='1' className='p-0'>
                    <Button size='sm' type='submit'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        fill='currentColor'
                        className='bi bi-arrow-right-circle-fill'
                        viewBox='0 0 16 16'>
                        <path d='M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z' />
                      </svg>
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Col>
        <Col xs={8}>
          <CanvasDraw ref={canvasDraw => setCanvasRef(canvasDraw)} {...canvasProps} style={canvasStyles}>
            Your browser is not supported. Please try opening the application in another browser.
          </CanvasDraw>
        </Col>
      </Row>
    </Container>
  );
};

export { Editor };
