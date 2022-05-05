const Document = (props) => {
  return <div className="credits__page">{props.children}</div>;
};

const Title = (props) => {
  return (
    <h1 className="credits__title">
      {props.text} {props.subtext ? <span>{props.subtext}</span> : <></>}
    </h1>
  );
};

const Paragraph = (props) => {
  return <div className="credits__paragraph">{props.children}</div>;
};

export { Title, Paragraph, Document };
