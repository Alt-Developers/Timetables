const AccountPane = () => {
  return (
    <>
      <div className="preferences__profile">
        <img
          src="https://pbs.twimg.com/profile_images/1509787105425526787/WdSeMffL_400x400.jpg"
          alt=""
        />
        <div className="preferences__profileRight">
          <h3>
            jiraties (Jirat Chutrakul) <br />
            <span>Standard Account</span>
          </h3>
        </div>
      </div>

      <hr />

      <div className="preferences__displayItem">
        <h3>Email</h3>
        <p>jiratchutrakul@gmail.com</p>
        <div className="preferences__edit">
          <i className="bx bx-edit-alt"></i>
        </div>
      </div>

      <hr />

      <div className="preferences__displayItem">
        <h3>Password</h3>
        <a href="#">Reset Password</a>
      </div>

      {/* <div className="preferences__item">
        <div className="preferences__item--text">
          <p>Testing text</p>&#8211;
          <span className="accent">Explaination text</span>
        </div>
        <div className="switch"></div>
      </div>

      <div className="preferences__item">
        <div className="preferences__item--text">
          <p>Testing text</p>&#8211;
          <span className="accent">Explaination text</span>
        </div>
        <div className="switch"></div>
      </div> */}

      <div className="preferences__item">
        <div className="preferences__item--text">
          <p>Testing text</p>&#8211;
          <span className="accent">Explaination text</span>
        </div>
        <div className="switch"></div>
      </div>
    </>
  );
};

export default AccountPane;
