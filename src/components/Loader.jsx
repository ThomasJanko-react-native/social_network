import React from 'react';
import {  ActivityIndicator } from 'react-native';
import styled from 'styled-components';

const Loader = () => {
  return (
    <LoaderView>
      <ActivityIndicator size="large" color="#138BF0" />
    </LoaderView>
  );
};
const LoaderView = styled.View`
    justify-content: center;
    align-items: center;
    z-index: 9999;
`;



export default Loader;