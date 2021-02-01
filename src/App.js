import React, { useState } from "react";
import {
  Container,
  Spinner,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

const URI = "https://api-hkung.herokuapp.com";

const App = () => {
  const [textSearch, setTextSearch] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTextChange = (e) => {
    setDownloadLink("");
    setTextSearch(e.target.value);
  };

  const handleSearchClick = () => {
    setLoading(true);
    const URL = encodeURI(`${URI}/school/grades?schoolName=${textSearch}`);
    fetch(URL, {
      method: "GET",
      mode: "cors",
    })
      .then((response) => {
        if (response.ok) {
          setLoading(false);
          return response.blob();
        } else {
          throw response.error;
        }
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        setDownloadLink(url);
        // document.getElementById("downloadButton").click();
      })
      .catch((e) => {
        /* Do Something */
      });
  };

  return (
    <Container className="h-100 mt-auto mb-auto">
      <div className="d-flex align-items-center justify-content-center">
        <h1>Altus Assessment</h1>
      </div>

      <InputGroup className="mb-3">
        <FormControl
          placeholder="School Name"
          aria-label="School Name"
          aria-describedby="basic-addon2"
          value={textSearch}
          onChange={handleTextChange}
        />
        <InputGroup.Append>
          {downloadLink.length > 0 ? (
            <Button
              id="downloadButton"
              as="a"
              disabled={textSearch.length === 0}
              href={downloadLink}
              download="grade.csv"
              variant="success"
            >
              Download
            </Button>
          ) : (
            <Button
              disabled={textSearch.length === 0}
              onClick={handleSearchClick}
              variant="primary"
            >
              {loading && (
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              Search
            </Button>
          )}
        </InputGroup.Append>
      </InputGroup>
    </Container>
  );
};

export default App;
