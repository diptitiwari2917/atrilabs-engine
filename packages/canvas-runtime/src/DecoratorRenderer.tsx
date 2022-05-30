export type DecoratorProps = {
  compId: string;
  children: React.ReactNode;
};

export type DecoratorRendererProps = {
  compId: string;
  decorators: React.FC<DecoratorProps>[];
  children: React.ReactNode;
};

export const DecoratorRenderer: React.FC<DecoratorRendererProps> = (props) => {
  if (props.decorators.length > 0) {
    const Decorator = props.decorators[0]!;
    return (
      <Decorator compId={props.compId}>
        <DecoratorRenderer
          compId={props.compId}
          decorators={props.decorators.slice(1)}
          children={props.children}
        />
      </Decorator>
    );
  } else {
    return <>{props.children}</>;
  }
};