import React, { Component } from 'react';

import { Error } from '../Error';
import { IErrorProps, IErrorState } from './ErrorBoundary.types';

export class ErrorBoundary extends Component<IErrorProps, IErrorState> {
  constructor(props: IErrorProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <Error />;
    }

    return this.props.children;
  }
}
