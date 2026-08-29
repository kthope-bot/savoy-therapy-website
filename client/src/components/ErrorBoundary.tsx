import React from "react";

type Props = { children: React.ReactNode };
type State = { hasError: boolean };

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: unknown) {
    console.error("[ErrorBoundary]", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
          <h1 className="text-2xl font-semibold">Something went wrong.</h1>
          <p className="text-muted-foreground max-w-md">
            Please refresh the page. If the problem continues, call us at{" "}
            <a className="underline" href="tel:+12178988393">217-898-8393</a>.
          </p>
          <a className="underline" href="/">Return to the homepage</a>
        </div>
      );
    }
    return this.props.children;
  }
}
