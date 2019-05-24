
import React from 'react';
import { Message, Button, Header, Image, Modal } from 'semantic-ui-react';
import { Link } from '@reach/router';

const Messages = () => (
  <Message>
    <Message.Header>Sign Up</Message.Header>
    <Link>
      Not registered yet? <a href="#">Sign Up</a>
    </Link>
    <Modal trigger={<Button>Show Modal</Button>}>
    <Modal.Header>Select a Photo</Modal.Header>
    <Modal.Content image>
      <Image
        wrapped
        size="medium"
        src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
      />
      <Modal.Description>
        <Header>Default Profile Image</Header>
        <p>
          We've found the following gravatar image associated with
          your e-mail address.
        </p>
        <p>Is it okay to use this photo?</p>
      </Modal.Description>
    </Modal.Content>
  </Modal>
  </Message>
);
export default Messages;