const Document = (props) => {
  return (
    <section className="credits__page" id={props.id}>
      {props.children}
    </section>
  );
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
