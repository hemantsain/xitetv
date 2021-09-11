import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ErrorProps {
  children: React.ReactNode;
}

interface ErrorState {
  hasError: boolean;
  error?: string;
  errorInfo?: string;
}

export default class ErrorBoundries extends Component<ErrorProps, ErrorState> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
      error: '',
      errorInfo: '',
    };
  }

  static getDerivedStateFromError(_: Error): ErrorState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error: error.toString(),
      errorInfo: JSON.stringify(errorInfo),
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.rootContainer}>
          <Text style={styles.titleTextStyle}>
            Oops!!! Something went wrong...
          </Text>
          <Text style={styles.subtitleTextStyle}>
            Error: {this.state.error?.toString()}
          </Text>
          <Text style={styles.subtitleTextStyle}>
            Error Info: {this.state.errorInfo}
          </Text>
        </View>
      );
    }
    return this.props.children;
  }
}
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleTextStyle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  subtitleTextStyle: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
});
