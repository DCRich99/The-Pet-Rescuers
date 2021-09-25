import React from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";

const DonatePets = () => {
  return (
    <>
      <Jumbotron fluid className="text-dark jumbo jumbo2"></Jumbotron>
      <container>
        <div className="direct">
          <div>
            <img
              className="donateImg"
              src="https://www.aspca.org/sites/default/files/how-you-can-help_adoptions-tips_main-image-dog.jpg"
            ></img>
          </div>
          <div className="donateHeader text-light">
            <h1>Create a safe future for homeless pets</h1>

            <p className="dParagraph">
              Ed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni
              dolores.
            </p>
            <br></br>
            <p className="dParagraph">
              Yratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
              dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
              sed quia non numquam eius modi tempora incidunt ut labore et
              dolore magnam aliquam quaerat voluptatem. Ut enim ad minima
              veniam, quis nostrum exercitationem ullam corporis suscipit.
            </p>
            <br></br>
            <p className="dParagraph">Because of your support.</p>
            <br></br>
            <p className="dParagraph">
              Let’s achieve goals! Donate today and help us connect every single
              homeless pet with someone to love and care for them.
            </p>
          </div>
        </div>
      </container>
    </>
  );
};

export default DonatePets;
