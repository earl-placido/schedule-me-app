jest.mock('redux-persist/integration/react', () => ({
  PersistGate: props => props.children,
}));
