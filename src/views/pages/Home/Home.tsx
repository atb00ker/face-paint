import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import { FeatureDisplayOffWhite } from './FeatureDisplayOffWhite';
import { FeatureDisplayWhite } from './FeatureDisplayWhite';
import CompleteLogoImage from '../../assets/icons/complete-logo.jpg';
import WorkInProgress1 from '../../assets/illustrations/undraw-work-in-progress.svg';
import OrganizingProjects1 from '../../assets/illustrations/undraw-organizing-projects.svg';
import Creativity1 from '../../assets/illustrations/undraw-creativity.svg';
import './home.scss';
import { heartFill } from '../../helpers/svgIcons';

const Home: React.FC = () => {
  const authorGitHub1 = 'https://github.com/vallariag/';
  const authorGitHub2 = 'https://github.com/atb00ker/';

  return (
    <Container className='overflow-hidden' fluid>
      <Row className='cover-screen'>
        <Col sm='12' className='d-flex-center'>
          <Container className='d-flex-center'>
            <Row className='d-flex-center'>
              <Col sm='12' md='5' className='text-center-md mt-4 max-width-960'>
                <h1>
                  The online <span className='text-primary'>free</span> tool to draw over images.
                </h1>
                <h5>Free. Open-source. Easy to use.</h5>
              </Col>
              <Col
                data-testid='features-page-logo'
                className='text-center'
                xs={{ order: 'first', span: '12' }}
                md={{ order: 'last', span: '7' }}>
                <Image className='d-md-none' src={CompleteLogoImage} width={'100%'} />
                <Image className='d-none d-md-block d-lg-none' src={CompleteLogoImage} width={'400px'} />
                <Image className='d-none d-lg-block' src={CompleteLogoImage} width={'500px'} />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <FeatureDisplayOffWhite
        image={WorkInProgress1}
        imageWidth={'350px'}
        title='Size and color Customization'
        description='Do not restrict yourself with a given color, use the entire RGB spectrum to find the perfect color and size your brush for the job.'
      />
      <FeatureDisplayWhite
        image={OrganizingProjects1}
        imageWidth={'400px'}
        title='Unlimited projects'
        description='Work on multiple projects at once, just upload the image and create a canvas for your project.'
      />
      <FeatureDisplayOffWhite
        image={Creativity1}
        imageWidth={'400px'}
        title='Free. Secure. Easy.'
        description='We do not sell your data, we do not charge you a dime. We just give you an easy to use online tool and let you design.'
      />
      <Row className='cover-screen'>
        <Col sm='12' className='d-flex-center'>
          <Container className='d-flex-center'>
            <Row>
              <Col sm='12' className='d-flex-center max-width-960'>
                <h1>Much more...</h1>
              </Col>
              <Col sm='12' className='d-flex-center text-center max-width-960'>
                <h5>
                  Ready to unlock the Bob Ross inside of you? <br />
                  What are you waiting for? Login and get started!
                </h5>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <Row>
        <Col sm='12' className='mb-3 text-center'>
          Made with <span className='text-danger'>{heartFill()}</span> by{' '}
          <a className='href-no-underline' href={authorGitHub1}>
            @vallariag
          </a>{' '}
          {' & '}
          <a className='href-no-underline' href={authorGitHub2}>
            @atb00ker
          </a>
        </Col>
      </Row>
    </Container>
  );
};

export { Home };
