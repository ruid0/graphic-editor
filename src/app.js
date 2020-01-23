import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import { Header } from './components';

import { VisualEditor, AnimationsPlayground, Home } from './pages';

const Container = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 54px 1fr;
`;

export const App = () => {
  return (
    <Container>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/editor">
          <VisualEditor />
        </Route>
        <Route path="/animations">
          <AnimationsPlayground />
        </Route>
      </Switch>
    </Container>
  );
};
