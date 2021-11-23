import React, { FC, useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { Redirect, useHistory } from 'react-router-dom';
import PlaceHolderImage from '../../assets/images/placeholder.jpg';
import { PageState } from '../../enums/PageStates';
import { ICanvas } from '../../types/Canvas';
import { createCanvas, getUserCanvasList, HTTPResponse } from '../../helpers/axios';
import { getMediaLocation, getRouterPathEditor, RouterPath } from '../../enums/UrlPath';
import { AuthContext } from '../../components/Authentication/AuthProvider';
import { SectionLoader } from '../../components/ContentState/SectionLoader';
import { ServerRequestError } from '../../components/ContentState/ServerRequestError';
import { PageLoader } from '../../components/ContentState/PageLoader';
import './dashboard.scss';

const Dashboard: FC = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [userCanvasList, setUserCanvasList] = useState(Array<ICanvas>());
  const [loading, setShowLoader] = useState(false);
  const [validated, setValidated] = useState(false);
  const [error, setShowError] = useState(false);

  useEffect(() => {
    getUserCanvasList(auth.state.token)
      .then(response => {
        setUserCanvasList(response.data);
      })
      .catch(error => console.error(error));
  }, [auth]);

  const getCanvasDetailsPage = (uuid: string) => {
    history.push(getRouterPathEditor(uuid));
  };

  const handleCreateCanvas = (event: any) => {
    event.preventDefault();
    const form = event.currentTarget;
    changePageState(PageState.Loading);
    setValidated(true);
    if (form.checkValidity() === true) {
      const formValues: ICanvas = {
        image: form.elements.image.files[0],
        drawing: '{}',
      };

      createCanvas(auth.state.token, formValues)
        .then((response: HTTPResponse<ICanvas>) => getCanvasDetailsPage(response.data?.id || ''))
        .catch((error: Error) => {
          console.error(error);
          changePageState(PageState.Error);
        });
    }
    changePageState(PageState.Data);
  };

  const changePageState = (state: string) => {
    setShowError(state == PageState.Error);
    setShowLoader(state == PageState.Loading);
  };

  if (auth.state && !auth.state.isAuthenticated) {
    if (auth.state.isReady) return <Redirect to={RouterPath.Home} />;
    else return <PageLoader />;
  }

  if (error) {
    return <ServerRequestError height='500px' imgHeight='250px' width='100%' />;
  }

  return (
    <Container>
      {!loading && (
        <Row className='mt-5 justify-content-center'>
          <Col xs={12} sm={6} lg={4} xl={3} className='d-flex-center'>
            <Card className='canvas-card' title='Add canvas' onClick={() => setShowUploadPopup(true)}>
              <Card.Img id='add-canvas-card' src={PlaceHolderImage} />
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='64'
                height='64'
                fill='currentColor'
                id='add-canvas-icon'
                className='bi bi-plus-circle-fill'
                viewBox='0 0 16 16'>
                <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z' />
              </svg>
            </Card>
          </Col>
          {userCanvasList.map(canvas => {
            return (
              <Col xs={12} sm={6} lg={4} xl={3} key={canvas.id} className='d-flex-center'>
                <Card className='canvas-card' onClick={() => getCanvasDetailsPage(canvas?.id || '')}>
                  <Card.Img className='canvas-image-cover' src={getMediaLocation(canvas?.image_path || '')} />
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
      {!!loading && <SectionLoader height='100%' width='100%' />}
      <Modal
        onHide={() => setShowUploadPopup(false)}
        show={showUploadPopup}
        aria-labelledby='contained-modal-title-vcenter'
        centered>
        <Modal.Header id='upload-model-header' closeButton>
          <Modal.Title>Create canvas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            id='createCanvasForm'
            className='pb-2'
            noValidate
            validated={validated}
            onSubmit={handleCreateCanvas}>
            <Form.Group controlId='image' className='mb-3'>
              <Form.Label>Please upload base image:</Form.Label>
              <Form.Control required type='file' />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ padding: '2px' }}>
          <Button className='btn-sm btn-danger' onClick={() => setShowUploadPopup(false)}>
            Cancel
          </Button>
          <Button className='btn-sm' type='submit' disabled={loading} form='createCanvasForm'>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export { Dashboard };
