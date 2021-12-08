import html from "html-literal";
import sharkImage from "/assets/img/19732.png";

export default () => html`
  <section id="jumbotron">
    <h2>Savvy Coders Javascript Fullstack Cohort</h2>
    <a href="" onClick="alert('Hello! You clicked the Button!')"
      >"Call to Action Button"</a
    >
  </section>
  <section id="shark">
    <img src="${sharkImage}" />
  </section>
`;
