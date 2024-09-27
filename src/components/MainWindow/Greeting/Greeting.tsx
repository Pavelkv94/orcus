import s from "./Greeting.module.css";
import React from "react";

const Greeting = React.memo(() => {
  return (
    <div className={s.greet}>
      <div></div>
      <h2>Hello</h2>
      <h3>This is Orcus app. Good luck!</h3>
      <div></div>
      <section className={s.warning}>
        <p>
          The developer of this application is not responsible for any consequences of its use.
          <br /> All materials are provided for educational purposes only!
        </p>
        <p>
          Разработчик данного приложения не несет ответственности за любые последствия его использования.
          <br /> Все материалы предоставлены исключительно в образовательных целях!
        </p>
      </section>
    </div>
  );
});

export default Greeting;
